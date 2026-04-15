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
import { faShareNodes, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function ResourceCard({ resourceInfo, fepkTitle, isEditMode, onEditClick }) {
  const [showMobileShare, setShowMobileShare] = useState(false);
  const [showShareWarning, setShowShareWarning] = useState(false); 
  const shareContainerRef = useRef(null);

  const image_resource = resourceInfo.image ? (resourceInfo.image.startsWith('http') || resourceInfo.image.startsWith('blob:') ? resourceInfo.image : `${process.env.REACT_APP_AWS_URL}/${resourceInfo.image}`) : emptyBanner;
  
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

  const ShareIconWrapper = ({ children }) => (
    <div className="tw-w-10 tw-h-10 tw-rounded-full tw-border tw-border-[#490080]/20 tw-flex tw-items-center tw-justify-center tw-overflow-hidden hover:tw-border-[#490080] hover:tw-bg-[#490080]/5 tw-transition-all tw-cursor-pointer">
      {children}
    </div>
  );

  // Helper to conditionally render Real Share Buttons OR Disabled Dummy Buttons
  const ShareIcons = ({ size = 20 }) => {
    const renderShareContent = (ShareButtonComponent, IconComponent, platformName) => {
      // Edit Mode Safeguard: Render a visually identical dummy button that triggers our custom modal
      if (isEditMode) {
        return (
          <div 
            onClick={() => setShowShareWarning(true)}
            className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full tw-cursor-pointer"
          >
            <IconComponent size={size} bgStyle={{ fill: 'transparent' }} iconFillColor="#490080" />
          </div>
        );
      }

      //  View Mode: Render the real functional share button
      return (
        <ShareButtonComponent url={urlShare} className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full">
          <IconComponent size={size} bgStyle={{ fill: 'transparent' }} iconFillColor="#490080" />
        </ShareButtonComponent>
      );
    };

    return (
      <>
        <ShareIconWrapper>{renderShareContent(FacebookShareButton, FacebookIcon, "Facebook")}</ShareIconWrapper>
        <ShareIconWrapper>{renderShareContent(WhatsappShareButton, WhatsappIcon, "WhatsApp")}</ShareIconWrapper>
        <ShareIconWrapper>{renderShareContent(TwitterShareButton, TwitterIcon, "Twitter")}</ShareIconWrapper>
        <ShareIconWrapper>{renderShareContent(LinkedinShareButton, LinkedinIcon, "LinkedIn")}</ShareIconWrapper>
        <ShareIconWrapper>{renderShareContent(EmailShareButton, EmailIcon, "Email")}</ShareIconWrapper>
      </>
    );
  };

  return (
    <>
      <div className="tw-relative tw-w-full tw-bg-white tw-rounded-[32px] md:tw-rounded-[49px] tw-flex tw-flex-col md:tw-flex-row tw-overflow-hidden tw-shadow-xl">
        
        {/* Left: Image (Half Width on Desktop) */}
        <div className="tw-w-full md:tw-w-1/2 tw-aspect-video md:tw-aspect-auto md:tw-min-h-[420px] tw-shrink-0">
          <img
            src={image_resource}
            className="tw-w-full tw-h-full tw-object-cover"
            alt={resourceInfo.title}
          />
        </div>

        {/* Right: Content (Half Width on Desktop) */}
        <div className="tw-w-full md:tw-w-1/2 tw-flex tw-flex-col tw-justify-between tw-p-8 md:tw-p-[56px]">
          
          <div className="tw-flex tw-flex-col tw-gap-1">
            <h3 className="tw-font-bold tw-text-[26px] md:tw-text-[30px] tw-leading-tight tw-text-[#490080] tw-uppercase tw-m-0">
              {resourceInfo.title}
            </h3>
            <p className="tw-italic tw-font-medium tw-text-sm tw-text-[#490080]/75 tw-m-0 tw-mt-1">
              ({resourceInfo.time} {resourceInfo.time === 1 ? 'day' : 'days'} of filming)
            </p>
            
            <p className="tw-text-base md:tw-text-[18px] tw-leading-[29px] tw-text-[#490080]/90 tw-mt-4 md:tw-mt-6 tw-mb-8">
              {resourceInfo.description}
            </p>
          </div>

          {/* Share Section */}
          <div className="tw-flex tw-items-center tw-justify-between md:tw-justify-start tw-gap-3 tw-mt-auto tw-pt-4 md:tw-pt-8" ref={shareContainerRef}>
            
            <div className="tw-hidden md:tw-flex tw-items-center tw-gap-4">
              <ShareIcons size={24} />
            </div>

            <button 
                onClick={() => setShowMobileShare(!showMobileShare)}
                className="md:tw-hidden tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-border tw-border-[#490080]/20 tw-text-[#490080] active:tw-bg-[#490080]/10 tw-transition-colors"
            >
                <FontAwesomeIcon icon={faShareNodes} size="sm" />
            </button>

            {showMobileShare && (
                <div className="md:tw-hidden tw-absolute tw-bottom-20 tw-left-8 tw-bg-white tw-shadow-2xl tw-border tw-border-[#490080]/10 tw-rounded-xl tw-p-3 tw-flex tw-gap-3 tw-z-10 tw-animate-fade-in-up">
                  <ShareIcons size={24} />
                </div>
            )}
          </div>

        </div>

        {/* Edit Button Overlay */}
        {isEditMode && (
          <button 
            onClick={onEditClick}
            className="tw-absolute tw-top-6 tw-right-6 md:tw-top-8 md:tw-right-8 tw-w-12 tw-h-12 tw-bg-[#FFB0CF] hover:tw-bg-[#FF43A7] tw-text-[#490080] hover:tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-[0_4px_15px_rgba(255,176,207,0.5)] tw-transition-all tw-cursor-pointer tw-border-none tw-z-20"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="tw-text-lg" />
          </button>
        )}

      </div>

      {/*  CUSTOM SHARE WARNING MODAL */}
      {showShareWarning && (
        <div className="tw-fixed tw-inset-0 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-[#FF43A7]/40 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(255,67,167,0.2)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">Action Blocked</h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-8 tw-leading-relaxed">
              Sharing is disabled in Edit Mode to prevent accidentally sharing your private edit URL. Please Save and Exit to share your EPK.
            </p>
            <div className="tw-flex tw-justify-end">
              <button 
                onClick={() => setShowShareWarning(false)}
                className="tw-px-6 tw-py-2.5 tw-bg-[#FF43A7] hover:tw-bg-[#FF00A0] tw-rounded-lg tw-text-[#570033] tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}