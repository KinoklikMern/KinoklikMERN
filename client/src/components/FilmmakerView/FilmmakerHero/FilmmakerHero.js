import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import emptyBanner from '../../../images/empty_banner.jpeg';
import UpdateProfilePhotoModal from './UpdateProfilePhotoModal';
import UpdateBannerModal from '../../EpkView/EpkCover/UpdateBannerModal';

const S3 = process.env.REACT_APP_AWS_URL;
const PHOTO_OVERLAP = 56; // px the photo bleeds below the banner bottom

function resolveUrl(key, fallback) {
  if (!key || key === '') return fallback || emptyBanner;
  if (key.startsWith('http') || key.startsWith('blob:')) return key;
  return `${S3}/${key}`;
}

export default function FilmmakerHero({ filmmakerInfo, isEditMode, onChange, errors, clearError }) {
  const [isPhotoModalOpen, setIsPhotoModalOpen]   = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const bannerSrc = resolveUrl(
    filmmakerInfo?.new_banner_file
      ? URL.createObjectURL(filmmakerInfo.new_banner_file)
      : filmmakerInfo?.bannerImg,
    emptyBanner
  );

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

  const handleBannerSave = ({ file }) => {
    if (clearError) clearError('bannerImg');
    onChange('new_banner_file', file);
    setIsBannerModalOpen(false);
  };

  const location = [filmmakerInfo?.city, filmmakerInfo?.province, filmmakerInfo?.country]
    .filter(Boolean)
    .join(', ');

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
            <img
              src={bannerSrc}
              alt="Filmmaker banner"
              className="tw-w-full tw-h-full tw-object-cover tw-opacity-60"
            />
            <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#1E0039] tw-via-transparent tw-to-transparent" />

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

        {/* ── Name / role / location — always fully below the banner ── */}
        <div className="tw-px-6 md:tw-px-12 tw-pt-4 tw-pb-8"
             style={{ paddingLeft: `calc(1.5rem + 112px + 1.5rem)` }}>
          <div className="tw-flex tw-flex-col tw-gap-2">

            {isEditMode ? (
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3">
                <input
                  type="text"
                  value={filmmakerInfo?.firstName || ''}
                  onChange={(e) => onChange('firstName', e.target.value)}
                  placeholder="First name"
                  className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors"
                />
                <input
                  type="text"
                  value={filmmakerInfo?.lastName || ''}
                  onChange={(e) => onChange('lastName', e.target.value)}
                  placeholder="Last name"
                  className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-font-bold tw-text-xl tw-outline-none tw-transition-colors"
                />
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
                <div className="tw-flex tw-gap-2">
                  <input
                    type="text"
                    value={filmmakerInfo?.city || ''}
                    onChange={(e) => onChange('city', e.target.value)}
                    placeholder="City"
                    className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-2 tw-py-1 tw-text-[#E2BDC9] tw-text-sm tw-outline-none tw-transition-colors tw-w-28"
                  />
                  <input
                    type="text"
                    value={filmmakerInfo?.country || ''}
                    onChange={(e) => onChange('country', e.target.value)}
                    placeholder="Country"
                    className="tw-bg-[#280D41] tw-border tw-border-[#5A3F49] focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-2 tw-py-1 tw-text-[#E2BDC9] tw-text-sm tw-outline-none tw-transition-colors tw-w-28"
                  />
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
    </>
  );
}
