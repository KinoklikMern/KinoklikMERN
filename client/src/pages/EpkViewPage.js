/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import EpkHeader from '../components/EpkView/EpkHeader/EpkHeader';
import EpkCover from '../components/EpkView/EpkCover/EpkCover';
import EpkSocialAction from '../components/EpkView/EpkSocialAction/EpkSocialAction';
import EpkDetail from '../components/EpkView/EpkDetail/EpkDetail';
import EpkSynopsis from '../components/EpkView/EpkSynopsis/EpkSynopsis';
import EpkUniqueness from '../components/EpkView/EpkUniqueness/EpkUniqueness';
import EpkCast from '../components/EpkView/EpkCast/EpkCast';
import EpkWorker from '../components/EpkView/EpkWorker/EpkWorker';
import EpkResources from '../components/EpkView/EpkResources/EpkResources';
import EpkVideoGallery from '../components/EpkView/EpkVideoGallery/EpkVideoGallery';
import EpkAward from '../components/EpkView/EpkAward/EpkAward';
import DonationModal from '../components/donate/DonationModal';
import RequestModal from '../components/common/Modals/RequestModal';
import LoginModal from '../components/common/Modals/LoginModal';
import NewMessageModal from '../components/common/Modals/NewMessageModal';
import { getFepksById, updateFepk, uploadSingleFile, deleteS3MediaBatch } from '../api/epks'; 
import { useSelector } from 'react-redux';
import { FepkContext } from '../context/FepkContext';
import Banner from '../components/EpkView/EpkBanner/EpkBanner';
import emptyBanner from '../images/empty_banner.jpeg';
import EpkSalesCalculator from '../components/EpkView/EpkSalesCalculator/EpkSalesCaculator';
import EpkPhotoGallery from '../components/EpkView/EpkPhotoGallery/EpkPhotoGallery';
import AnalyticsDataService from "../api/analytics";
import EditNavBar from '../components/navbar/EditNavBar'; 

