import React, { useMemo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark, faTrashCan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ActionPlaceholder from "../../common/ActionPlaceholder";
import { useSelector } from "react-redux";
import { uploadSingleFile } from "../../../api/epks";

const CATEGORIES = [
  { key: "posters", label: "Posters", mobileLabel: "Posters" },
  { key: "stills", label: "Stills", mobileLabel: "Stills" },
  { key: "behind", label: "Behind The Scene", mobileLabel: "BTS" },
  { key: "premieres", label: "Premieres", mobileLabel: "Premieres" },
];

export default function EpkPhotoGallery({ epkInfo, isEditMode, onChange, onMarkMediaForDeletion }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  
  const [activeCategory, setActiveCategory] = useState("posters");
  const sliderRef = useRef(null);
  const fileInputRef = useRef(null);

  // Modal states
  const [expandedImage, setExpandedImage] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);
  
  // Custom Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  // Error Modal States
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Upload State
  const [isUploading, setIsUploading] = useState(false);

  const albums = useMemo(() => {
    const pa = epkInfo?.photo_albums || {};
    const posters = [...(pa.posters || [])];
    if (epkInfo?.image_details && !posters.some(p => p.image === epkInfo.image_details)) {
        posters.unshift({ image: epkInfo.image_details, blur: false });
    }

    return {
      posters,
      stills: pa.stills || [],
      behind: pa.behind || [],
      premieres: pa.premieres || [],
    };
  }, [epkInfo]);

  const images = albums[activeCategory] || [];

  const handleScroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = 256 + 32; 
      sliderRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setActiveOverlay(null);
  }, [activeCategory, isEditMode]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedKey = await uploadSingleFile(file, user?.token);
      const newAlbums = { ...epkInfo.photo_albums };
      const currentArray = newAlbums[activeCategory] || [];
      
      newAlbums[activeCategory] = [...currentArray, { image: uploadedKey, blur: false }];

      onChange("photo_albums", newAlbums);
    
      setTimeout(() => handleScroll('right'), 300);

    } catch (error) {
      console.error("Failed to upload image:", error);
      setErrorMessage("There was an error uploading your image to our servers. Please check your connection and try again.");
      setErrorModalOpen(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input so they can upload the same file again if needed
    }
  };

  // --- DELETE LOGIC ---
  const handleDeleteClick = (e, item) => {
    e.stopPropagation();

    //  THE POSTER GUARDRAIL
    if (item.image === epkInfo.image_details) {
      setErrorMessage("This photo is currently set as your Main Cover Poster! You must upload and set a different poster in the Cover section before you can delete this file.");
      setErrorModalOpen(true);
      return; 
    }

    setPhotoToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!photoToDelete) return;
    
    const newAlbums = { ...epkInfo.photo_albums };
    newAlbums[activeCategory] = (newAlbums[activeCategory] || []).filter(img => img.image !== photoToDelete.image);
    onChange("photo_albums", newAlbums);
    
    if (onMarkMediaForDeletion) onMarkMediaForDeletion(photoToDelete.image);
    
    setActiveOverlay(null);
    setDeleteModalOpen(false);
    setPhotoToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPhotoToDelete(null);
  };

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-py-12 md:tw-pt-20 md:tw-pb-8">
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-10">
        
        {/* Header (Shared for Media Library) - EXACT MATCH TO UNIQUENESS */}
        <div className="tw-flex tw-flex-col">
          <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
            {t("Cinematic Assets")}
          </span>
          <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-m-0">
            {t("Media Library")}
          </h2>
        </div>

        {/* Photo Albums Container */}
        <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-6 md:tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-gap-8 md:tw-gap-12">
          
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-gap-6 lg:tw-justify-between">
            <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">{t("Photo Albums")}</h2>
            
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
            {(images.length > 0 || isEditMode) && (
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
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="tw-hidden" 
                  />
                  
                  {isUploading ? (
                    <div className="tw-w-[140px] md:tw-w-[256px] tw-h-full tw-min-h-[210px] md:tw-min-h-[384px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[12px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4">
                      <FontAwesomeIcon icon={faSpinner} className="tw-text-[#FF43A7] tw-text-2xl tw-animate-spin" />
                      <span className="tw-text-[#FF43A7] tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest">Uploading...</span>
                    </div>
                  ) : (
                    <ActionPlaceholder 
                      variant="photo" 
                      title={`Add ${CATEGORIES.find(c=>c.key===activeCategory).mobileLabel}`}
                      onClick={() => fileInputRef.current.click()}
                    />
                  )}
                </div>
              )}

              {images.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    if (isEditMode) {
                      setActiveOverlay(activeOverlay === idx ? null : idx);
                    } else {
                      setExpandedImage(item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`);
                    }
                  }}
                  onMouseLeave={() => isEditMode && setActiveOverlay(null)}
                  className="tw-shrink-0 tw-snap-center tw-relative tw-w-[140px] md:tw-w-[256px] tw-h-[210px] md:tw-h-[384px] tw-bg-[#280D41] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer"
                >
                  <img 
                    src={item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`} 
                    alt={`Album ${activeCategory}`} 
                    className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-105"
                  />
                  
                  {isEditMode && (
                    <div className={`tw-absolute tw-top-3 tw-right-3 tw-transition-opacity tw-duration-300 tw-z-20 ${activeOverlay === idx ? 'tw-opacity-100' : 'tw-opacity-0 md:group-hover:tw-opacity-100'}`}>
                      <button 
                        onClick={(e) => handleDeleteClick(e, item)}
                        title="Delete Photo"
                        className="tw-w-8 tw-h-8 tw-bg-black/60 hover:tw-bg-red-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-shadow-lg"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="tw-text-sm" />
                      </button>
                    </div>
                  )}

                  <div className={`tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039]/90 tw-via-transparent tw-to-transparent tw-transition-opacity tw-duration-300 tw-flex tw-flex-col tw-justify-end tw-p-4 md:tw-p-6 tw-pointer-events-none ${isEditMode && activeOverlay === idx ? 'tw-opacity-100' : 'tw-opacity-0 group-hover:tw-opacity-100'}`}>
                    <span className="tw-text-[#FF43A7] tw-[8px] md:tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">{activeCategory}</span>
                    <h4 className="tw-text-white tw-font-bold tw-text-sm md:tw-text-lg tw-m-0">{isEditMode ? "Manage Photo" : "View Image"}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">Delete Photo?</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              Are you sure you want to remove this photo from your EPK? It will be permanently deleted when you save your changes.
            </p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button 
                onClick={cancelDelete}
                className="tw-px-6 tw-py-2.5 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest hover:tw-bg-white/5 tw-transition-colors tw-cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="tw-px-6 tw-py-2.5 tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(239,68,68,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  CUSTOM ERROR MODAL */}
      {errorModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(255,67,167,0.2)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">Action Blocked</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              {errorMessage}
            </p>
            <div className="tw-flex tw-justify-end">
              <button 
                onClick={() => setErrorModalOpen(false)}
                className="tw-px-6 tw-py-2.5 tw-bg-[#FF43A7] hover:tw-bg-[#FF00A0] tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN OVERLAY */}
      {expandedImage && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4 tw-cursor-pointer" onClick={() => setExpandedImage(null)}>
          <button className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 hover:tw-bg-[#FF43A7] tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-transition-colors tw-flex tw-items-center tw-justify-center tw-shadow-lg" onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }}>
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <img src={expandedImage} alt="Fullscreen" className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg tw-shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}