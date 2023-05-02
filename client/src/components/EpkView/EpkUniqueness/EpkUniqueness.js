import React from 'react'

export default function EpkUniqueness({epkInfo}) {
  const image_uniqueness = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_uniqueness}`;
  return (
    <div className='tw-bg-white'>
      <div className='tw-flex tw-justify-center'>
        <span className='tw-text-[3rem]'>{epkInfo.title_uniqueness}</span>
      </div>
      <div className='tw-flex tw-py-3 tw-px-6'>
          <img src={image_uniqueness}/>
          <div>
            <p>{epkInfo.description_uniqueness}</p>
          </div>
      </div>
    </div>
  )
}
