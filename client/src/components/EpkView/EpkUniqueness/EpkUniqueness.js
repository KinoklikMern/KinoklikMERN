import React, { useState } from "react";

export default function EpkUniqueness({ epkInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const image_uniqueness =
    epkInfo?.image_uniqueness &&
    `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`;

  // Don't render the section if the data is missing
  if (!epkInfo?.title_uniqueness || !epkInfo?.description_uniqueness || !image_uniqueness) {
    return null;
  }

  return (
    <div className="tw-w-full tw-bg-[#1E0039] tw-py-16 tw-px-4 md:tw-px-16">
      
      {/* Section Title */}
      <h2 className="tw-text-center tw-text-[1.75rem] md:tw-text-[2rem] tw-font-bold tw-text-white tw-mb-10 md:tw-mb-16">
        What makes our film unique:
      </h2>

      {/* Main Content Container */}
      <div className="tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-10 md:tw-gap-16">
        
        {/* Left Side: Image (Click to open modal) */}
        <div className="tw-w-full md:tw-w-1/2 tw-flex tw-justify-center md:tw-justify-end">
          <img
            src={image_uniqueness}
            alt="Uniqueness"
            onClick={() => setIsModalOpen(true)}
            className="tw-w-full tw-max-w-[500px] tw-h-auto tw-object-cover tw-rounded-[24px] tw-shadow-lg tw-cursor-pointer hover:tw-opacity-90 tw-transition-opacity"
          />
        </div>

        {/* Right Side */}
        <div className="tw-w-full md:tw-w-1/2 tw-flex tw-justify-center md:tw-justify-start">
          
          {/* OUTER WRAPPER */}
          <div className="tw-w-full tw-max-w-[500px] tw-p-[4px] tw-rounded-[43px] tw-bg-gradient-to-b tw-from-[#1E0039] tw-to-[#FF00A0] tw-shadow-xl">
            
            {/* INNER CARD */}
            <div className="tw-flex tw-flex-col tw-justify-center tw-h-full tw-w-full tw-bg-[#1E0039] tw-rounded-[39px] tw-py-12 tw-px-8 md:tw-px-12">
              
              {/* Title (uniformly Pink on all screen sizes) */}
              <h3 className="tw-text-center tw-text-xl md:tw-text-2xl tw-font-semibold tw-text-[#FF00A0] tw-mb-6">
                {epkInfo.title_uniqueness}
              </h3>
              
              {/* Description */}
              <p className="tw-text-center tw-text-base md:tw-text-lg tw-text-white tw-leading-relaxed">
                {epkInfo.description_uniqueness}
              </p>
              
            </div>
          </div>
        </div>

      </div>

      {/* IMAGE MODAL */}
      {isModalOpen && (
        <div 
          className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-bg-black/90 tw-p-4" 
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="tw-absolute tw-top-4 tw-right-6 tw-text-white tw-text-5xl hover:tw-text-[#FF00A0] tw-transition-colors tw-z-[101]"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            &times;
          </button>
          
          <img 
            src={image_uniqueness} 
            alt="Uniqueness" 
            className="tw-w-[90vw] tw-h-auto tw-max-h-[85vh] md:tw-w-auto md:tw-h-[85vh] md:tw-max-w-[90vw] tw-object-contain tw-rounded-[16px] tw-shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}