/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faXmark, faTrashCan, faPenToSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ActionPlaceholder from "../../common/ActionPlaceholder";
import VideoModal from "../../EpkView/EpkVideoGallery/VideoModal"; 
import { useSelector } from "react-redux";
import { uploadSingleFile } from "../../../api/epks"; 

const CATEGORIES = [
  { key: "reels", label: "Reels", mobileLabel: "Reels" },
  { key: "media", label: "Media", mobileLabel: "Media" },
  { key: "behind", label: "Behind The Scenes", mobileLabel: "BTS" },
  { key: "premieres", label: "Premieres", mobileLabel: "Premieres" },
];

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){ u8arr[n] = bstr.charCodeAt(n); }
  return new File([u8arr], filename, {type:mime});
}

export default function UserVideoGallery({ data, isEditMode, onChange, onMarkMediaForDeletion }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  
  const [activeCategory, setActiveCategory] = useState("reels");
  const sliderRef = useRef(null);

  const [playingVideo, setPlayingVideo] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const [modalVideo, setModalVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const albums = useMemo(() => {
    const vg = data?.video_gallery || {};
    return {
      reels: vg.reels || [],
      media: vg.media || [],
      behind: vg.behind || [],
      premieres: vg.premieres || [],
    };
  }, [data]);

  const videos = albums[activeCategory] || [];

  const handleScroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = 420 + 32;
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleModalSave = async (editData) => {
    setModalVideo(null); 
    if (editData.videoFile) setIsUploading(true);

    try {
      let finalVideoUrl = editData.originalUrl;
      let finalThumbUrl = editData.newThumbnailUrl || null;

      if (editData.videoFile) {
        finalVideoUrl = await uploadSingleFile(editData.videoFile, user?.token);
      }

      if (editData.customThumbnailFile) {
        finalThumbUrl = await uploadSingleFile(editData.customThumbnailFile, user?.token);
      } else if (editData.extractedBase64) {
        const file = dataURLtoFile(editData.extractedBase64, 'thumbnail.jpg');
        finalThumbUrl = await uploadSingleFile(file, user?.token);
      }

      const newGallery = { ...data.video_gallery };
      const currentArray = [...(newGallery[editData.category] || [])];

      if (editData.isNewUpload) {
        currentArray.push({
          url: finalVideoUrl,
          title: editData.newTitle,
          thumbnail: finalThumbUrl,
          blur: false
        });
      } else {
        const index = currentArray.findIndex(v => v.url === editData.originalUrl);
        if (index > -1) {
          currentArray[index] = {
            ...currentArray[index],
            title: editData.newTitle,
            thumbnail: finalThumbUrl || currentArray[index].thumbnail
          };
        }
      }
      
      newGallery[editData.category] = currentArray;
      onChange("video_gallery", newGallery);
    } catch (err) {
      console.error("Failed to save video:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const confirmDelete = () => {
    const newGallery = { ...data.video_gallery };
    newGallery[activeCategory] = (newGallery[activeCategory] || []).filter(v => v.url !== videoToDelete.url);
    onChange("video_gallery", newGallery);
    if (onMarkMediaForDeletion) onMarkMediaForDeletion(videoToDelete.url);
    setDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-pb-12 md:tw-pb-20">
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-12">
        <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-6 md:tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-gap-8">
          
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-gap-6 lg:tw-justify-between">
            <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">Video Gallery</h2>
            <div className="tw-flex tw-gap-2 tw-overflow-x-auto tw-pb-2 custom-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`tw-px-6 tw-py-2 tw-rounded-full tw-text-sm tw-font-bold tw-border-none tw-cursor-pointer tw-transition-all ${
                    activeCategory === cat.key ? "tw-bg-[#FF43A7] tw-text-[#570033]" : "tw-bg-[#371E51] tw-text-[#F0DBFF]"
                  }`}
                >
                  <span className="md:tw-hidden">{t(cat.mobileLabel)}</span>
                  <span className="tw-hidden md:tw-inline">{t(cat.label)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tw-relative tw-w-full">
            {/* Scroll Buttons */}
            {(videos.length > 0 || isEditMode) && (
              <>
                <button onClick={() => handleScroll('left')} className="tw-hidden md:tw-flex tw-absolute tw--left-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#1E0039] tw-border tw-border-[#FF43A7] tw-text-[#FF43A7] tw-cursor-pointer">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={() => handleScroll('right')} className="tw-hidden md:tw-flex tw-absolute tw--right-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#1E0039] tw-border tw-border-[#FF43A7] tw-text-[#FF43A7] tw-cursor-pointer">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}

            <div ref={sliderRef} className="tw-flex tw-gap-6 tw-overflow-x-auto [&::-webkit-scrollbar]:tw-hidden tw-snap-x">
              {isEditMode && (
                <div className="tw-shrink-0 tw-snap-center">
                  {isUploading ? (
                    <div className="tw-w-[420px] tw-h-[240px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center">
                      <FontAwesomeIcon icon={faSpinner} className="tw-text-[#FF43A7] tw-text-2xl tw-animate-spin" />
                    </div>
                  ) : (
                    <ActionPlaceholder 
                      variant="video" 
                      title={`Add to ${activeCategory}`}
                      onClick={() => setModalVideo({ isNewUpload: true, category: activeCategory })}
                    />
                  )}
                </div>
              )}

              {videos.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => !isEditMode && setPlayingVideo(item)}
                  className="tw-shrink-0 tw-snap-center tw-relative tw-w-[420px] tw-h-[240px] tw-bg-[#190033] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer"
                >
                  <img 
                    src={item.thumbnail?.startsWith('http') ? item.thumbnail : `${process.env.REACT_APP_AWS_URL}/${item.thumbnail}`} 
                    className="tw-w-full tw-h-full tw-object-cover tw-opacity-60" 
                    alt={item.title}
                  />
                  
                  {isEditMode && (
                    <div className="tw-absolute tw-top-3 tw-right-3 tw-flex tw-gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setModalVideo(item); }} className="tw-w-10 tw-h-10 tw-bg-black/80 tw-text-white tw-rounded-full tw-border-none tw-cursor-pointer"><FontAwesomeIcon icon={faPenToSquare} /></button>
                      <button onClick={(e) => { e.stopPropagation(); setVideoToDelete(item); setDeleteModalOpen(true); }} className="tw-w-10 tw-h-10 tw-bg-black/80 tw-text-red-500 tw-rounded-full tw-border-none tw-cursor-pointer"><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                  )}

                  {!isEditMode && (
                    <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                       <div className="tw-w-16 tw-h-16 tw-rounded-full tw-border-2 tw-border-white/50 tw-flex tw-items-center tw-justify-center tw-backdrop-blur-sm group-hover:tw-border-white tw-transition-colors">
                          <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-xl tw-ml-1" />
                       </div>
                    </div>
                  )}

                  <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-6 tw-bg-gradient-to-t tw-from-[#1E0039] tw-text-white">
                    <span className="tw-font-bold tw-text-lg tw-truncate tw-block">{item.title || "Untitled Clip"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoModal isOpen={!!modalVideo} onClose={() => setModalVideo(null)} video={modalVideo} onSave={handleModalSave} />

      {/* Delete Confirmation */}
      {deleteModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-bg-black/90 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center p-4">
          <div className="tw-bg-[#280D41] tw-p-8 tw-rounded-2xl tw-max-w-md tw-w-full tw-text-white">
            <h3 className="tw-text-2xl tw-font-bold tw-mb-4">Delete Video?</h3>
            <p className="tw-text-[#E2BDC9] tw-mb-8">Are you sure you want to remove <strong className="tw-text-white">{videoToDelete?.title}</strong>? This cannot be undone.</p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button onClick={() => setDeleteModalOpen(false)} className="tw-bg-transparent tw-text-white tw-border-none tw-cursor-pointer">Cancel</button>
              <button onClick={confirmDelete} className="tw-bg-red-500 tw-px-6 tw-py-2 tw-rounded-lg tw-border-none tw-cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Player */}
      {playingVideo && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-black/95 tw-flex tw-items-center tw-justify-center p-4" onClick={() => setPlayingVideo(null)}>
          <button className="tw-absolute tw-top-6 tw-right-6 tw-text-white tw-bg-transparent tw-border-none tw-text-3xl tw-cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <video 
            src={playingVideo.url?.startsWith('http') ? playingVideo.url : `${process.env.REACT_APP_AWS_URL}/${playingVideo.url}`} 
            className="tw-w-full tw-max-w-[1200px] tw-aspect-video" 
            controls 
            autoPlay 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}