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

const BRAND_COLORS = {
  facebook: "#1877F2",  
  instagram: "#E4405F", 
  twitter: "#1DA1F2",   
  youtube: "#FF0000",   
  linkedin: "#0077B5",  
  tiktok: "#000000",
  audience: "#C4C4C4"   
};

const ICONS = {
  facebook: faFacebookSquare,
  instagram: faInstagram,
  twitter: faTwitter,
  youtube: faYoutube,
  linkedin: faLinkedin,
  tiktok: faTiktok
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

  // It is active if it has a URL OR if it is the Audience icon (which never has a URL)
  const isActive = !!url || isAudience;

  // Render the unclickable, greyed-out version for empty socials
  if (!isActive) {
    return (
      <div className={`${containerClass} tw-opacity-50 tw-pointer-events-none`}>
        {renderIcon()}
        <p className={textClass} style={{ color: "grey" }}>{followerNum || 0}</p>
      </div>
    );
  }

  // Render Audience Icon (Active, but not an <a> link)
  if (isAudience) {
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