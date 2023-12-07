import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import EpkCard from "../../components/UserDashboard/EpkCard";
import EmptyEpk from "../../components/FilmMakerDashboard/Following/EmptyEpk";
import Axios from "axios";
import LoadingSpin from "../../components/FilmMakerDashboard/LoadingSpin";
import { useTranslation } from "react-i18next";

export default function FollowingPage() {
  const { t } = useTranslation();
  const [epkList, setEpkList] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  if (!user) {
    userId = "0";
  } else {
    userId = user.id;
  }

  useEffect(() => {
    try {
      Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/fepks/getFollowingFepksByUser/${userId}`
      ).then((rs) => {
        setEpkList(rs.data);
        setLoading(false);
        // console.log(epkList);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [userId]);

  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mb-8 tw-mt-24 tw-flex tw-justify-center tw-text-white md:tw-justify-start md:tw-pl-24'>
        <p className='tw-text-4xl'>{t("Filmmaker Dashboard")}</p>
      </div>
      <div className='tw-flex tw-h-5/6 tw-flex-row md:tw-mx-8'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Following' />
        </div>
        <div className='tw-scrollbar-w-36 tw-mx-auto tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar tw-scrollbar-track-gray-500  tw-scrollbar-thumb-[#1E0039] md:tw-ml-16'>
          <div className='tw-flex tw-flex-col tw-gap-12'>
            {loading ? (
              <LoadingSpin />
            ) : epkList.length === 0 ? (
              <EmptyEpk />
            ) : (
              <>
                <div className='tw-grid tw-grid-cols-1 tw-gap-2  tw-p-2  md:tw-grid-cols-2  lg:tw-grid-cols-3 xl:tw-grid-cols-4'>
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
