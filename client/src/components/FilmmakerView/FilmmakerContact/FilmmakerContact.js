import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function ContactField({ icon, href, value, isEditMode, field, placeholder, type = 'text', onChange, error }) {
  if (isEditMode) {
    return (
      <div className="tw-flex tw-flex-col tw-gap-1">
        <div className="tw-flex tw-items-center tw-gap-3">
          <FontAwesomeIcon icon={icon} className="tw-text-[#FF43A7] tw-text-sm tw-w-4 tw-shrink-0" />
          <input
            type={type}
            value={value || ''}
            onChange={(e) => onChange(field, e.target.value)}
            placeholder={placeholder}
            className={`tw-flex-1 tw-bg-[#280D41] tw-border ${error ? 'tw-border-red-500' : 'tw-border-[#5A3F49]'} focus:tw-border-[#FF43A7] tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm tw-outline-none tw-transition-colors`}
          />
        </div>
        {error && <p className="tw-text-red-400 tw-text-xs tw-m-0 tw-pl-7">{error}</p>}
      </div>
    );
  }

  if (!value) return null;

  const content = (
    <span className="tw-flex tw-items-center tw-gap-3 tw-text-[#E2BDC9] tw-text-sm">
      <FontAwesomeIcon icon={icon} className="tw-text-[#FF43A7] tw-text-sm tw-w-4 tw-shrink-0" />
      <span className={href ? 'tw-text-[#FF43A7] hover:tw-underline' : ''}>{value}</span>
    </span>
  );

  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" className="tw-no-underline">{content}</a>
    : content;
}

export default function FilmmakerContact({ filmmakerInfo, isEditMode, onChange, errors }) {
  const hasAnyContact = filmmakerInfo?.website || filmmakerInfo?.email || filmmakerInfo?.phone;

  if (!isEditMode && !hasAnyContact) return null;

  return (
    <div className="tw-w-full tw-px-6 md:tw-px-12 tw-py-10 tw-border-t tw-border-[#5A3F49]/30">
      <h2 className="tw-text-[#FF43A7] tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-6">
        Contact
      </h2>

      <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-lg">
        <ContactField
          icon={faGlobe}
          href={filmmakerInfo?.website}
          value={filmmakerInfo?.website}
          isEditMode={isEditMode}
          field="website"
          placeholder="https://yourwebsite.com"
          type="url"
          onChange={onChange}
          error={errors?.website}
        />
        <ContactField
          icon={faEnvelope}
          href={filmmakerInfo?.email ? `mailto:${filmmakerInfo.email}` : null}
          value={filmmakerInfo?.email}
          isEditMode={isEditMode}
          field="email"
          placeholder="contact@email.com"
          type="email"
          onChange={onChange}
          error={errors?.email}
        />
        <ContactField
          icon={faPhone}
          value={filmmakerInfo?.phone}
          isEditMode={isEditMode}
          field="phone"
          placeholder="+1 (555) 000-0000"
          type="tel"
          onChange={onChange}
          error={errors?.phone}
        />
      </div>
    </div>
  );
}
