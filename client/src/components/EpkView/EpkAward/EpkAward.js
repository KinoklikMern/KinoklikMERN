import React, { useState, useRef } from "react";
import AwardCard from "./AwardCard";
import ReviewModal from "./ReviewModal";
import ActionPlaceholder from "../../common/ActionPlaceholder";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { uploadSingleFile } from "../../../api/epks";
import { useSelector } from "react-redux";

export default function EpkAward({ epkInfo, isEditMode, onChange }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const scrollRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const reviews = epkInfo?.reviews || [];

  if (!isEditMode && reviews.length === 0) return null;

  const scrollByAmount = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 340 + 24; 
      scrollRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
  };

  const handleOpenCreate = () => {
    setSelectedReview(null);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (review, index) => {
    setSelectedReview(review);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveReview = async (reviewData) => {
    try {
      let finalImageUrl = reviewData.originalUrl;

      if (reviewData.file) {
        finalImageUrl = await uploadSingleFile(reviewData.file, user?.token);
      }

      const newReview = {
        magazine: reviewData.magazine,
        text: reviewData.text,
        reviews_url: reviewData.reviews_url,
        award_logo: finalImageUrl
      };

      const newReviewsArray = [...reviews];

      if (editIndex !== null) {
        newReviewsArray[editIndex] = newReview;
      } else {
        newReviewsArray.unshift(newReview); 
      }

      onChange("reviews", newReviewsArray);

    } catch (error) {
      console.error("Failed to save review:", error);
      throw error; 
    }
  };

  const handleDeleteReview = () => {
    const newReviewsArray = reviews.filter((r, idx) => idx !== editIndex);
    onChange("reviews", newReviewsArray); 
    setIsModalOpen(false);
  };

  return (
    <section className="tw-relative tw-w-full tw-bg-[#1E0039] tw-py-16 tw-px-4 md:tw-px-16 tw-overflow-hidden">
      
      {/* HEADER */}
      <div className="tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col tw-mb-10 md:tw-mb-16 tw-px-4 md:tw-px-0 tw-relative tw-z-10">
        <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
          {t("Press & Recognition")}
        </span>
        <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-mb-2">
          {t("The Buzz")}
        </h2>
        {isEditMode && (
          <p className="tw-text-[#DDB7FF] tw-text-sm md:tw-text-base tw-leading-relaxed tw-max-w-[672px] tw-mt-2 tw-mb-0">
          {t("Highlight your best press coverage, awards, and reviews. Adding prestigious logos builds instant credibility.")}
          </p>
        )}
      </div>

      {/* CONTAINER */}
      <div className="tw-bg-white tw-rounded-[15px] tw-p-4 sm:tw-p-8 tw-max-w-[1400px] tw-mx-auto tw-relative tw-shadow-xl tw-z-10">
        
        {(reviews.length > 3 || (isEditMode && reviews.length > 2)) && (
          <button 
            onClick={() => scrollByAmount(-1)}
            className="tw-hidden md:tw-flex tw-absolute tw-left-2 tw-top-1/2 -tw-translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-text-[#1E0039] hover:tw-text-[#FF00A0] tw-transition-colors tw-bg-transparent tw-border-none tw-cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        )}

        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          /* FIX: Added tw-py-8 and tw-items-center so the cards have plenty of space top and bottom to scale without hitting the clipping boundaries */
          className="tw-flex tw-items-center tw-flex-nowrap tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-scroll-smooth tw-gap-6 tw-py-8 tw-px-4 [&::-webkit-scrollbar]:tw-hidden tw-scrollbar-width-none"
        >
          {isEditMode && (
            <div className="tw-shrink-0 tw-snap-center">
              <ActionPlaceholder 
                variant="press" 
                title={t("Add New Press")}
                onClick={handleOpenCreate} 
              />
            </div>
          )}

          {reviews.map((award, index) => (
            <div key={award._id || index} className="tw-shrink-0 tw-snap-center">
              <AwardCard 
                awardInfo={award} 
                isEditMode={isEditMode}
                onEditClick={() => handleOpenEdit(award, index)}
              />
            </div>
          ))}
        </div>

        {(reviews.length > 3 || (isEditMode && reviews.length > 2)) && (
          <button 
            onClick={() => scrollByAmount(1)}
            className="tw-hidden md:tw-flex tw-absolute tw-right-2 tw-top-1/2 -tw-translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-text-[#1E0039] hover:tw-text-[#FF00A0] tw-transition-colors tw-bg-transparent tw-border-none tw-cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        )}

      </div>

      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
        onSave={handleSaveReview}
        onDelete={handleDeleteReview}
      />

    </section>
  );
}