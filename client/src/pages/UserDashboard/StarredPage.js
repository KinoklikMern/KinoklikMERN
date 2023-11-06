import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/UserDashboard/Sidebar";
import EpkCard from "../../components/UserDashboard/EpkCard";
import EmptyEpk from "../../components/UserDashboard/Starred/EmptyEpk";
import Axios from "axios";
import LoadingSpin from "../../components/FilmMakerDashboard/LoadingSpin";
import UploadActorPic from "../../components/UserDashboard/Upload/UploadActorPic";
export default function StarredPage() {
  const [epkList, setEpkList] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let userId;
  if (!user) {
    userId = "0";
  } else {
    userId = user.id;
  }
  useEffect(() => {
    try {
      Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/fepks/getStarredFepksByUser/${userId}`
      ).then((rs) => {
        setEpkList(rs.data);
        setLoading(false);
        console.log(epkList);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);
  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white'>
        <p className='tw-text-4xl'>Starred</p>
      </div>
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row'>
        <div className='tw-ml-16 tw-mt-12 tw-h-5/6'>
          <Sidebar selectedTab='Starred' role={user.role} />
        </div>
        <div className='tw-scrollbar-w-36 tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar  tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039]'>
          <div
            className='tw-flex tw-flex-col tw-gap-12'
            style={{
              display: "grid",
              justifyItems: "center",
            }}
          >
            {loading ? (
              <LoadingSpin />
            ) : epkList.length === 0 ? (
              <EmptyEpk />
            ) : (
              <>
                <div className='tw-ml-16 tw-grid tw-grid-cols-1 tw-gap-2 tw-p-2  md:tw-grid-cols-2 lg:tw-grid-cols-3 '>
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
