import React, { useRef, useEffect } from 'react';
import heroImage from '../../images/LandingPage_Hero.png';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

const Landing1 = () => {
  const { t } = useTranslation();
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
        
    tl.from(headingRef.current, { opacity: 0, y: -50, duration: 1 })
      .from(subHeadingRef.current, { opacity: 0, y: -30, duration: 1 }, '-=0.5')
      .from(imageRef.current, { opacity: 0, duration: 1.5 }, '-=0.5');
    
    return () => tl.kill();
  }, []);

  return (
    <>
      <div className="tw-bg-midnight lg:tw-h-[100vh]">
        <div className="md:tw-p-24">
          <div className="tw-flex tw-w-full tw-items-center">
            <div className="tw-w-full tw-p-7 lg:tw-w-2/4">
              <h1
                ref={headingRef}
                className="tw-mt-6 tw-text-start tw-font-bold tw-text-white min-[430px]:tw-text-[2.50rem] sm:tw-text-6xl md:tw-text-7xl"
              >
                {t('Film marketing.')}
                <br />
                <span ref={subHeadingRef}>{t('Refined.')}</span>
              </h1>
              <p className="tw-my-12 tw-text-xl tw-font-semibold tw-text-white md:tw-text-2xl">
                {t(
                  "Promote your film to industry professionals with KinoKlik's free"
                )}
                <br />
                <span className="tw-text-[#FF00F5]">
                  {t('Electronic Press Kit')}
                </span>{' '}
                {t('software!')}
              </p>
              <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between sm:tw-mt-6 md:tw-justify-normal">
                <a
                  className="tw-inline-block tw-rounded-lg tw-bg-[#FF00F5] tw-px-3 tw-py-1 tw-text-base tw-font-bold tw-text-midnight tw-shadow-lg hover:tw--translate-y-0.5  hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-xl md:tw-mr-4 md:tw-px-4 md:tw-py-2 md:tw-tracking-wider"
                  href="/signup"
                >
                  {t('Create EPK')}
                </a>
                <a
                  className="tw-inline-block tw-rounded-lg tw-bg-white tw-px-3 tw-py-1 tw-text-base tw-font-bold tw-text-[#1E0039] tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-xl md:tw-px-4 md:tw-py-2 md:tw-tracking-wider"
                  href="/catalog"
                >
                  {t('Browse EPKs')}
                </a>
              </div>
            </div>

            <div className="tw-invisible tw-mx-auto tw-w-0 lg:tw-visible lg:tw-w-2/4">
              <img
                  ref={imageRef}
                  src={heroImage}
                  alt=""
                  className="tw-w-full tw-h-auto tw-object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing1;