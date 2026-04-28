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
  { key: "media", label: "Production Stills", mobileLabel: "Stills" },
  { key: "behind", label: "Behind the Scenes", mobileLabel: "BTS" },
  { key: "premieres", label: "Premieres", mobileLabel: "Premieres" },
];

export default function UserPhotoGallery({ data, isEditMode, onChange, onMarkMediaForDeletion }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  
  const [activeCategory, setActiveCategory] = useState("headshots");
  const sliderRef = useRef(null);
  const fileInputRef = useRef(null);

  const [expandedImage, setExpandedImage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const albums = useMemo(() => {
    const pa = data?.photo_albums || {};
    return {
      headshots: pa.headshots || [],
      media: pa.media || [],
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedKey = await uploadSingleFile(file, user?.token);
      
      const newPhotoAlbums = { 
        headshots: [...(data.photo_albums?.headshots || [])],
        media: [...(data.photo_albums?.media || [])],
        behind: [...(data.photo_albums?.behind || [])],
        premieres: [...(data.photo_albums?.premieres || [])]
      };

      const newEntry = activeCategory === 'headshots' 
        ? { image: uploadedKey, isMain: false } 
        : { image: uploadedKey };

      newPhotoAlbums[activeCategory].push(newEntry);

      onChange("photo_albums", newPhotoAlbums);
      
      setTimeout(() => handleScroll('right'), 300);
    } catch (error) {
      console.error("Upload failed", error);
      setErrorMessage("Failed to upload image.");
      setErrorModalOpen(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    }
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();
    if (item.image === data?.image_details) {
      setErrorMessage("This photo is currently set as your Profile Headshot! Please change your headshot before deleting this file.");
      setErrorModalOpen(true);
      return; 
    }
    setPhotoToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const newAlbums = {
      headshots: [...(data?.photo_albums?.headshots || [])],
      media: [...(data?.photo_albums?.media || [])],
      behind: [...(data?.photo_albums?.behind || [])],
      premieres: [...(data?.photo_albums?.premieres || [])]
    };

    newAlbums[activeCategory] = (newAlbums[activeCategory] || []).filter(img => img.image !== photoToDelete.image);
    onChange("photo_albums", newAlbums);
    if (onMarkMediaForDeletion) onMarkMediaForDeletion(photoToDelete.image);
    setDeleteModalOpen(false);
    setPhotoToDelete(null);
  };

  return (
    <section className="tw-bg-transparent tw-w-full tw-py-12 tw-border-[#5A3F49]/30">
      <div className="tw-w-full tw-max-w-[1280px] tw-mx-auto tw-px-4 md:tw-px-0">
        
        <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-8">
          {t("Portfolio")}
        </h2>

        <div className="tw-pl-0 md:tw-pl-10">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/40 tw-rounded-[24px] tw-p-6 md:tw-p-10 tw-flex tw-flex-col tw-gap-8">
            
            <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-justify-between tw-gap-6">
              <h3 className="tw-text-white tw-text-2xl md:tw-text-3xl tw-font-bold tw-m-0">
                {t("Photo Albums")}
              </h3>
              
              <div className="tw-flex tw-gap-2 tw-overflow-x-auto custom-scrollbar tw-pb-2 lg:tw-pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`tw-whitespace-nowrap tw-px-5 tw-py-2 tw-rounded-full tw-font-bold tw-text-xs tw-transition-all tw-border-none tw-cursor-pointer ${
                      activeCategory === cat.key
                        ? "tw-bg-[#FF43A7] tw-text-[#570033] shadow-lg"
                        : "tw-bg-[#371E51] tw-text-[#F0DBFF] hover:tw-bg-[#4B2B6D]"
                    }`}
                  >
                    {t(cat.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Area */}
            <div className="tw-relative">
              <div 
                ref={sliderRef}
                className="tw-flex tw-items-stretch tw-gap-4 md:tw-gap-6 tw-overflow-x-auto tw-snap-x tw-pb-4 custom-scrollbar"
              >
                {isEditMode && (
                  <div className="tw-shrink-0 tw-snap-center">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="tw-hidden" />
                    {isUploading ? (
                      <div className="tw-w-[140px] md:tw-w-[240px] tw-h-full tw-min-h-[210px] md:tw-min-h-[360px] tw-bg-[#FF43A7]/5 tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-[12px] tw-flex tw-items-center tw-justify-center">
                        <FontAwesomeIcon icon={faSpinner} className="tw-text-[#FF43A7] tw-text-2xl tw-animate-spin" />
                      </div>
                    ) : (
                      <ActionPlaceholder 
                        variant="photo" 
                        title={`${t('Add')} ${t(CATEGORIES.find(c=>c.key===activeCategory).mobileLabel)}`}
                        onClick={() => fileInputRef.current.click()}
                      />
                    )}
                  </div>
                )}

                {images.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => !isEditMode && setExpandedImage(item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`)}
                    className="tw-shrink-0 tw-snap-center tw-relative tw-w-[140px] md:tw-w-[240px] tw-h-[210px] md:tw-h-[360px] tw-bg-[#1F0439] tw-rounded-xl tw-overflow-hidden tw-group tw-cursor-pointer tw-shadow-lg"
                  >
                    <img 
                      src={item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_AWS_URL}/${item.image}`} 
                      alt="Gallery" 
                      className="tw-w-full tw-h-full tw-object-cover group-hover:tw-scale-105 tw-transition-transform tw-duration-500"
                    />
                    
                    {isEditMode && (
                      <div className="tw-absolute tw-top-3 tw-right-3 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity">
                        <button 
                          onClick={(e) => handleDeleteClick(e, item)}
                          className="tw-w-8 tw-h-8 tw-bg-black/70 hover:tw-bg-red-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white tw-border-none tw-cursor-pointer"
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
      </div>
      {deleteModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-[1100] tw-flex tw-items-center tw-justify-center tw-bg-black/80 tw-backdrop-blur-sm">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] tw-p-8 tw-rounded-2xl tw-max-w-sm tw-w-full tw-text-center">
            <h3 className="tw-text-white tw-text-xl tw-font-bold tw-mb-4">{t("Delete Photo?")}</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8">
              {t("Are you sure you want to remove this photo? This will be finalized when you save your profile.")}
            </p>
            <div className="tw-flex tw-gap-4">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="tw-flex-1 tw-py-2 tw-rounded-lg tw-bg-gray-600 tw-text-white tw-font-bold tw-border-none tw-cursor-pointer"
              >
                {t("Cancel")}
              </button>
              <button 
                onClick={confirmDelete}
                className="tw-flex-1 tw-py-2 tw-rounded-lg tw-bg-red-500 tw-text-white tw-font-bold tw-border-none tw-cursor-pointer"
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}