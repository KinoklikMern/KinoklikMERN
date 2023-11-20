import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/UserDashboard/Sidebar";
import EpkCard from "../../components/UserDashboard/EpkCard";
import EmptyEpk from "../../components/UserDashboard/Requests/EmptyEpk";
import Axios from "axios";
import {useTranslation} from 'react-i18next';

export default function RequestsPage() {
  const { t } = useTranslation();
  const [epkListApproved, setEpkListApproved] = useState([]);
  const [epkListPending, setEpkListPending] = useState([]);
  const [epkListRefused, setEpkListRefused] = useState([]);
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
        `${process.env.REACT_APP_BACKEND_URL}/fepks/getRequestsFepksByUser/${userId}`
      ).then((rs) => {
        setEpkListApproved(
          rs.data.filter((item) => {
            // Check if any requests exist and if any of them have a status of "approved"
            return (
              item.requests &&
              item.requests.some(
                (request) =>
                  request.status === "approved" && request.user._id === userId
              )
            );
          })
        );
        setEpkListPending(
          rs.data.filter((item) => {
            // Check if any requests exist and if any of them have a status of "pending"
            return (
              item.requests &&
              item.requests.some(
                (request) =>
                  request.status === "pending" && request.user._id === userId
              )
            );
          })
        );
        setEpkListRefused(
          rs.data.filter((item) => {
            // Check if any requests exist and if any of them have a status of "refused"
            return (
              item.requests &&
              item.requests.some(
                (request) =>
                  request.status === "refused" && request.user._id === userId
              )
            );
          })
        );
        console.log(epkListApproved);
        console.log(epkListPending);
        console.log(epkListRefused);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [epkListApproved, epkListPending, epkListRefused, userId]);

  return (
    <div className='tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]'>
      <div className='tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white md:tw-mb-8'>
        <p className='tw-text-4xl'>{user.role} {t("Dashboard")}</p>
      </div>
      <div className='tw-mx-8 tw-flex tw-h-5/6 tw-flex-row'>
        <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
          <Sidebar selectedTab='Requests' role={user.role} />
        </div>

        <div className='tw-scrollbar-w-36 tw-mt-12 tw-h-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white  tw-p-4 tw-scrollbar tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039]  md:tw-ml-16 md:tw-w-5/6'>
          <div className='tw-flex tw-flex-col tw-gap-3  '>
            <span className='tw-bg-[#1E0039] tw-text-xl tw-text-white'>
              {t("Approved EPKs")}
            </span>
            {epkListApproved.length === 0 ? (
              <EmptyEpk EpkStatus='approved' />
            ) : epkListApproved.length > 2 ? (
              <>
                <div className='tw-ml-16 tw-flex tw-overflow-x-auto'>
                  <div className='tw-flex tw-gap-2 tw-p-2'>
                    {epkListApproved.map((epk) => (
                      <div className='tw-w-1/3 tw-flex-none' key={epk._id}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='tw-ml-16 tw-mt-1 tw-grid tw-grid-cols-1 tw-gap-2 tw-p-2 md:tw-grid-cols-2  lg:tw-grid-cols-3 '>
                  {epkListApproved.map((epk) => (
                    <EpkCard EpkInfo={epk} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='tw-flex tw-flex-col tw-gap-3'>
            <span className='tw-bg-[#1E0039] tw-text-xl tw-text-white'>
              {t("Pending EPKs")}
            </span>
            {epkListPending.length === 0 ? (
              <EmptyEpk EpkStatus='pending' />
            ) : epkListPending.length > 2 ? (
              <>
                <div className='tw-ml-16 tw-flex tw-overflow-x-auto'>
                  <div className='tw-flex tw-gap-2 tw-p-2'>
                    {epkListPending.map((epk) => (
                      <div className='tw-w-1/3 tw-flex-none' key={epk._id}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='tw-ml-16 tw-mt-1 tw-grid tw-grid-cols-1 tw-gap-2 tw-p-2 md:tw-grid-cols-2  lg:tw-grid-cols-3 '>
                  {epkListPending.map((epk) => (
                    <EpkCard EpkInfo={epk} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='tw-flex tw-flex-col tw-gap-3'>
            <span className='tw-bg-[#1E0039] tw-text-xl tw-text-white'>
            {t("Refused EPKs")}
            </span>
            {epkListRefused.length === 0 ? (
              <EmptyEpk EpkStatus='refused' />
            ) : epkListRefused.length > 2 ? (
              <>
                <div className='tw-ml-16 tw-flex tw-overflow-x-auto'>
                  <div className='tw-flex tw-gap-2 tw-p-2'>
                    {epkListRefused.map((epk) => (
                      <div className='tw-w-1/3 tw-flex-none' key={epk._id}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='tw-ml-16 tw-mt-1 tw-grid tw-grid-cols-1 tw-gap-2 tw-p-2 md:tw-grid-cols-2  lg:tw-grid-cols-3 '>
                  {epkListRefused.map((epk) => (
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
