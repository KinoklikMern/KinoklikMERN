import React from "react";

export default function EpkTrailer({ epkInfo }) {
  const trail_url =
    epkInfo.trailer_url &&
    `${process.env.REACT_APP_AWS_URL}/${epkInfo.trailer_url}`;
  return (
    trail_url && (
      <>
        <div className="tw-text-white tw-flex tw-justify-center tw-mt-8 "> {/* Added top and bottom margin */}
          <span className="tw-text-[2rem] tw-font-semibold"> 
            Trailer {/* Title */}
          </span>
        </div>

        <div className='tw-bg-opacity-100 tw-py-6'>
          <video controls muted className='tw-rounded-2xl tw-p-0'>
            <source src={trail_url} type='video/mp4' />
          </video>
        </div>
      </>
    )
  );
}