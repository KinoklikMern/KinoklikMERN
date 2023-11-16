import React from "react";

const Landing11 = () => {
  return (
    <div className='tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-py-16 md:tw-flex-row'>
      <div className=' tw-w-2/4 md:tw-w-1/4'>
        <input
          type='email'
          placeholder='Your-email@Example.com'
          className='tw-w-full tw-border-0 tw-border-b-4 tw-border-b-midnight focus:tw-border-midnight focus:tw-ring-0'
        />
      </div>
      <div className='tw-w-2/4 tw-text-center md:tw-w-1/4'>
        <button className='tw-mt-8 tw-rounded-3xl tw-bg-midnight tw-p-3 tw-font-bold tw-text-white md:tw-mt-0'>
          Sign up from newsletter
        </button>
      </div>
    </div>
  );
};

export default Landing11;
