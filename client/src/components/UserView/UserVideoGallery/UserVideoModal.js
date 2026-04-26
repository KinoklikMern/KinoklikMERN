/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpload, faFilm, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = [
  { key: "reels", label: "Reels" },
  { key: "media", label: "Media" },
  { key: "behind", label: "Behind The Scenes" },
  { key: "premieres", label: "Premieres" },
];

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){ u8arr[n] = bstr.charCodeAt(n); }
  return new File([u8arr], filename, {type:mime});
};

export default function UserVideoModal({ isOpen, onClose, video, onSave }) {
  const [title, setTitle] = useState("");
  const [activeCategory, setActiveCategory] = useState("reels");
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [customThumbnailFile, setCustomThumbnailFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const fileInputRef = useRef(null);
  const customThumbRef = useRef(null);

  // --- FRAME EXTRACTOR (Fixed to prevent "disappearing" bug) ---
  const extractFrames = useCallback((urlToExtract) => {
    if (!urlToExtract) return;
    setIsExtracting(true);
    setThumbnails([]); // Clear old ones

    const videoElement = document.createElement("video");
    videoElement.crossOrigin = "anonymous";
    videoElement.src = urlToExtract;
    videoElement.muted = true;
    videoElement.playsInline = true;

    videoElement.addEventListener("loadeddata", async () => {
      const duration = videoElement.duration;
      const timeStamps = [duration * 0.25, duration * 0.5, duration * 0.75];
      const extracted = [];

      for (let time of timeStamps) {
        videoElement.currentTime = time;
        await new Promise((resolve) => {
          const onSeeked = () => {
            videoElement.removeEventListener("seeked", onSeeked);
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            extracted.push(canvas.toDataURL("image/jpeg", 0.7));
            resolve();
          };
          videoElement.addEventListener("seeked", onSeeked);
        });
      }
      setThumbnails(extracted);
      // Auto-select the first frame if nothing is selected
      setSelectedThumbnail(prev => (prev && !prev.startsWith('data:')) ? prev : extracted[0]);
      setIsExtracting(false);
    });
  }, []);

  // --- INITIALIZATION ---
  useEffect(() => {
    if (isOpen && video) {
      const initialTitle = video.isNewUpload ? "" : (video.title || "");
      const initialCategory = video.category || "reels";
      const initialThumb = video.thumbnail || null;

      setTitle(initialTitle);
      setActiveCategory(initialCategory);
      setSelectedFile(null);
      setSelectedThumbnail(initialThumb);
      setCustomThumbnailFile(null);
      setThumbnails([]);

      if (!video.isNewUpload) {
        const url = video.url?.startsWith('http') ? video.url : `${process.env.REACT_APP_AWS_URL}/${video.url}`;
        setVideoUrl(url);
        extractFrames(url);
      } else {
        setVideoUrl(null);
      }
    }
  }, [isOpen, video, extractFrames]);

  const processFile = (file) => {
    setSelectedFile(file);
    const nameNoExt = file.name.split('.').slice(0, -1).join('.');
    setTitle(nameNoExt); // Auto-populate title
    const localUrl = URL.createObjectURL(file);
    setVideoUrl(localUrl);
    extractFrames(localUrl);
  };

  const handleSave = () => {
    onSave({
      isNewUpload: video.isNewUpload,
      originalUrl: video.url,
      videoFile: selectedFile,
      newTitle: title,
      category: activeCategory,
      newThumbnailUrl: (typeof selectedThumbnail === 'string' && selectedThumbnail.startsWith('http')) ? selectedThumbnail : null,
      customThumbnailFile: customThumbnailFile,
      extractedBase64: (typeof selectedThumbnail === 'string' && selectedThumbnail.startsWith('data:image')) ? selectedThumbnail : null,
      originalThumbnail: video.thumbnail
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-p-4">
      <div className="tw-absolute tw-inset-0 tw-bg-[#0a0014]/90 tw-backdrop-blur-md" onClick={onClose} />

      <div className="tw-relative tw-w-full tw-max-w-4xl tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-overflow-hidden tw-flex tw-flex-col tw-max-h-[90vh]">
        
        {/* HEADER */}
        <div className="tw-px-8 tw-py-6 tw-border-b tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between tw-items-center">
          <h3 className="tw-text-white tw-text-xl tw-font-bold tw-flex tw-items-center tw-gap-3">
            <FontAwesomeIcon icon={faFilm} className="tw-text-[#FF43A7]" />
            {video.isNewUpload ? "Upload New Video" : "Edit Video Details"}
          </h3>
          <button onClick={onClose} className="tw-text-[#E2BDC9] hover:tw-text-white tw-bg-transparent tw-border-none tw-cursor-pointer">
            <FontAwesomeIcon icon={faXmark} className="tw-text-xl" />
          </button>
        </div>

        {/* BODY */}
        <div className="tw-px-8 tw-py-6 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-8">
          
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
            <div className="tw-flex tw-flex-col tw-gap-2">
              <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">Video Title</label>
              <input 
                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white focus:tw-border-[#FF43A7] tw-outline-none"
              />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2">
              <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">Category</label>
              <select 
                value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}
                className="tw-w-full tw-bg-[#1E0039] tw-border tw-border-[#5A3F49] tw-rounded-lg tw-px-4 tw-py-3 tw-text-white focus:tw-border-[#FF43A7] tw-outline-none tw-cursor-pointer"
              >
                {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {!videoUrl ? (
            <div 
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); processFile(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current.click()}
              className="tw-py-16 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-bg-[#1E0039]/50 tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer hover:tw-bg-[#1E0039]/80"
            >
              <FontAwesomeIcon icon={faUpload} className="tw-text-3xl tw-text-[#FF43A7]" />
              <p className="tw-text-[#F0DBFF] tw-font-bold">Drag and drop or click to browse</p>
              <input type="file" ref={fileInputRef} hidden accept="video/*" onChange={e => processFile(e.target.files[0])} />
            </div>
          ) : (
            <div className="tw-w-full tw-aspect-video tw-bg-black tw-rounded-xl tw-overflow-hidden tw-relative">
              <video src={videoUrl} controls className="tw-w-full tw-h-full" />
            </div>
          )}

          {videoUrl && (
            <div className="tw-flex tw-flex-col tw-gap-4">
              <label className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">Select Thumbnail</label>
              <div className="tw-flex tw-gap-4 tw-overflow-x-auto tw-pb-2">
                {thumbnails.map((thumb, idx) => (
                  <div 
                    key={idx} onClick={() => { setSelectedThumbnail(thumb); setCustomThumbnailFile(null); }}
                    className={`tw-shrink-0 tw-relative tw-w-40 tw-aspect-video tw-rounded-lg tw-overflow-hidden tw-cursor-pointer tw-border-2 tw-transition-all ${selectedThumbnail === thumb ? 'tw-border-[#FF43A7]' : 'tw-border-transparent tw-opacity-60'}`}
                  >
                    <img src={thumb} alt="Preview" className="tw-w-full tw-h-full tw-object-cover" />
                    {selectedThumbnail === thumb && <div className="tw-absolute tw-inset-0 tw-bg-[#FF43A7]/20 tw-flex tw-items-center tw-justify-center"><FontAwesomeIcon icon={faCheck} className="tw-text-white" /></div>}
                  </div>
                ))}
                <div 
                  onClick={() => customThumbRef.current.click()}
                  className="tw-shrink-0 tw-w-40 tw-aspect-video tw-bg-[#1E0039] tw-border tw-border-dashed tw-border-[#5A3F49] tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-cursor-pointer hover:tw-bg-[#371E51]"
                >
                  <FontAwesomeIcon icon={faUpload} className="tw-text-[#DDB7FF]" />
                  <span className="tw-text-[10px] tw-text-[#DDB7FF] tw-font-bold">CUSTOM</span>
                  <input type="file" ref={customThumbRef} hidden accept="image/*" onChange={e => { setCustomThumbnailFile(e.target.files[0]); setSelectedThumbnail(URL.createObjectURL(e.target.files[0])); }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="tw-px-8 tw-py-6 tw-border-t tw-border-[#5A3F49]/40 tw-bg-[#1E0039]/50 tw-flex tw-justify-between">
          <button onClick={onClose} className="tw-bg-transparent tw-border-none tw-text-[#E2BDC9] tw-font-bold tw-cursor-pointer">Cancel</button>
          <button 
            onClick={handleSave} disabled={!videoUrl || isExtracting}
            className="tw-px-8 tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-white tw-font-bold tw-border-none tw-shadow-lg tw-cursor-pointer disabled:tw-opacity-50"
          >
            {isExtracting ? <><FontAwesomeIcon icon={faSpinner} className="tw-animate-spin tw-mr-2" /> Processing...</> : "Save Media"}
          </button>
        </div>
      </div>
    </div>
  );
}