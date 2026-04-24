/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

import { getUserById, updateUserProfile, uploadSingleFile, deleteS3MediaBatch } from '../../api/users';
import FilmmakerHero from '../../components/FilmmakerView/FilmmakerHero/FilmmakerHero';
import UserHeader from "../../components/UserView/UserHeader/UserHeader";
import UserHero from "../../components/UserView/UserHero/UserHero";
import UserSummary from "../../components/UserView/UserSummary/UserSummary";
import UserSocialAction from "../../components/UserView/UserSocialAction/UserSocialAction";
import UserDetails from "../../components/UserView/UserDetails/UserDetails";
import UserBio from '../../components/UserView/UserBio/UserBio';
import UserPhotoGallery from '../../components/UserView/UserPhotoGallery/UserPhotoGallery';
import UserFilmography from '../../components/UserView/UserFilmography/UserFilmography';
import UserVideoGallery from '../../components/UserView/UserVideoGallery/UserVideoGallery';
import UserSocials from '../../components/UserView/UserSocials/UserSocials';

import Banner from '../../components/EpkView/EpkBanner/EpkBanner';
import LoginModal from '../../components/common/Modals/LoginModal';
import AnalyticsDataService from "../../api/analytics";
import NewMessageModal from '../../components/common/Modals/NewMessageModal';
import UserEditNavBar from '../../components/UserView/UserEditNavBar';
import emptyBanner from '../../images/empty_banner.jpeg';
import ActionIcon from '../../components/EpkView/EpkSocialAction/ActionIcon';

