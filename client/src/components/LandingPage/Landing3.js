import React from "react";

const Landing3 = () => {
  return (
    <>
      <div className='tw-mb-12 tw-items-center tw-justify-center'>
        <div className='tw-text-center tw-text-5xl tw-font-bold'>
          What is an EPK?
        </div>
        <div className='tw-mx-24 tw-py-10 tw-text-justify tw-text-lg tw-text-midnight md:tw-text-2xl lg:tw-px-40'>
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
        {/* <div className='tw-mx-32'>
          <ul className='tw-mx-32 tw-text-start tw-text-2xl tw-font-bold lg:tw-pl-40'>
            <li className='tw-list-disc '> Poster</li>
            <li className='tw-list-disc'>Logline</li>
            <li className='tw-list-disc'>Synopsis</li>
            <li className='tw-list-disc'>Actors pictures and bios</li>
            <li className='tw-list-disc'>
              {" "}
              Producer, Director, Cinematographer(DOP) pictures and bio{" "}
            </li>
            <li className='tw-list-disc'> Production Stills</li>
          </ul>
        </div> */}
      </div>
    </>
  );
};
export default Landing3;
