import React from "react";
import image from "../../images/LandingPage/DeadEndEPKScreenshot.png";

const Landing2 = () => {
  return (
    <>
      <div className='tw-w-full tw-bg-gradient-to-t tw-from-white tw-to-[#1e0039]'>
        <img
          src={image}
          alt='EPK'
          className='tw-h-full tw-w-[50rem] md:-tw-translate-y-14'
        />
      </div>
    </>
  );
};
export default Landing2;
