import React from "react";
import southPaw from "../../images/movies/SouthPaw.png";

const Landing4 = () => {
  return (
    <div className="landing4 justify-center items-center lg:pt-30 h-[65vh]">
      <div className="text-5xl font-bold text-center">
        Introducing KinoKlik EPK
      </div>
      <div className="sm:text-xl lg:text-4xl text-center pl-32 pr-32 py-2 mx-32">
        <p>a free film marketing software</p>
      </div>
      <div className="  ">
        <img src={southPaw} className="w-full h-full px-20 pt-20 overflow-visible " alt="Boxer " />
        <div className="h-32 bg-midnight"></div>
      </div>
    </div>
  );
};

export default Landing4;
