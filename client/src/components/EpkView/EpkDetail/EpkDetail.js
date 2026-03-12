import React from 'react';
import { useTranslation } from 'react-i18next';

const formatedDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export default function EpkDetail({ epkInfo }) {
  const { t } = useTranslation();

  // normalize the data for consistent display and easier handling
  const normalizeAvatarData = (person, forceRole = null) => {
    let imageUrl = person.picture || person.image || "";
    if (imageUrl && !imageUrl.startsWith('https')) {
      imageUrl = `${process.env.REACT_APP_AWS_URL}/${imageUrl}`;
    }

    return {
      id: person._id || person.id,
      image: imageUrl,
      name: `${person.firstName || ''} ${person.lastName || ''}`.trim() || person.crewId?.name || "Unknown",
      role: forceRole || person.epkRole || person.role || "Crew",
      reach: person.audienceReach || person.reach || 0, // Used strictly for backend sorting
      isOwner: forceRole === 'Filmmaker Owner',
    };
  };
  // Order: Owner -> Directors -> Producers -> Other Crew -> Actors (Each sorted internally by reach)
  const owner = normalizeAvatarData(epkInfo.film_maker, 'Filmmaker Owner');

  // Filter out the owner if they are accidentally listed in the crew array
  const rawCrew = (epkInfo.crew || []).filter(p => (p._id || p.id) !== owner.id);
  const rawActors = epkInfo.actors || [];

  const directors = rawCrew
    .filter(p => (p.epkRole || p.role)?.toLowerCase().includes('director'))
    .map(p => normalizeAvatarData(p))
    .sort((a, b) => b.reach - a.reach);

  const producers = rawCrew
    .filter(p => (p.epkRole || p.role)?.toLowerCase().includes('producer'))
    .map(p => normalizeAvatarData(p))
    .sort((a, b) => b.reach - a.reach);

  const otherCrew = rawCrew
    .filter(p => {
      const role = (p.epkRole || p.role)?.toLowerCase() || "";
      return !role.includes('director') && !role.includes('producer');
    })
    .map(p => normalizeAvatarData(p))
    .sort((a, b) => b.reach - a.reach);

  const actors = rawActors
    .map(p => normalizeAvatarData(p, 'Actor'))
    .sort((a, b) => b.reach - a.reach);

  // Combine everyone except the owner into the scrollable array
  const scrollableCast = [...directors, ...producers, ...otherCrew, ...actors];

  // Helper to format roles neatly
  const formatChars = (chars) => {
    if (!chars) return "";
    let noSpecialChars = chars.replace(/[^a-zA-Z0-9]/g, ' '); 
    return noSpecialChars
      .split(' ')
      .map((char) => char.charAt(0).toUpperCase() + char.substring(1))
      .join(' ');
  };

  // Avatar Card Component
  const AvatarCard = ({ person }) => {
    const profileUrl = `/${person.role.toLowerCase() === 'actor' ? 'actor' : 'filmmaker'}/${person.id}`;
    
    return (
      <a 
        href={profileUrl}
        className="tw-flex tw-flex-col tw-items-center tw-shrink-0 tw-no-underline hover:tw-opacity-80 tw-transition-opacity"
      >
        <img
          className="tw-h-16 tw-w-16 md:tw-h-20 md:tw-w-20 tw-rounded-full tw-object-cover tw-shadow-md tw-border-2 tw-border-transparent hover:tw-border-[#E81A84] tw-transition-colors"
          src={person.image}
          alt={person.name}
        />
        <div className="tw-text-center tw-mt-2 tw-max-w-[90px] md:tw-max-w-[100px]">
          <h3 className="tw-text-xs md:tw-text-sm tw-font-bold tw-leading-tight tw-tracking-tight tw-truncate tw-text-[#1E0039]" title={person.name}>
            {person.name}
          </h3>
          <p className={`tw-text-[10px] md:tw-text-xs tw-mt-1 ${person.isOwner ? 'tw-text-[#E81A84] tw-font-bold' : 'tw-text-gray-500'}`}>
            {formatChars(person.role)}
          </p>
        </div>
      </a>
    );
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-8 tw-rounded-lg tw-bg-white tw-px-4 tw-py-8 tw-text-[#1E0039] md:tw-px-8">
      
      {/* --- TOP SECTION: SPLIT CAROUSEL --- */}
      <div className="tw-flex tw-w-full tw-items-start tw-gap-4 tw-pb-2">
        
        {/* 1. Static Owner */}
        <AvatarCard person={owner} />

        {/* 2. Vertical Divider */}
        {scrollableCast.length > 0 && (
          <div className="tw-h-16 md:tw-h-20 tw-w-px tw-bg-gray-300 tw-shrink-0 tw-mt-1"></div>
        )}

        {/* 3. Scrollable Rest of Cast/Crew with custom sleek scrollbar */}
        <div 
          className="tw-flex tw-overflow-x-auto tw-gap-4 tw-items-start tw-w-full tw-pb-4 
                     [&::-webkit-scrollbar]:tw-h-1.5 
                     [&::-webkit-scrollbar-track]:tw-bg-gray-100 
                     [&::-webkit-scrollbar-track]:tw-rounded-full 
                     [&::-webkit-scrollbar-thumb]:tw-bg-[#D9D9D9] 
                     hover:[&::-webkit-scrollbar-thumb]:tw-bg-[#E81A84] 
                     [&::-webkit-scrollbar-thumb]:tw-rounded-full 
                     tw-transition-colors"
        >
          {scrollableCast.map((person, index) => (
            <AvatarCard person={person} key={`${person.id}-${index}`} />
          ))}
        </div>

      </div>

      <hr className="tw-border-gray-200 tw-my-0" />

      {/* --- BOTTOM SECTION: EPK DETAILS GRID --- */}
      <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-6 tw-gap-x-4">
        
        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Budget')}</p>
          <p className="tw-font-medium tw-text-sm">{epkInfo.budget || '-'}</p>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Produced Year')}</p>
          <p className="tw-font-medium tw-text-sm">{epkInfo.productionYear || '-'}</p>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Studio')}</p>
          <p className="tw-font-medium tw-text-sm">{epkInfo.productionCo || '-'}</p>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Duration')}</p>
          <p className="tw-font-medium tw-text-sm">{epkInfo.durationMin ? `${epkInfo.durationMin} ${t('Minutes')}` : '-'}</p>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Posted')}</p>
          <p className="tw-font-medium tw-text-sm">{formatedDate(epkInfo.createdAt)}</p>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Type / Genre')}</p>
          <p className="tw-font-medium tw-text-sm tw-capitalize">{epkInfo.genre || '-'}</p>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <p className="tw-text-xs tw-text-gray-500 tw-uppercase tw-tracking-wider">{t('Status')}</p>
          <p className="tw-font-medium tw-text-sm">{epkInfo.status || '-'}</p>
        </div>

      </div>
    </div>
  );
}