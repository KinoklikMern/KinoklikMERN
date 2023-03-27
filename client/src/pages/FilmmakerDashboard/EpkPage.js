import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewEpkBtn from "../../components/FilmMakerDashboard/NewEpkBtn";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import EpkCard from "../../components/FilmMakerDashboard/EpkCard";
import { getFepksByFilmmakerId } from "../../api/epks";

export default function EpkPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [epkList, setEpkList] = useState([]);
  useEffect(() => {
    getFepksByFilmmakerId(user.id).then((res) => setEpkList(res));
  }, []);
  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">Filmmaker Dashboard</p>
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <Sidebar selectedTab="EPKs"/>
        </div>
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-scrollbar tw-scrollbar-w-36 tw-scrollbar-thumb-white tw-scrollbar-track-gray-500">
          {/* <div className="tw-mt-48 tw-mb-12 tw-flex tw-justify-center tw-text-white">
            <p className="tw-text-2xl">
              You don’t have any EPK created. Start promoting your film right
              away!
            </p>
          </div> */}
          <div className="tw-flex tw-flex-col">
            <div className="tw-my-4 tw-flex tw-justify-center">
              <NewEpkBtn />
            </div>
            <div className="tw-grid tw-grid-cols-1 tw-gap-2 tw-text-white md:tw-grid-cols-2  lg:tw-grid-cols-3 ">
              {epkList?.map((epk)=>(
                <EpkCard EpkInfo={epk}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
