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


/**
 * Description placeholder
 *
 * @type {{ facebook: any; instagram: any; twitter: any; youtube: any; linkedin: any; tiktok: any; }}
 */
const ICONS = {
  facebook: faFacebookSquare,
  instagram: faInstagram,
  twitter: faTwitter,
  youtube: faYoutube,
  linkedin: faLinkedin,
  tiktok: faTiktok
};

/**
 * Description placeholder
 *
 * @export
 * @param {{ socials: any; iconColor?: string; }} param0 
 * @param {*} param0.socials 
 * @param {string} [param0.iconColor="#C4C4C4"] 
 */
export default function SocialMediaBar({ socials, iconColor = "#C4C4C4" }) {
  //Formatting function to convert large numbers into compact format (e.g., 1.2K, 3.4M)
  const formatCompactNumber = (number) => {
     if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
    }

  if (!socials || socials.length === 0) return null;

  return (
    <div className="tw-flex tw-items-center tw-justify-around tw-flex-wrap tw-w-full tw-gap-6">
      {socials.map((social, index) => {
        const url = social.url;
        const followers = parseInt(social.followers) || 0;

        // Skip rendering this specific platform if they have no URL and 0 followers
        if (!url && followers === 0) return null;

        return (
          <a
            key={index}
            href={url && url.startsWith("http") ? url : `https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            // Disable clicking if there is no URL provided
            className={`tw-flex tw-items-center tw-gap-2 ${!url ? "tw-pointer-events-none" : "hover:tw-opacity-70 tw-transition-opacity"}`}
          >
            <FontAwesomeIcon icon={ICONS[social.platform]} className="tw-text-3xl" style={{ color: iconColor }} />
            <span className="tw-text-lg tw-font-semibold" style={{ color: iconColor }}>
              {formatCompactNumber(followers)}
            </span>
          </a>
        );
      })}
    </div>
  );
}
};
//