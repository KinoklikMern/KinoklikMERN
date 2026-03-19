/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const CATEGORIES = [
  { key: "posters", label: "Posters" },
  { key: "stills", label: "Stills" },
  { key: "behind", label: "Behind The Scene" },
  { key: "premieres", label: "Premieres" },
];

function EpkPhotoGallery({ epkInfo }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("posters");

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Normalize backend data
  const albums = useMemo(() => {
    const pa = epkInfo?.photo_albums || {};
    return {
      posters: pa.posters || [],
      stills: pa.stills || [],
      behind: pa.behind || [],
      premieres: pa.premieres || [],
    };
  }, [epkInfo]);

  const images = albums[activeCategory];
  const enableScroll = images.length > 4;

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prev = (e) => {
    if(e) e.stopPropagation();
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e) => {
    if(e) e.stopPropagation();
    setSelectedIndex((i) => (i + 1) % images.length);
  };

  // Keyboard support (ESC, arrows) + lock body scroll when modal open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images.length]);

  // If category changes while modal is open, close it safely
  useEffect(() => {
    setIsOpen(false);
  }, [activeCategory]);

  const selected = images && images.length > 0 ? images[selectedIndex] : null;

  return (
    <section className="tw-my-16 tw-block tw-w-full">
      {/* Title */}
      <h2 className="tw-mb-6 tw-text-center tw-text-xl tw-font-bold tw-text-white sm:tw-text-2xl">
        PHOTO ALBUMS
      </h2>

      <div className="tw-rounded-[15px] tw-bg-white tw-p-2 sm:tw-p-5 tw-max-w-[1400px] tw-mx-auto">
        <div className="tw-rounded-[15px] tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#712CB0] tw-py-4 tw-px-4 md:tw-py-8 md:tw-px-8 ">
          
          {/* Category Tabs */}
          <ul
            className="tw-mx-auto tw-flex tw-justify-between tw-rounded-[10px] md:tw-rounded-[25px] tw-border-[2px]
              tw-border-[#1E0039] tw-bg-[#ECF0F1] tw-p-[1px] md:tw-p-[2px] sm:tw-w-3/4 sm:tw-mt-8"
          >
            {CATEGORIES.map((cat) => (
              <li
                key={cat.key}
                className="tw-w-1/4 tw-h-full"
              >
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`tw-w-full tw-h-full tw-rounded-[8px] md:tw-rounded-[23px] sm:tw-text-xl tw-text-[8.9px] md:tw-font-bold tw-p-[6px] md:tw-py-2 tw-transition-colors ${
                    activeCategory === cat.key
                      ? "tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white"
                      : "tw-text-[#1E0039] hover:tw-bg-gray-200"
                  }`}
                >
                  {t(`${cat.label}`)}
                </button>
              </li>
            ))}
          </ul>

          {/* Gallery Wrapper */}
          <div className="tw-overflow-visible tw-mt-10 md:tw-mt-16">
            {images.length === 0 ? (
              <div className="tw-flex tw-h-[300px] tw-items-center tw-justify-center">
                <p className="tw-text-sm tw-text-white/70">
                  No photos available in this category yet.
                </p>
              </div>
            ) : (
              <div
                className={`
                  ${enableScroll ? "custom-scrollbar tw-overflow-y-auto tw-pr-2" : ""}
                  ${enableScroll ? "tw-h-[clamp(260px,60vh,600px)] tw-min-h-[260px]" : ""}
                `}
              >
                <div className="tw-grid tw-grid-cols-3 tw-gap-2 md:tw-gap-6 md:tw-grid-cols-6 md:tw-pt-4 tw-pt-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openModal(index)}
                      className="tw-relative tw-overflow-hidden tw-rounded-[12px] md:tw-rounded-[24px] tw-shadow-lg tw-transition-transform hover:tw-scale-[1.05]"
                    >
                      <div className="tw-aspect-[3/4] md:tw-aspect-[2/3]">
                        <img
                          src={`${process.env.REACT_APP_AWS_URL}/${img.image}`}
                          alt="Gallery thumbnail"
                          className="tw-h-full tw-w-full tw-object-cover"
                          loading="lazy"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- CONSISTENT FULL-SCREEN MODAL --- */}
      {isOpen && selected && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-bg-black/90 tw-p-4" 
          onClick={closeModal}
        >
          {/* Close Button */}
          <button 
            className="tw-absolute tw-top-4 tw-right-6 tw-text-white tw-text-5xl hover:tw-text-[#FF00A0] tw-transition-colors tw-z-[101]"
            onClick={closeModal}
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* Prev Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="tw-absolute tw-left-2 md:tw-left-8 tw-top-1/2 -tw-translate-y-1/2 tw-z-[101] tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 md:tw-w-14 md:tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/30 hover:tw-text-[#FF00A0] tw-transition-all"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="tw-text-lg md:tw-text-2xl" />
            </button>
          )}

          {/* Image */}
          <img 
            src={`${process.env.REACT_APP_AWS_URL}/${selected.image}`}
            alt="Gallery Fullscreen" 
            className="tw-w-[90vw] tw-h-auto tw-max-h-[85vh] md:tw-w-auto md:tw-h-[85vh] md:tw-max-w-[85vw] tw-object-contain tw-rounded-[16px] tw-shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="tw-absolute tw-right-2 md:tw-right-8 tw-top-1/2 -tw-translate-y-1/2 tw-z-[101] tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 md:tw-w-14 md:tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/30 hover:tw-text-[#FF00A0] tw-transition-all"
            >
              <FontAwesomeIcon icon={faChevronRight} className="tw-text-lg md:tw-text-2xl" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default EpkPhotoGallery;