function EpkViewPage() {
  const { fepkId, setFepkId, fepkMaker, setFepkMaker, setEpkCollaborators } = React.useContext(FepkContext);
  const user = useSelector((state) => state.user);
  
  // States
  const [epkInfo, setEpkInfo] = useState();
  const [requestStatus, setRequestStatus] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [globalTotalReach, setGlobalTotalReach] = useState(0);
  
  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [draftEpk, setDraftEpk] = useState(null); 
  const [activeSection, setActiveSection] = useState('cover');
  const [isSaving, setIsSaving] = useState(false);

  const [pendingDeletes, setPendingDeletes] = useState([]);
  
  // Validation States
  const [errors, setErrors] = useState({});
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTarget, setValidationTarget] = useState(null);

  const coverRef = useRef(null);
  const detailsRef = useRef(null);
  const synopsisRef = useRef(null);
  const castsRef = useRef(null);     
  const crewsRef = useRef(null);     
  const mediaRef = useRef(null);     
  const resourcesRef = useRef(null);
  const buzzRef = useRef(null);
  const photoOnlyRef = useRef(null); 
  const videoOnlyRef = useRef(null); 

  const sectionRefs = {
    cover: coverRef,
    details: detailsRef,
    synopsis: synopsisRef,
    casts: castsRef,
    crews: crewsRef,
    media: mediaRef,
    resources: resourcesRef,
    buzz: buzzRef
  };

  useEffect(() => {
    if (!isEditMode) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; 
      let currentSection = 'cover';

      const sections = [
        { id: 'cover', ref: coverRef },
        { id: 'details', ref: detailsRef },
        { id: 'synopsis', ref: synopsisRef },
        { id: 'casts', ref: castsRef },
        { id: 'crews', ref: crewsRef },
        { id: 'media', ref: mediaRef },
        { id: 'resources', ref: resourcesRef },
        { id: 'buzz', ref: buzzRef }
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
        case 'request': setShowRequestModal(false); break;
        case 'wish_to_donate': setShowDonationModal(false); break;
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
        case 'request': setShowRequestModal(true); break;
        case 'wish_to_donate': setShowDonationModal(true); break;
        default: break;
      }
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsEditMode(queryParams.get("edit") === "true");
  }, [location.search]);

  useEffect(() => {
    if (isEditMode && epkInfo && !draftEpk) {
      setDraftEpk(JSON.parse(JSON.stringify(epkInfo)));
    }
    if (!isEditMode && draftEpk) {
      setDraftEpk(null);
      setErrors({}); 
      setPendingDeletes([]); 
    }
  }, [isEditMode, epkInfo]); 

  useEffect(() => {
    getFepksById(id).then((res) => {
      if (res.message) return console.error(res.message); 
      setEpkInfo(res);
      setFepkId(res._id);
      setFepkMaker(res.film_maker);
      if (setEpkCollaborators) setEpkCollaborators(res.collaborators || []);

      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.get("edit") === "true") setDraftEpk(JSON.parse(JSON.stringify(res)));

      if (user?.id === res.film_maker?._id) {
        setRequestStatus('approved');
      } else {
        const myRequest = res.requests?.find(r => r.user === user?.id);
        if (myRequest) setRequestStatus(myRequest.status);
      }
    });
  }, [id, refresh, user?.id, setFepkId, setFepkMaker, setEpkCollaborators]);

  const posterImage = React.useMemo(() => {
    const img = epkInfo?.image_details;
    if (!img || img === '') return emptyBanner;
    if (img.startsWith('http')) return img;
    return `${process.env.REACT_APP_AWS_URL}/${img}`;
  }, [epkInfo?.image_details]);

  useEffect(() => {
    if (id && epkInfo && user?.id !== epkInfo.film_maker?._id) {
      AnalyticsDataService.trackView(id, 'EPK').catch(err => console.log("Analytics failed", err));
    }
  }, [id, epkInfo, user?.id]);

  const handleDiscard = () => {
    setDraftEpk(null);
    setErrors({});
    setPendingDeletes([]); 
    navigate(`/epk/${epkInfo._id}`, { replace: true });
  };

  const handleMarkMediaForDeletion = (mediaKey) => {
    if (!mediaKey) return;
    if (mediaKey.startsWith('blob:')) return; 
    setPendingDeletes(prev => [...prev, mediaKey]);
  };

  const handleSaveAndExit = async () => {
    const newErrors = {};
    
    if (!draftEpk.productionYear) newErrors.productionYear = true;
    if (!draftEpk.language) newErrors.language = true;
    if (!draftEpk.budget) newErrors.budget = true;
    if (!draftEpk.status) newErrors.status = true;
    if (!draftEpk.logLine_short || draftEpk.logLine_short.trim() === "") newErrors.logLine_short = true;
    if (!draftEpk.image_details && !draftEpk.new_poster_file) newErrors.image_details = true;
    
    const hasTrailer = !!draftEpk.trailer_url || !!draftEpk.new_trailer_file;
    const hasBanner = (draftEpk.banners && draftEpk.banners.length > 0) || !!draftEpk.banner_url || !!draftEpk.new_banner_file;
    if (!hasTrailer && !hasBanner) newErrors.trailerOrBanner = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Determine where to auto-scroll once they close the modal
      if (newErrors.image_details || newErrors.trailerOrBanner || newErrors.logLine_short) {
        setValidationTarget('cover');
      } else {
        setValidationTarget('details'); 
      }
      
      // Trigger new Modal instead of browser alert
      setShowValidationModal(true);
      return; 
    }

    setErrors({});
    setIsSaving(true);
    try {
      let finalDraft = { ...draftEpk };

      delete finalDraft._id;
      delete finalDraft.__v;
      delete finalDraft.createdAt;
      delete finalDraft.updatedAt;

      if (finalDraft.film_maker && finalDraft.film_maker._id) finalDraft.film_maker = finalDraft.film_maker._id;
      if (finalDraft.crew && finalDraft.crew.length > 0) {
        finalDraft.crew = finalDraft.crew.map(member => ({ ...member, crewId: member.crewId?._id || member.crewId }));
      }
      if (finalDraft.actors && finalDraft.actors.length > 0) finalDraft.actors = finalDraft.actors.map(actor => actor._id || actor);
      if (finalDraft.likes) finalDraft.likes = finalDraft.likes.map(u => u._id || u);
      if (finalDraft.favourites) finalDraft.favourites = finalDraft.favourites.map(u => u._id || u);

      if (finalDraft.new_poster_file) {
        const posterKey = await uploadSingleFile(finalDraft.new_poster_file, user?.token);
        finalDraft.image_details = posterKey; 
        delete finalDraft.new_poster_file;   
      }

      if (finalDraft.new_banner_file) {
        const bannerKey = await uploadSingleFile(finalDraft.new_banner_file, user?.token);
        finalDraft.banners = [{ url: bannerKey, is_thumbnail: true }];
        delete finalDraft.new_banner_file;
      }

      if (finalDraft.new_trailer_file) {
        const trailerKey = await uploadSingleFile(finalDraft.new_trailer_file, user?.token);
        finalDraft.trailer_url = trailerKey; 
        delete finalDraft.new_trailer_file;
      }

      if (finalDraft.new_trailer_thumbnail) {
        const thumbKey = await uploadSingleFile(finalDraft.new_trailer_thumbnail, user?.token);
        finalDraft.banners = [{ url: thumbKey, is_thumbnail: true }];
        delete finalDraft.new_trailer_thumbnail;
      }

      await updateFepk(epkInfo._id, finalDraft, user?.token);

      if (pendingDeletes.length > 0) {
        try {
          await deleteS3MediaBatch(epkInfo._id, pendingDeletes, user?.token);
          setPendingDeletes([]); 
        } catch (s3Error) {
          console.error("Non-fatal: EPK saved, but failed to delete orphaned S3 files.", s3Error);
        }
      }
      
      const freshEpkData = await getFepksById(epkInfo._id);
      setEpkInfo(freshEpkData); 
      setDraftEpk(null);
      setIsEditMode(false); 
      navigate(`/epk/${epkInfo._id}`, { replace: true });
      
    } catch (error) {
      console.error("Save process failed:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // The new ClearError function to be passed down
  const clearError = (field) => {
    setErrors(prev => {
      const newErrs = { ...prev };
      delete newErrs[field];
      if (['new_poster_file', 'image_details'].includes(field)) delete newErrs.image_details;
      if (['new_trailer_file', 'new_banner_file', 'trailer_url', 'banner_url'].includes(field)) delete newErrs.trailerOrBanner;
      return newErrs;
    });
  };

  const handleFieldChange = (field, value) => {
    clearError(field);
    setDraftEpk((prev) => ({ ...prev, [field]: value }));
  };

  const activeData = isEditMode && draftEpk ? draftEpk : epkInfo;

  return (
    epkInfo && (
      <div className="tw-flex tw-justify-center tw-overflow-hidden tw-bg-[#1E0039] tw-relative">
        
        {isEditMode && (
          <EditNavBar 
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            onDiscard={handleDiscard} 
            onSave={handleSaveAndExit}
            isSaving={isSaving} 
          />
        )}

        <div className={`tw-w-11/12 ${isEditMode ? 'tw-mt-[110px]' : ''}`}>
          
          <div ref={coverRef}>
            <EpkHeader epkInfo={activeData} setGlobalTotalReach={setGlobalTotalReach} isEditMode={isEditMode} onChange={handleFieldChange} clearError={clearError} errors={errors} />
            <EpkCover epkInfo={activeData} scrollToPhotos={scrollToPhotos} scrollToVideos={scrollToVideos} isEditMode={isEditMode} onChange={handleFieldChange} clearError={clearError} errors={errors} />
          </div>

          <EpkSocialAction epkInfo={activeData} handler={handleShow} showDonationModal={showDonationModal} setShowDonationModal={setShowDonationModal} isEditMode={isEditMode} />
          
          <div ref={detailsRef}>
            {/* PASS ERRORS AND CLEARERROR DOWN TO DETAILS SECTION */}
            <EpkDetail 
              epkInfo={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              errors={errors} 
              clearError={clearError}
            />
          </div>

          <div ref={synopsisRef}>
            <EpkSynopsis epkInfo={activeData} requestStatus={requestStatus} handler={handleShow} isEditMode={isEditMode} onChange={handleFieldChange} />
            <EpkUniqueness epkInfo={activeData} requestStatus={requestStatus} handler={handleShow} isEditMode={isEditMode} onChange={handleFieldChange} />
          </div>

          <div ref={castsRef}>
            <EpkCast epkInfo={activeData} isEditMode={isEditMode} onChange={handleFieldChange} />
          </div>

          <div ref={crewsRef}>
            <EpkWorker epkInfo={activeData} isEditMode={isEditMode} onChange={handleFieldChange} />
          </div>
          
          <div ref={mediaRef}>
            <div ref={photoOnlyRef}>
              <EpkPhotoGallery epkInfo={activeData} isEditMode={isEditMode} onChange={handleFieldChange} onMarkMediaForDeletion={handleMarkMediaForDeletion} />
            </div>
            <div ref={videoOnlyRef}>
              <EpkVideoGallery epkInfo={activeData} isEditMode={isEditMode} onChange={handleFieldChange} onMarkMediaForDeletion={handleMarkMediaForDeletion} />
            </div>
          </div>
          
          <div ref={resourcesRef}>
            <EpkResources epkInfo={activeData} isEditMode={isEditMode} onChange={handleFieldChange} />
          </div>
          
          <div ref={buzzRef}>
            <EpkAward epkInfo={activeData} isEditMode={isEditMode} onChange={handleFieldChange} />
          </div>
          
          {showRequestModal && <RequestModal close={handleClose} open={handleShow} epkId={epkInfo._id} filmmakerId={epkInfo.film_maker._id} user={user} setRefresh={setRefresh}/>}
          {showLoginModal && <LoginModal close={handleClose} open={handleShow} epkId={epkInfo._id} filmmakerId={epkInfo.film_maker._id} user={user} setRefresh={setRefresh}/>}
          {showMessageModal && <NewMessageModal close={handleClose} open={handleShow} epkId={epkInfo._id} filmmakerId={epkInfo.film_maker._id} user={user} setRefresh={setRefresh}/>}
          {showDonationModal && <DonationModal isOpen={showDonationModal} onRequestClose={() => setShowDonationModal(false)} epkId={epkInfo._id} userId={user.id} epkImage={posterImage} epkDonatePayPal={epkInfo.DonatePayPal_url} epkDonateStripe={epkInfo.DonateStripe_url} />}

          <EpkSalesCalculator globalTotalReach={globalTotalReach} />
          <Banner />
        </div>

        {/* --- CUSTOM VALIDATION ERROR MODAL --- */}
        {showValidationModal && (
          <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
            <div className="tw-bg-[#280D41] tw-border tw-border-red-500/50 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
              <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4 tw-font-['Plus_Jakarta_Sans']">
                Missing Information
              </h3>
              <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-6 tw-leading-relaxed">
                Please complete the following required fields before publishing your EPK:
              </p>
              
              <ul className="tw-list-disc tw-list-inside tw-text-white tw-font-bold tw-text-sm tw-mb-8 tw-space-y-2 tw-bg-[#1E0039] tw-p-4 tw-rounded-xl">
                {errors.logLine_short && <li className="tw-text-red-400">Logline <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Cover Section)</span></li>}
                {errors.image_details && <li className="tw-text-red-400">Cover Poster <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Cover Section)</span></li>}
                {errors.trailerOrBanner && <li className="tw-text-red-400">Trailer or Banner <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Cover Section)</span></li>}
                {errors.productionYear && <li className="tw-text-red-400">Production Year <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Details Section)</span></li>}
                {errors.language && <li className="tw-text-red-400">Language <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Details Section)</span></li>}
                {errors.budget && <li className="tw-text-red-400">Budget <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Details Section)</span></li>}
                {errors.status && <li className="tw-text-red-400">Status <span className="tw-text-xs tw-text-[#E2BDC9] tw-font-normal">(Details Section)</span></li>}
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
export default EpkViewPage;