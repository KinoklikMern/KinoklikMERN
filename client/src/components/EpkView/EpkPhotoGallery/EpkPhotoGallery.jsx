/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
  { key: "posters", label: "Posters" },
  { key: "stills", label: "Stills" },
  { key: "behind", label: "Behind The Scene" },
  { key: "premieres", label: "Premieres" },
];

function EpkPhotoGallery({ epkInfo }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("posters");

  // Modal state (simple)
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

  const prev = () =>
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);

  const next = () => setSelectedIndex((i) => (i + 1) % images.length);

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

  // If category changes while modal is open, close it (simple & safe)
  useEffect(() => {
    setIsOpen(false);
  }, [activeCategory]);

  const selected = images && images.length > 0 ? images[selectedIndex] : null;

  return (
    <section className="tw-my-16 tw-block ">
      {/* Title */}
      <h2 className="tw-mb-6 tw-text-center tw-text-xl tw-font-bold tw-text-white sm:tw-text-2xl">
        PHOTO ALBUMS
      </h2>

      <div className="tw-rounded-[15px] tw-bg-white tw-p-2 sm:tw-p-5">
        <div className="tw-rounded-[15px] tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#712CB0] tw-py-4 tw-px-4 md:tw-py-8 md:tw-px-8 ">
          {/* Category Tabs */}
          <ul
            className="tw-mx-auto tw-flex tw-justify-between tw-rounded-[10px] md:tw-rounded-[25px] tw-border-[2px]
              tw-border-[#1E0039] tw-bg-[#ECF0F1] tw-p-[1px] md:tw-p-[2px]  sm:tw-w-3/4 sm:tw-mt-8 y"
          >
            {CATEGORIES.map((cat) => (
              <li
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`sm:tw-text-xl tw-rounded-[10px] md:tw-rounded-[25px]  tw-text-[8.9px] md:tw-font-bold tw-p-[1.5px] md:tw-p-[2px] tw-w-1/4 ${
                  activeCategory === cat.key
                    ? "tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] tw-text-white"
                    : "tw-text-[#1E0039]"
                }`}
              >
                <a href={`#${cat.label}`} className="tw-block tw-text-center">
                  {t(`${cat.label}`)}
                </a>
              </li>
            ))}
          </ul>

          {/* Gallery Wrapper */}
          <div className=" tw-overflow-visible tw-mt-14 md:tw-mt-40">
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
                      className="tw-relative tw-overflow-hidden tw-rounded-[25px] md:tw-rounded-[50px] tw-shadow-lg tw-transition hover:tw-scale-[1.07]"
                    >
                      <div className="tw-aspect-[3/4] md:tw-aspect-[2/3]">
                        <img
                          src={`${process.env.REACT_APP_AWS_URL}/${img.image}`}
                          alt=""
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

      {/* Modal  */}
      {isOpen && selected && (
        <div
          className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center"
          role="dialog"
          aria-modal="true"
          onClick={closeModal} // click outside to close
        >
          {/* Backdrop */}
          <div className=" tw-absolute tw-inset-0 tw-bg-[#1E0039]/70" />

          {/* Modal panel */}
          <div
            className="tw-m-10 tw-w-full tw-max-w-[520px]  "
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="tw-z-50 tw-absolute tw-right-3 tw-top-3 tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/10 tw-text-white tw-backdrop-blur hover:tw-bg-white/20"
            >
              ✕
            </button>

            {/* Image */}
            <div className="tw-relative  tw-bg-black/20">
              <img
                src={`${process.env.REACT_APP_AWS_URL}/${selected.image}`}
                alt=""
                className="tw-h-auto tw-w-full !tw-rounded-none tw-object-contain"
              />

              {/* Prev */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous"
                  className="tw-absolute tw-left-3 tw-top-1/2 tw-flex tw-h-10 tw-w-10 -tw-translate-y-1/2 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/10 tw-text-white tw-backdrop-blur hover:tw-bg-white/20"
                >
                  ‹
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next"
                  className="tw-absolute tw-right-3 tw-top-1/2 tw-flex tw-h-10 tw-w-10 -tw-translate-y-1/2 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/10 tw-text-white tw-backdrop-blur hover:tw-bg-white/20"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default EpkPhotoGallery;
