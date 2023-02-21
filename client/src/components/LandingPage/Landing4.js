import React from "react";
import southPaw from "../../images/movies/SouthPaw.png";

const Landing4 = () => {
  return (
    <div className="landing4 tw-h-[80vh] tw-items-center tw-justify-center lg:tw-pt-32">
      <div className="tw-text-center tw-text-5xl tw-font-bold">
        Introducing KinoKlik EPK
      </div>
      <div className="tw-mx-32 tw-py-2 tw-pl-32 tw-pr-32 tw-text-center sm:tw-text-xl lg:tw-text-4xl">
        <p>a free film marketing software</p>
      </div>
      <div className="  ">
        <img
          src={southPaw}
          className="tw-h-full tw-w-full tw-overflow-visible tw-px-20 tw-pt-20 "
          alt="Boxer "
        />
        <div className="tw-h-32 tw-bg-midnight"></div>
      </div>
    </div>
  );
};

export default Landing4;
