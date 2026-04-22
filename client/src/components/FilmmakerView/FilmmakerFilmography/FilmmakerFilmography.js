import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyBanner from '../../../images/empty_banner.jpeg';

const S3 = process.env.REACT_APP_AWS_URL;

function posterUrl(key) {
  if (!key || key === '') return emptyBanner;
  if (key.startsWith('http')) return key;
  return `${S3}/${key}`;
}

export default function FilmmakerFilmography({ epksList }) {
  const navigate = useNavigate();

  if (!epksList || epksList.length === 0) return null;

  return (
    <div className="tw-w-full tw-px-6 md:tw-px-12 tw-py-10 tw-border-t tw-border-[#5A3F49]/30">
      <h2 className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-6">
        Filmography
      </h2>

      <div className="tw-flex tw-gap-4 tw-overflow-x-auto tw-pb-4 custom-scrollbar">
        {epksList.map((epk) => (
          <button
            key={epk._id}
            onClick={() => navigate(`/epk/${epk._id}`)}
            className="tw-shrink-0 tw-group tw-bg-transparent tw-border-none tw-cursor-pointer tw-p-0 tw-text-left"
          >
            <div className="tw-relative tw-w-40 tw-aspect-[2/3] tw-rounded-xl tw-overflow-hidden tw-border tw-border-[#5A3F49]/60">
              <img
                src={posterUrl(epk.image_details)}
                alt={epk.title}
                className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-300 group-hover:tw-scale-105"
                onError={(e) => { if (e.target.src !== emptyBanner) e.target.src = emptyBanner; }}
              />
              <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-gradient-to-t tw-from-black/90 tw-to-transparent tw-p-3">
                <p className="tw-truncate tw-text-xs tw-font-bold tw-text-white tw-m-0">{epk.title}</p>
                {epk.productionYear && (
                  <p className="tw-text-[10px] tw-text-[#E2BDC9] tw-m-0 tw-mt-0.5">{epk.productionYear}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
