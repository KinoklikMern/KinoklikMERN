import React from 'react';
import "./Landing5.css";

const Landing5 = () => {
    return (
        <>
        <div>
        <div className=" !important flex justify-center mt-20">
          <a className="text-2xl ">
            A good EPK helps you communicate your vision.
            <br /><br/>
            A great EPK helps you promote your vision. <br /><br/>
           <b>KinoKlik EPK helps you communicate, promote and sell your vision.</b> 
          </a>
        </div>
      
        <div className="mt-20 mr-20 ml-20 ">
          <div class="flex sm:flex-row-1 lg:flex-col-3 pt-30 pl-30 mt-30 align-middle text-center space-x-8 ">
            <div class="p-10 border bg-black border-gray-400 rounded-2xl flex-1 ">
              <h2 className=" text-white text-2xl font-bold mb-4">Step 1. </h2>
              <p className="text-white text-xl">
                Create a free filmmaker account.
              </p>
            </div>
            <div class="p-10 border bg-black border-gray-400 rounded-2xl flex-1 ">
              <h2 className=" text-white text-2xl font-bold mb-4">Step 2. </h2>
              <p className="text-white text-xl">
                Upload your film info to the EPK Page.
              </p>
            </div>
  
            <div class="p-10 border  bg-black border-gray-400 rounded-2xl flex-1 ">
              <h2 className=" text-white text-2xl font-bold mb-4">Step 3. </h2>
              <p className=" text-white text-xl">
                Share your film EPK page with the world and track interest!
              </p>
            </div>
          </div>
         
          <div className="text-4xl font-semibold flex justify-center mt-20 ">
           <p className='pt-3'> Are you ready to create</p> 
            <div className="mx-5 align:middle bg-white text-black border-2 border-black rounded-xl p-4  rotate-12">
              Amazing
            </div>
            <p className='pt-3'> film EPKs? </p>
          </div>
          <div className="flex justify-center mt-20 mb-20 sm:mt-6 grid-cols-2 ">
          <a
            className="inline-block px-5 py-2 rounded-lg bg-black hover:bg-violet-900 hover:-translate-y-0.5 focus:outline-none  tracking-wider font-bold text-2xl text-white shadow-lg sm:text-base mr-4 "
            href="/"
          >
            Create EPK
          </a>
        </div>
        </div>
      </div>
        </>
    )
}
export default Landing5;