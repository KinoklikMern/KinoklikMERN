import React, { useRef, useEffect } from "react";
import image1 from "../../images/LandingPage/LongSynopsisBlurred.png";
import image2 from "../../images/LandingPage/CastCrewScreenShot.png";
import image3 from "../../images/LandingPage/AvatarFIghtingBird.png";
import image4 from "../../images/LandingPage/EPK_DashboardCoverSection.png";
import image5 from "../../images/LandingPage/ResourcesScreenshot.png";
import image6 from "../../images/LandingPage/SebastianCordobaDemoReel.png";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing5 = () => {
  const { t } = useTranslation();
  const sectionsRef = useRef([]);
  sectionsRef.current = [];
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionsRef.current.forEach((section, index) => {
      const img = section.querySelector("img");
      const text = section.querySelector("div");

      // Only applying the animation to the first section
      if (index === 0) {
        const animateIn = () => {
          gsap.fromTo(
            img,
            { x: "-50%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 1, ease: "power1.out" }
          );

          gsap.fromTo(
            text,
            { x: "50%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 1, ease: "power1.out" }
          );
        };

        ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=100",
          end: "bottom top+=100",
          onEnter: animateIn,
          onEnterBack: animateIn,
          toggleActions: "play none none none",
        });
      }
    });
    // Animations for lines and button
    gsap.from(line1Ref.current, {
      scrollTrigger: {
        trigger: line1Ref.current,
        start: "top bottom",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power1.out",
    });

    gsap.from(line2Ref.current, {
      scrollTrigger: {
        trigger: line2Ref.current,
        start: "top bottom",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      delay: 0.5,
    });

    gsap.from(buttonRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top bottom",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      delay: 1,
    });
  }, []);

  return (
    <div className="tw-bg-midnight">
      <div className="tw-py-20 tw-text-center tw-text-white ">
        <p className="tw-text-3xl tw-font-bold md:tw-text-5xl">
          {t("Introducing KinoKlik EPK")}
        </p>
        <p className="tw-mt-2 tw-text-lg md:tw-text-xl">
          {t("free film marketing software.")}
        </p>
      </div>

      <div className=" tw-flex tw-flex-col tw-items-center tw-gap-20 md:tw-px-7">
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10"
        >
          <img src={image1} alt="" className="tw-h-full md:tw-w-2/4" />
          <div className="md:tw-w-2/4">
            <p className="tw-mx-auto tw-rounded-xl tw-bg-[#3f2556] tw-p-5 tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl xl:tw-w-2/4">
              {t("Protect your film's Intelectual Property")} (IP){" "}
              {t("by blurring out any ")}
              {t("section you chose directly from your EPK dashboard.")}
            </p>
          </div>
        </div>

        <div className="tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10">
          <div className="md:tw-w-2/4">
            <p className="tw-mx-auto tw-rounded-xl tw-bg-[#3f2556] tw-p-5 tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl xl:tw-w-2/4">
              {t(
                "Add unlimited Actors information to your film EPK in the Cast &"
              )}
              {t(" Crew section.")}
            </p>
          </div>
          <img src={image2} alt="" className="tw-h-full md:tw-w-2/4" />
        </div>

        <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10">
          <img src={image3} alt="" className="tw-h-full md:tw-w-2/4" />
          <div className="md:tw-w-2/4">
            <p className="tw-mx-auto tw-rounded-xl tw-bg-[#3f2556] tw-p-5 tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl xl:tw-w-2/4">
              {t("Display unlimited film stills and posters!")}{" "}
            </p>
          </div>
        </div>

        <div className="tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10">
          <div className="md:tw-w-2/4">
            <p className="tw-mx-auto tw-rounded-xl tw-bg-[#3f2556] tw-p-5 tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl xl:tw-w-2/4">
              {t(
                "Control all information you display about your film directly from"
              )}
              {t(" your EPK Dashboard.")}
            </p>
          </div>
          <img src={image4} alt="" className="tw-h-full md:tw-w-2/4" />
        </div>

        <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10">
          <img src={image5} alt="" className="tw-h-full md:tw-w-2/4" />
          <div className="md:tw-w-2/4">
            <p className="tw-mx-auto tw-rounded-xl tw-bg-[#3f2556] tw-p-5 tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl xl:tw-w-2/4">
              {t(
                "Take advantage of the views and traffic to tell people what you"
              )}
              {t(
                " need for your film! You never know who has access to that red"
              )}
              {t(" Ferrari or hard-to-find rooftop infinity pool.")}
            </p>
          </div>
        </div>

        <div className="tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10">
          <div className="md:tw-w-2/4">
            <p className="tw-mx-auto tw-rounded-xl tw-bg-[#3f2556] tw-p-5 tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl xl:tw-w-2/4">
              {t(
                "Discover up-and-coming Actors eager to join your film project and"
              )}
              {t(
                " add them to your EPK. Follow, Star and Recommend Actors to other"
              )}
              {t(" filmmakers directly from their Actor Page!")}
            </p>
          </div>
          <img src={image6} alt="" className="tw-h-full md:tw-w-2/4" />
        </div>
      </div>

      <div className="tw-py-20 tw-text-center tw-text-white ">
        <p ref={line1Ref} className="tw-text-3xl tw-font-bold md:tw-text-4xl">
          {t("One KinoKlik account.")}
          <br />
        </p>
        <p ref={line2Ref} className="tw-text-3xl tw-font-bold md:tw-text-4xl">
          {t("All your films EPKs.")}
        </p>
        <a
          ref={buttonRef}
          className="tw-mt-12 tw-inline-block tw-rounded-lg tw-bg-white tw-px-10 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-midnight tw-shadow-lg tw-duration-200 hover:tw--translate-y-0.5 hover:tw-bg-violet-900 hover:tw-text-white focus:tw-outline-none"
          href="/uploadFepk"
        >
          {t("Create EPK")}
        </a>
      </div>
    </div>
  );
};

export default Landing5;
