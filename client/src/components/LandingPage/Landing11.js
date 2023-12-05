import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing11 = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(inputRef.current, {
      scrollTrigger: {
        trigger: inputRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart pause resume pause",
      },
      width: "0", // Start from zero width
      opacity: 0, // Start from fully transparent
      duration: 1, // Duration of the animation
      ease: "power1.out",
    });
  }, []);

  return (
    <div className='tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-py-16 md:tw-flex-row'>
      <div className=' tw-w-2/4 tw-overflow-hidden md:tw-w-1/4'>
        <input
          ref={inputRef}
          type='email'
          name='email'
          required
          placeholder={t("Your-email@Example.com")}
          className='tw-w-full tw-border-0 tw-border-b-4 tw-border-b-midnight focus:tw-border-midnight focus:tw-ring-0'
        />
      </div>
      <div className='tw-w-2/4 tw-text-center md:tw-w-1/4'>
        <button className='tw-mt-8 tw-rounded-3xl tw-bg-midnight tw-p-3 tw-font-bold tw-text-white tw-duration-200 hover:tw-bg-violet-600 md:tw-mt-0'>
          {t("Sign up for newsletter")}
        </button>
      </div>
    </div>
  );
};

export default Landing11;
