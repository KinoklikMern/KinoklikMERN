import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewEpkBtn from "../../components/FilmMakerDashboard/Epks/NewEpkBtn";
import Sidebar from "../../components/UserDashboard/Sidebar";
import EpkCard from "../../components/FilmMakerDashboard/Epks/EpkCard";
import { getFepksByFilmmakerId } from "../../api/epks";
import EmptyEpk from "../../components/FilmMakerDashboard/Epks/EmptyEpk";

export default function EpkPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [epkList, setEpkList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setTimeout(() => setLoading(false), 100)
    getFepksByFilmmakerId(user.id).then((res) => setEpkList(res));
  }, []);
  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">User Dashboard</p>
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <Sidebar selectedTab="Starred" />
        </div>
        <div className="tw-scrollbar-w-36 tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar  tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039]">
          <div className="tw-flex tw-flex-col tw-gap-12">
            {epkList.length == 0 ? (
              <EmptyEpk />
            ) : (
              <>
                <div className="tw-my-16 tw-mb-4 tw-flex tw-justify-center">
                  <NewEpkBtn />
                </div>
                <div className="tw-ml-16 tw-grid tw-grid-cols-1 tw-gap-2 md:tw-grid-cols-2  lg:tw-grid-cols-3 ">
                  {epkList.map((epk) => (
                    <EpkCard EpkInfo={epk} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
