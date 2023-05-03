import React from 'react'

export default function EpkTrailer({epkInfo}) {
  const trail_url = `${process.env.REACT_APP_AWS_URL}/${epkInfo.trailer}`
  return (
    <div className='tw-bg-opacity-100 tw-p-12'>
      <video controls muted className='tw-rounded-2xl tw-p-0'>
        <source src={trail_url} type="video/mp4"/>
      </video>
    </div>
  )
}
