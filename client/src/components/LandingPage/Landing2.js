import React from "react";

import starPhoto from "../../images/star.png";

import movie5 from "../../images/movies/movie5.jpg";
import avatar from "../../images/avatar.jpg";
import avatar2 from "../../images/avatar.jpeg";

import comingSoon from "../../images/comingSoon.png";

const Landing2 = () => {
  return (
    <>
      <div className="landing2 tw-m-auto tw-flex tw-max-w-full tw-flex-col tw-gap-4 tw-space-x-10 tw-px-10 tw-pt-4 tw-pb-4 md:tw-flex-row lg:tw-grid-cols-2 lg:tw-pt-20 lg:tw-pb-5">
        {/* Left Side */}
        <div className=" tw-mt-14 tw-grid tw-h-[60vh] tw-grid-cols-3 tw-grid-rows-6 tw-pr-0">
          <div className="tw-pt-8 tw-pl-11 md:tw-ml-24">
            <img
              className="tw-row-span-1 tw-h-32 tw-object-right tw-pb-16 tw-pr-2 sm:tw-mr-8 lg:tw-w-42 "
              src={starPhoto}
              alt="/"
            />
          </div>
          <img
            className="tw-row-span-1 tw-h-full tw-w-full tw-object-cover tw-p-2"
            src={movie5}
            alt="/"
          />
          <img
            className="tw-row-span-2 tw-h-full tw-w-full tw-object-center tw-pt-10 tw-pl-2"
            src={comingSoon}
            alt="/"
          />
          <img
            className="tw-row-span-3 tw-h-1/2 tw-w-full tw-object-cover tw-p-2 tw-pt-2"
            src={avatar2}
            alt="/"
          />
          <img
            className="tw-row-span-3 tw-h-full tw-w-full tw-object-cover tw-p-2"
            src={avatar}
            alt="/"
          />
        </div>
        {/* Right Side */}
        <div className="tw-flex tw-h-full tw-w-4/5  tw-flex-col tw-text-center ">
          <h3 className=" tw-mb-0 tw-text-5xl tw-font-bold md:tw-text-6xl ">
            Film.Marketing.Refined.
          </h3>

          <p className=" tw-mt-10 tw-mr-20 tw-ml-20 tw-pb-6  tw-text-center tw-text-3xl  lg:tw-mb-20 ">
            KinoKlik EPK is your film's online hub, like a digital flyer,
            allowing you to promote your film to producers, distributors, film
            festivals and investors <br /> (for free).
          </p>
          <div className="tw-text-center">
            <button className="tw-rounded-xl tw-border-black tw-bg-black tw-p-3 tw-text-white hover:tw-shadow-xl">
              Create EPK
            </button>
          </div>
        </div>
      </div>
      {/*  <div className="landing2">
                <h2 className='landing2Title'><b>Promoting and selling your film doesn't absolutely,
                    necessarily have to be complicated...</b></h2>
                <div className='landing2leftColumn'>
                    <img className="landing2EPKImg" src={img} alt=""></img>
                </div>
                <div className='landing2rightColumn'>
                    <p className='landing1introText'>With KinoKlik's free<b> Electronic Press Kit Software</b>,
                        simply upload your artwork to the Film EPK page and share the link with Film Festivals,
                        Sales Agents and Distributors around the world to promote your film and measure your
                        film's engagement via powerful insights on your film!</p>
                </div>
                <div className='createFilmPagePart'>
                    <div className='landing2leftColumn1'>
                        <img className="landing2CreateImg" src={img1} alt=""></img>
                    </div>
                    <div className='landing2rightColumn1'>
                        <h2 className='landing2Title'><b>Create a free Film Project!</b></h2>
                        <p className='landing2introText'>Create a free online Film Page, like a hub for your
                            film, enabling your audience to engage and to support your film!</p>
                        <button className='CreateFilmPage'>Create Film Page</button>
                    </div>
                    <br />
                </div>
    </div> */}
    </>
  );
};
export default Landing2;
