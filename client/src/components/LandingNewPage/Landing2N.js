import React from "react";
import starPhoto from "../../images/star.png";
import movie2 from "../../images/movies/movie2.jpeg";
import movie5 from "../../images/movies/movie5.jpg";
import avatar from "../../images/avatar.jpg";
import avatar2 from "../../images/avatar.jpeg";

import comingSoon from "../../images/comingSoon.png";
import img from "../../images/EPK.jpg";

const Landing2N = () => {
  return (
    <div className="landing2 max-w-full m-auto pt:4 pb:4 lg:pt-20 lg:pb-16 px-10 flex flex-col md:flex-row lg:grid-cols-2 gap-4 space-x-10">
      {/* Left Side */}
      <div className=" grid grid-cols-3 grid-rows-6 h-[60vh] pr-0 mt-14">
        <div className="pt-8 pl-11 md:ml-24">
          <img
            className="row-span-1 sm:mr-8 object-right lg:w-42 h-32    pb-16 "
            src={starPhoto}
            alt="/"
          />
        </div>
        <img
          className="row-span-1 object-cover w-full h-full p-2"
          src={movie5}
          alt="/"
        />
        <img
          className="row-span-2 object-center w-full h-full  pt-10 "
          src={comingSoon}
          alt="/"
        />
        <img
          className="row-span-3 object-cover w-full h-1/2 pt-8 p-2"
          src={avatar2}
          alt="/"
        />
        <img
          className="row-span-3 object-cover w-full h-full p-2"
          src={avatar}
          alt="/"
        />
      </div>
      {/* Right Side */}
      <div className="flex flex-col h-full  w-4/5 text-center ">
        <h3 className=" text-5xl md:text-6xl font-bold mb-0 md:mb-10">
          Film.Marketing.Refined.
        </h3>

        <p className=" text-3xl text-center mt-10 pb-6  mr-20 ml-20  lg:mb-20 ">
          KinoKlik EPK is your film’s online hub, like a digital flyer, allowing
          you to promote your film to producers, distributors, film festivals
          and investors <br /> (for free).
        </p>
        <div className="text-center">
          <button className="bg-black   text-white border-black rounded-xl hover:shadow-xl p-3">
            Create EPK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing2N;
