import React, { useState, useRef, useEffect } from "react";
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
import emptyBanner from "../../../images/empty_banner.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export default function ResourceCard({ resourceInfo, fepkTitle }) {
  const [showMobileShare, setShowMobileShare] = useState(false);
  const shareContainerRef = useRef(null);

  const image_resource = resourceInfo.image ? `${process.env.REACT_APP_AWS_URL}/${resourceInfo.image}` : emptyBanner;
  const currentUrl = window.location.href.startsWith("http")
    ? window.location.href
    : `https://${window.location.href}`;
  const urlShare = `We are currently looking for ${resourceInfo.title} for our film ${fepkTitle}, please check our EPK on ${currentUrl}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareContainerRef.current && !shareContainerRef.current.contains(event.target)) {
        setShowMobileShare(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const ShareIcons = ({ size = 36 }) => (
    <>
      <FacebookShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <WhatsappShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
      <TwitterShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
        <TwitterIcon size={size} round />
      </TwitterShareButton>
      <LinkedinShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <EmailShareButton url={urlShare} className="hover:tw-scale-110 tw-transition-transform">
        <EmailIcon size={size} round />
      </EmailShareButton>
    </>
  );

  return (
    <div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col md:tw-flex-row tw-bg-white md:tw-bg-[#1E0039]/20 tw-border tw-border-gray-200 md:tw-border-none tw-rounded-[24px] md:tw-rounded-[32px] tw-p-4 md:tw-p-6">
      
      {/* Left: Image */}
      <div className="tw-w-full md:tw-w-[45%] tw-aspect-video tw-shrink-0">
        <img
          src={image_resource}
          className="tw-w-full tw-h-full tw-object-cover tw-rounded-[16px] md:tw-rounded-[24px] tw-shadow-md"
          alt={resourceInfo.title}
        />
      </div>

      {/* Right: Content */}
      <div className="tw-w-full md:tw-w-[55%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-[#1E0039] tw-pt-6 md:tw-pt-0 md:tw-px-8">
        
        <h3 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-center">
          {resourceInfo.title}
        </h3>

        <div 
          ref={shareContainerRef}
          className="tw-flex tw-flex-row tw-items-center tw-justify-between md:tw-justify-center tw-mt-4 md:tw-mt-4 tw-w-full tw-px-6 md:tw-px-0 tw-relative"
        >
          <p className="tw-text-sm md:tw-text-base tw-font-medium">
            {resourceInfo.time}
          </p>

          <button 
             onClick={() => setShowMobileShare(!showMobileShare)}
             className="md:tw-hidden tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-rounded-full tw-bg-[#1E0039] tw-text-white tw-shadow-md active:tw-scale-95 tw-transition-transform"
             aria-label="Share resource"
          >
             <FontAwesomeIcon icon={faShareNodes} size="sm" />
          </button>

          {showMobileShare && (
             <div className="md:tw-hidden tw-absolute tw-top-12 tw-right-4 tw-bg-white tw-shadow-xl tw-border tw-border-gray-100 tw-rounded-xl tw-p-3 tw-flex tw-gap-2 tw-z-10 tw-animate-fade-in-up">
                <ShareIcons size={32} />
             </div>
          )}
        </div>
        <p className="tw-text-sm md:tw-text-base tw-text-center tw-mt-4 md:tw-mt-6 tw-px-2">
          {resourceInfo.description}
        </p>

        <div className="tw-hidden md:tw-flex tw-justify-center tw-items-center tw-gap-3 tw-mt-8">
          <ShareIcons size={36} />
        </div>

      </div>
    </div>
  );
}