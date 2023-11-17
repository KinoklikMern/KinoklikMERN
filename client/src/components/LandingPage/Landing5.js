import React from "react";
import image1 from "../../images/LandingPage/LongSynopsisBlurred.png";
import image2 from "../../images/LandingPage/CastCrewScreenShot.png";
import image3 from "../../images/LandingPage/AvatarFIghtingBird.png";
import image4 from "../../images/LandingPage/EPK_DashboardCoverSection.png";
import image5 from "../../images/LandingPage/LongSynopsisBlurred.png";
import image6 from "../../images/LandingPage/SebastianCordobaDemoReel.png";

const Landing5 = () => {
  return (
    <div className='tw-bg-midnight'>
      <div className='tw-py-20 tw-text-center tw-text-white '>
        <p className='tw-text-3xl tw-font-bold md:tw-text-5xl'>
          Introducing KinoKlik EPK
        </p>
        <p className='tw-mt-2 tw-text-lg md:tw-text-xl'>
          free film marketing software.
        </p>
      </div>

      <div className=' tw-flex tw-flex-col tw-items-center tw-gap-20'>
        <div className='tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10'>
          <img src={image1} alt='' className='tw-h-full md:tw-w-2/4' />
          <div className='tw-rounded-xl tw-bg-[#3f2556] tw-p-5 md:tw-w-2/4'>
            <p className='tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl'>
              Protect your film's Intelectual Property (IP) by blurring out any
              section you chose directly from your EPK dashboard.
            </p>
          </div>
        </div>

        <div className='tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10'>
          <div className='tw-rounded-xl tw-bg-[#3f2556] tw-p-5 md:tw-w-2/4'>
            <p className='tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl'>
              Add unlimited Actors information to your film EPK in the Cast &
              Crew section.
            </p>
          </div>
          <img src={image2} alt='' className='tw-h-full md:tw-w-2/4' />
        </div>

        <div className='tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10'>
          <img src={image3} alt='' className='tw-h-full md:tw-w-2/4' />
          <div className='tw-rounded-xl tw-bg-[#3f2556] tw-p-5 md:tw-w-2/4'>
            <p className='tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl'>
              Display unlimited film stills and posters!{" "}
            </p>
          </div>
        </div>

        <div className='tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10'>
          <div className='tw-rounded-xl tw-bg-[#3f2556] tw-p-5 md:tw-w-2/4'>
            <p className='tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl'>
              Control all information you display about your film directly from
              your EPK Dashboard.
            </p>
          </div>
          <img src={image4} alt='' className='tw-h-full md:tw-w-2/4' />
        </div>

        <div className='tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10'>
          <img src={image5} alt='' className='tw-h-full md:tw-w-2/4' />
          <div className='tw-rounded-xl tw-bg-[#3f2556] tw-p-5 md:tw-w-2/4'>
            <p className='tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl'>
              Take advantage of the views and traffic to tell people what you
              need for your film! You never know who has access to that red
              Ferrari or hard-to-find rooftop infinity pool.
            </p>
          </div>
        </div>

        <div className='tw-flex tw-w-full tw-flex-col-reverse tw-items-center tw-gap-5 tw-px-5 md:tw-flex-row md:tw-px-10'>
          <div className='tw-rounded-xl tw-bg-[#3f2556] tw-p-5 md:tw-w-2/4'>
            <p className='tw-text-center tw-font-semibold tw-text-white md:tw-text-2xl'>
              Discover up-and-coming Actors eager to join your film project and
              add them to your EPK. Follow, Star and Recommend Actors to other
              filmmakers directly from their Actor Page!
            </p>
          </div>
          <img src={image6} alt='' className='tw-h-full md:tw-w-2/4' />
        </div>
      </div>

      <div className='tw-py-20 tw-text-center tw-text-white '>
        <p className='tw-text-3xl tw-font-bold md:tw-text-4xl'>
          One KinoKlik account.
          <br />
          All your films EPKs.
        </p>
        <a
          className='tw-mt-12 tw-inline-block tw-rounded-lg tw-bg-white tw-px-10 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-midnight tw-shadow-lg tw-duration-200 hover:tw--translate-y-0.5 hover:tw-bg-violet-900 hover:tw-text-white focus:tw-outline-none'
          href='/uploadFepk'
        >
          Create EPK
        </a>
      </div>
    </div>
  );
};

export default Landing5;
