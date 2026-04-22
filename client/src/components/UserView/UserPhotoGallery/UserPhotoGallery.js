/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark, faTrashCan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ActionPlaceholder from "../../common/ActionPlaceholder";
import { useSelector } from "react-redux";
import { uploadSingleFile } from "../../../api/users"; 

const CATEGORIES = [
  { key: "headshots", label: "Headshots", mobileLabel: "Headshots" },
  { key: "stills", label: "Production Stills", mobileLabel: "Stills" },
  { key: "behind", label: "On Set / BTS", mobileLabel: "BTS" },
  { key: "premieres", label: "Premieres", mobileLabel: "Premieres" },
];

export default function UserPhotoGallery({ data, isEditMode, onChange, onMarkMediaForDeletion }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  
  const [activeCategory, setActiveCategory] = useState("headshots");
  const sliderRef = useRef(null);
  const fileInputRef = useRef(null);

  const [expandedImage, setExpandedImage] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const albums = useMemo(() => {
    const pa = data?.photo_albums || {};
    const posters = [...(pa.posters || [])];
    
    if (data?.image_details && !posters.some(p => p.image === data.image_details)) {
        posters.unshift({ image: data.image_details, blur: false });
    }

    return {
      headshots: pa.stills || [],
      stills: pa.stills || [],
      behind: pa.behind || [],
      premieres: pa.premieres || [],
    };
  }, [data]);

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
      const newAlbums = { ...data.photo_albums };
      const currentArray = newAlbums[activeCategory] || [];
      
      newAlbums[activeCategory] = [...currentArray, { image: uploadedKey, blur: false }];
      onChange("photo_albums", newAlbums);
    
      setTimeout(() => handleScroll('right'), 300);
    } catch (error) {
      console.error("Failed to upload image:", error);
      setErrorMessage("Failed to upload image. Please check your connection.");
      setErrorModalOpen(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    }
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();

    // UPDATED GUARDRAIL: Check against data.image_details (The User's Headshot)
    if (item.image === data.image_details) {
      setErrorMessage("This photo is currently set as your Profile Headshot! Please upload or select a different headshot in the Cover section before deleting this file.");
      setErrorModalOpen(true);
      return; 
    }

    setPhotoToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!photoToDelete) return;

    const newAlbums = { ...data.photo_albums };
    newAlbums[activeCategory] = (newAlbums[activeCategory] || []).filter(img => img.image !== photoToDelete.image);
    onChange("photo_albums", newAlbums);
    if (onMarkMediaForDeletion) onMarkMediaForDeletion(photoToDelete.image);
    setActiveOverlay(null);
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPhotoToDelete(null);
  };

  return (
    <div className="tw-bg-[#1E0039] tw-w-full tw-py-12 md:tw-pt-20 md:tw-pb-8">
      <div className="tw-w-full tw-max-w-[1440px] tw-mx-auto tw-flex tw-flex-col tw-px-4 lg:tw-px-16 tw-gap-10">
        
        <div className="tw-flex tw-flex-col">
          <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
            {t("Portfolio")}
          </span>
          <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-m-0">
            {t("Media Library")}
          </h2>
        </div>

        <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-6 md:tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-gap-8 md:tw-gap-12">
          
          <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-end tw-gap-6 lg:tw-justify-between">
            <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">{t("Photo Albums")}</h2>
            
            <div className="tw-w-full lg:tw-w-auto tw-overflow-x-auto custom-scrollbar tw-pb-2 md:tw-pb-0">
              <div className="tw-flex tw-flex-nowrap md:tw-flex-wrap tw-gap-2 md:tw-gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`tw-px-4 md:tw-px-6 tw-py-2 tw-rounded-full tw-font-bold tw-text-[11px] md:tw-text-sm tw-transition-all tw-border-none tw-cursor-pointer ${
                      activeCategory === cat.key
                        ? "tw-bg-[#FF43A7] tw-text-[#570033] shadow-lg"
                        : "tw-bg-[#371E51] tw-text-[#F0DBFF] hover:tw-bg-[#5A3F49]"
                    }`}
                  >
                    {t(cat.label)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="tw-relative tw-w-full">
            <div 
              ref={sliderRef}
              className="tw-flex tw-items-stretch tw-gap-4 md:tw-gap-6 tw-overflow-x-auto tw-snap-x tw-pb-4 [&::-webkit-scrollbar]:tw-hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              {isEditMode && (
                <div className="tw-shrink-0 tw-snap-center">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="tw-hidden" />
                  {isUploading ? (
                    <div className="tw-w-[140px] md:tw-w-[256px] tw-h-full tw-min-h-[210px] md:tw-min-h-[384px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[12px] tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4">
                      <FontAwesomeIcon icon={faSpinner} className="tw-text-[#FF43A7] tw-text-2xl tw-animate-spin" />
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
                  onClick={() => !isEditMode && setExpandedImage(item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`)}
                  className="tw-shrink-0 tw-snap-center tw-relative tw-w-[140px] md:tw-w-[256px] tw-h-[210px] md:tw-h-[384px] tw-bg-[#280D41] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer"
                >
                  <img 
                    src={item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`} 
                    alt="Gallery" 
                    className="tw-w-full tw-h-full tw-object-cover group-hover:tw-scale-105 tw-transition-transform"
                  />
                  
                  {isEditMode && (
                    <div className="tw-absolute tw-top-3 tw-right-3 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity">
                      <button 
                        onClick={(e) => handleDeleteClick(e, item)}
                        className="tw-w-8 tw-h-8 tw-bg-black/60 hover:tw-bg-red-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-border-none tw-cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="tw-text-sm" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reused Modals for Delete and Error */}
      {deleteModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-2xl tw-p-8 tw-max-w-md tw-w-full">
            <h3 className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">Delete Photo?</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8">Are you sure? This will be permanently removed when you save your profile.</p>
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button onClick={() => setDeleteModalOpen(false)} className="tw-px-6 tw-py-2 tw-bg-transparent tw-border tw-border-[#5A3F49] tw-rounded-lg tw-text-[#E2BDC9] tw-cursor-pointer">Cancel</button>
              <button onClick={confirmDelete} className="tw-px-6 tw-py-2 tw-bg-red-500 tw-rounded-lg tw-text-white tw-border-none tw-cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

      {errorModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/40 tw-rounded-2xl tw-p-8 tw-max-w-md tw-w-full">
            <h3 className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">Action Blocked</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8">{errorMessage}</p>
            <button onClick={() => setErrorModalOpen(false)} className="tw-w-full tw-py-3 tw-bg-[#FF43A7] tw-rounded-lg tw-text-white tw-border-none tw-cursor-pointer tw-font-bold">Understood</button>
          </div>
        </div>
      )}

      {expandedImage && (
        <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/90 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4" onClick={() => setExpandedImage(null)}>
          <img src={expandedImage} alt="Fullscreen" className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg" />
        </div>
      )}
    </div>
  );
}