import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg';
import UpdateProfilePhotoModal from './UpdateProfilePhotoModal';
import UpdateBannerModal from '../../EpkView/EpkCover/UpdateBannerModal';

const S3 = process.env.REACT_APP_AWS_URL;
const PHOTO_OVERLAP = 56; // px the photo bleeds below the banner bottom
const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', '.m4v'];

function resolveUrl(key, fallback) {
  if (!key || key === '') return fallback || emptyBanner;
  if (key.startsWith('http') || key.startsWith('blob:')) return key;
  return `${S3}/${key}`;
}

function isVideoKey(key) {
  if (!key) return false;
  return VIDEO_EXTS.some(ext => key.toLowerCase().includes(ext));
}

export default function FilmmakerHero({ filmmakerInfo, isEditMode, onChange, errors, clearError }) {
  const [isPhotoModalOpen, setIsPhotoModalOpen]   = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen]   = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  const bannerFile = filmmakerInfo?.new_banner_file;
  const bannerSrc = resolveUrl(
    bannerFile ? URL.createObjectURL(bannerFile) : filmmakerInfo?.bannerImg,
    emptyBanner
  );
  const isBannerVideo =
    filmmakerInfo?.new_banner_type === 'video' ||
    (!bannerFile && isVideoKey(filmmakerInfo?.bannerImg));

  const photoSrc = resolveUrl(
    filmmakerInfo?.new_picture_file
      ? URL.createObjectURL(filmmakerInfo.new_picture_file)
      : filmmakerInfo?.picture
  );

  const handlePhotoSave = (file) => {
    if (clearError) clearError('picture');
    onChange('new_picture_file', file);
    setIsPhotoModalOpen(false);
  };

  const handleBannerSave = ({ file, type }) => {
    if (clearError) clearError('bannerImg');
    onChange('new_banner_file', file);
    onChange('new_banner_type', type);
    setIsBannerModalOpen(false);
  };

  return (
    <>
      <div className="tw-w-full">

        {/*
          Outer wrapper is tw-relative so the photo can be absolutely positioned
          against it. The inner banner div handles its own overflow-hidden for
          the image crop — the photo lives OUTSIDE that div so it is never clipped.
        */}
        <div className="tw-relative" style={{ paddingBottom: PHOTO_OVERLAP }}>

          {/* ── Banner ── */}
          <div className="tw-relative tw-w-full tw-h-[280px] md:tw-h-[360px] tw-overflow-hidden tw-bg-[#280D41]">
            {isBannerVideo ? (
              <video
                src={bannerSrc}
                muted
                playsInline
                preload="metadata"
                className="tw-w-full tw-h-full tw-object-cover tw-opacity-60"
              />
            ) : (
              <img
                src={bannerSrc}
                alt="Filmmaker banner"
                className="tw-w-full tw-h-full tw-object-cover tw-opacity-60"
              />
            )}
            <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039] tw-via-transparent tw-to-transparent" />

            {/* Play button — only on video banners when not editing */}
            {isBannerVideo && !isEditMode && (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-transparent tw-border-none tw-cursor-pointer tw-group"
              >
                <div className="tw-flex tw-h-16 tw-w-16 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/20 tw-backdrop-blur-sm tw-border tw-border-white/30 tw-transition-all tw-duration-200 group-hover:tw-scale-110 group-hover:tw-bg-white/30">
                  <FontAwesomeIcon icon={faPlay} className="tw-text-white tw-text-xl tw-ml-1" />
                </div>
              </button>
            )}

            {isEditMode && (
              <button
                onClick={() => setIsBannerModalOpen(true)}
                className="tw-absolute tw-top-4 tw-right-4 tw-flex tw-items-center tw-gap-2 tw-bg-black/60 hover:tw-bg-black/80 tw-text-white tw-text-xs tw-font-bold tw-uppercase tw-px-4 tw-py-2 tw-rounded-lg tw-border tw-border-white/20 tw-transition-colors tw-cursor-pointer"
              >
                <FontAwesomeIcon icon={faCamera} />
                <span className="tw-hidden sm:tw-inline">Change Banner</span>
              </button>
            )}
          </div>

          {/* ── Profile photo — outside the overflow-hidden banner ── */}
          <div
            className="tw-absolute tw-left-6 md:tw-left-12 tw-group"
            style={{ bottom: 0 }}
            onClick={() => !isEditMode && setExpandedImage(photoSrc)}
          >
            <img
              src={photoSrc}
              alt={`${filmmakerInfo?.firstName} ${filmmakerInfo?.lastName}`}
              className={`tw-w-28 tw-h-28 md:tw-w-36 md:tw-h-36 tw-rounded-2xl tw-object-cover tw-border-4 tw-border-[#1E0039] tw-shadow-xl ${errors?.picture ? 'tw-border-red-500' : ''}`}
            />
            {isEditMode && (
              <div
                onClick={() => setIsPhotoModalOpen(true)}
                className="tw-absolute tw-inset-0 tw-rounded-2xl tw-bg-black/60 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
              >
                <FontAwesomeIcon icon={faCamera} className="tw-text-white tw-text-2xl" />
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateProfilePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onSave={handlePhotoSave}
      />

      <UpdateBannerModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        onSave={handleBannerSave}
      />

      {/* ──  expanded profile  ── */}
      {expandedImage && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[9999] tw-bg-[#0a0014]/95 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-p-4" 
          onClick={() => setExpandedImage(null)}
        >
          <button 
            className="tw-absolute tw-top-6 tw-right-6 tw-w-12 tw-h-12 tw-bg-black/50 tw-rounded-full tw-text-white tw-border-none tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
            onClick={() => setExpandedImage(null)}
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
          </button>
          <img 
            src={expandedImage} 
            alt="Fullscreen profile" 
            className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded-lg tw-shadow-2xl" 
          />
        </div>
      )}

      {/* ── Video lightbox modal ── */}
      {isVideoModalOpen && (
        <div
          className="tw-fixed tw-inset-0 tw-z-[1000] tw-flex tw-items-center tw-justify-center tw-bg-black/90 tw-backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="tw-absolute tw-top-4 tw-right-4 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/10 hover:tw-bg-white/20 tw-border-none tw-text-white tw-cursor-pointer tw-transition-colors tw-z-10"
          >
            <FontAwesomeIcon icon={faXmark} className="tw-text-lg" />
          </button>
          <video
            src={bannerSrc}
            controls
            autoPlay
            className="tw-max-w-[90vw] tw-max-h-[90vh] tw-rounded-lg tw-shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
