import React from "react";
//import "./Landing5.css";

const Landing9 = () => {
  return (
    <>
      <div>
        <div className='landing9 tw-mt-20 tw-flex tw-items-center tw-justify-center'>
          <p className='tw-text-center tw-text-2xl tw-font-bold tw-text-midnight md:tw-text-3xl'>
            Present and promote your film's vision to industry professionals
            with KinoKlik EPK.
          </p>
        </div>

        <div className='tw-mt-12'>
          <div className='tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-10 tw-text-center lg:tw-flex-row lg:tw-space-x-20 lg:tw-space-y-0'>
            <div className='tw-h-64 tw-w-80 tw-rounded-3xl tw-border tw-border-gray-400 tw-bg-[#1E1E1E] tw-p-10 tw-py-20 '>
              <h2 className='tw-mb-4 tw-text-2xl tw-font-bold tw-text-white'>
                Step 1.{" "}
              </h2>
              <p className='tw-text-xl tw-text-white'>
                Create a free filmmaker account.
              </p>
            </div>
            <div className='tw-h-64 tw-w-80 tw-rounded-3xl tw-border tw-border-gray-400 tw-bg-[#1E1E1E] tw-p-10 tw-py-20 '>
              <h2 className='tw-mb-4 tw-text-2xl tw-font-bold tw-text-white'>
                Step 2.{" "}
              </h2>
              <p className='tw-text-xl tw-text-white'>
                Upload your film details to the EPK Page
              </p>
            </div>

            <div className='tw-h-64 tw-w-80 tw-rounded-3xl tw-border tw-border-gray-400 tw-bg-[#1E1E1E] tw-p-10 tw-py-20 '>
              <h2 className='tw-mb-4 tw-text-2xl tw-font-bold tw-text-white'>
                Step 3.{" "}
              </h2>
              <p className='tw-text-xl tw-text-white'>
                Share your film EPK page with the world and track interest!
              </p>
            </div>
          </div>

          <div className='tw-mt-20 tw-flex tw-justify-center tw-text-center tw-text-lg tw-font-bold tw-text-midnight sm:tw-text-xl md:tw-text-4xl'>
            <p className='tw-pt-3'> Are you ready to create</p>
            <div className='align:tw-middle tw-mx-5 tw-rotate-12 tw-rounded-lg tw-border-2 tw-border-black tw-bg-white tw-p-2 tw-text-midnight md:tw-rounded-3xl md:tw-p-4'>
              Amazing
            </div>
            <p className='tw-pt-3'> film EPKs? </p>
          </div>
          <div className='tw-mb-20 tw-mt-20 tw-flex tw-grid-cols-2 tw-justify-center sm:tw-mt-6 '>
            <a
              className='tw-mr-4 tw-inline-block tw-rounded-xl tw-bg-midnight tw-px-5 tw-py-2 tw-text-2xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-900 focus:tw-outline-none'
              href='/'
            >
              Create EPK
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing9;
