import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

const LandingHero = () => {
  const { t } = useTranslation();
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        
    tl.from(tagRef.current, { opacity: 0, y: -20, duration: 0.8 })
      .from(headingRef.current, { opacity: 0, y: -30, duration: 0.8 }, '-=0.4')
      .from(subHeadingRef.current, { opacity: 0, y: -20, duration: 0.8 }, '-=0.4')
      .from(buttonsRef.current, { opacity: 0, y: -20, duration: 0.8 }, '-=0.4');
    
    return () => tl.kill();
  }, []);

  return (
    <main className="tw-relative tw-flex tw-min-h-[90vh] tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden tw-bg-midnight tw-px-6 tw-pt-24 tw-pb-16 md:tw-pt-32 md:tw-pb-32">
      
      {/* Ambient Glows */}
      <div className="tw-absolute tw-left-1/4 tw-top-1/4 tw--z-10 tw-h-[500px] tw-w-[500px] tw-rounded-full tw-bg-[#FF00F5]/10 tw-blur-[120px] tw-pointer-events-none"></div>
      <div className="tw-absolute tw-right-1/4 tw-bottom-1/4 tw--z-10 tw-h-[600px] tw-w-[600px] tw-rounded-full tw-bg-[#3f2556]/30 tw-blur-[150px] tw-pointer-events-none"></div>

      <section className="tw-z-10 tw-mx-auto tw-flex tw-max-w-4xl tw-flex-col tw-items-center tw-text-center">
        
        {/* Category Tag */}
        <div ref={tagRef} className="tw-mb-4 tw-text-xs tw-uppercase tw-tracking-[0.2em] tw-text-[#FF00F5] tw-opacity-90 md:tw-mb-8 md:tw-text-sm">
          {t('Industry Standard EPK Builder')}
        </div>

        {/* Massive Headline */}
        <h1 ref={headingRef} className="tw-mb-6 tw-text-balance tw-text-4xl tw-font-extrabold tw-leading-[1.05] tw-tracking-tight tw-text-white md:tw-mb-10 md:tw-text-7xl lg:tw-text-[5.5rem]">
          {t("Manage your film's entire press kit, all in one place.")}
        </h1>

        {/* Constrained Subheadline */}
        <p ref={subHeadingRef} className="tw-mb-8 tw-max-w-2xl tw-text-pretty tw-text-base tw-font-medium tw-leading-relaxed tw-text-gray-300 md:tw-mb-16 md:tw-text-xl">
          {t("Stop emailing massive PDF files and broken Google Drive links. KinoKlik lets you build stunning, interactive Electronic Press Kits (EPKs) to pitch investors, secure distribution, and build your audience.")}
        </p>

        {/* Centered Action Cluster */}
        <div ref={buttonsRef} className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 sm:tw-w-auto sm:tw-flex-row md:tw-gap-6">
          
          {/* Primary Action */}
          <a
            href="/signup"
            className="tw-group tw-relative tw-z-10 tw-flex tw-w-full tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-xl tw-bg-white tw-px-8 tw-py-4 tw-text-lg tw-font-bold tw-tracking-wide tw-text-[#FF00F5] tw-shadow-[0_20px_40px_rgba(0,0,0,0.4)] tw-transition-all tw-duration-300 hover:tw-scale-[1.02] active:tw-scale-[0.98] sm:tw-w-auto"
          >
            <div className="tw-absolute tw-inset-0 tw-bg-[#FF00F5]/10 tw-opacity-0 tw-transition-opacity tw-duration-300 group-hover:tw-opacity-100"></div>
            <span className="tw-relative tw-z-10">{t('Build Your Free EPK')}</span>
          </a>

          {/* Secondary Action */}
          <a
            href="/catalog"
            className="tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#FF00F5] tw-px-8 tw-py-4 tw-text-lg tw-font-bold tw-tracking-wide tw-text-white tw-shadow-[0_0_20px_rgba(255,67,167,0.3)] tw-transition-all tw-duration-300 hover:tw-brightness-110 hover:tw-shadow-[0_0_30px_rgba(255,67,167,0.5)] active:tw-scale-[0.98] sm:tw-w-auto"
          >
            {t('Browse our catalogue')}
          </a>
        </div>

      </section>
    </main>
  );
};

export default LandingHero;