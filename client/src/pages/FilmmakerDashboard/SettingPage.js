import React from 'react'
import Sidebar from '../../components/FilmMakerDashboard/Sidebar'

export default function SettingPage() {
  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
    <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
      <p className="tw-text-4xl">Filmmaker Dashboard</p>
    </div>
    <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
      <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
        <Sidebar selectedTab="Settings" />
      </div>
      <div className="tw-scrollbar-w-36 tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar tw-scrollbar-track-gray-500 tw-scrollbar-thumb-white">
        Setting
      </div>
    </div>
  </div>
  )
}
