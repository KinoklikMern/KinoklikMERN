import  { useState, useEffect } from 'react';
import ActionPlaceholder from '../../common/ActionPlaceholder';
import AddCastCrewModal from './AddCastCrewModal';
import http from '../../../http-common';
import { useTranslation } from 'react-i18next';

export default function EpkDetailCastAndCrew({ epkInfo, isEditMode, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const { t } = useTranslation();
  
  useEffect(() => {
    if (epkInfo?._id && epkInfo?.film_maker?._id) {
      http.get('/invitations/get-invitation-by-filmmaker-movie', {
        params: {
          movie: epkInfo._id,
          invitedBy: epkInfo.film_maker._id,
        }
      })
      .then(res => setInvitations(res.data || []))
      .catch(err => console.log("Failed to fetch invitations:", err));
    }
  }, [epkInfo]);

  const invitedCast = invitations.filter(inv => (inv.role || "").toLowerCase() === 'actor');
  const invitedCrew = invitations.filter(inv => (inv.role || "").toLowerCase() !== 'actor');

  const normalizeAvatarData = (person, forceRole = null) => {
    if (!person) return {};

    const isUnpopulated = typeof person === 'string' || typeof person.crewId === 'string';
    const userData = (person.crewId && typeof person.crewId === 'object') ? person.crewId : person;
    const fallbackId = typeof person === 'string' ? person : (person.crewId || null);

    let imageUrl = userData.picture || userData.image || person.image || "";
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${process.env.REACT_APP_AWS_URL}/${imageUrl}`;
    }

    let displayRole = forceRole || person.epkRole || userData.role || "Crew";
    if (typeof displayRole === 'string') {
      displayRole = displayRole.replace(/_/g, ' ');
    }

    return {
      id: String(userData._id || userData.id || fallbackId),
      image: imageUrl,
      name: isUnpopulated ? "Refresh Required" : (`${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.name || "Unknown"),
      role: displayRole,
      reach: userData.audienceReach || userData.reach || 0,
      isOwner: forceRole === 'Creator',
      originalData: person 
    };
  };

  const ownerData = epkInfo?.film_maker || {};
  const ownerId = String(ownerData._id || ownerData.id || ownerData);
  const owner = normalizeAvatarData(ownerData, 'Creator');
  
  // --- THE FIX: SMART LEGACY ROUTING ---
  // Pull non-actors out of the actors array
  const legacyCrew = (epkInfo?.actors || []).filter(a => !String(a.role || "").toLowerCase().includes('actor'));
  
  const rawCrew = [...(epkInfo?.crew || []), ...legacyCrew].filter(p => {
    const uData = (p.crewId && typeof p.crewId === 'object') ? p.crewId : p;
    const currentId = String(uData._id || uData.id || p.crewId || p);
    return currentId !== ownerId;
  });
  
  const rawActors = (epkInfo?.actors || []).filter(a => {
    const currentId = String(a._id || a.id || a);
    const roleStr = String(a.role || "").toLowerCase();
    return currentId !== ownerId && roleStr.includes('actor');
  });

  const scrollableCast = [
    ...rawCrew.filter(p => (p.epkRole || p.role)?.toLowerCase().includes('director')).map(p => normalizeAvatarData(p)).sort((a, b) => b.reach - a.reach),
    ...rawCrew.filter(p => (p.epkRole || p.role)?.toLowerCase().includes('producer')).map(p => normalizeAvatarData(p)).sort((a, b) => b.reach - a.reach),
    ...rawCrew.filter(p => !((p.epkRole || p.role)?.toLowerCase().includes('director')) && !((p.epkRole || p.role)?.toLowerCase().includes('producer'))).map(p => normalizeAvatarData(p)).sort((a, b) => b.reach - a.reach),
    ...rawActors.map(p => normalizeAvatarData(p, 'Actor')).sort((a, b) => b.reach - a.reach)
  ];

  const formatChars = (chars) => chars ? chars.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map(char => char.charAt(0).toUpperCase() + char.substring(1)).join(' ') : "";

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
      const newActors = (epkInfo.actors || []).filter(a => {
        const uData = (a.crewId && typeof a.crewId === 'object') ? a.crewId : a;
        const currentId = String(uData._id || uData.id || a);
        return currentId !== String(user.id);
      });
      onChange && onChange('actors', newActors);
    } else {
      const newCrew = (epkInfo.crew || []).filter(c => {
        const uData = (c.crewId && typeof c.crewId === 'object') ? c.crewId : c;
        const currentId = String(uData._id || uData.id || c.crewId || c);
        return currentId !== String(user.id); 
      });
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
      params: {
        movie: epkInfo._id,
        invitedBy: epkInfo.film_maker._id,
        email: inviteData.email,
      }
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        alert(t("An invitation for that project was already sent to this person."));
      } else {
        http.post('/invitations/send-invitation', updatedInvitationData)
        .then((res) => {
           setInvitations(prev => [...prev, { _id: res.data._id, ...updatedInvitationData }]);
           alert(t("Invitation sent successfully!"));
        })
        .catch(err => console.error("Error sending invite:", err));
      }
    })
    .catch(err => console.error("Error checking existing invites:", err));
  };

  const handleRemoveInvite = (invite, category) => {
    http.delete('/invitations/delete-invitation', {
      data: {
        movie: epkInfo._id,
        invitedBy: epkInfo.film_maker._id,
        email: invite.email
      }
    })
    .then(() => {
      setInvitations(prev => prev.filter(i => i._id !== invite._id));
    })
    .catch(err => console.error("Error deleting invite:", err));
  };

  const AvatarCard = ({ person }) => {
    const innerContent = (
      <>
        <div className={`tw-h-16 tw-w-16 md:tw-h-20 md:tw-w-20 tw-rounded-full tw-shadow-md tw-border-2 tw-border-transparent hover:tw-border-[#FF43A7] tw-transition-colors tw-flex tw-items-center tw-justify-center tw-overflow-hidden ${person.name === 'Refresh Required' ? 'tw-bg-red-500/20 tw-border-red-500/50' : 'tw-bg-[#371E51]'}`}>
          {person.image ? (
            <img src={person.image} alt={person.name} className="tw-w-full tw-h-full tw-object-cover" />
          ) : (
            <span className="tw-text-[#AA8894] tw-text-xs">?</span>
          )}
        </div>
        <div className="tw-text-center tw-mt-2 tw-max-w-[90px] md:tw-max-w-[100px]">
          <h3 className={`tw-text-xs md:tw-text-sm tw-font-bold tw-leading-tight tw-tracking-tight tw-truncate ${person.name === 'Refresh Required' ? 'tw-text-red-400' : 'tw-text-white'}`} title={person.name}>{person.name}</h3>
          <p className={`tw-text-[10px] md:tw-text-xs tw-mt-1 tw-uppercase tw-tracking-wider ${person.isOwner ? 'tw-text-[#FFB0CF]' : 'tw-text-[#AA8894]'}`}>{t(person.role?.toLowerCase()) || formatChars(person.role)}</p>
        </div>
      </>
    );

    if (isEditMode) {
      return (
        <div className="tw-flex tw-flex-col tw-items-center tw-shrink-0 tw-cursor-default tw-transition-opacity">
          {innerContent}
        </div>
      );
    }

    return (
      <a 
        href={`/${person.role.toLowerCase() === 'actor' ? 'actor' : 'filmmaker'}/${person.id}`} 
        className="tw-flex tw-flex-col tw-items-center tw-shrink-0 tw-no-underline hover:tw-opacity-80 tw-cursor-pointer tw-transition-opacity"
      >
        {innerContent}
      </a>
    );
  };

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-4">
      <h2 className="tw-text-[#FF43A7] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-px-2 md:tw-px-0">{t("Production Team")}</h2>
      
      <div className="tw-flex tw-flex-row tw-items-center tw-p-6 md:tw-p-[40px] tw-gap-4 md:tw-gap-[32px] tw-bg-[#280D41] tw-shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)] tw-rounded-[24px] tw-w-full">
        
        <div className="tw-shrink-0">
          <AvatarCard person={owner} />
        </div>

        {(scrollableCast.length > 0 || isEditMode) && (
          <div className="tw-h-12 md:tw-h-16 tw-w-px tw-bg-[#5A3F49] tw-shrink-0"></div>
        )}

        <div className="tw-flex tw-flex-1 tw-gap-4 md:tw-gap-6 tw-items-start tw-overflow-x-auto custom-scrollbar tw-pb-4 tw-pt-2">
          
          {isEditMode && (
            <ActionPlaceholder 
              variant="detailCircle" 
              onClick={() => setIsModalOpen(true)}
              title={t("Add Cast")}
              className="tw-shrink-0"
            />
          )}

          {scrollableCast.map((person, index) => <AvatarCard person={person} key={`${person.id}-${index}`} />)}
          
          {scrollableCast.length === 0 && !isEditMode && (
            <div className="tw-flex tw-h-16 md:tw-h-20 tw-items-center tw-text-[#AA8894] tw-text-sm tw-italic">
              {t("No additional team members added yet.")}
            </div>
          )}
        </div>
      </div>

      <AddCastCrewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentCast={rawActors.map(a => normalizeAvatarData(a, 'Actor'))}
        currentCrew={rawCrew.map(c => normalizeAvatarData(c))}
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