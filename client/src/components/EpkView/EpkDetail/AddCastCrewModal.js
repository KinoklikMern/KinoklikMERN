import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faXmark, faUser, faVideo, faEnvelope, faPaperPlane, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import http from '../../../http-common';

export default function AddCastCrewModal({ 
  isOpen, 
  onClose, 
  currentCast = [], 
  currentCrew = [], 
  invitedCast = [], 
  invitedCrew = [], 
  ownerId, // <--- ACCEPT THE OWNER ID
  onAddMember, 
  onRemoveMember,
  onInviteMember,
  onRemoveInvite
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isInviteMode, setIsInviteMode] = useState(false);
  const [inviteData, setInviteData] = useState({ firstName: '', lastName: '', email: '', role: '' });
  const [inviteError, setInviteError] = useState("");

  const [mobileSelectedForDelete, setMobileSelectedForDelete] = useState(null);

  const epkRoles = ["Actor", "Director", "Producer", "Cinematographer", "Editor", "Writer", "Sound"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      http.get("/users/getallusers")
        .then((response) => {
          setAllUsers(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setIsLoading(false);
        });
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery("");
      setSearchResults([]);
      setIsInviteMode(false);
      setMobileSelectedForDelete(null);
      setInviteData({ firstName: '', lastName: '', email: '', role: '' });
    }
    
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsInviteMode(false);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = allUsers.filter((user) => {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
      const email = user.email ? user.email.toLowerCase() : "";
      return fullName.includes(lowerQuery) || email.includes(lowerQuery);
    });

    const formattedResults = filtered.map((u) => {
      // THE FIX: Strict String Matches
      const isCast = currentCast.some(c => String(c.id || c._id) === String(u._id));
      const isCrew = currentCrew.some(c => String(c.id || c._id) === String(u._id));
      const isInvitedCast = invitedCast.some(c => c.email === u.email);
      const isInvitedCrew = invitedCrew.some(c => c.email === u.email);
      const isOwner = String(u._id) === String(ownerId); // Block the owner!
      
      let imageUrl = u.picture || "";
      if (imageUrl && !imageUrl.startsWith('http')) imageUrl = `${process.env.REACT_APP_AWS_URL}/${imageUrl}`;

      return {
        ...u,
        id: u._id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown User',
        role: u.role || 'User', 
        image: imageUrl,
        alreadyAdded: isCast || isCrew || isOwner, // Owner is shown as "ADDED"
        alreadyInvited: isInvitedCast || isInvitedCrew
      };
    });

    setSearchResults(formattedResults);
  }, [searchQuery, allUsers, currentCast, currentCrew, invitedCast, invitedCrew, ownerId]);

  const handleAddClick = (user) => {
    const roleLower = (user.role || "").toLowerCase();
    const category = roleLower.includes('actor') ? 'cast' : 'crew';
    if (onAddMember) onAddMember(user, category);
  };

  const handleInviteSubmit = () => {
    setInviteError("");
    if (!inviteData.firstName || !inviteData.lastName || !inviteData.email || !inviteData.role) {
      setInviteError("Please fill out all fields.");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(inviteData.email)) {
      setInviteError("Please enter a valid email.");
      return;
    }
    const userExists = allUsers.find((user) => user.email.toLowerCase() === inviteData.email.toLowerCase());
    if (userExists) {
      setInviteError(`User with that email is already registered as: ${userExists.firstName} ${userExists.lastName}. Please search for their name instead.`);
      return;
    }
    const category = inviteData.role.toLowerCase() === 'actor' ? 'cast' : 'crew';
    if (onInviteMember) {
      onInviteMember(inviteData, category);
      setIsInviteMode(false);
      setInviteData({ firstName: '', lastName: '', email: '', role: '' });
      setSearchQuery("");
    }
  };

  const handleMobileCardClick = (e, id) => {
    e.stopPropagation();
    setMobileSelectedForDelete(prev => prev === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-[#190033]/90 tw-backdrop-blur-md md:tw-p-4">
      {/* MOBILE FULL-SCREEN VIEW (md:tw-hidden)                                    */}
      <div 
        className="tw-flex md:tw-hidden tw-flex-col tw-w-full tw-h-full tw-bg-[#1F0439] tw-overflow-y-auto custom-scrollbar tw-p-6 tw-pt-12 tw-relative"
        onClick={() => setMobileSelectedForDelete(null)}
      >
        
        <button onClick={onClose} className="tw-absolute tw-top-6 tw-right-6 tw-text-[#FF43A7] hover:tw-bg-[#371E51] tw-p-2 tw-rounded-full tw-transition-all tw-bg-transparent tw-border-none tw-cursor-pointer tw-z-50">
          <FontAwesomeIcon icon={faXmark} className="tw-text-2xl" />
        </button>

        <h1 className="tw-font-bold tw-text-2xl tw-text-[#FF43A7] tw-tracking-tight tw-mb-8">Cast & Crew</h1>

        {/* SEARCH SECTION */}
        <section className="tw-mb-10">
          <label className="tw-text-[#FFB0CF] tw-text-[10px] tw-uppercase tw-tracking-[0.2em] tw-mb-2 tw-block tw-ml-1">Talent Discovery</label>
          <div className="tw-relative tw-w-full tw-mb-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talent pool..."
              disabled={isLoading || isInviteMode}
              className="tw-w-full tw-bg-[#280D41] tw-border-2 tw-border-dashed tw-border-[#FF43A7]/40 tw-rounded-xl tw-px-5 tw-py-4 tw-text-white placeholder:tw-text-[#AA8894] focus:tw-outline-none focus:tw-border-[#FF43A7] tw-transition-all"
            />
            <FontAwesomeIcon icon={faSearch} className="tw-absolute tw-right-5 tw-top-1/2 -tw-translate-y-1/2 tw-text-[#FF43A7]" />
          </div>

          {isInviteMode ? (
            <div className="tw-bg-[#371E51]/40 tw-border tw-border-[#5A3F49]/40 tw-rounded-xl tw-p-4" onClick={(e) => e.stopPropagation()}>
              <div className="tw-flex tw-justify-between tw-mb-4">
                <h3 className="tw-text-[#FFB0CF] tw-text-sm tw-font-bold"><FontAwesomeIcon icon={faEnvelope}/> Invite User</h3>
                <button onClick={() => setIsInviteMode(false)} className="tw-text-[#AA8894] tw-bg-transparent tw-border-none tw-underline tw-text-xs">Cancel</button>
              </div>
              <div className="tw-flex tw-gap-2 tw-mb-3">
                <input type="text" placeholder="First Name" value={inviteData.firstName} onChange={(e) => setInviteData({...inviteData, firstName: e.target.value})} className="tw-w-1/2 tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#FF43A7]" />
                <input type="text" placeholder="Last Name" value={inviteData.lastName} onChange={(e) => setInviteData({...inviteData, lastName: e.target.value})} className="tw-w-1/2 tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#FF43A7]" />
              </div>
              <input type="email" placeholder="Email" value={inviteData.email} onChange={(e) => setInviteData({...inviteData, email: e.target.value})} className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-mb-3 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#FF43A7]" />
              <select value={inviteData.role} onChange={(e) => setInviteData({...inviteData, role: e.target.value})} className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-mb-4 tw-text-white tw-text-sm focus:tw-outline-none focus:tw-border-[#FF43A7]">
                <option value="" disabled>Select Role</option>
                {epkRoles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {inviteError && <p className="tw-text-red-400 tw-text-xs tw-mb-3">{inviteError}</p>}
              <button onClick={handleInviteSubmit} className="tw-w-full tw-bg-[#FF43A7] tw-text-[#570033] tw-font-bold tw-py-3 tw-rounded-lg tw-border-none">Send Invitation</button>
            </div>
          ) : (
            searchResults.length > 0 && (
              <div className="tw-bg-[#280D41] tw-rounded-2xl tw-p-1 tw-space-y-1" onClick={(e) => e.stopPropagation()}>
                {searchResults.map((user) => (
                  <div key={user.id} className="tw-flex tw-items-center tw-justify-between tw-p-3 hover:tw-bg-[#371E51] tw-rounded-xl tw-transition-colors">
                    <div className="tw-flex tw-items-center tw-gap-4">
                      <div className="tw-w-10 tw-h-10 tw-rounded-full tw-overflow-hidden tw-border tw-border-[#FFB0CF]/20 tw-bg-[#190033] tw-flex tw-items-center tw-justify-center">
                        {user.image ? <img src={user.image} alt={user.name} className="tw-w-full tw-h-full tw-object-cover" /> : <FontAwesomeIcon icon={faUser} className="tw-text-[#AA8894]/50" />}
                      </div>
                      <div>
                        <p className="tw-font-bold tw-text-white tw-text-sm">{user.name}</p>
                        <p className="tw-text-[10px] tw-text-[#DDB7FF]/70 tw-uppercase tw-tracking-wider">{user.role}</p>
                      </div>
                    </div>
                    {user.alreadyAdded || user.alreadyInvited ? (
                       <span className="tw-text-[#FFB0CF]/50 tw-text-[10px] tw-uppercase tw-font-bold">Added</span>
                    ) : (
                      <button onClick={() => handleAddClick(user)} className="tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#FF43A7] tw-text-[#63003B] tw-border-none tw-shadow-[0_0_10px_rgba(255,67,167,0.3)] tw-cursor-pointer">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
          {searchQuery && searchResults.length === 0 && !isLoading && !isInviteMode && (
            <button onClick={(e) => { e.stopPropagation(); setIsInviteMode(true); setInviteData({...inviteData, email: searchQuery.includes('@') ? searchQuery : ''}); }} className="tw-w-full tw-mt-2 tw-bg-transparent tw-border tw-border-[#FF43A7] tw-text-[#FFB0CF] tw-py-3 tw-rounded-xl tw-text-sm tw-font-bold tw-cursor-pointer">
              Invite "{searchQuery}" via Email
            </button>
          )}
        </section>

        {/* MOBILE CAST SECTION */}
        <section className="tw-mb-10">
          <div className="tw-flex tw-items-baseline tw-gap-3 tw-mb-4">
            <h2 className="tw-font-bold tw-text-2xl tw-tracking-tighter tw-text-white">CAST</h2>
            <span className="tw-h-[2px] tw-flex-grow tw-bg-gradient-to-r tw-from-[#FF43A7]/30 tw-to-transparent"></span>
          </div>
          <div className="tw-flex tw-overflow-x-auto custom-scrollbar tw-gap-6 tw-py-2 -tw-mx-6 tw-px-6">
            
            {currentCast.map((member, idx) => {
              const uId = member.id || member._id || `cast-${idx}`;
              const isSelected = mobileSelectedForDelete === uId;
              
              return (
                <div key={idx} onClick={(e) => handleMobileCardClick(e, uId)} className="tw-flex-shrink-0 tw-w-20 tw-text-center tw-space-y-2 tw-relative tw-cursor-pointer">
                  <div className="tw-w-20 tw-h-20 tw-rounded-full tw-p-1 tw-bg-gradient-to-tr tw-from-[#FFB0CF] tw-to-[#DDB7FF]/20 tw-relative">
                    <div className="tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-[#1F0439] tw-bg-[#371E51] tw-flex tw-items-center tw-justify-center">
                      {member.image ? <img src={member.image} alt={member.name} className="tw-w-full tw-h-full tw-object-cover" /> : <FontAwesomeIcon icon={faUser} className="tw-text-[#AA8894]/50 tw-text-xl" />}
                    </div>
                    {isSelected && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveMember && onRemoveMember(member, 'cast');
                          setMobileSelectedForDelete(null);
                        }}
                        className="tw-absolute tw-inset-1 tw-bg-red-600/90 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-z-20 tw-border-none tw-cursor-pointer hover:tw-bg-red-500 tw-transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="tw-text-white tw-text-2xl" />
                      </button>
                    )}
                  </div>
                  <div className="tw-space-y-0.5">
                    <p className="tw-font-bold tw-text-xs tw-text-white tw-truncate">{member.name}</p>
                    <p className="tw-text-[9px] tw-text-[#FFB0CF] tw-uppercase tw-truncate">{member.role}</p>
                  </div>
                </div>
              );
            })}
            
            {invitedCast.map((invite, idx) => {
              const uId = invite.email || invite._id || `inv-cast-${idx}`;
              const isSelected = mobileSelectedForDelete === uId;

              return (
                <div key={`inv-${idx}`} onClick={(e) => handleMobileCardClick(e, uId)} className="tw-flex-shrink-0 tw-w-20 tw-text-center tw-space-y-2 tw-relative tw-cursor-pointer">
                  <div className="tw-w-20 tw-h-20 tw-rounded-full tw-p-1 tw-bg-yellow-500/30 tw-relative">
                    <div className="tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-[#1F0439] tw-bg-[#371E51] tw-flex tw-items-center tw-justify-center">
                      <span className="tw-text-[8px] tw-text-yellow-500/80 tw-uppercase tw-font-bold tw-tracking-tighter">Invited</span>
                    </div>
                    {isSelected && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveInvite && onRemoveInvite(invite, 'cast');
                          setMobileSelectedForDelete(null);
                        }}
                        className="tw-absolute tw-inset-1 tw-bg-red-600/90 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-z-20 tw-border-none tw-cursor-pointer hover:tw-bg-red-500 tw-transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="tw-text-white tw-text-2xl" />
                      </button>
                    )}
                  </div>
                  <div className="tw-space-y-0.5">
                    <p className="tw-font-bold tw-text-xs tw-text-white tw-truncate">{invite.firstName}</p>
                    <p className="tw-text-[9px] tw-text-yellow-500/70 tw-uppercase tw-truncate">Pending</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* MOBILE CREW SECTION */}
        <section className="tw-mb-10">
          <div className="tw-flex tw-items-baseline tw-gap-3 tw-mb-4">
            <h2 className="tw-font-bold tw-text-2xl tw-tracking-tighter tw-text-white">CREW</h2>
            <span className="tw-h-[2px] tw-flex-grow tw-bg-gradient-to-r tw-from-[#DDB7FF]/30 tw-to-transparent"></span>
          </div>
          <div className="tw-flex tw-overflow-x-auto custom-scrollbar tw-gap-6 tw-py-2 -tw-mx-6 tw-px-6">
            
            {currentCrew.map((member, idx) => {
              const uId = member.id || member._id || `crew-${idx}`;
              const isSelected = mobileSelectedForDelete === uId;

              return (
                <div key={idx} onClick={(e) => handleMobileCardClick(e, uId)} className="tw-flex-shrink-0 tw-w-20 tw-text-center tw-space-y-2 tw-relative tw-cursor-pointer">
                  <div className="tw-w-20 tw-h-20 tw-rounded-full tw-p-1 tw-bg-gradient-to-tr tw-from-[#DDB7FF] tw-to-[#FFB0CF]/20 tw-relative">
                    <div className="tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-[#1F0439] tw-bg-[#371E51] tw-flex tw-items-center tw-justify-center">
                      {member.image ? <img src={member.image} alt={member.name} className="tw-w-full tw-h-full tw-object-cover" /> : <FontAwesomeIcon icon={faUser} className="tw-text-[#AA8894]/50 tw-text-xl" />}
                    </div>
                    {isSelected && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveMember && onRemoveMember(member, 'crew');
                          setMobileSelectedForDelete(null);
                        }}
                        className="tw-absolute tw-inset-1 tw-bg-red-600/90 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-z-20 tw-border-none tw-cursor-pointer hover:tw-bg-red-500 tw-transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="tw-text-white tw-text-2xl" />
                      </button>
                    )}
                  </div>
                  <div className="tw-space-y-0.5">
                    <p className="tw-font-bold tw-text-xs tw-text-white tw-truncate">{member.name}</p>
                    <p className="tw-text-[9px] tw-text-[#DDB7FF] tw-uppercase tw-truncate">{member.role}</p>
                  </div>
                </div>
              );
            })}

            {invitedCrew.map((invite, idx) => {
              const uId = invite.email || invite._id || `inv-crew-${idx}`;
              const isSelected = mobileSelectedForDelete === uId;

              return (
                <div key={`inv-${idx}`} onClick={(e) => handleMobileCardClick(e, uId)} className="tw-flex-shrink-0 tw-w-20 tw-text-center tw-space-y-2 tw-relative tw-cursor-pointer">
                  <div className="tw-w-20 tw-h-20 tw-rounded-full tw-p-1 tw-bg-yellow-500/30 tw-relative">
                    <div className="tw-w-full tw-h-full tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-[#1F0439] tw-bg-[#371E51] tw-flex tw-items-center tw-justify-center">
                      <span className="tw-text-[8px] tw-text-yellow-500/80 tw-uppercase tw-font-bold tw-tracking-tighter">Invited</span>
                    </div>
                    {isSelected && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveInvite && onRemoveInvite(invite, 'crew');
                          setMobileSelectedForDelete(null);
                        }}
                        className="tw-absolute tw-inset-1 tw-bg-red-600/90 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-z-20 tw-border-none tw-cursor-pointer hover:tw-bg-red-500 tw-transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="tw-text-white tw-text-2xl" />
                      </button>
                    )}
                  </div>
                  <div className="tw-space-y-0.5">
                    <p className="tw-font-bold tw-text-xs tw-text-white tw-truncate">{invite.firstName}</p>
                    <p className="tw-text-[9px] tw-text-yellow-500/70 tw-uppercase tw-truncate">{invite.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
      {/* DESKTOP MODAL VIEW (hidden md:tw-flex)                                    */}
      <div className="tw-hidden md:tw-flex tw-relative tw-w-full tw-max-w-[1024px] tw-h-[640px] tw-bg-[#280D41] tw-border tw-border-[#5A3F49]/30 tw-shadow-[0_30px_60px_rgba(0,0,0,0.8)] tw-rounded-2xl tw-flex-row tw-overflow-hidden">
        
        <button onClick={onClose} className="tw-absolute tw-top-4 tw-right-4 tw-z-50 tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-bg-black/20 hover:tw-bg-[#FF43A7] tw-text-white tw-rounded-full tw-transition-colors tw-border-none tw-cursor-pointer">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* LEFT COLUMN: SEARCH & INVITE */}
        <div className="tw-w-[40%] tw-h-full tw-p-8 tw-border-r tw-border-[#5A3F49]/20 tw-flex tw-flex-col">
          
          <div className="tw-flex tw-flex-col tw-mb-6">
            <span className="tw-text-[#FFB0CF] tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-mb-2">Management Suite</span>
            <h1 className="tw-text-white tw-text-3xl tw-font-extrabold tw-tracking-tight tw-m-0">Search Cast & Crew</h1>
          </div>

          <div className="tw-relative tw-w-full tw-mb-4">
            <div className="tw-absolute tw-left-5 tw-top-1/2 -tw-translate-y-1/2 tw-text-[#FFB0CF]/60">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isLoading ? "Loading users..." : "Start typing name or email..."}
              disabled={isLoading || isInviteMode}
              className="tw-w-full tw-bg-[#190033] tw-border-2 tw-border-dashed tw-border-[#FFB0CF]/40 tw-rounded-xl tw-py-4 tw-pl-12 tw-pr-4 tw-text-white tw-text-base tw-outline-none placeholder:tw-text-[#AA8894]/60 focus:tw-border-[#FF43A7] tw-transition-colors disabled:tw-opacity-50"
            />
          </div>

          {isInviteMode ? (
            <div className="tw-flex-1 tw-flex tw-flex-col tw-bg-[#371E51]/40 tw-border tw-border-[#5A3F49]/40 tw-rounded-xl tw-p-4">
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <h3 className="tw-text-[#FFB0CF] tw-text-sm tw-font-bold tw-m-0"><FontAwesomeIcon icon={faEnvelope} className="tw-mr-2"/> Invite via Email</h3>
                <button onClick={() => setIsInviteMode(false)} className="tw-text-[#AA8894] hover:tw-text-white tw-bg-transparent tw-border-none tw-cursor-pointer tw-text-xs tw-underline">Cancel</button>
              </div>
              
              <div className="tw-flex tw-gap-2 tw-mb-3">
                <input type="text" placeholder="First Name" value={inviteData.firstName} onChange={(e) => setInviteData({...inviteData, firstName: e.target.value})} className="tw-w-1/2 tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7]" />
                <input type="text" placeholder="Last Name" value={inviteData.lastName} onChange={(e) => setInviteData({...inviteData, lastName: e.target.value})} className="tw-w-1/2 tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7]" />
              </div>
              <input type="email" placeholder="Email Address" value={inviteData.email} onChange={(e) => setInviteData({...inviteData, email: e.target.value})} className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-mb-3 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7]" />
              <select value={inviteData.role} onChange={(e) => setInviteData({...inviteData, role: e.target.value})} className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-3 tw-py-2 tw-mb-4 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] tw-appearance-none">
                <option value="" disabled>Select Role</option>
                {epkRoles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              
              {inviteError && <p className="tw-text-red-400 tw-text-xs tw-mb-3">{inviteError}</p>}
              
              <button onClick={handleInviteSubmit} className="tw-w-full tw-bg-[#FF43A7] hover:tw-bg-[#ff5cac] tw-text-[#570033] tw-font-bold tw-py-3 tw-rounded-lg tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-colors tw-border-none tw-cursor-pointer">
                <FontAwesomeIcon icon={faPaperPlane} className="tw-mr-2" /> Send Invitation
              </button>
            </div>
          ) : (
            <div className="tw-flex-1 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-3 tw-pr-2">
              
              {searchQuery && searchResults.length === 0 && !isLoading && (
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-text-center tw-gap-4">
                  <p className="tw-text-[#AA8894] tw-text-sm">No users found matching "{searchQuery}"</p>
                  <button onClick={() => { setIsInviteMode(true); setInviteData({...inviteData, email: searchQuery.includes('@') ? searchQuery : ''}); }} className="tw-bg-transparent tw-border tw-border-[#FF43A7] tw-text-[#FFB0CF] tw-px-6 tw-py-2 tw-rounded-full tw-text-sm tw-font-bold hover:tw-bg-[#FF43A7]/20 tw-transition-colors tw-cursor-pointer">
                    Invite them via Email
                  </button>
                </div>
              )}

              {searchResults.map((user) => (
                <div key={user.id} className={`tw-flex tw-items-center tw-justify-between tw-p-3 tw-rounded-xl tw-border ${user.alreadyAdded || user.alreadyInvited ? 'tw-bg-[#371E51]/20 tw-border-transparent' : 'tw-bg-[#371E51]/40 tw-border-[#5A3F49]/20'}`}>
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#371E51] tw-border tw-border-white/10 tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-shrink-0">
                      {user.image ? <img src={user.image} alt={user.name} className="tw-w-full tw-h-full tw-object-cover" /> : <FontAwesomeIcon icon={faUser} className="tw-text-[#AA8894]/50" />}
                    </div>
                    <div className="tw-flex tw-flex-col">
                      <span className="tw-text-white tw-text-sm tw-font-bold">{user.name}</span>
                      <span className="tw-text-[#AA8894] tw-text-xs">{user.role}</span>
                    </div>
                  </div>

                  {user.alreadyAdded ? (
                    <span className="tw-text-[#FFB0CF]/50 tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-tight tw-px-2">Added</span>
                  ) : user.alreadyInvited ? (
                    <span className="tw-text-yellow-500/70 tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-tight tw-px-2">Invited</span>
                  ) : (
                    <button onClick={() => handleAddClick(user)} className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-[#FFB0CF] hover:tw-bg-[#FF43A7] tw-text-[#63003B] tw-flex tw-items-center tw-justify-center tw-shadow-[0_0_15px_rgba(255,67,167,0.4)] tw-transition-all tw-border-none tw-cursor-pointer">
                      <FontAwesomeIcon icon={faPlus} className="tw-text-sm" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: CURRENT & INVITED MEMBERS (Desktop) */}
        <div className="tw-w-[60%] tw-h-full tw-bg-[#190033]/50 tw-p-8 tw-flex tw-flex-col">
          
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
            <h2 className="tw-text-white tw-text-sm tw-font-extrabold tw-uppercase tw-tracking-[1.4px] tw-m-0">Production Team</h2>
            <div className="tw-bg-[#FFB0CF]/20 tw-rounded-full tw-px-3 tw-py-0.5">
              <span className="tw-text-[#FFB0CF] tw-text-[11px] tw-font-bold tw-tracking-[1.4px]">{currentCast.length + currentCrew.length + invitedCast.length + invitedCrew.length}</span>
            </div>
          </div>
          <div className="tw-w-12 tw-h-1 tw-bg-[#FFB0CF] tw-mb-8"></div>

          <div className="tw-flex tw-flex-1 tw-overflow-hidden">
            
            {/* CAST CONTAINER */}
            <div className="tw-w-1/2 tw-h-full tw-pr-4 tw-border-r tw-border-[#5A3F49]/20 tw-flex tw-flex-col">
              <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
                <FontAwesomeIcon icon={faUser} className="tw-text-[#DDB7FF] tw-text-xs" />
                <h3 className="tw-text-[#DDB7FF] tw-text-[11px] tw-font-bold tw-uppercase tw-tracking-[2.2px] tw-m-0">Cast</h3>
              </div>
              <div className="tw-flex-1 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-3 tw-pr-2">
                
                {/* ACTIVE CAST */}
                {currentCast.map((actor, idx) => (
                  <div key={`d-cast-${idx}`} className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-[#371E51]/30 tw-rounded-xl tw-group">
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#371E51] tw-border tw-border-white/10 tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-shrink-0">
                        {actor.image ? <img src={actor.image} alt={actor.name} className="tw-w-full tw-h-full tw-object-cover" /> : <FontAwesomeIcon icon={faUser} className="tw-text-[#AA8894]/50" />}
                      </div>
                      <div className="tw-flex tw-flex-col">
                        <span className="tw-text-white tw-text-sm tw-font-bold">{actor.name}</span>
                        <span className="tw-text-[#AA8894] tw-text-[11px]">{actor.role || 'Actor'}</span>
                      </div>
                    </div>
                    <button onClick={() => onRemoveMember && onRemoveMember(actor, 'cast')} className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#AA8894]/20 hover:tw-bg-red-500 tw-text-[#AA8894] hover:tw-text-white tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-border-none tw-cursor-pointer"><FontAwesomeIcon icon={faXmark} className="tw-text-xs" /></button>
                  </div>
                ))}

                {/* PENDING INVITED CAST */}
                {invitedCast.length > 0 && <div className="tw-w-full tw-h-px tw-bg-[#5A3F49]/40 tw-my-2"></div>}
                {invitedCast.map((invite, idx) => (
                  <div key={`d-inv-cast-${idx}`} className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-[#190033]/40 tw-border tw-border-yellow-500/20 tw-rounded-xl tw-group">
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#371E51] tw-border tw-border-dashed tw-border-yellow-500/40 tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-shrink-0">
                        <span className="tw-text-[8px] tw-text-yellow-500/70 tw-uppercase tw-font-bold tw-tracking-tighter">Invited</span>
                      </div>
                      <div className="tw-flex tw-flex-col">
                        <span className="tw-text-white/70 tw-text-sm tw-font-bold">{invite.firstName} {invite.lastName}</span>
                        <span className="tw-text-yellow-500/70 tw-text-[10px] tw-uppercase tw-tracking-wider">Pending</span>
                      </div>
                    </div>
                    <button onClick={() => onRemoveInvite && onRemoveInvite(invite, 'cast')} className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#AA8894]/20 hover:tw-bg-red-500 tw-text-[#AA8894] hover:tw-text-white tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-border-none tw-cursor-pointer"><FontAwesomeIcon icon={faXmark} className="tw-text-xs" /></button>
                  </div>
                ))}

                {currentCast.length === 0 && invitedCast.length === 0 && <p className="tw-text-[#AA8894] tw-text-xs tw-italic tw-mt-2">No cast members added.</p>}
              </div>
            </div>

            {/* CREW CONTAINER */}
            <div className="tw-w-1/2 tw-h-full tw-pl-4 tw-flex tw-flex-col">
              <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
                <FontAwesomeIcon icon={faVideo} className="tw-text-[#DDB7FF] tw-text-xs" />
                <h3 className="tw-text-[#DDB7FF] tw-text-[11px] tw-font-bold tw-uppercase tw-tracking-[2.2px] tw-m-0">Crew</h3>
              </div>
              <div className="tw-flex-1 tw-overflow-y-auto custom-scrollbar tw-flex tw-flex-col tw-gap-3 tw-pr-2">
                
                {/* ACTIVE CREW */}
                {currentCrew.map((crewMember, idx) => (
                  <div key={`d-crew-${idx}`} className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-[#371E51]/30 tw-rounded-xl tw-group">
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#371E51] tw-border tw-border-white/10 tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-shrink-0">
                        {crewMember.image ? <img src={crewMember.image} alt={crewMember.name} className="tw-w-full tw-h-full tw-object-cover" /> : <FontAwesomeIcon icon={faUser} className="tw-text-[#AA8894]/50" />}
                      </div>
                      <div className="tw-flex tw-flex-col">
                        <span className="tw-text-white tw-text-sm tw-font-bold">{crewMember.name}</span>
                        <span className="tw-text-[#AA8894] tw-text-[11px] tw-capitalize">{crewMember.role || crewMember.epkRole?.replace('_', ' ') || 'Crew'}</span>
                      </div>
                    </div>
                    <button onClick={() => onRemoveMember && onRemoveMember(crewMember, 'crew')} className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#AA8894]/20 hover:tw-bg-red-500 tw-text-[#AA8894] hover:tw-text-white tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-border-none tw-cursor-pointer"><FontAwesomeIcon icon={faXmark} className="tw-text-xs" /></button>
                  </div>
                ))}

                {/* PENDING INVITED CREW */}
                {invitedCrew.length > 0 && <div className="tw-w-full tw-h-px tw-bg-[#5A3F49]/40 tw-my-2"></div>}
                {invitedCrew.map((invite, idx) => (
                  <div key={`d-inv-crew-${idx}`} className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-[#190033]/40 tw-border tw-border-yellow-500/20 tw-rounded-xl tw-group">
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#371E51] tw-border tw-border-dashed tw-border-yellow-500/40 tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-shrink-0">
                        <span className="tw-text-[8px] tw-text-yellow-500/70 tw-uppercase tw-font-bold tw-tracking-tighter">Invited</span>
                      </div>
                      <div className="tw-flex tw-flex-col">
                        <span className="tw-text-white/70 tw-text-sm tw-font-bold">{invite.firstName} {invite.lastName}</span>
                        <span className="tw-text-yellow-500/70 tw-text-[10px] tw-uppercase tw-tracking-wider">Pending</span>
                      </div>
                    </div>
                    <button onClick={() => onRemoveInvite && onRemoveInvite(invite, 'crew')} className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-[#AA8894]/20 hover:tw-bg-red-500 tw-text-[#AA8894] hover:tw-text-white tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-border-none tw-cursor-pointer"><FontAwesomeIcon icon={faXmark} className="tw-text-xs" /></button>
                  </div>
                ))}

                {currentCrew.length === 0 && invitedCrew.length === 0 && <p className="tw-text-[#AA8894] tw-text-xs tw-italic tw-mt-2">No crew members added.</p>}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}