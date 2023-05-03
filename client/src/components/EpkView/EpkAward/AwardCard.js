import React from 'react'

export default function AwardCard({awardInfo}) {
    const logo_award = `${process.env.REACT_APP_AWS_URL}/${awardInfo.award_logo}`;
  return (
    <div className='tw-m-4 tw-flex tw-flex-col tw-items-center tw-gap-4'>
        <p className='tw-text-xl'>{awardInfo.text}</p>
        <p className='tw-text-xl'>{awardInfo.magazine}</p>
        <img src={logo_award}/>
    </div>
  )
}
