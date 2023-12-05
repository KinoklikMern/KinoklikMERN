import React, { useRef, useEffect } from "react";
//import "./Landing5.css";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing9 = () => {
  const { t } = useTranslation();
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const amazingRef = useRef(null);
  const stepHeadlineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation for "Amazing"
    const animateAmazing = () => {
      const tl = gsap.timeline();
      tl.to(amazingRef.current, {
        rotation: 30,
        duration: 0.5,
        ease: "power1.inOut",
      })
        .to(amazingRef.current, {
          rotation: 0,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(amazingRef.current, {
          rotation: 30,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(amazingRef.current, {
          rotation: 0,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(amazingRef.current, {
          rotation: 15,
          duration: 0.5,
          ease: "power1.inOut",
        });
    };

    ScrollTrigger.create({
      trigger: amazingRef.current,
      start: "top center",
      onEnter: animateAmazing,
      onEnterBack: animateAmazing,
    });

    // Animations for steps
    const steps = [step1Ref, step2Ref, step3Ref];

    steps.forEach((step) => {
      const element = step.current;
      const headline = element.querySelector("h2");
      const paragraph = element.querySelector("p"); // Get the paragraph inside the step

      // Initial state for paragraph
      gsap.set(paragraph, { color: "#fff", opacity: 1 });

      // Mouse enter animation - reveal paragraph and change to purple
      element.addEventListener("mouseenter", () => {
        gsap.to(element, { backgroundColor: "#fff", duration: 0.3 }); // Purple color
        gsap.to(headline, { color: "#1E0039", duration: 0.3 });
        gsap.to(paragraph, {
          color: "#1E0039",
          opacity: 1,
          duration: 0.3,
        });
      });

      // Mouse leave animation - hide paragraph and change back to original color
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { backgroundColor: "#1E0039", duration: 0.3 });
        gsap.to(headline, { color: "#fff", duration: 0.3 });
        gsap.to(paragraph, { color: "#fff", opacity: 1, duration: 0.3 });
      });
    });
  }, []);

  return (
    <>
      <div>
        <div className='landing9 tw-mt-20 tw-flex tw-items-center tw-justify-center'>
          <p className='tw-text-center tw-text-2xl tw-font-bold tw-text-midnight md:tw-text-3xl'>
            {t(
              "Present and promote your film's vision to industry professionals"
            )}
            {t(" with KinoKlik EPK.")}
          </p>
        </div>

        <div className='tw-mt-12'>
          <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-10 tw-text-center lg:tw-flex-row lg:tw-space-x-20 lg:tw-space-y-0'>
            <div
              ref={step1Ref}
              className='tw-h-56 tw-w-72 tw-rounded-3xl tw-border tw-border-gray-400 tw-bg-midnight tw-p-8 tw-py-16'
            >
              <h2 className='tw-mb-4 tw-text-2xl tw-font-bold tw-text-white'>
                {t("Step 1.")}{" "}
              </h2>
              <p className='tw-text-xl tw-text-white'>
                {t("Create a free filmmaker account.")}
              </p>
            </div>
            <div
              ref={step2Ref}
              className='tw-h-56 tw-w-72 tw-rounded-3xl tw-border tw-border-gray-400 tw-bg-midnight tw-p-8 tw-py-16'
            >
              <h2 className='tw-mb-4 tw-text-2xl tw-font-bold tw-text-white'>
                {t("Step 2.")}{" "}
              </h2>
              <p className='tw-text-xl tw-text-white'>
                {t("Upload your film details to the EPK Page")}
              </p>
            </div>

            <div
              ref={step3Ref}
              className='tw-h-56 tw-w-72 tw-rounded-3xl tw-border tw-border-gray-400 tw-bg-midnight tw-p-8 tw-py-16'
            >
              <h2
                ref={stepHeadlineRef}
                className='tw-mb-4 tw-text-2xl tw-font-bold tw-text-white'
              >
                {t("Step 3.")}{" "}
              </h2>
              <p className='tw-text-xl tw-text-white'>
                {t(
                  "Share your film EPK page with the world and track interest!"
                )}
              </p>
            </div>
          </div>

          <div className='tw-mt-20 tw-flex tw-justify-center tw-text-center tw-text-lg tw-font-bold tw-text-midnight sm:tw-text-xl md:tw-text-4xl'>
            <p className='tw-pt-3'> {t("Are you ready to create")}</p>
            <div
              ref={amazingRef}
              className='align:tw-middle tw-mx-5 tw-rotate-12 tw-rounded-lg tw-border-2 tw-border-black tw-bg-white tw-p-2 tw-text-midnight md:tw-rounded-3xl md:tw-p-4'
            >
              {t("Amazing")}
            </div>
            <p className='tw-pt-3'> {t("film EPKs?")} </p>
          </div>
          <div className='tw-mb-20 tw-mt-20 tw-flex tw-grid-cols-2 tw-justify-center sm:tw-mt-6 '>
            <a
              className='tw-mr-4 tw-inline-block tw-rounded-xl tw-bg-midnight tw-px-5 tw-py-2 tw-text-2xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-900 focus:tw-outline-none'
              href='/uploadFepk'
            >
              {t("Create EPK")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing9;
