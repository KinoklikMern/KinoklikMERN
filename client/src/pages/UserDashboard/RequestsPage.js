import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/UserDashboard/Sidebar";
import EpkCard from "../../components/UserDashboard/EpkCard";
import EmptyEpk from "../../components/UserDashboard/Requests/EmptyEpk";
import Axios from "axios";

export default function RequestsPage() {
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
              item.requests.some((request) => request.status === "approved")
            );
          })
        );
        setEpkListPending(
          rs.data.filter((item) => {
            // Check if any requests exist and if any of them have a status of "pending"
            return (
              item.requests &&
              item.requests.some((request) => request.status === "pending")
            );
          })
        );
        setEpkListRefused(
          rs.data.filter((item) => {
            // Check if any requests exist and if any of them have a status of "refused"
            return (
              item.requests &&
              item.requests.some((request) => request.status === "refused")
            );
          })
        );
        // console.log(epkListApproved);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
    // try {
    //   Axios.get(
    //     `${process.env.REACT_APP_BACKEND_URL}/fepks/getRequestsFepksByUser/${userId}/pending`
    //   ).then((rs) => {
    //     setEpkListPending(rs.data);
    //     console.log(epkListPending);
    //   });
    // } catch (error) {
    //   alert(error.response.data.message);
    // }
    // try {
    //   Axios.get(
    //     `${process.env.REACT_APP_BACKEND_URL}/fepks/getRequestsFepksByUser/${userId}/refused`
    //   ).then((rs) => {
    //     setEpkListRefused(rs.data);
    //     console.log(epkListRefused);
    //   });
    // } catch (error) {
    //   alert(error.response.data.message);
    // }
  }, []);
  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]">
      <div className="tw-mt-24 tw-mb-8 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">User Dashboard</p>
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          <Sidebar selectedTab="Requests" />
        </div>

        <div className="tw-scrollbar-w-36 tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto  tw-rounded-lg tw-bg-white tw-p-4 tw-scrollbar  tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039]">
          <div className="tw-flex tw-flex-col tw-gap-3  ">
            <span className="tw-bg-[#1E0039] tw-text-xl tw-text-white">
              Approved EPKs
            </span>
            {epkListApproved.length === 0 ? (
              <EmptyEpk EpkStatus="approved" />
            ) : (
              <>
                <div className="tw-ml-16 tw-flex tw-overflow-x-auto">
                  <div className="tw-flex tw-gap-2 tw-p-2">
                    {epkListApproved.map((epk) => (
                      <div className="tw-w-1/3 tw-flex-none" key={epk._id}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="tw-flex tw-flex-col tw-gap-3">
            <span className="tw-bg-[#1E0039] tw-text-xl tw-text-white">
              Pending EPKs
            </span>
            {epkListPending.length === 0 ? (
              <EmptyEpk EpkStatus="pending" />
            ) : (
              <>
                <div className="tw-ml-16 tw-flex tw-overflow-x-auto">
                  <div className="tw-flex tw-gap-2 tw-p-2">
                    {epkListPending.map((epk) => (
                      <div className="tw-w-1/3 tw-flex-none" key={epk._id}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="tw-flex tw-flex-col tw-gap-3">
            <span className="tw-bg-[#1E0039] tw-text-xl tw-text-white">
              Refused EPKs
            </span>
            {epkListRefused.length === 0 ? (
              <EmptyEpk EpkStatus="refused" />
            ) : (
              <>
                <div className="tw-ml-16 tw-flex tw-overflow-x-auto">
                  <div className="tw-flex tw-gap-2 tw-p-2">
                    {epkListRefused.map((epk) => (
                      <div className="tw-w-1/3 tw-flex-none" key={epk._id}>
                        <EpkCard EpkInfo={epk} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