function ProfileViewPage() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userData, setUserData] = useState(null);
  const [draftUser, setDraftUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [refresh, setRefresh] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [TotalReach, setTotalReach] = useState(0);
  const [pendingDeletes, setPendingDeletes] = useState([]);
    
  const [errors, setErrors] = useState({});
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTarget, setValidationTarget] = useState(null);
  
  const heroRef = useRef(null);
  const summaryRef = useRef(null);
  const detailsRef = useRef(null);
  const bioRef = useRef(null);
  const mediaRef = useRef(null);     
  const photoOnlyRef = useRef(null); 
  const videoOnlyRef = useRef(null); 
  const filmographyRef = useRef(null);
  const socialsRef = useRef(null);

  const sectionRefs = {
    hero: heroRef,
    summary: summaryRef,
    details: detailsRef,
    bio: bioRef,
    media: mediaRef,
    filmography: filmographyRef,
    socials: socialsRef,
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsEditMode(queryParams.get("edit") === "true");
  }, [location.search]);

  useEffect(() => {
    if (id) {
      getUserById(id).then((data) => {
        setUserData(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if(!isEditMode) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; 
      let currentSection = 'hero';

      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'summary', ref: summaryRef },
        { id: 'details', ref: detailsRef },
        { id: 'biography', ref: bioRef },
        //{ id: 'prodCredits', ref: prodCreditsRef },
        { id: 'media', ref: mediaRef },
        { id: 'filmography', ref: filmographyRef },
        { id: 'socials', ref: socialsRef },
        //{ id: 'buzz', ref: buzzRef },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].ref.current;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPosition) {
            currentSection = sections[i].id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditMode]);

  const scrollToSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToPhotos = () => {
    if (photoOnlyRef.current) {
      const y = photoOnlyRef.current.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  const scrollToVideos = () => {
    if (videoOnlyRef.current) {
      const y = videoOnlyRef.current.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleClose = (modalType) => {
    if (user) {
      switch (modalType) {
        case 'message': setShowMessageModal(false); break;
        default: break;
      }
    } else {
      setShowLoginModal(false);
    }
  };

  const handleShow = (modalType) => {
    if (modalType === 'login') {
      setShowLoginModal(true);
    } else if (user) {
      switch (modalType) {
        case 'message': setShowMessageModal(true); break;
        default: break;
      }
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const editing = queryParams.get("edit") === "true";
    setIsEditMode(editing);
  }, [location.search]);

  useEffect(() => {
    if (isEditMode && userData && !draftUser) {
      setDraftUser(JSON.parse(JSON.stringify(userData)));
    }
    if (!isEditMode && draftUser) {
      setDraftUser(null);
      setErrors({}); 
      setPendingDeletes([]); 
    }
  }, [isEditMode, userData, draftUser]);

  const activeData = isEditMode && draftUser ? draftUser : userData;

  const HeadshotImage = React.useMemo(() => {
    const headshots = activeData?.photo_albums?.headshots || [];
    const mainObject = headshots.find(h => h.isMain) || headshots[0];
    
    const img = mainObject?.image;

    if (!img || img === '') return emptyBanner;
    if (img.startsWith('http') || img.startsWith('blob:')) return img;
    return `${process.env.REACT_APP_AWS_URL}/${img}`;
  }, [activeData?.photo_albums?.headshots]);

  useEffect(() => {
    if (id && user?.id !== id) {
      AnalyticsDataService.trackView(id, 'User').catch(err => console.log("Analytics failed", err));
    }
  }, [id, user?.id]);

  const handleDiscard = () => {
    setDraftUser(null);
    setErrors({});
    setPendingDeletes([]); 
    navigate(`/user/${id}`, { replace: true });
  };

  const handleMarkMediaForDeletion = (mediaKey) => {
    if (!mediaKey) return;
    if (mediaKey.startsWith('blob:')) return; 
    setPendingDeletes(prev => [...prev, mediaKey]);
  };

  const clearError = (field) => {
    setErrors(prev => {
      const newErrs = { ...prev };
      delete newErrs[field];
      if (['new_headshot_file', 'image_details'].includes(field)) delete newErrs.image_details;
      if (['new_reel_file', 'new_banner_file', 'reel_url', 'banner_url'].includes(field)) delete newErrs.trailerOrBanner;
      return newErrs;
    });
  };

  const handleFieldChange = (field, value) => {
    clearError(field);
    setDraftUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAndExit = async () => {
    const newErrors = {};
    const hasExistingImage = draftUser.photo_albums?.headshots?.some(h => h.isMain);
    const hasNewImage = !!draftUser.new_headshot_file;

    // 1. Validation
    if (!hasExistingImage && !hasNewImage) {
      newErrors.image_details = true;
    }
    if (!draftUser.summary || draftUser.summary.trim() === "") newErrors.summary = true;
    if (!draftUser.aboutMe || draftUser.aboutMe.trim() === "") newErrors.aboutMe = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // If summary/bio is missing, scroll to summary. Otherwise, scroll to Hero.
      if (newErrors.summary || newErrors.aboutMe) {
        setValidationTarget('summary'); 
      } else {
        setValidationTarget('hero');
      }
      setShowValidationModal(true);
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      let finalDraft = { ...draftUser };

      // 2. Metadata & Relationship Cleanup
      delete finalDraft._id;
      delete finalDraft.__v;
      delete finalDraft.createdAt;
      delete finalDraft.updatedAt;

      if (finalDraft.likes) finalDraft.likes = finalDraft.likes.map(u => u._id || u);
      if (finalDraft.favourites) finalDraft.favourites = finalDraft.favourites.map(u => u._id || u);

      // 3. Object Initialization (Crucial for new users)
      if (!finalDraft.photo_albums) finalDraft.photo_albums = { headshots: [] };
      if (!finalDraft.video_gallery) {
        finalDraft.video_gallery = { reels: [], media: [], behind: [], premieres: [] };
      }

      /**
       * 4. PHOTO LOGIC
       * Handles new uploads or selecting from existing library
       */
      if (finalDraft.new_headshot_file) {
        const headshotKey = await uploadSingleFile(finalDraft.new_headshot_file, user?.token);
        
        const updatedHeadshots = (finalDraft.photo_albums.headshots || []).map(h => ({
          ...h,
          isMain: false
        }));

        updatedHeadshots.push({ image: headshotKey, isMain: true });

        finalDraft.photo_albums = { 
          ...finalDraft.photo_albums, 
          headshots: updatedHeadshots 
        };
        finalDraft.picture = headshotKey;
        delete finalDraft.new_headshot_file;
      } else if (finalDraft.picture && finalDraft.photo_albums.headshots) {
        finalDraft.photo_albums.headshots = finalDraft.photo_albums.headshots.map(h => ({
          ...h,
          isMain: h.image === finalDraft.picture
        }));
      }

      /**
       * 5. REEL / VIDEO GALLERY LOGIC
       * Maps temporary file uploads into the video_gallery.reels array
       */
      if (finalDraft.new_reel_file) {
        const videoKey = await uploadSingleFile(finalDraft.new_reel_file, user?.token);
        
        let thumbKey = null;
        if (finalDraft.new_reel_thumbnail) {
          thumbKey = await uploadSingleFile(finalDraft.new_reel_thumbnail, user?.token);
        }

        const newReelEntry = {
          url: videoKey,
          thumbnail: thumbKey || "",
          title: finalDraft.reel_title || "My Reel",
          isMain: true
        };

        // Set existing reels to not main
        const updatedReels = (finalDraft.video_gallery.reels || []).map(r => ({
          ...r,
          isMain: false
        }));

        updatedReels.push(newReelEntry);
        finalDraft.video_gallery.reels = updatedReels;

        // Clean up temp state fields
        delete finalDraft.new_reel_file;
        delete finalDraft.new_reel_thumbnail;
        delete finalDraft.reel_url;
        delete finalDraft.reel_thumbnail;
      }

      /**
       * 6. BANNER LOGIC
       */
      if (finalDraft.new_banner_file) {
        const bannerKey = await uploadSingleFile(finalDraft.new_banner_file, user?.token);
        finalDraft.banners = [{ url: bannerKey, is_thumbnail: true }];
        delete finalDraft.new_banner_file;
      }

      // 7. API Call
      const updatedUser = await updateUserProfile(id, finalDraft, user?.token);

      // 8. S3 Cleanup (Batch delete images user removed while editing)
      if (pendingDeletes.length > 0) {
        try {
          await deleteS3MediaBatch(userData._id, pendingDeletes, user?.token);
          setPendingDeletes([]);
        } catch (s3Error) {
          console.warn("Cleanup failed, but profile saved successfully:", s3Error);
        }
      }

      // 9. State Updates & Navigation
      setUserData(updatedUser);
      setDraftUser(null);
      setIsEditMode(false);
      navigate(`/user/${id}`, { replace: true });

    } catch (error) {
      console.error("Save process failed:", error);
      alert("Error saving profile changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!userData) return <div className="tw-bg-[#1E0039] tw-h-screen">Loading...</div>;

  return (
    id && (
      <div className="tw-flex tw-justify-center tw-overflow-hidden tw-bg-[#1E0039] tw-relative">
        
        {isEditMode && (
          <UserEditNavBar
            userRole={userData?.role} 
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            onDiscard={handleDiscard}
            onSave={handleSaveAndExit}
            isSaving={isSaving}
          />
        )}

        <div className={`tw-w-11/12 ${isEditMode ? 'tw-pt-[110px]' : ''}`}>

        <div ref={heroRef}>
          <UserHeader 
            data={activeData} 
            setTotalReach = {setTotalReach}
          />
       
          {activeData?.role === "Actor" ? (
                   <UserHero 
              data={activeData} 
              scrollToPhotos={scrollToPhotos} 
              scrollToVideos={scrollToVideos}
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              clearError={clearError} 
              errors={errors}
            />
          ) : (
               <FilmmakerHero 
              filmmakerInfo={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              clearError={clearError} 
              errors={errors}
            />
          )}
          </div>

          <div ref={summaryRef}>
          <UserSummary 
            data={activeData}
            isEditMode={isEditMode} 
            onChange={handleFieldChange} 
            errors={errors} 
            clearError={clearError}
          />
        </div>

        <div ref={detailsRef}>
          {activeData?.role === "Actor" ? (
            <UserDetails 
              data={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              errors={errors} 
              clearError={clearError}
            />
          ) : (
            null   
          )}
        </div>

        <div ref={bioRef}>
          <UserBio 
            data={activeData} 
            isEditMode={isEditMode} 
            onChange={handleFieldChange} 
          />
        </div>

        <div ref={mediaRef}>
          <div ref={photoOnlyRef}>
            <UserPhotoGallery 
              data={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              onMarkMediaForDeletion={handleMarkMediaForDeletion}
            />
          </div>
          <div ref={videoOnlyRef}>
            <UserVideoGallery 
              data={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              onMarkMediaForDeletion={handleMarkMediaForDeletion}
            />
          </div>
          <div ref={filmographyRef}>
            <UserFilmography
            profileOwnerId={activeData?._id} 
            isEditMode={isEditMode} 
            onChange={handleFieldChange} 
            />
          </div>
          <div>
            {isEditMode && (
              <div ref={socialsRef}> 
                <UserSocials data={activeData}
                isEditMode={isEditMode}            
                onChange={handleFieldChange} />
              </div>
            )}
          </div>
          {showLoginModal && <LoginModal close={handleClose} open={handleShow} actorId={id} user={user} setRefresh={setRefresh}/>}
          {showMessageModal && <NewMessageModal close={handleClose} open={handleShow} actorId={id} user={user} setRefresh={setRefresh}/>}
        </div>
      </div>
    
      {showValidationModal && (
        <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-red-500/50 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">
              Missing Information
            </h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-6 tw-leading-relaxed">
              Please complete the following required fields before publishing your Profile:
            </p>
              
            <ul className="tw-list-disc tw-list-inside tw-text-white tw-font-bold tw-text-sm tw-mb-8 tw-space-y-2 tw-bg-[#1E0039] tw-p-4 tw-rounded-xl">
              {/* Explicitly check for truthiness to avoid 0 or undefined rendering issues */}
              {!!errors.summary && (
                <li className="tw-text-red-400">
                  Summary <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal tw-ml-1">(Summary Section)</span>
                </li>
              )}
              
              {!!errors.aboutMe && (
                <li className="tw-text-red-400">
                  Biography <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal tw-ml-1">(Bio Section)</span>
                </li>
              )}
              
              {!!errors.image_details && (
                <li className="tw-text-red-400">
                  Headshot <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal tw-ml-1">(Hero Section)</span>
                </li>
              )}
              
              {!!errors.trailerOrBanner && (
                <li className="tw-text-red-400">
                  Reel or Banner <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal tw-ml-1">(Hero Section)</span>
                </li>
              )}
            </ul>

            <div className="tw-flex tw-justify-end">
              <button 
                onClick={() => {
                  setShowValidationModal(false);
                  if (validationTarget) scrollToSection(validationTarget);
                }}
                className="tw-px-6 tw-py-2.5 tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(239,68,68,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                Review Fields
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    )
  );
}

export default ProfileViewPage;