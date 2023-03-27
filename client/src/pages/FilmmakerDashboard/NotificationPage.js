import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import UserCard from "../../components/FilmMakerDashboard/UserCard";
import movieSample from "../../images/movies/movie8.jpg";
import { getFepksByFilmmakerId } from "../../api/epks";
export default function NotificationPage() {

  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const [selectedEpk, setSelectedEpk] = useState(1);
  const [epkList, setEpkList] = useState([]);
  useEffect(() => {
    getFepksByFilmmakerId(user.id).then((res)=>setEpkList(res))
  }, []);
  console.info("bb", epkList)

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">Filmmaker Dashboard</p>
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-20">
          <Sidebar selectedTab="Notifications"/>
        </div>
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white">
          <div className="tw-m-4 tw-grid tw-h-full tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
            <div className="tw-overflow-auto tw-bg-gray-500">
              <a href="#">
                <img
                  className={
                    "tw-m-12 tw-rounded-lg " +
                    (selectedEpk === 1
                      ? "tw-max-h-40"
                      : "tw-max-h-20 tw-brightness-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedEpk(1);
                  }}
                  src={movieSample}
                  alt=""
                />
              </a>
              <a href="#">
                <img
                  className={
                    "tw-m-12 tw-rounded-lg " +
                    (selectedEpk === 2
                      ? "tw-max-h-40"
                      : "tw-max-h-20 tw-brightness-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedEpk(2);
                  }}
                  src={movieSample}
                  alt=""
                />
              </a>
              <a href="#">
                <img
                  className={
                    "tw-m-12 tw-rounded-lg " +
                    (selectedEpk === 3
                      ? "tw-max-h-40"
                      : "tw-max-h-20 tw-brightness-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedEpk(3);
                  }}
                  src={movieSample}
                  alt=""
                />
              </a>
            </div>
            <div className="tw-col-span-2 tw-overflow-auto tw-border-2">
              <ul className="tw-flex tw-border-b tw-border-gray-200 tw-text-center tw-text-sm tw-font-medium tw-text-gray-500">
                <li
                  className={
                    "tw-w-1/4 tw-grow tw-text-2xl " +
                    (openTab === 1
                      ? "tw-w-3/4 tw-bg-[#1E0039] tw-text-white"
                      : "tw-bg-gray-100 tw-text-[#1E0039]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                >
                  <a
                    href="#"
                    className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                  >
                    Stars & Likes
                  </a>
                </li>
                <li
                  className={
                    "tw-w-1/4 tw-grow tw-text-2xl " +
                    (openTab === 2
                      ? "tw-w-3/4 tw-bg-[#1E0039] tw-text-white"
                      : "tw-bg-gray-100 tw-text-[#1E0039]")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                >
                  <a
                    href="#"
                    className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                  >
                    EPK Requests
                  </a>
                </li>
              </ul>
              <div>
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
