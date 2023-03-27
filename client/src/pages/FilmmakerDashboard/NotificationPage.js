import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import UserCard from "../../components/FilmMakerDashboard/UserCardDoubleCol";
import { getFepksByFilmmakerId } from "../../api/epks";
import NotificationEpkCard from "../../components/FilmMakerDashboard/NotificationEpkCard";
export default function NotificationPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const [epkList, setEpkList] = useState([]);
  const [selectedEpk, setSelectedEpk] = useState(0);
  const [likedUserList, setLikedUserList] = useState([]);

  useEffect(() => {
    getFepksByFilmmakerId(user.id).then((res) => {
      setEpkList(res);
      setLikedUserList(res[0].likes);
    });
  }, []);

  console.info("bb", epkList);
  console.info("like", likedUserList);

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">Filmmaker Dashboard</p>
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-20">
          <Sidebar selectedTab="Notifications" />
        </div>
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white">
          <div className="tw-grid tw-h-full tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
            <div className="tw-overflow-auto">
              {epkList?.map((epk, index) => (
                <div
                  className={
                    "tw-m-12 tw-rounded-lg " +
                    (selectedEpk === index
                      ? "tw-h-40 tw-w-60"
                      : "tw-h-20 tw-w-40 tw-brightness-50")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedEpk(index);
                    setLikedUserList(epk.likes);
                  }}
                >
                  <NotificationEpkCard epkInfo={epk} />
                </div>
              ))}
            </div>

            <div className="tw-col-span-2 tw-mt-12 tw-mr-4 tw-overflow-auto">
              <ul className="tw-sticky tw-top-0 tw-flex tw-border-b tw-border-gray-200 tw-text-center tw-text-sm tw-font-medium tw-text-gray-500">
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
              <div className={openTab === 1 ? "visible" : "invisible"}>
                {likedUserList?.map((user) => (
                  <UserCard UserInfo={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
