import React from "react";

const Landing5 = () => {
  return (
    <div className='tw-bg-midnight'>
      <div className='tw-py-20 tw-text-center tw-text-white '>
        <p className='tw-text-3xl tw-font-bold md:tw-text-5xl'>
          Introducing KinoKlik EPK
        </p>
        <p className='tw-mt-2 tw-text-lg md:tw-text-xl'>
          free film marketing software.
        </p>
      </div>

      {/* TODO */}
      <div className='tw-text-center tw-text-white'>
        Main Content
        <br /> TODO
      </div>
      {/*  */}

      <div className='tw-py-20 tw-text-center tw-text-white '>
        <p className='tw-text-3xl tw-font-bold md:tw-text-4xl'>
          One KinoKlik account.
          <br />
          All your films EPKs.
        </p>
        <a
          className='tw-mt-12 tw-inline-block tw-rounded-lg tw-bg-white tw-px-10 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-midnight tw-shadow-lg tw-duration-200 hover:tw--translate-y-0.5 hover:tw-bg-violet-900 hover:tw-text-white focus:tw-outline-none'
          href='/uploadFepk'
        >
          Create EPK
        </a>
      </div>
    </div>
  );
};

export default Landing5;
