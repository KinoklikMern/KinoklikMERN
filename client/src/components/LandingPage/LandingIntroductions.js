import React, { useState, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import epkCover from "../../images/landing_page_redo/EpkCoverBanner.webp";
import epkReach from "../../images/landing_page_redo/EpkAudience.webp";
import epkCast from "../../images/landing_page_redo/EpkDetailsCast.webp";
import epkResource from "../../images/landing_page_redo/EpkResource.webp";
import epkAwards from "../../images/landing_page_redo/EpkAwardCard.webp";
import epkMedia from "../../images/landing_page_redo/EpkMedia.webp";

import actorPortfolio from "../../images/landing_page_redo/ActorDetails.webp";
import actorGallery from "../../images/landing_page_redo/ActorPhotoGallery.webp";
import actorEndorse from "../../images/landing_page_redo/ActorRecommend.webp";
import actorSocial from "../../images/landing_page_redo/ActorSocialNumbers.webp";
import actorSocialEdit from "../../images/landing_page_redo/ActorSocialEdit.webp";

import distFilter from "../../images/landing_page_redo/DistributorFilter.webp";
import distCalc from "../../images/landing_page_redo/DistributorInvestorCalculator.webp";

import salesReview from "../../images/landing_page_redo/SalesAgentSynopsis.webp";
import salesChat from "../../images/landing_page_redo/SalesAgentMessage.webp";
import salesShare from "../../images/landing_page_redo/SalesAgentShareModal.webp";

import invDetails from "../../images/landing_page_redo/InvestorEpkInfo.webp";
import invAccess from "../../images/landing_page_redo/InvestorPrivateAccessRequest.webp";
import invAcessModal from "../../images/landing_page_redo/InvestorPrivateAccessRequestModal.webp";

import festQueue from "../../images/landing_page_redo/FilmFestivalCatalogue.webp";
import festMsg from "../../images/landing_page_redo/FilmFestivalDirectCommunication.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm, faUsers, faAddressCard, faTrophy, faHandshake, faChartLine, faSearch, faChartBar, faFilter, faComments, faLock, faShieldAlt, faList, faEnvelope, faTicketAlt
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const LandingEpkIntroductions = () => {
  const { t } = useTranslation();
  const [activeRole, setActiveRole] = useState("Filmmakers");
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  
  const featureRefs = useRef([]);
  featureRefs.current = []; 
  
  const imageContainerRef = useRef(null);
  const textColumnRef = useRef(null); 
  
  const roles = ["Filmmakers", "Actors", "Distributors", "Sales Agents", "Investors", "Film Festivals"];

  const getFeaturesContent = (role) => {
    if (role === "Filmmakers") {
      return [
        { id: 0, title: t("Stunning Visual Presentation"), description: t("Hook investors instantly with high-resolution Covers, Banners, and dedicated Photo & Video Galleries."), images: [epkCover, epkMedia], icon: faFilm },
        { id: 1, title: t("Total Audience Reach"), description: t("Prove your film's marketability. KinoKlik automatically aggregates the combined social follower counts of your entire cast and crew."), images: [epkReach], icon: faUsers },
        { id: 2, title: t("Cast, Crew & Project Details"), description: t("Build out comprehensive project details and highlight your team with dedicated, interconnected Actor and Crew profiles."), images: [epkCast], icon: faAddressCard },
        { id: 3, title: t("Awards & Resource Requests"), description: t("Display your festival reviews and post public calls for specific production resources you need to finish your film."), images: [epkAwards, epkResource], icon: faTrophy }
      ];
    } 
    if (role === "Actors") {
      return [
        { id: 0, title: t("Digital Portfolio"), description: t("Showcase your range. Combine high-resolution headshots, your latest demo reel, and key statistics into a professional, shareable profile."), images: [actorPortfolio, actorGallery], icon: faAddressCard },
        { id: 1, title: t("Industry Endorsements"), description: t("Build your reputation. Allow industry professionals, directors, and peers to officially recommend you on your profile."), images: [actorEndorse], icon: faHandshake },
        { id: 2, title: t("Social Proof"), description: t("Demonstrate your built-in audience. Automatically aggregate your follower counts across Instagram, TikTok, and X."), images: [actorSocial, actorSocialEdit], icon: faChartLine }
      ];
    }
    if (role === "Distributors") {
      return [
        { id: 0, title: t("Deep Catalog Filtering"), description: t("Find exactly what you need. Use deep filtering tools to discover specific projects and talent based on location, demographics, and roles."), images: [distFilter], icon: faSearch },
        { id: 1, title: t("Sales & Territory Calculator"), description: t("Run the numbers. Use the built-in Sales Calculator to estimate distribution revenue, territories, and potential ROI directly within the EPK."), images: [distCalc], icon: faChartBar },
        { id: 2, title: t("Audience Analytics"), description: t("Evaluate a film's built-in fan base. Instantly view the combined social media reach of the cast and track the overall engagement of the EPK."), images: [epkReach], icon: faUsers }
      ];
    }
    if (role === "Sales Agents") {
      return [
        { id: 0, title: t("Professional EPK Review"), description: t("Evaluate projects efficiently. Browse comprehensive Electronic Press Kits to review a film's logline, synopsis, cast, and high-resolution trailer."), images: [salesReview], icon: faFilter },
        { id: 1, title: t("Direct Industry Messaging"), description: t("Negotiate directly. Use the secure, real-time messaging platform to contact filmmakers and discuss representation without leaving the app."), images: [salesChat], icon: faComments },
        { id: 2, title: t("Instant Project Sharing"), description: t("Distribute your slate efficiently. Use the integrated sharing tools to instantly send polished, interactive Electronic Press Kits directly to international buyers."), images: [salesShare], icon: faEnvelope }
      ];
    }
    if (role === "Investors") {
      return [
        { id: 0, title: t("Comprehensive Project Details"), description: t("Invest with clarity. Review a project's complete breakdown, including the director's vision, secured cast, and production details in one place."), images: [invDetails], icon: faLock },
        { id: 1, title: t("Private Access Requests"), description: t("Access exclusive materials. Securely request access from filmmakers to read private, detailed long-synopses and sensitive project information."), images: [invAccess, invAcessModal], icon: faComments },
        { id: 2, title: t("Built-in Audience Metrics"), description: t("Assess market potential. Review the attached cast's combined social media following to ensure the project has a built-in audience before you invest."), images: [epkReach], icon: faShieldAlt }
      ];
    }
    // Film Festivals
    return [
      { id: 0, title: t("Standardized Evaluation"), description: t("Discover fresh cinematic voices. Review standardized, high-quality EPKs to easily evaluate a film's production quality and narrative."), images: [festQueue], icon: faList },
      { id: 1, title: t("Direct Communication"), description: t("Connect with creators. Reach out to directors and producers directly through the built-in messaging system to discuss their projects."), images: [festMsg], icon: faEnvelope },
      { id: 2, title: t("Evaluate Audience Draw"), description: t("Program films that draw a crowd. Identify projects with strong cast followings that can help drive engagement and ticket sales for your festival."), images: [epkReach], icon: faTicketAlt }
    ];
  };

  const activeFeatures = getFeaturesContent(activeRole);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setActiveFeatureIndex(0);

    setTimeout(() => {
      const section = document.getElementById("epk-features-section");
      if (section) {
        if (featureRefs.current[0]) {
          const firstFeature = featureRefs.current[0];
          const featureTop = firstFeature.getBoundingClientRect().top + window.scrollY;
          const featureHeight = firstFeature.offsetHeight;
          const windowHeight = window.innerHeight;
          
          const yOffset = featureTop + (featureHeight / 2) - (windowHeight / 2);
          
          window.scrollTo({ top: yOffset, behavior: 'instant' });
          ScrollTrigger.refresh();
        }
      }
    }, 50);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      featureRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: "top 60%", 
            end: "bottom 40%", 
            scrub: true, 
          }
        });

        tl.fromTo(ref, 
          { opacity: 0.15, scale: 0.95 }, 
          { opacity: 1, scale: 1, duration: 0.5, ease: "power1.inOut" }
        ).to(ref, 
          { opacity: 0.15, scale: 0.95, duration: 0.5, ease: "power1.inOut" }
        );

        ScrollTrigger.create({
          trigger: ref,
          start: "top center", 
          end: "bottom center",
          onEnter: () => handleImageChange(index),
          onEnterBack: () => handleImageChange(index),
        });
      });
    });

    return () => ctx.revert();
  }, [activeRole, activeFeatures.length]);

  const handleImageChange = (index) => {
    setActiveFeatureIndex(index);
    if (imageContainerRef.current) {
      gsap.killTweensOf(imageContainerRef.current);
      
      gsap.fromTo(
        imageContainerRef.current,
        { scale: 1.03, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  return (
    <div className="tw-bg-midnight tw-text-white tw-relative">
      
      {/* 1. NON-STICKY INTRO BLOCK */}
      <div className="tw-pt-16 tw-pb-10 tw-text-center tw-relative tw-z-20">
        <h2 className="tw-text-4xl tw-font-bold md:tw-text-6xl tw-tracking-tight">
          {t("The modern standard for Electronic Press Kits.")}
        </h2>
        <p className="tw-mt-6 tw-text-lg tw-text-gray-300 md:tw-text-xl tw-max-w-4xl tw-mx-auto tw-px-6 tw-leading-relaxed">
          {t("Say goodbye to scattered Google Drive folders and bulky PDF attachments.")}
          <br className="tw-hidden md:tw-block" />
          {t(" KinoKlik transforms your film's pitch into a stunning, interactive ")}
          <span className="tw-font-bold tw-text-[#FF00F5]">{t("Electronic Press Kit (EPK)")}</span>
          {t(". Showcase your cast, crew, and high-resolution media in one secure hub designed to attract investors, secure distribution, and win festival selections.")}
        </p>
      </div>

      <div id="epk-features-section" className="tw-relative" style={{ overflowAnchor: 'none' }}>

        {/* 2. STICKY TOP: Roles Nav */}
        <div className="tw-sticky tw-top-0 tw-z-50 tw-bg-midnight/95 tw-py-4 tw-backdrop-blur-xl tw-border-b tw-border-white/10 tw-shadow-2xl">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-px-4 lg:tw-hidden">
            <label className="tw-mb-2 tw-text-xs tw-font-semibold tw-text-gray-300 tw-uppercase tw-tracking-widest tw-text-center">
              {t("Explore features for:")}
            </label>
            <select 
              value={activeRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="tw-w-full tw-max-w-[90vw] tw-rounded-xl tw-border-2 tw-border-[#FF00F5] tw-bg-midnight tw-px-4 tw-py-3 tw-text-center tw-text-base tw-font-bold tw-text-white tw-shadow-[0_0_15px_rgba(255,0,245,0.2)] focus:tw-border-[#FF00F5] focus:tw-outline-none focus:tw-ring-0"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{t(role)}</option>
              ))}
            </select>
          </div>

          <div className="tw-hidden lg:tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-4 tw-px-4">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`tw-rounded-full tw-border-2 tw-px-6 tw-py-2 tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-transition-all tw-duration-300 ${
                  activeRole === role
                    ? "tw-border-[#FF00F5] tw-bg-[#FF00F5] tw-text-white tw-shadow-[0_0_20px_rgba(255,0,245,0.4)]"
                    : "tw-border-white tw-bg-white tw-text-black hover:tw-border-[#FF00F5] hover:tw-bg-[#FF00F5]/10 hover:tw-text-[#FF00F5]"
                }`}
              >
                {t(role)}
              </button>
            ))}
          </div>
        </div>

        {/* 3. GSAP SCROLL ARENA */}
        <div key={activeRole} className="tw-mx-auto tw-flex tw-max-w-7xl tw-flex-col lg:tw-flex-row-reverse tw-px-6 tw-pt-10 tw-pb-32 tw-gap-12">
          
          {/* THE STICKY IMAGE CONTAINER */}
          <div className="tw-w-full lg:tw-w-1/2 tw-self-start tw-sticky tw-top-[110px] lg:tw-top-[15vh] tw-z-30 tw-h-[40svh] lg:tw-h-[70svh] tw-pointer-events-none tw-bg-transparent tw-pb-2 lg:tw-pb-0">
            
            <div 
              ref={imageContainerRef}
              className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-3 lg:tw-gap-6 tw-will-change-transform tw-p-2"
            >
              {activeFeatures[activeFeatureIndex]?.images.map((img, idx) => {
                const imageCount = activeFeatures[activeFeatureIndex].images.length;
                return (
                  <img
                    key={idx}
                    src={img}
                    alt={`${activeFeatures[activeFeatureIndex]?.title} view ${idx + 1}`}
                    className={`tw-w-full tw-max-w-full tw-object-contain tw-drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] ${
                      imageCount > 1 ? "tw-flex-1 tw-min-h-0 tw-max-h-[48%]" : "tw-h-full tw-max-h-full"
                    }`}
                  />
                );
              })}
            </div>

          </div>

          {/* CONTENT TEXT */}
          <div 
            ref={textColumnRef}
            className="tw-w-full lg:tw-w-1/2 tw-flex tw-flex-col tw-z-10"
            style={{ overflowAnchor: "none" }}
          >
            {activeFeatures.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => {
                  if (el) featureRefs.current[index] = el;
                }}
                // FIX: Updated padding to calc(40svh+130px) to keep text 20px below the newly positioned image container
                className="tw-flex tw-flex-col tw-justify-start lg:tw-justify-center tw-pt-[calc(40svh+130px)] lg:tw-pt-0 tw-min-h-[100svh] tw-will-change-transform"
              >
                
                <div className="tw-flex tw-flex-row md:tw-flex-col tw-items-center md:tw-items-start tw-gap-3 md:tw-gap-0 tw-mb-4 md:tw-mb-0">
                  <div className="tw-flex tw-shrink-0 tw-h-12 tw-w-12 md:tw-h-16 md:tw-w-16 tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#FF00F5]/20 tw-border tw-border-[#FF00F5]/30 tw-backdrop-blur-sm md:tw-mb-6">
                    <FontAwesomeIcon icon={feature.icon} className="tw-text-xl md:tw-text-3xl tw-text-[#FF00F5]" />
                  </div>
                  <h3 className="tw-text-xl sm:tw-text-2xl md:tw-text-4xl lg:tw-text-5xl tw-font-extrabold tw-leading-tight tw-tracking-tight tw-text-[#FF00F5] md:tw-mb-4 tw-whitespace-normal">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="tw-text-lg md:tw-text-xl tw-text-gray-200 tw-leading-relaxed tw-font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div> 
    </div>
  );
};

export default LandingEpkIntroductions;