import React, { useRef, useState,useEffect } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const SocialShareModal = ({ isOpen, urlShare, closeModal }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [position, setPosition] = useState("top");
  const modalRef = useRef(null);
  
  const { t } = useTranslation();

  // Smart Positioning: Flip the modal if it hits the top of the screen
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      // If the top of the modal is less than 60px from the top of the screen...
      if (rect.top < 60) {
        setPosition("bottom"); // ...flip it to open downwards!
      } else {
        setPosition("top");
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(t("Copied!"));
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <>
    <div 
        className="tw-fixed tw-inset-0 tw-z-[9998]" 
        onClick={closeModal}
        aria-hidden="true"
      />
    <div
      ref={modalRef}
      className="tw-absolute tw-z-[1050] tw-w-[290px] md:tw-w-[350px] tw-rounded-[13px] tw-shadow-2xl tw-p-4 tw-border tw-border-white/20 tw-transition-opacity tw-duration-300 tw-opacity-100"
      style={{
        right: 0, 
        ...(position === "top"
          ? { bottom: "calc(100% + 15px)" } 
          : { top: "calc(100% + 15px)" }),
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Header & Close Button */}
      <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
        <h5 className="tw-font-bold tw-text-lg tw-text-[#1e0039] tw-w-full tw-text-center tw-m-0">
          {t('Share your EPK with the world!')}
        </h5>
        <button
          type="button"
          onClick={closeModal}
          className="tw-text-2xl tw-leading-none tw-text-gray-500 hover:tw-text-[#e81a84] tw-bg-transparent tw-border-none tw-cursor-pointer tw-absolute tw-right-4 tw-top-3"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Social Icons */}
      <div className="tw-flex tw-justify-between tw-mb-5">
        <FacebookShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <WhatsappShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <TwitterShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
        <EmailShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>

      {/* Copy Link Input */}
      <div className="tw-flex tw-w-full tw-bg-[#e6e2e2] tw-rounded tw-overflow-hidden">
        <input
          type="url"
          value={window.location.href}
          className="tw-flex-1 tw-bg-transparent tw-border-none tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 tw-outline-none"
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="tw-w-12 tw-flex tw-justify-center tw-items-center tw-bg-gray-300 hover:tw-bg-gray-400 tw-transition-colors tw-border-none tw-cursor-pointer"
        >
          <FontAwesomeIcon icon={faCopy} className="tw-text-gray-700" />
        </button>
      </div>

      {/* Success Message */}
      {copySuccess && (
        <div className="tw-text-center tw-text-sm tw-font-bold tw-text-[#e81a84] tw-mt-3">
          {copySuccess}
        </div>
      )}
    </div>
    </>
  );
};

export default SocialShareModal;