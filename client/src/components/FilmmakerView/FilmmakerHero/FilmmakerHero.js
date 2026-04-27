import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMapMarkerAlt, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
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

  const location = [filmmakerInfo?.city, filmmakerInfo?.province, filmmakerInfo?.country]
    .filter(Boolean)
    .join(', ');

  return (
    <>
      <div className="tw-w-full">

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

        {/* ── Photo + Name row — photo bleeds into banner via negative margin ── */}
        <div
          className="tw-flex tw-flex-row tw-items-center tw-px-6 md:tw-px-12 tw-gap-4 md:tw-gap-6 tw-pb-8"
          style={{ marginTop: `-${PHOTO_OVERLAP}px` }}
        >
          {/* Profile photo */}
          <div className="tw-relative tw-shrink-0 tw-z-10 tw-group">
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

          {/* Name / role / location */}
          <div className="tw-flex tw-flex-col tw-gap-2 tw-pt-[56px]">

            {isEditMode ? (
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3">
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <input
                    type="text"
                    value={filmmakerInfo?.firstName || ''}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    placeholder="First name"
                    className={`tw-bg-[#280D41] tw-border ${errors?.firstName ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors`}
                  />
                  {errors?.firstName && <p className="tw-text-red-400 tw-text-xs tw-m-0">{errors.firstName}</p>}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <input
                    type="text"
                    value={filmmakerInfo?.lastName || ''}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    placeholder="Last name"
                    className={`tw-bg-[#280D41] tw-border ${errors?.lastName ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors`}
                  />
                  {errors?.lastName && <p className="tw-text-red-400 tw-text-xs tw-m-0">{errors.lastName}</p>}
                </div>
              </div>
            ) : (
              <h1 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-m-0">
                {filmmakerInfo?.firstName} {filmmakerInfo?.lastName}
              </h1>
            )}

            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3">
              <span className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-bg-[#FF43A7]/10 tw-px-3 tw-py-1 tw-rounded-full">
                {filmmakerInfo?.role || 'Filmmaker'}
              </span>

              {isEditMode ? (
                <div className="tw-flex tw-gap-2 tw-items-start">
                  <div className="tw-flex tw-flex-col tw-gap-1">
                    <input
                      type="text"
                      value={filmmakerInfo?.city || ''}
                      onChange={(e) => onChange('city', e.target.value)}
                      placeholder="City"
                      className={`tw-bg-[#280D41] tw-border ${errors?.city ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-2 tw-py-1 tw-text-[#E2BDC9] tw-text-sm tw-outline-none tw-transition-colors tw-w-28`}
                    />
                    {errors?.city && <p className="tw-text-red-400 tw-text-xs tw-m-0">{errors.city}</p>}
                  </div>
                  <div className="tw-flex tw-flex-col tw-gap-1">
                    <input
                      type="text"
                      value={filmmakerInfo?.country || ''}
                      onChange={(e) => onChange('country', e.target.value)}
                      placeholder="Country"
                      className={`tw-bg-[#280D41] tw-border ${errors?.country ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-2 tw-py-1 tw-text-[#E2BDC9] tw-text-sm tw-outline-none tw-transition-colors tw-w-28`}
                    />
                    {errors?.country && <p className="tw-text-red-400 tw-text-xs tw-m-0">{errors.country}</p>}
                  </div>
                </div>
              ) : location ? (
                <span className="tw-flex tw-items-center tw-gap-1.5 tw-text-[#E2BDC9] tw-text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="tw-text-[#FF43A7] tw-text-xs" />
                  {location}
                </span>
              ) : null}
            </div>

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
