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
import { getFepksById, updateFepk, uploadSingleFile } from '../api/epks'; 
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

  // Error State for Validation
  const [errors, setErrors] = useState({});

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
        case 'message':
          setShowMessageModal(false);
          break;
        case 'request':
          setShowRequestModal(false);
          break;
        case 'wish_to_donate':
          setShowDonationModal(false); 
          break;
        default:
          break;
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
        case 'message':
          setShowMessageModal(true);
          break;
        case 'request':
          setShowRequestModal(true);
          break;
        case 'wish_to_donate':
          setShowDonationModal(true);
          break;
        default:
          break;
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
    navigate(`/epk/${epkInfo._id}`, { replace: true });
  };

  const handleSaveAndExit = async () => {
    //  VALIDATE REQUIRED FIELDS BEFORE SAVING!
    const newErrors = {};
    
    // Details Section
    if (!draftEpk.productionYear) newErrors.productionYear = true;
    if (!draftEpk.language) newErrors.language = true;
    if (!draftEpk.budget) newErrors.budget = true;
    if (!draftEpk.status) newErrors.status = true;

    // Cover Section (Poster, Logline, Trailer/Banner)
    if (!draftEpk.logLine_short || draftEpk.logLine_short.trim() === "") newErrors.logLine_short = true;
    if (!draftEpk.image_details && !draftEpk.new_poster_file) newErrors.image_details = true;
    
    const hasTrailer = !!draftEpk.trailer_url || !!draftEpk.new_trailer_file;
    const hasBanner = (draftEpk.banners && draftEpk.banners.length > 0) || !!draftEpk.banner_url || !!draftEpk.new_banner_file;
    if (!hasTrailer && !hasBanner) newErrors.trailerOrBanner = true;

    // If there are errors, stop the save and auto-scroll
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fill out all required fields.");
      
      // Scroll to Cover if a cover element is missing, otherwise scroll to details
      if (newErrors.image_details || newErrors.trailerOrBanner || newErrors.logLine_short) {
        scrollToSection('cover');
      } else {
        scrollToSection('details'); 
      }
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

      if (finalDraft.film_maker && finalDraft.film_maker._id) {
        finalDraft.film_maker = finalDraft.film_maker._id;
      }
      if (finalDraft.crew && finalDraft.crew.length > 0) {
        finalDraft.crew = finalDraft.crew.map(member => ({
          ...member,
          crewId: member.crewId?._id || member.crewId
        }));
      }
      if (finalDraft.actors && finalDraft.actors.length > 0) {
        finalDraft.actors = finalDraft.actors.map(actor => actor._id || actor);
      }
      if (finalDraft.likes) {
        finalDraft.likes = finalDraft.likes.map(u => u._id || u);
      }
      if (finalDraft.favourites) {
        finalDraft.favourites = finalDraft.favourites.map(u => u._id || u);
      }

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

  const handleFieldChange = (field, value) => {
    // clear the specific errors as soon as the user adds the missing data!
    setErrors(prev => {
      const newErrs = { ...prev };
      if (newErrs[field]) delete newErrs[field];
      
      // Clear compound errors (e.g. adding a new poster file clears the generic "image_details" error)
      if (['new_poster_file', 'image_details'].includes(field)) delete newErrs.image_details;
      if (['new_trailer_file', 'new_banner_file', 'trailer_url', 'banner_url'].includes(field)) delete newErrs.trailerOrBanner;
      
      return newErrs;
    });

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
            <EpkHeader 
              epkInfo={activeData}
              setGlobalTotalReach={setGlobalTotalReach}
              isEditMode={isEditMode}
              onChange={handleFieldChange}
            />
            <EpkCover 
              epkInfo={activeData} 
              scrollToPhotos={scrollToPhotos}
              scrollToVideos={scrollToVideos}
              isEditMode={isEditMode}
              onChange={handleFieldChange}
              errors={errors} // <--- Passed errors to cover!
            />
          </div>

          <EpkSocialAction
            epkInfo={activeData}
            handler={handleShow}
            showDonationModal={showDonationModal}
            setShowDonationModal={setShowDonationModal}
            isEditMode={isEditMode}
          />
          
          <div ref={detailsRef}>
            <EpkDetail 
              epkInfo={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
              errors={errors} 
            />
          </div>

          <div ref={synopsisRef}>
            <EpkSynopsis epkInfo={activeData} requestStatus={requestStatus} handler={handleShow} isEditMode={isEditMode} onChange={handleFieldChange} />
            <EpkUniqueness epkInfo={activeData} requestStatus={requestStatus} handler={handleShow} isEditMode={isEditMode} onChange={handleFieldChange} />
          </div>

          <div ref={castsRef}>
            <EpkCast 
              epkInfo={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
            />
          </div>

          <div ref={crewsRef}>
            <EpkWorker 
              epkInfo={activeData} 
              isEditMode={isEditMode} 
              onChange={handleFieldChange} 
            />
          </div>
          
          <div ref={mediaRef}>
            <div ref={photoOnlyRef}>
              <EpkPhotoGallery epkInfo={activeData} isEditMode={isEditMode} />
            </div>
            <div ref={videoOnlyRef}>
              <EpkVideoGallery epkInfo={activeData} isEditMode={isEditMode} />
            </div>
          </div>
          
          <div ref={resourcesRef}>
            <EpkResources epkInfo={activeData} isEditMode={isEditMode} />
          </div>
          
          <div ref={buzzRef}>
            <EpkAward epkInfo={activeData} isEditMode={isEditMode} />
          </div>
          
          {showRequestModal && (
            <RequestModal close={handleClose} open={handleShow} epkId={epkInfo._id} filmmakerId={epkInfo.film_maker._id} user={user} setRefresh={setRefresh}/>
          )}
          {showLoginModal && (
            <LoginModal close={handleClose} open={handleShow} epkId={epkInfo._id} filmmakerId={epkInfo.film_maker._id} user={user} setRefresh={setRefresh}/>
          )}
          {showMessageModal && (
            <NewMessageModal close={handleClose} open={handleShow} epkId={epkInfo._id} filmmakerId={epkInfo.film_maker._id} user={user} setRefresh={setRefresh}/>
          )}
          {showDonationModal && (
            <DonationModal isOpen={showDonationModal} onRequestClose={() => setShowDonationModal(false)} epkId={epkInfo._id} userId={user.id} epkImage={posterImage} epkDonatePayPal={epkInfo.DonatePayPal_url} epkDonateStripe={epkInfo.DonateStripe_url} />
          )}

          <EpkSalesCalculator globalTotalReach={globalTotalReach} />
          <Banner />
        </div>
      </div>
    )
  );
}
export default EpkViewPage;