import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
  faYoutube,
  faLinkedin,
  faTiktok
} from "@fortawesome/free-brands-svg-icons";
import Audience from '../../../images/audienceIcon.svg';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const BRAND_COLORS = {
  facebook: "#C4C4C4",  
  instagram: "#C4C4C4", 
  twitter: "#C4C4C4",   
  youtube: "#C4C4C4",   
  linkedin: "#C4C4C4",  
  tiktok: "#C4C4C4",
  audience: "#C4C4C4",
  newsletter: "#C4C4C4"
};

const ICONS = {
  facebook: faFacebookSquare,
  instagram: faInstagram,
  twitter: faTwitter,
  youtube: faYoutube,
  linkedin: faLinkedin,
  tiktok: faTiktok,
  newsletter: faEnvelope
};

export default function SocialMediaIcon({ 
  platform, 
  followerNum, 
  color, 
  url,
  containerClass = 'tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-p-2 md:tw-p-0 tw-gap-1 md:tw-gap-2 tw-w-full md:tw-w-auto',
  iconClass = 'tw-h-6 tw-w-6 md:tw-h-8 md:tw-w-8',
  textClass = 'tw-text-sm md:tw-text-lg tw-font-semibold'
}) {
  const isAudience = platform?.toLowerCase() === "audience";
  const isNewsletter = platform?.toLowerCase() === "newsletter"; // <-- 1. Identify newsletter
  
  // 2. Group icons that don't need URLs
  const isStatOnlyIcon = isAudience || isNewsletter; 

  const selectedIcon = ICONS[platform?.toLowerCase()];
  const iconStyle = { color: color || BRAND_COLORS[platform?.toLowerCase()] || "#868585" };

  const renderIcon = () => {
    if (isAudience) {
      return <img src={Audience} alt="audience icon" className={iconClass} style={iconStyle} />;
    }
    if (selectedIcon) {
      return <FontAwesomeIcon className={iconClass} icon={selectedIcon} style={iconStyle} />;
    }
    return null;
  };

  // It is active if it has a URL OR if it is a Stat-Only icon
  const isActive = !!url || isStatOnlyIcon;

  // Render the unclickable, greyed-out version for empty socials
  if (!isActive) {
    return (
      <div className={`${containerClass} tw-opacity-50 tw-pointer-events-none`}>
        {renderIcon()}
        <p className={textClass} style={{ color: "grey" }}>{followerNum || 0}</p>
      </div>
    );
  }

  //Render Stat-Only Icons (Audience & Newsletter) -> White text, no link
  if (isStatOnlyIcon) {
    return (
      <div className={containerClass}>
        {renderIcon()}
        <p className={textClass} style={{ color: "white" }}>{followerNum || 0}</p>
      </div>
    );
  }

  // Render Normal Clickable Social Link
  return (
    <a 
      href={url.startsWith('http') ? url : `https://${url}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${containerClass} hover:tw-opacity-70 tw-transition-opacity`}
    >
      {renderIcon()}
      <p className={textClass} style={{ color: "white" }}>{followerNum}</p>
    </a>
  );
}