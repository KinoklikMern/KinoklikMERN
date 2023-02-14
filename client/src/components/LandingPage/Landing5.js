import React from "react";
import dashboard from "../../images/dashBoard.png";
import TvImage from "../../images/TV.png";

const Landing5 = () => {
  return (
    <div className=" bg-midnight pt-72 pb-10 ">
      <div className="text-6xl font-bold text-white  p-20  text-center ">
        <div className=" "> One EPK.</div>
        <div className=" ">All Film Details.</div>
      </div>
      <div className="flex space-x-14 ">
        <div className="w-7/12 bg-gray-800 rounded-3xl p-6 ">
          <p className="text-white text-4xl font-bold p-4">Film Details</p>
          <p className="text-white text-2xl p-4 ">
            This section contains the main cast and crew you want to hire,
            production/release year and film length in minutes.
          </p>
          <div className=" bg-no-repeat relative">
            <img className="h-full w-4/5 absolute" src={TvImage} alt="Left Im" /> 
            <img className="h-2/5 w-8/12 pl-20 pb-10 ml-10 " src={dashboard} alt="/"/>
          </div>
        </div>
        <div className="w-5/12  ">
          <div className=" w-4/5 h-full border border-black bg-white rounded-3xl relative">
            <div className="w-11/12 h-[94%] bg-midnight rounded-3xl text-white absolute   left-0 top-5  ">
              <p className=" px-14 text-3xl text-justify py-64 ">
                From the main Filmmaker EPK Dashboard, KinoKlik allows you to
                upload all your film details in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing5;
