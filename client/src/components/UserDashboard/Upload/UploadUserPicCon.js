/* eslint-disable no-unused-vars */
// import UploadActorPic from "./UploadActorPic"; TODO remove after update complete
import Sidebar from "../../Dashboard/Sidebar";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import LoadingSpin from "../../Dashboard/LoadingSpin";
import List from "../../../pages/Actor/ListItem";
import { useTranslation } from "react-i18next";
import { getFepksByFilmmakerId, getMoviesByActors } from "../../../api/epks";
import { Link } from "react-router-dom";
import UserEditor from "./UserEditor";


export default function UploadUserPicCon() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [epkList, setEpkList] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);
  const userId = user ? user.id : "0";
  const role = user?.role;
  const isActor = role === 'Actor';
  const isFilmmaker = role === 'Filmmaker';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let movies;
        if (isFilmmaker) {
          movies = await getFepksByFilmmakerId(userId);
        } else {
          movies = await getMoviesByActors(userId);
        }
        setEpkList(movies || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId !== "0") {
      fetchData();
    }
  }, [userId, isFilmmaker]);

  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mt-24 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-white md:tw-mb-8 md:tw-flex-row md:tw-justify-between md:tw-pl-24'>
        <p className='tw-text-4xl'>
          {isFilmmaker ? t("Filmmaker Dashboard") : t("Actor Dashboard")}
        </p>
        <Link to={isFilmmaker ? `/filmmaker/${userId}` : `/actor/${userId}`}>
          <p className='tw-mt-5 tw-rounded-2xl tw-bg-white tw-p-2 tw-font-semibold tw-text-midnight md:tw-mr-24 md:tw-mt-0 md:tw-text-3xl'>
            {t("View Your Page")}
          </p>
        </Link>
      </div>
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Bio Page' role={user.role} />
        </div>
        <div className='tw-scrollbar-w-36 tw-mt-4 tw-h-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039] md:tw-ml-16  md:tw-mt-12 md:tw-w-5/6'>
          <div className='tw-flex tw-flex-col tw-items-center tw-gap-12'>
            {loading ? (
              <LoadingSpin />
            ) : (
              <>
                <UserEditor user={user} />
                <div className="tw-w-full">
                  {epkList.length > 0 ? (
                    <List items={epkList} /> 
                  ) : (
                    <p className="tw-text-center tw-text-gray-500 tw-mt-4">
                      {isFilmmaker ? t("No EPKs created yet.") : t("No movies found.")}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}