import React from "react";
import dashboard from "../../images/dashBoard.png";

const Landing52 = () => {
  return (
    <div className=" landing5  bg-midnight pb-20">
      <div className="bg-midnight grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-2 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img
              className="bg-TvImage bg-no-repeat bg-center h-64 mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64   object-center lg:hidden"
              src={dashboard}
              alt="Movies"
            />
            <h1 className="mt-6 text-2xl font-bold text-white-900 sm:mt-8 sm:text-3xl lg:text-4xl xl:text-5xl">
              What if you could promote your film to the world, for free?
            </h1>
            <h4 className="mt-2  text-white text-justify sm:mt-4 sm:text-xl">
              Whether you have just an idea for a movie, shot the trailer, or
              your film's in the can, use our free
              <b> Electronic Press Kit Software</b> to promote your film
              directly to industry professionals and your audience！
            </h4>
            <div className="mt-4 sm:mt-6 grid-cols-2">
              <a
                className="inline-block px-4 py-2 rounded-lg bg-white hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none  tracking-wider font-bold text-xl text-midnight shadow-lg sm:text-base mr-4"
                href="/"
              >
                Create EPK
              </a>
              <a
                className="inline-block px-4 py-2 rounded-lg bg-violet-800 hover:bg-violet-600 hover:-translate-y-0.5 focus:outline-none tracking-wider font-bold text-xl text-white shadow-lg sm:text-base"
                href="/"
              >
                Browse EPKs
              </a>
            </div>
          </div>
        </div>
    
          <div className="bg-TvImage bg-no-repeat bg-center hidden relative  ml-20 p-10  lg:block 2xl:col-span-3 ">
         
            <img
              className="  lg:p-20 ml-32 h-full object-cover object-center   pt-0 "
              src={dashboard}
              alt="Dashboard"
            />
          </div>
       
      </div>
      {/* <div className="bg-white"> <Landing2N/></div> */}
    </div>
  );
};

export default Landing52;
