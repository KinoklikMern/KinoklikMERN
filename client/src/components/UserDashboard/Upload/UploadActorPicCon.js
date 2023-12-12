/* eslint-disable no-unused-vars */
import UploadActorPic from "./UploadActorPic";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import EmptyEpk from "../Requests/EmptyEpk";
import LoadingSpin from "../../FilmMakerDashboard/LoadingSpin";
import List from "../../../pages/Actor/ListItem";
import { useTranslation } from "react-i18next";
import { getMoviesByActors } from "../../../api/epks";

export default function UploadActorPicCon() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [epkList, setEpkList] = useState([]);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const userId = user ? user.id : "0";

  useEffect(() => {
    setLoading(true);
    try {
      const movies = getMoviesByActors(userId);
      setEpkList(movies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mt-24 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-white md:tw-mb-8 md:tw-flex-row md:tw-justify-between md:tw-pl-24'>
        <p className='tw-text-4xl'>{t("Actor Dashboard")}</p>
        <a href={`/actor/${userId}`}>
          <p className='tw-mt-5 tw-rounded-2xl tw-bg-white tw-p-2 tw-font-semibold tw-text-midnight md:tw-mr-24 md:tw-mt-0 md:tw-text-3xl'>
            {t("Actor Page")}
          </p>
        </a>
      </div>
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Actor Page' role={user.role} />
        </div>
        <div className='tw-scrollbar-w-36 tw-mt-4 tw-h-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039] md:tw-ml-16  md:tw-mt-12 md:tw-w-5/6'>
          <div className='tw-flex tw-flex-col tw-items-center tw-gap-12'>
            {loading ? (
              <LoadingSpin />
            ) : epkList.length === 0 ? (
              <>
                <UploadActorPic user={user} />
                <EmptyEpk />
              </>
            ) : (
              <>
                <UploadActorPic user={user} />
                <div>
                  <List />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
