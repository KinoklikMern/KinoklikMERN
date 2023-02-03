import React from "react";
//import vacation from "../img/vacation.jpg"
//import logo from "../img/logo.png"
import moviesPhoto from "../../images/landing.png";
import img from "../../images/EPK.jpg";

const Landing2N = () => {
  return (
    <div >
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
            
            <h4 className="mt-2  text-midnight text-justify sm:mt-4 sm:text-xl">
              With KinoKlik's free<b> Electronic Press Kit Software</b>, simply
              upload your artwork to the Film EPK page and share the link with
              Film Festivals, Sales Agents and Distributors around the world to
              promote your film and measure your film's engagement via powerful
              insights on your film!
            </h4>
            {/*<div className="mt-4 sm:mt-6 grid-cols-2">
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
            </div> */}
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
    </div>
  );
};

export default Landing2N;
