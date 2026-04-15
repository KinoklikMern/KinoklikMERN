import React, { useRef, useState, useEffect } from 'react';
import CastCard from '../EpkCast/CastCard';
import ActionPlaceholder from '../../common/ActionPlaceholder';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AddCastCrewModal from '../EpkDetail/AddCastCrewModal';
import http from '../../../http-common';

const getSafeId = (obj) => {
  if (!obj) return "null";
  if (typeof obj === 'string') return obj;
  if (obj._id) return String(obj._id);
  if (obj.id) return String(obj.id);
  return String(obj);
};

export default function EpkWorker({ epkInfo, isEditMode, onChange }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);

  const IMAGE_URL_PREFIX = `${process.env.REACT_APP_AWS_URL}`;

  const ownerId = getSafeId(epkInfo?.film_maker);
  const ownerData = epkInfo?.film_maker;
  
  // --- SMART ROUTING: Catch legacy non-actors from the actors array! ---
  const explicitCrew = (epkInfo?.crew || []).map(c => {
    const uData = (c.crewId && typeof c.crewId === 'object') ? c.crewId : c;
    return { ...uData, epkRole: c.epkRole ? c.epkRole.replace(/_/g, ' ') : (uData.role || "Crew") };
  });

  const legacyCrew = (epkInfo?.actors || []).filter(a => {
    const roleStr = String(a.role || "").toLowerCase();
    return !roleStr.includes('actor'); 
  }).map(a => ({ ...a, epkRole: a.role || "Crew" }));

  const combinedCrew = [...explicitCrew, ...legacyCrew];

  // Deduplicate and filter owner
  const uniqueCrewMap = new Map();
  combinedCrew.forEach(c => {
    const cId = getSafeId(c.crewId || c);
    const isUnpopulated = !c.firstName && !c.lastName;

    if (cId !== ownerId) {
      uniqueCrewMap.set(cId, {
        ...c,
        _id: cId,
        firstName: isUnpopulated ? "Refresh" : c.firstName,
        lastName: isUnpopulated ? "Required" : c.lastName,
      });
    }
  });

  let crewList = Array.from(uniqueCrewMap.values());

  if (ownerData && typeof ownerData === 'object') {
    crewList.unshift({
      ...ownerData,
      _id: ownerId,
      epkRole: 'Filmmaker'
    });
  }

  // --- MODAL & DATA LOGIC ---
  useEffect(() => {
    if (epkInfo?._id && epkInfo?.film_maker?._id) {
      http.get('/invitations/get-invitation-by-filmmaker-movie', {
        params: { movie: epkInfo._id, invitedBy: epkInfo.film_maker._id }
      })
      .then(res => setInvitations(res.data || []))
      .catch(err => console.log("Failed to fetch invitations:", err));
    }
  }, [epkInfo]);

  const invitedCast = invitations.filter(inv => (inv.role || "").toLowerCase() === 'actor');
  const invitedCrew = invitations.filter(inv => (inv.role || "").toLowerCase() !== 'actor');

  const normalizeAvatarData = (person, forceRole = null) => {
    if (!person) return {};
    let uData = person;
    let epkRole = forceRole || person.epkRole || person.role || "Crew";

    if (person.crewId) {
      uData = (typeof person.crewId === 'object') ? person.crewId : person;
      epkRole = person.epkRole || forceRole || "Crew";
    }

    const isUnpopulated = typeof uData === 'string' || (!uData.firstName && !uData.lastName && !uData.name && !uData.picture);
    let imageUrl = uData.picture || uData.image || person.image || "";
    if (imageUrl && !imageUrl.startsWith('http')) imageUrl = `${process.env.REACT_APP_AWS_URL}/${imageUrl}`;
    if (typeof epkRole === 'string') epkRole = epkRole.replace(/_/g, ' ');

    return {
      id: getSafeId(uData),
      image: imageUrl,
      name: isUnpopulated ? "Refresh Required" : (`${uData.firstName || ''} ${uData.lastName || ''}`.trim() || uData.name || "Unknown"),
      role: epkRole,
      reach: uData.audienceReach || uData.reach || 0,
      isOwner: forceRole === 'Creator',
      originalData: person 
    };
  };

  const rawActors = (epkInfo?.actors || []).filter(a => {
    const currentId = String(a._id || a.id || a);
    const roleStr = String(a.role || "").toLowerCase();
    return currentId !== ownerId && roleStr.includes('actor');
  });

  const handleAddMember = (user, category) => {
    if (category === 'cast') {
      const newActors = [...(epkInfo.actors || []), user];
      onChange && onChange('actors', newActors);
    } else {
      const formattedRole = user.role ? user.role.toLowerCase().replace(' ', '_') : 'crew';
      const newCrewMember = { crewId: user, epkRole: formattedRole };
      const newCrew = [...(epkInfo.crew || []), newCrewMember];
      onChange && onChange('crew', newCrew);
    }
  };

  const handleRemoveMember = (user, category) => {
    if (category === 'cast') {
      const newActors = (epkInfo.actors || []).filter(a => getSafeId(a) !== String(user.id));
      onChange && onChange('actors', newActors);
    } else {
      const newCrew = (epkInfo.crew || []).filter(c => getSafeId(c.crewId || c) !== String(user.id));
      onChange && onChange('crew', newCrew);
    }
  };

  const handleInviteMember = (inviteData, category) => {
    const updatedInvitationData = {
      ...inviteData,
      invitedByName: `${epkInfo.film_maker.firstName || ''} ${epkInfo.film_maker.lastName || ''}`.trim(),
      movieTitle: epkInfo.title,
      invitedBy: epkInfo.film_maker._id,
      movie: epkInfo._id,
      status: "Invited",
    };
    http.get('/invitations/get-invitation-by-filmmaker-movie-email', {
      params: { movie: epkInfo._id, invitedBy: epkInfo.film_maker._id, email: inviteData.email }
    }).then((response) => {
      if (response.data && response.data.length > 0) alert("An invitation for that project was already sent to this person.");
      else {
        http.post('/invitations/send-invitation', updatedInvitationData).then((res) => {
           setInvitations(prev => [...prev, { _id: res.data._id, ...updatedInvitationData }]);
           alert("Invitation sent successfully!");
        }).catch(err => console.error("Error sending invite:", err));
      }
    }).catch(err => console.error("Error checking existing invites:", err));
  };

  const handleRemoveInvite = (invite, category) => {
    http.delete('/invitations/delete-invitation', {
      data: { movie: epkInfo._id, invitedBy: epkInfo.film_maker._id, email: invite.email }
    }).then(() => {
      setInvitations(prev => prev.filter(i => i._id !== invite._id));
    }).catch(err => console.error("Error deleting invite:", err));
  };

  if (crewList.length === 0 && !isEditMode) return null;

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollPosition = sliderRef.current.scrollLeft;
    const cardWidth = sliderRef.current.children[0]?.offsetWidth || 280;
    const gap = 32; 
    const index = Math.round(scrollPosition / (cardWidth + gap));
    setActiveIndex(index);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 280;
      sliderRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 280;
      sliderRef.current.scrollBy({ left: (cardWidth + 32), behavior: 'smooth' });
    }
  };

  const totalCards = isEditMode ? crewList.length + 1 : crewList.length;

  return (
    <div className="tw-py-8 tw-mb-8 tw-bg-[#1E0039] tw-w-full">
      <div className="tw-relative tw-w-full tw-max-w-[1232px] tw-mx-auto tw-flex tw-flex-col tw-px-4 md:tw-px-0">
        
        <div className="tw-flex tw-flex-col tw-mb-8 md:tw-mb-10">
          <span className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-1">
            Key Creatives
          </span>
          <h2 className="tw-text-white tw-text-3xl md:tw-text-4xl tw-font-bold tw-tracking-tight tw-mb-2">
            {isEditMode ? "Edit Crew" : "Crew"}
          </h2>
          {isEditMode && (
            <p className="tw-text-[#DDB7FF] tw-text-sm md:tw-text-base tw-leading-relaxed tw-max-w-[672px] tw-mt-2 tw-mb-0">
              Manage your key crew members and production staff. Click "Add New Crew" to search your network or invite external staff via email.
            </p>
          )}
        </div>

        <div className="tw-relative tw-w-full">
          {(crewList.length > 0 || isEditMode) && (
            <>
              <button onClick={scrollLeft} className="tw-hidden md:tw-flex tw-absolute tw--left-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-shadow-[0_4px_15px_rgba(0,0,0,0.3)] tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/20 hover:tw-text-[#FF00A0] tw-transition-all tw-cursor-pointer">
                <FontAwesomeIcon icon={faChevronLeft} className="tw-text-2xl" />
              </button>
              <button onClick={scrollRight} className="tw-hidden md:tw-flex tw-absolute tw--right-6 tw-top-1/2 tw--translate-y-1/2 tw-z-20 tw-items-center tw-justify-center tw-w-14 tw-h-14 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-md tw-shadow-[0_4px_15px_rgba(0,0,0,0.3)] tw-border tw-border-white/20 tw-text-white hover:tw-bg-white/20 hover:tw-text-[#FF00A0] tw-transition-all tw-cursor-pointer">
                <FontAwesomeIcon icon={faChevronRight} className="tw-text-2xl" />
              </button>
            </>
          )}

          <div ref={sliderRef} onScroll={handleScroll} className="tw-flex tw-items-stretch tw-gap-8 tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-py-4 max-md:tw-px-[calc(50%-130px)] md:tw-px-0 [&::-webkit-scrollbar]:tw-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {isEditMode && (
              <ActionPlaceholder 
                variant="crewCard" 
                onClick={() => setIsModalOpen(true)}
                title="Add New Crew"
                subtitle="Assign Role & Bio"
                className="tw-shrink-0 tw-w-[260px] md:tw-w-[280px] tw-snap-center"
              />
            )}

            {crewList.map((crew) => (
              <CastCard
                key={crew._id}
                image={crew.picture?.startsWith('https') ? crew.picture : `${IMAGE_URL_PREFIX}/${crew.picture}`}
                bio={crew.aboutMe}
                castName={`${crew.firstName} ${crew.lastName}`}
                epkRole={crew.epkRole} 
                actorUrl={`/filmmaker/${crew._id}`}
                isDarkTheme={true} 
              />
            ))}
          </div>

          {totalCards > 1 && (
            <div className="tw-flex md:tw-hidden tw-justify-center tw-items-center tw-gap-3 tw-mt-4">
              {Array.from({ length: totalCards }).map((_, idx) => (
                <div key={idx} className={`tw-rounded-full tw-transition-all tw-duration-300 ${activeIndex === idx ? "tw-w-3.5 tw-h-3.5 tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#FF00A0]" : "tw-w-2 tw-h-2 tw-bg-white/40"}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCastCrewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentCast={rawActors.map(a => normalizeAvatarData(a, 'Actor'))}
        currentCrew={crewList.map(c => normalizeAvatarData(c))}
        invitedCast={invitedCast} 
        invitedCrew={invitedCrew} 
        ownerId={ownerId}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onInviteMember={handleInviteMember}
        onRemoveInvite={handleRemoveInvite}
      />
    </div>
  );
}