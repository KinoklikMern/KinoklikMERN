import React, { useState } from "react";
import image1 from "../../images/LandingPage/Avatar1.png";
import image2 from "../../images/LandingPage/ActorPageScreenShot.png";

const Landing3 = () => {
  const [selectedCategory, setSelectedCategory] = useState("Filmmakers");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className='tw-items-center tw-justify-center tw-py-10'>
        <div className='tw-text-center tw-text-5xl tw-font-bold'>
          What is an EPK?
        </div>
        <div className='tw-mx-12 tw-py-10 tw-text-justify tw-text-lg tw-text-midnight md:tw-text-2xl lg:tw-px-40'>
          <p>
            An EPK, or{" "}
            <span className='tw-font-bold'>Electronic Press Kit</span> is
            typically a PDF document displaying information about your film,
            such as a poster, short, medium and long synopsis, cast and crew
            headshots and biographies, information to help film industry
            professionals visualize the film you want to create.
            <br />
            <br />
            It's now {new Date().getFullYear()}. We now have KinoKlik EPK
            software! For free!
          </p>
        </div>
        <div className='tw-my-10 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-5'>
          <a
            href='#Filmmakers'
            onClick={() => handleCategoryClick("Filmmakers")}
            className={`tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold ${
              selectedCategory === "Filmmakers"
                ? "tw-bg-midnight tw-text-white"
                : "tw-text-midnight hover:tw-bg-midnight hover:tw-text-white"
            }`}
          >
            Filmmakers
          </a>
          <a
            href='#Actors'
            onClick={() => handleCategoryClick("Actors")}
            className={`tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold ${
              selectedCategory === "Actors"
                ? "tw-bg-midnight tw-text-white"
                : "tw-text-midnight hover:tw-bg-midnight hover:tw-text-white"
            }`}
          >
            Actors
          </a>
          <a
            href='#Distributors'
            onClick={() => handleCategoryClick("Distributors")}
            className={`tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold ${
              selectedCategory === "Distributors"
                ? "tw-bg-midnight tw-text-white"
                : "tw-text-midnight hover:tw-bg-midnight hover:tw-text-white"
            }`}
          >
            Distributors
          </a>
          <a
            href='#SalesAgents'
            onClick={() => handleCategoryClick("Sales Agents")}
            className={`tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold ${
              selectedCategory === "Sales Agents"
                ? "tw-bg-midnight tw-text-white"
                : "tw-text-midnight hover:tw-bg-midnight hover:tw-text-white"
            }`}
          >
            Sales Agents
          </a>
          <a
            href='#Investors'
            onClick={() => handleCategoryClick("Investors")}
            className={`tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold ${
              selectedCategory === "Investors"
                ? "tw-bg-midnight tw-text-white"
                : "tw-text-midnight hover:tw-bg-midnight hover:tw-text-white"
            }`}
          >
            Investors
          </a>
          <a
            href='#FilmFestivals'
            onClick={() => handleCategoryClick("Film Festivals")}
            className={`tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold ${
              selectedCategory === "Film Festivals"
                ? "tw-bg-midnight tw-text-white"
                : "tw-text-midnight hover:tw-bg-midnight hover:tw-text-white"
            }`}
          >
            Film Festivals
          </a>
        </div>

        <div className='tw-mx-5 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-12'>
          <div className='tw-h-80 tw-w-full tw-rounded-2xl tw-bg-white tw-p-4 tw-shadow-[4.0px_8.0px_8.0px_rgba(30,0,57,0.90)] md:tw-w-60'>
            <div className='tw-h-2/4 tw-text-xl tw-text-midnight'>
              {selectedCategory === "Filmmakers" ? (
                `Present your film idea like a pro to industry professionals!`
              ) : (
                <>
                  Present your <span className='tw-font-bold'>Actor Page</span>{" "}
                  like a pro to industry professionals with Headshots, Demo
                  Reel, and more!
                </>
              )}
            </div>
            <div className='tw-h-2/4'>
              <img
                src={selectedCategory === "Filmmakers" ? image1 : image2}
                alt='EPK'
                className='tw-h-full tw-w-full tw-rounded-xl tw-object-cover'
              />
            </div>
          </div>
          <div className='tw-h-80 tw-w-full tw-rounded-2xl tw-bg-white tw-p-4 tw-shadow-[4.0px_8.0px_8.0px_rgba(30,0,57,0.90)] md:tw-w-60'>
            <div className='tw-h-2/4 tw-text-xl tw-text-midnight'>
              Measure the industry's interest in your film by tracking your EPK
              page data!
            </div>
            <div className='tw-flex tw-h-2/4 tw-items-center tw-justify-evenly tw-rounded-xl tw-bg-midnight'>
              <i class='fa-solid fa-dollar-sign tw-text-3xl tw-text-white'></i>
              <i class='fa-solid fa-plus tw-text-3xl tw-text-white'></i>
              <i class='fa-solid fa-star tw-text-3xl tw-text-white'></i>
            </div>
          </div>
          <div className='tw-h-80 tw-w-full tw-rounded-2xl tw-bg-white tw-p-4 tw-shadow-[4.0px_8.0px_8.0px_rgba(30,0,57,0.90)] md:tw-w-60'>
            <div className='tw-h-2/4 tw-text-xl tw-text-midnight'>
              Your film's cast & crew social media audience is{" "}
              <span className='tw-font-bold'>automatically integrated</span> in
              your EPK to calculate and show your film's potential
              <span className='tw-font-bold'> Total Audience Reach!</span>
            </div>
            <div className='tw-flex tw-h-2/4 tw-items-end tw-justify-evenly'>
              <i class='fa-brands fa-facebook tw-text-3xl tw-text-midnight'></i>
              <i class='fa-brands fa-instagram tw-text-3xl tw-text-midnight'></i>
              <i class='fa-brands fa-twitter tw-text-3xl tw-text-midnight'></i>
              <i class='fa-brands fa-linkedin tw-text-3xl tw-text-midnight'></i>
            </div>
          </div>
          <div className='tw-my-5 tw-w-full tw-text-center'>
            <a
              className='tw-inline-block tw-rounded-xl tw-bg-midnight tw-px-8 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-900 focus:tw-outline-none'
              href='/uploadFepk'
            >
              Create EPK
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing3;
