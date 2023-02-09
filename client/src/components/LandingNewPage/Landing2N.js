import React from "react";
//import vacation from "../img/vacation.jpg"
//import logo from "../img/logo.png"
import starPhoto from "../../images/star.png";
import movie2 from "../../images/movies/movie2.jpeg";
import movie5 from "../../images/movies/movie5.jpg"
import avatar from "../../images/avatar.jpg"
import avatar2 from "../../images/avatar.jpeg"

import comingSoon from "../../images/comingSoon.jpg";
import img from "../../images/EPK.jpg";

const Landing2N = () => {
  return (
    <div className="max-w-full m-auto pt-20 pb-16 px-10 flex lg:grid-cols-2 gap-4 space-x-10">
      {/* Left Side */}
      <div className=" grid grid-cols-3 grid-rows-6 h-[60vh] pr-2 mt-14">
        <div className="pt-8 pl-8 ml-24">
          <img
            className="row-span-1 object-right w-42 h-32    pb-16 "
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
          className="row-span-2 object-center w-full h-full pr-4 pt-10 "
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
      <div className="flex flex-col h-full text-center  mr-14 ml-14">
        <h3 className=" text-5xl md:text-6xl font-bold mb-10">
          Film.Marketing.Refined.
        </h3>

        <p className=" text-3xl text-center mt-10 pb-6 mr-14 ml-14">
          KinoKlik EPK is your film’s online hub, like a digital flyer, allowing
          you to promote your film to producers, distributors, film festivals
          and investors <br /> (for free).
        </p>
        <div className="text-center">
          <button className="bg-black  text-white border-black hover:shadow-xl p-4">
            Create EPK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing2N;

{
  /*  <div >
    <h1 className="mt-6 text-2xl font-bold text-center text-midnight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              Promoting and selling your film doesn't absolutely, necessarily
              have to be complicated...
            </h1>
      <div className="bg-white grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-2 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img
              className="h-64 mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
              src={img}
              alt="Movies"
            />
            <h2 className="">Film.Marketing.Refined.</h2>
            <h4 className="mt-2  text-midnight text-justify sm:mt-4 sm:text-xl">
            KinoKlik EPK is your film’s online hub, like a digital flyer, allowing you to promote your film to producers, distributors, film festivals and investors
            (for free). 
            
            
  </h4> 
            <div className="mt-4 sm:mt-6 grid-cols-2">
              <a
                className="inline-block px-4 py-2 rounded-lg bg-violet-800 hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none  uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base mr-4"
                href="/"
              >
                Create Film Project
              </a>
              <a
                className="inline-block px-4 py-2 rounded-lg bg-violet-800 hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base"
                href="/"
              >
                Browse Films
              </a>
            </div> 
          </div>
        </div>
        <div className=" hidden relative lg:block 2xl:col-span-3 ">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center "
            src={img}
            alt="Movies"
          />
        </div>
      </div>
    </div>*/
}
