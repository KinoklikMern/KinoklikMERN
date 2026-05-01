import React, { useMemo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faXmark, faTrashCan, faPenToSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ActionPlaceholder from "../../common/ActionPlaceholder";
import VideoModal from "./VideoModal";
import { useSelector } from "react-redux";
import { uploadSingleFile } from "../../../api/epks";

const CATEGORIES = [
  { key: "trailers", label: "Trailers", mobileLabel: "Trailers" },
  { key: "behind", label: "Behind The Scene", mobileLabel: "BTS" },
  { key: "interviews", label: "Interviews", mobileLabel: "Interviews" },
  { key: "premieres", label: "Premieres", mobileLabel: "Premieres" },
];

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){ u8arr[n] = bstr.charCodeAt(n); }
  return new File([u8arr], filename, {type:mime});
}

export default function EpkVideoGallery({ epkInfo, isEditMode, onChange, onMarkMediaForDeletion }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  
  const [activeCategory, setActiveCategory] = useState("trailers");
  const sliderRef = useRef(null);

  const [playingVideo, setPlayingVideo] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const [modalVideo, setModalVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const albums = useMemo(() => {
    const vg = epkInfo?.video_gallery || {};
    const trailers = [...(vg.trailers || [])];
    
    if (epkInfo?.trailer_url && !trailers.some(t => t.url === epkInfo.trailer_url)) {
        trailers.unshift({ url: epkInfo.trailer_url, title: t("Official Trailer"), thumbnail: epkInfo?.banner_url || '', blur: false });
    }
    if (epkInfo?.trailer && !trailers.some(t => t.url === epkInfo.trailer)) {
        trailers.unshift({ url: epkInfo.trailer, title: t("Legacy Trailer"), thumbnail: '', blur: false });
    }

    return {
      trailers,
      behind: vg.behind || [],
      interviews: vg.interviews || [],
      premieres: vg.premieres || [],
    };
  }, [epkInfo]);

  const videos = albums[activeCategory] || [];

  const handleScroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = 420 + 32;
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setActiveOverlay(null);
  }, [activeCategory, isEditMode]);

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

      const newGallery = { ...epkInfo.video_gallery };
      const currentArray = [...(newGallery[editData.category] || [])];

      if (editData.videoFile) {
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
      if (editData.category !== activeCategory) setActiveCategory(editData.category);

      if (editData.isTrailer) {
        onChange("trailer_url", finalVideoUrl);
        if (finalThumbUrl) onChange("banner_url", finalThumbUrl);
      }

      if (editData.videoFile) setTimeout(() => handleScroll('right'), 300);

    } catch (err) {
      console.error("Failed to save video assets:", err);
     setErrorMessage(t("There was an error saving your video. Please check your connection and try again."));
      setErrorModalOpen(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();

    if (item.url === epkInfo.trailer_url || item.url === epkInfo.trailer) {
      setErrorMessage(t("This video is currently set as your Main Trailer! You must set a different video as your main trailer before you can delete this file."));      setErrorModalOpen(true);
      return; 
    }

    setVideoToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!videoToDelete) return;
    
    const newGallery = { ...epkInfo.video_gallery };
    newGallery[activeCategory] = (newGallery[activeCategory] || []).filter(v => v.url !== videoToDelete.url);
    onChange("video_gallery", newGallery);
    
    if (onMarkMediaForDeletion) onMarkMediaForDeletion(videoToDelete.url);
    
    setActiveOverlay(null);
    setDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-pb-12 md:tw-pb-20">
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-12">
        
        <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-6 md:tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-gap-8 md:tw-gap-12">
          
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-gap-6 lg:tw-justify-between">
            <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">{t("Video Gallery")}</h2>
            
            <div className="tw-w-full lg:tw-w-auto tw-overflow-x-auto custom-scrollbar tw-pb-2 md:tw-pb-0">
              <div className="tw-flex tw-flex-nowrap md:tw-flex-wrap tw-gap-2 md:tw-gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`tw-px-4 md:tw-px-6 tw-py-2 tw-rounded-full tw-font-['Space_Grotesk'] tw-text-[11px] md:tw-text-sm tw-font-bold tw-transition-all tw-border-none tw-cursor-pointer tw-whitespace-nowrap ${
                      activeCategory === cat.key
                        ? "tw-bg-[#FF43A7] tw-text-[#570033] tw-shadow-[0_0_15px_rgba(255,67,167,0.4)]"
                        : "tw-bg-[#371E51] tw-text-[#F0DBFF] hover:tw-bg-[#5A3F49]"
                    }`}
                  >
                    <span className="md:tw-hidden">{t(cat.mobileLabel)}</span>
                    <span className="tw-hidden md:tw-inline">{t(cat.label)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="tw-relative tw-w-full">
            {(videos.length > 0 || isEditMode) && (
              <>
                <button onClick={() => handleScroll('left')} className="tw-hidden md:tw-flex tw-absolute tw--left-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-[#1E0039]/80 tw-border tw-border-[#FF00A0]/30 tw-text-[#FF00A0] hover:tw-shadow-[0_0_15px_rgba(255,0,160,0.3)] tw-transition-all tw-cursor-pointer">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={() => handleScroll('right')} className="tw-hidden md:tw-flex tw-absolute tw--right-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-[#1E0039]/80 tw-border tw-border-[#FF00A0]/30 tw-text-[#FF00A0] hover:tw-shadow-[0_0_15px_rgba(255,0,160,0.3)] tw-transition-all tw-cursor-pointer">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}

            <div 
              ref={sliderRef}
              className="tw-flex tw-items-stretch tw-gap-4 md:tw-gap-6 tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-pb-4 [&::-webkit-scrollbar]:tw-hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isEditMode && (
                <div className="tw-shrink-0 tw-snap-center">
                  {isUploading ? (
                    <div className="tw-w-[260px] md:tw-w-[420px] tw-h-full tw-min-h-[146px] md:tw-min-h-[240px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[16px] md:tw-rounded-[12px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4">
                      <FontAwesomeIcon icon={faSpinner} className="tw-text-[#FF43A7] tw-text-2xl tw-animate-spin" />
                      <span className="tw-text-[#FF43A7] tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest">{t("Uploading Video...")}</span>
                    </div>
                  ) : (
                    <ActionPlaceholder 
                      variant="video" 
                      title={`${t("Add")} ${t(CATEGORIES.find(c=>c.key===activeCategory).mobileLabel)}`}
                      onClick={() => setModalVideo({ isNewUpload: true, category: activeCategory })}
                    />
                  )}
                </div>
              )}

              {videos.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    if (isEditMode) {
                      setActiveOverlay(activeOverlay === idx ? null : idx);
                    } else {
                      setPlayingVideo(item);
                    }
                  }}
                  onMouseLeave={() => isEditMode && setActiveOverlay(null)}
                  className="tw-shrink-0 tw-snap-center tw-relative tw-w-[260px] md:tw-w-[420px] tw-h-[146px] md:tw-h-[240px] tw-bg-[#190033] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer"
                >
                  <div className="tw-absolute tw-inset-0">
                    {item.thumbnail ? (
                      <img src={item.thumbnail?.startsWith('http') ? item.thumbnail : `${process.env.REACT_APP_AWS_URL}/${item.thumbnail}`} alt="Thumb" className="tw-w-full tw-h-full tw-object-cover tw-opacity-60 group-hover:tw-scale-105 tw-transition-transform tw-duration-500" />
                    ) : (
                      <video src={item.url?.startsWith('http') ? item.url : `${process.env.REACT_APP_AWS_URL}/${item.url}`} className="tw-w-full tw-h-full tw-object-cover tw-opacity-50" />
                    )}
                  </div>
                  
                  {isEditMode && (
                    <>
                      {/* DESKTOP UI: Top Right Buttons (Always active on hover) */}
                      <div className="tw-hidden md:tw-flex tw-absolute tw-top-3 tw-right-3 tw-gap-2 tw-z-20 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setModalVideo(item); setActiveOverlay(null); }}
                          title={t("Edit Video Details")}
                          className="tw-w-10 tw-h-10 tw-bg-black/80 hover:tw-bg-[#FF43A7] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-shadow-lg"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="tw-text-sm" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteClick(e, item); setActiveOverlay(null); }}
                          title={t("Delete Video")}
                          className="tw-w-10 tw-h-10 tw-bg-black/80 hover:tw-bg-red-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-red-500 hover:tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-shadow-lg"
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="tw-text-sm" />
                        </button>
                      </div>

                      {/* MOBILE UI: Split Screen Buttons (Locked by pointer-events until tapped) */}
                      <div className={`tw-flex md:tw-hidden tw-absolute tw-inset-0 tw-z-20 tw-transition-opacity tw-duration-300 tw-rounded-xl tw-overflow-hidden ${activeOverlay === idx ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'}`}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setModalVideo(item); setActiveOverlay(null); }}
                          className="tw-flex-1 tw-h-full tw-bg-black/70 tw-backdrop-blur-sm tw-border-none tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-text-white tw-border-r tw-border-white/10 active:tw-bg-[#FF43A7]/80 tw-transition-colors tw-cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} className="tw-text-2xl tw-mb-1" />
                          <span className="tw-font-['Space_Grotesk'] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Edit")}</span>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteClick(e, item); setActiveOverlay(null); }}
                          className="tw-flex-1 tw-h-full tw-bg-red-500/80 tw-backdrop-blur-sm tw-border-none tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-text-white active:tw-bg-red-600 tw-transition-colors tw-cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="tw-text-2xl tw-mb-1" />
                          <span className="tw-font-['Space_Grotesk'] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest">{t("Delete")}</span>
                        </button>
                      </div>
                    </>
                  )}

                  {!isEditMode && (
                    <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-pointer-events-none tw-transition-opacity tw-duration-300 tw-opacity-100">
                       <div className="tw-w-12 tw-h-12 md:tw-w-16 md:tw-h-16 tw-rounded-full tw-border-2 tw-border-white/50 tw-flex tw-items-center tw-justify-center tw-backdrop-blur-sm group-hover:tw-border-white tw-transition-colors">
                          <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-lg md:tw-text-xl tw-ml-1" />
                       </div>
                    </div>
                  )}

                  <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-h-[60px] md:tw-h-[76px] tw-bg-gradient-to-t tw-from-[#1E0039] tw-to-transparent tw-p-4 md:tw-p-6 tw-flex tw-items-center tw-gap-2 md:tw-gap-3 tw-pointer-events-none">
                    <span className="tw-bg-[#FF43A7] tw-text-[#570033] tw-text-[8px] md:tw-text-[10px] tw-font-bold tw-uppercase tw-px-2 tw-py-0.5 tw-rounded">{t(activeCategory)}</span>
                    <span className="tw-text-white tw-font-bold tw-sm md:tw-text-lg tw-truncate">{t(item.title) || t("Video Clip")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <VideoModal 
        isOpen={!!modalVideo} 
        onClose={() => setModalVideo(null)} 
        video={modalVideo} 
        epkInfo={epkInfo} 
        onSave={handleModalSave} 
      />

      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">{t("Delete Video?")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {t("Are you sure you want to remove")} <strong className="tw-text-white">{videoToDelete?.title || t("this video")}</strong> {t("from your EPK? It will be permanently deleted when you save your changes.")}
            </p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button 
                onClick={cancelDelete}
                className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-bg-white/5 tw-transition-colors tw-cursor-pointer"
              >
               {t("Cancel")}
              </button>
              <button 
                onClick={confirmDelete}
                className="tw-px-6 tw-py-2.5 tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(239,68,68,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🛑 CUSTOM ERROR MODAL */}
      {errorModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(255,67,167,0.2)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">{t("Action Blocked")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {errorMessage}
            </p>
            <div className="tw-flex tw-justify-end">
              <button 
                onClick={() => setErrorModalOpen(false)}
                className="tw-px-6 tw-py-2.5 tw-bg-[#FF43A7] hover:tw-bg-[#FF00A0] tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                {t("Understood")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN VIDEO PLAYER */}
      {playingVideo && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer" onClick={() => setPlayingVideo(null)}>
          <button className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 hover:tw-bg-[#FF43A7] tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-flex tw-items-center tw-justify-center tw-shadow-lg" onClick={(e) => { e.stopPropagation(); setPlayingVideo(null); }}>
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <div className="tw-w-[95vw] md:tw-w-[80vw] tw-max-w-[1200px] tw-aspect-video tw-bg-black tw-rounded-xl tw-overflow-hidden tw-shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video 
                src={playingVideo.url?.startsWith('http') ? playingVideo.url : `${process.env.REACT_APP_AWS_URL}/${playingVideo.url}`} 
                className="tw-w-full tw-h-full tw-outline-none" 
                controls autoPlay playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}