import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import http from '../../http-common';
import { uploadSingleFile, getFepksByFilmmakerId } from '../../api/epks';

import FilmmakerEditNavBar from '../../components/FilmmakerView/FilmmakerEditNavBar';
import FilmmakerHero from '../../components/FilmmakerView/FilmmakerHero/FilmmakerHero';
import FilmmakerBio from '../../components/FilmmakerView/FilmmakerBio/FilmmakerBio';
import FilmmakerSocial from '../../components/FilmmakerView/FilmmakerSocial/FilmmakerSocial';
import FilmmakerFilmography from '../../components/FilmmakerView/FilmmakerFilmography/FilmmakerFilmography';
import FilmmakerContact from '../../components/FilmmakerView/FilmmakerContact/FilmmakerContact';

const SECTIONS = ['hero', 'bio', 'social', 'filmography', 'contact'];

export default function FilmmakerPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [filmmakerInfo, setFilmmakerInfo] = useState(null);
  const [epksList, setEpksList] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftFilmmaker, setDraftFilmmaker] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showValidationModal, setShowValidationModal] = useState(false);

  const heroRef        = useRef(null);
  const bioRef         = useRef(null);
  const socialRef      = useRef(null);
  const filmographyRef = useRef(null);
  const contactRef     = useRef(null);

  const sectionRefs = {
    hero:        heroRef,
    bio:         bioRef,
    social:      socialRef,
    filmography: filmographyRef,
    contact:     contactRef,
  };

  // Detect ?edit=true
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsEditMode(params.get('edit') === 'true');
  }, [location.search]);

  // Sync draft when entering/leaving edit mode
  useEffect(() => {
    if (isEditMode && filmmakerInfo && !draftFilmmaker) {
      setDraftFilmmaker(JSON.parse(JSON.stringify(filmmakerInfo)));
    }
    if (!isEditMode && draftFilmmaker) {
      setDraftFilmmaker(null);
      setErrors({});
    }
  }, [isEditMode, filmmakerInfo, draftFilmmaker]);

  // Fetch filmmaker + related data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get(`/users/getfilmmaker/${id}`);
        const data = res.data;
        setFilmmakerInfo(data);

        const movies = await getFepksByFilmmakerId(id).catch(() => []);
        setEpksList(movies || []);
      } catch (err) {
        console.error('Failed to fetch filmmaker data:', err);
      }
    };
    fetchData();
  }, [id]);

  // Scroll-spy for active section in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      let current = 'hero';
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const ref = sectionRefs[SECTIONS[i]];
        if (ref?.current) {
          const top = ref.current.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) { current = SECTIONS[i]; break; }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  const scrollToSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref?.current) {
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFieldChange = (field, value) => {
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
    setDraftFilmmaker((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiscard = () => {
    setDraftFilmmaker(null);
    setErrors({});
    navigate(`/filmmaker/${id}`, { replace: true });
  };

  const handleSaveAndExit = async () => {
    const newErrors = {};
    if (!draftFilmmaker?.firstName?.trim()) newErrors.firstName = true;
    if (!draftFilmmaker?.lastName?.trim())  newErrors.lastName  = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowValidationModal(true);
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      let payload = { ...draftFilmmaker };

      // Strip fields the backend won't accept
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.password;

      if (payload.new_banner_file) {
        const key = await uploadSingleFile(payload.new_banner_file, user?.token);
        payload.bannerImg = key;
        delete payload.new_banner_file;
      }

      if (payload.new_picture_file) {
        const key = await uploadSingleFile(payload.new_picture_file, user?.token);
        payload.picture = key;
        delete payload.new_picture_file;
      }

      await http.put(`/users/updateProfile/${id}`, payload, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const refreshed = await http.get(`/users/getfilmmaker/${id}`);
      setFilmmakerInfo(refreshed.data);
      setDraftFilmmaker(null);
      setIsEditMode(false);
      navigate(`/filmmaker/${id}`, { replace: true });
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!filmmakerInfo) {
    return (
      <div className="tw-min-h-screen tw-bg-[#1E0039] tw-flex tw-items-center tw-justify-center">
        <div className="tw-w-10 tw-h-10 tw-border-4 tw-border-[#FF43A7] tw-border-t-transparent tw-rounded-full tw-animate-spin" />
      </div>
    );
  }

  const activeData = isEditMode && draftFilmmaker ? draftFilmmaker : filmmakerInfo;
  const isOwner = user?.id === id;

  return (
    <div className="tw-flex tw-justify-center tw-overflow-hidden tw-bg-[#1E0039] tw-relative tw-min-h-screen">

      {isEditMode && (
        <FilmmakerEditNavBar
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          onDiscard={handleDiscard}
          onSave={handleSaveAndExit}
          isSaving={isSaving}
        />
      )}


      <div className={`tw-w-full tw-max-w-[1400px] ${isEditMode ? 'tw-mt-[110px]' : ''}`}>

        <div ref={heroRef}>
          <FilmmakerHero
            filmmakerInfo={activeData}
            isEditMode={isEditMode}
            onChange={handleFieldChange}
            errors={errors}
            clearError={(field) => setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; })}
          />
        </div>

        <div ref={bioRef}>
          <FilmmakerBio
            filmmakerInfo={activeData}
            isEditMode={isEditMode}
            onChange={handleFieldChange}
          />
        </div>

        <div ref={socialRef}>
          <FilmmakerSocial
            filmmakerInfo={activeData}
            isEditMode={isEditMode}
            onChange={handleFieldChange}
          />
        </div>

        <div ref={filmographyRef}>
          <FilmmakerFilmography epksList={epksList} />
        </div>

        <div ref={contactRef}>
          <FilmmakerContact
            filmmakerInfo={activeData}
            isEditMode={isEditMode}
            onChange={handleFieldChange}
          />
        </div>

        {/* Bottom padding */}
        <div className="tw-h-16" />
      </div>

      {/* Validation modal */}
      {showValidationModal && (
        <div className="tw-fixed tw-inset-0 tw-z-[1060] tw-flex tw-items-center tw-justify-center tw-bg-[#0a0014]/90 tw-backdrop-blur-sm tw-p-4">
          <div className="tw-bg-[#280D41] tw-border tw-border-red-500/50 tw-rounded-2xl tw-p-6 md:tw-p-8 tw-max-w-md tw-w-full tw-shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
            <h3 className="tw-text-white tw-text-xl md:tw-text-2xl tw-font-bold tw-mb-4">
              Missing Information
            </h3>
            <p className="tw-text-[#E2BDC9] tw-text-sm tw-mb-6 tw-leading-relaxed">
              Please complete the following required fields before saving your profile:
            </p>
            <ul className="tw-list-disc tw-list-inside tw-text-white tw-font-bold tw-text-sm tw-mb-8 tw-space-y-2 tw-bg-[#1E0039] tw-p-4 tw-rounded-xl">
              {errors.firstName && <li className="tw-text-red-400">First Name</li>}
              {errors.lastName  && <li className="tw-text-red-400">Last Name</li>}
            </ul>
            <div className="tw-flex tw-justify-end">
              <button
                onClick={() => { setShowValidationModal(false); scrollToSection('hero'); }}
                className="tw-px-6 tw-py-2.5 tw-bg-red-500 hover:tw-bg-red-600 tw-rounded-lg tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-border-none tw-shadow-[0_0_15px_rgba(239,68,68,0.4)] tw-transition-colors tw-cursor-pointer"
              >
                Review Fields
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
