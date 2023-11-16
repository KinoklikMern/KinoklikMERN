import React from "react";

const Landing3 = () => {
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
            href='#action'
            className='tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold tw-text-midnight hover:tw-bg-midnight hover:tw-text-white'
          >
            Filmmakers
          </a>
          <a
            href='#action'
            className='tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold tw-text-midnight hover:tw-bg-midnight hover:tw-text-white'
          >
            Actors
          </a>
          <a
            href='#action'
            className='tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold tw-text-midnight hover:tw-bg-midnight hover:tw-text-white'
          >
            Distributors
          </a>
          <a
            href='#action'
            className='tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold tw-text-midnight hover:tw-bg-midnight hover:tw-text-white'
          >
            Sales Agents
          </a>
          <a
            href='#action'
            className='tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold tw-text-midnight hover:tw-bg-midnight hover:tw-text-white'
          >
            Investors
          </a>
          <a
            href='#action'
            className='tw-inline-block tw-rounded-2xl tw-border-2 tw-border-midnight tw-px-3 tw-py-1 tw-font-bold tw-text-midnight hover:tw-bg-midnight hover:tw-text-white'
          >
            Film Festivals
          </a>
        </div>
      </div>
    </>
  );
};
export default Landing3;
