import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import UserCard from "../../components/FilmMakerDashboard/Notifications/UserCard";
import { getFepksByFilmmakerId } from "../../api/epks";
import NotificationEpkCard from "../../components/FilmMakerDashboard/Notifications/NotificationEpkCard";
import EmptyEpk from "../../components/FilmMakerDashboard/Epks/EmptyEpk";
import RequestCard from "../../components/FilmMakerDashboard/Notifications/RequestCard";
import { approveRequest, refuseRequest } from "../../api/epks";
import LoadingSpin from "../../components/FilmMakerDashboard/LoadingSpin";

export default function NotificationPage() {
  const { user } = useSelector((user) => ({ ...user }));
  const [openTab, setOpenTab] = useState(1);
  const [epkList, setEpkList] = useState([]);
  const [selectedEpk, setSelectedEpk] = useState(0);
  const [likedUserList, setLikedUserList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFepksByFilmmakerId(user.id).then((res) => {
      setEpkList(res);
      setLikedUserList(res[0].likes);
      setRequestList({ requests: res[0].requests, fepkId: res[0]._id });
      setLoading(false);
    });
  }, [count]);

  const handleApprove = (request, fepkId) => {
    const requestToApprove = {
      fepkId: fepkId,
      user: request.user,
      comment: request.comment,
    };
    approveRequest(requestToApprove).then((res) => {
      console.log("res", res);
      if (res) {
        setCount(count + 1);
      } else {
        console.log(res);
      }
    });
  };

  const handleDeny = (request, fepkId) => {
    const requestToDeny = {
      fepkId: fepkId,
      user: request.user,
      comment: request.comment,
    };
    refuseRequest(requestToDeny).then((res) => {
      console.log("res", res);
      if (res) {
        setCount(count + 1);
      } else {
        console.log(res);
      }
    });
  };

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
          {loading ? (
            <LoadingSpin />
          ) : epkList.length == 0 ? (
            <div className="tw-mt-12">
              <EmptyEpk />
            </div>
          ) : (
            <div className="tw-grid tw-h-full tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
              <div className="tw-overflow-auto">
                {epkList?.map((epk, index) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedEpk(index);
                      setLikedUserList(epk.likes);
                      setRequestList({
                        requests: epk.requests,
                        fepkId: epk._id,
                      });
                    }}
                  >
                    <NotificationEpkCard
                      epkInfo={epk}
                      imgIsSelected={selectedEpk === index ? true : false}
                    />
                  </div>
                ))}
              </div>
              <div className="tw-col-span-2 tw-mt-12 tw-mr-4 tw-overflow-auto  tw-scrollbar tw-scrollbar-track-white tw-scrollbar-thumb-[#1E0039]">
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
                {openTab === 1 && (
                  <div>
                    {likedUserList?.map((user) => (
                      <UserCard UserInfo={user} />
                    ))}
                  </div>
                )}
                {openTab === 2 && (
                  <div className="tw-mt-2 tw-flex tw-flex-col">
                    <ul className="tw-font-regular tw-flex tw-w-4/5 tw-border-gray-200 tw-text-center tw-text-sm tw-text-gray-500 ">
                      <li
                        className={
                          "tw-w-1/3 tw-grow tw-rounded-full tw-text-lg " +
                          (filter === "allRequests"
                            ? "tw-w-3/4 tw-bg-[#1E0039] tw-text-white"
                            : "tw-bg-gray-100 tw-text-[#1E0039]")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter("allRequests");
                        }}
                      >
                        <a
                          href="#"
                          className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                        >
                          All Request
                        </a>
                      </li>
                      <li
                        className={
                          "tw-w-1/4  tw-rounded-full tw-text-lg " +
                          (filter === "pending"
                            ? "tw-w-3/4 tw-bg-[#1E0039] tw-text-white"
                            : "tw-bg-gray-100 tw-text-[#1E0039]")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter("pending");
                        }}
                      >
                        <a
                          href="#"
                          className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                        >
                          Pending
                        </a>
                      </li>
                      <li
                        className={
                          "tw-w-1/4 tw-grow tw-rounded-full tw-text-lg " +
                          (filter === "approved"
                            ? "tw-w-3/4 tw-bg-[#1E0039] tw-text-white"
                            : "tw-bg-gray-100 tw-text-[#1E0039]")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter("approved");
                        }}
                      >
                        <a
                          href="#"
                          className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                        >
                          Approved
                        </a>
                      </li>
                      <li
                        className={
                          "tw-w-1/4 tw-grow tw-rounded-full tw-text-lg " +
                          (filter === "refused"
                            ? "tw-w-3/4 tw-bg-[#1E0039] tw-text-white"
                            : "tw-bg-gray-100 tw-text-[#1E0039]")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter("refused");
                        }}
                      >
                        <a
                          href="#"
                          className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                        >
                          Refused
                        </a>
                      </li>
                    </ul>
                    {filter === "allRequests" &&
                      requestList.requests?.map((request) => (
                        <div className="tw-flex tw-flex-row tw-justify-between tw-border-b-2">
                          <div className="tw-w-2/3">
                            <RequestCard Request={request} />
                          </div>
                          <div className="tw-mt-4 tw-w-1/3 tw-py-2 sm:tw-py-4">
                            <div className="tw-m-4 tw-flex tw-flex-col tw-items-center tw-justify-between">
                              <div className="tw-self-center">
                                <p>{request.comment}</p>
                              </div>
                              <div className="tw-flex tw-items-end">
                                {request.status == "refused" && (
                                  <button
                                    disabled
                                    className="tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white "
                                  >
                                    Refused
                                  </button>
                                )}
                                {request.status == "approved" && (
                                  <button
                                    disabled
                                    className="tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white "
                                  >
                                    Approved
                                  </button>
                                )}
                                {request.status == "pending" && (
                                  <>
                                    <button
                                      className="tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white hover:tw-scale-105"
                                      onClick={() =>
                                        handleApprove(
                                          request,
                                          requestList.fepkId
                                        )
                                      }
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="tw-m-8 tw-inline-block  tw-rounded-full tw-bg-[#1E0039] tw-px-4 tw-text-white hover:tw-scale-105"
                                      onClick={() =>
                                        handleDeny(request, requestList.fepkId)
                                      }
                                    >
                                      Deny
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {filter !== "allRequest" &&
                      requestList.requests?.map(
                        (request) =>
                          request.status == filter && (
                            <div className="tw-flex tw-flex-row tw-justify-between tw-border-b-2">
                              <div className="tw-w-2/3">
                                <RequestCard Request={request} />
                              </div>
                              <div className="tw-mt-4 tw-w-1/3 tw-py-2 sm:tw-py-4">
                                <div className="tw-m-4 tw-flex tw-flex-col tw-items-center tw-justify-between">
                                  <div className="tw-self-center">
                                    <p>{request.comment}</p>
                                  </div>
                                  <div className="tw-flex tw-items-end">
                                    {request.status == "refused" && (
                                      <button
                                        disabled
                                        className="tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white "
                                      >
                                        Refused
                                      </button>
                                    )}
                                    {request.status == "approved" && (
                                      <button
                                        disabled
                                        className="tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white"
                                      >
                                        Approved
                                      </button>
                                    )}
                                    {request.status == "pending" && (
                                      <>
                                        <button
                                          className="tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white hover:tw-scale-105"
                                          onClick={() =>
                                            handleApprove(
                                              request,
                                              requestList.fepkId
                                            )
                                          }
                                        >
                                          Approve
                                        </button>
                                        <button
                                          className="tw-m-8 tw-inline-block  tw-rounded-full tw-bg-[#1E0039] tw-px-4 tw-text-white hover:tw-scale-105"
                                          onClick={() =>
                                            handleDeny(
                                              request,
                                              requestList.fepkId
                                            )
                                          }
                                        >
                                          Deny
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
