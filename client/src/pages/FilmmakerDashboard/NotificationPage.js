import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import UserCard from "../../components/FilmMakerDashboard/Notifications/UserCard";
import { getFepksByFilmmakerId } from "../../api/epks";
import NotificationEpkCard from "../../components/FilmMakerDashboard/Notifications/NotificationEpkCard";
import EmptyEpk from "../../components/FilmMakerDashboard/Epks/EmptyEpk";
import RequestCard from "../../components/FilmMakerDashboard/Notifications/RequestCard";
import { approveRequest, refuseRequest } from "../../api/epks";
import LoadingSpin from "../../components/FilmMakerDashboard/LoadingSpin";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NotificationTextInfo from "../../components/FilmMakerDashboard/Notifications/NotificationTextInfo";
import NotificationGallery from "../../components/FilmMakerDashboard/Notifications/NotificationGallery";
import BottomNavigationBar from "../../components/FilmMakerDashboard/BottomNavigationBar";
import RequestCardMobile from "../../components/FilmMakerDashboard/Notifications/RequestCardMobile";
import EpkInfo from "../../components/FilmMakerDashboard/Notifications/EpkInfo";

// import { FepkContext } from "../../context/FepkContext";

export default function NotificationPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [openTab, setOpenTab] = useState(1);
  const [epkList, setEpkList] = useState([]);
  const [selectedEpk, setSelectedEpk] = useState(0);
  const [selectedMobileEpk, setSelectedMobileEpk] = useState({});
  const [likedUserList, setLikedUserList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [filter, setFilter] = useState("allRequests");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const navigate = useNavigate();

  function handleMobikleSelectedEPK(epk) {
    setSelectedMobileEpk(epk);
    setLikedUserList(epk.likes);
  }

  const handleStarClick = (likes) => {
    setLikedUserList(likes);
  };

  const handleDollarClick = (wishesToBuy) => {
    setLikedUserList(wishesToBuy);
  };

  const handlePlusClick = (favourites) => {
    setLikedUserList(favourites);
  };

  const handleFilterRequest = (filter) => {

    switch (filter) {
      case 'approved':
        setFilter("approved");
        setFilteredRequests(selectedMobileEpk.requests.filter(req => req.status === 'approved'));
        break;
      case 'pending':
        setFilter("pending");
        setFilteredRequests(selectedMobileEpk.requests.filter(req => req.status === 'pending'));
        break;
      case 'refused':
        setFilter("refused");
        setFilteredRequests(selectedMobileEpk.requests.filter(req => req.status === 'refused'));
        break;
      case 'all':
      default:
        setFilter("allRequests");
        setFilteredRequests(selectedMobileEpk.requests);

    }
    const res = selectedMobileEpk.requests;
    console.log("requests", res);
  }

  useEffect(() => {
    setFilter("allRequests");
    setFilteredRequests(selectedMobileEpk.requests)
    console.log('selected mobile epk', selectedMobileEpk);

  }, [selectedMobileEpk])

  useEffect(() => {
    getFepksByFilmmakerId(user.id).then((res) => {
      setEpkList(res);
      // console.log("userEffect", res[0]?.likes);
      setSelectedMobileEpk(res[0] ?? {})
      setLikedUserList(res[0]?.likes || []);
      setRequestList({ requests: res[0]?.requests || [], fepkId: res[0]?._id });
      // setLikedUserList(res[0].likes);
      // setRequestList({ requests: res[0].requests, fepkId: res[0]._id });
      setLoading(false);
    });
    // }, [count]);
  }, [user.id, count]);

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

  const handleMessageClick = (userId) => {
    // Navigate to the chat section for the specific user
    navigate(`/dashboard/chat/${userId}`);
  };

  //console.log("requestlist", requestList);

  return (
    <>

      {/* mobile version */}
      <div className=' tw-flex md:tw-hidden tw-flex-col tw-bg-[#ECF0F1] tw-mx-auto tw-w-full tw-max-w-3xl tw-px-8'>

        <p className="tw-text-center tw-text-6xl tw-font-bold tw-pt-6"
          style={{
            background: "linear-gradient(to right, #FF00A0, #1E0039)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          {t("Film Notifications")}
        </p>

        <ul className='tw-flex  tw-rounded-lg tw-border-[#1E0039] tw-border-[2px] tw-mt-20 tw-p-[2px]'>
          <li
            className={`tw-w-1/2 tw-font-bold tw-text-lg tw-rounded-lg tw-p-2 ${openTab === 1 ? 'tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]  tw-text-white' : 'tw-text-[#868585]'} `}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
          >
            <a
              href='#likes'
              className='tw-flex tw-items-center tw-justify-center'
            >
              {t("Likes")}
            </a>
          </li>
          <li
            className={`tw-w-1/2   tw-font-bold tw-text-lg tw-rounded-lg tw-p-2 ${openTab === 2 ? 'tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]  tw-text-white ' : 'tw-text-[#868585]'} `}

            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
          >
            <a
              href='#epkrequests'
              className='tw-flex tw-items-center tw-justify-center '
            >
              {t("Requests")}
            </a>
          </li>
        </ul>
        {openTab === 1 && (
          <div className="tw-mt-5 tw-font-normal tw-mx-16">
            <p className="tw-text-sm tw-font-bold tw-text-[#868585] tw-text-center">
              {t("Find all the users film industry professionals who favourite and follow your film, and those who requests access to your protected EPKs.")}
            </p>
          </div>)}
        <div>
          <NotificationGallery epkList={epkList} selectedEpk={selectedMobileEpk} handleSelectedEPK={handleMobikleSelectedEPK} />
        </div>
        {openTab === 1 && (
          <>
            <EpkInfo
              selected={selectedMobileEpk}
              handleBuyers={handleDollarClick} handleLikers={handleStarClick} handleFollowers={handlePlusClick} />
            <div className="tw-flex tw-flex-col tw-gap-2">
              {likedUserList?.map((user) => (
                < UserCard
                  key={user._id}
                  UserInfo={{
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    website: user.website,
                    id: user._id,
                    picture: user.picture,
                  }}
                  onMessageIconClick={() => handleMessageClick(user._id)}
                />
              ))}
            </div>
          </>
        )}

        {openTab === 2 && (
          <>
            <ul className='tw-flex  tw-rounded-3xl  tw-border-[#1E0039] tw-border-[2px] tw-p-[2px] tw-mb-5'>
              <li
                className={`tw-w-1/4  tw-text-md tw-rounded-3xl tw-p-2 tw-text-center ${filter === "allRequests" ? 'tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]  tw-text-white tw-font-bold' : 'tw-text-[#868585]'} `}
                onClick={() => { handleFilterRequest("all") }}
              >
                <a
                  href='#allrequests'
                  className=''
                >
                  {t("All Requests")}
                </a>
              </li>
              <li
                className={`tw-w-1/4 tw-text-md tw-rounded-3xl tw-p-2 tw-text-center ${filter === "pending" ? 'tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]  tw-text-white  tw-font-bold' : 'tw-text-[#868585]'} `}
                onClick={() => { handleFilterRequest("pending") }}
              >
                <a
                  href='#pending'
                  className=''
                >
                  {t("Pending")}
                </a>
              </li>
              <li
                className={`tw-w-1/4 tw-text-md tw-rounded-3xl tw-p-2 tw-text-center ${filter === "approved" ? 'tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]  tw-text-white  tw-font-bold' : 'tw-text-[#868585]'} `}
                onClick={() => { handleFilterRequest("approved") }}
              >
                <a
                  href='#approved'
                  className=''
                >
                  {t("Approved")}
                </a>
              </li>
              <li
                className={`tw-w-1/4 tw-text-md tw-rounded-3xl tw-p-2 tw-text-center ${filter === "refused" ? 'tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]  tw-text-white  tw-font-bold' : 'tw-text-[#868585]'} `}
                onClick={() => { handleFilterRequest("refused") }}
              >
                <a
                  href='#refused'
                  className=''
                >
                  {t("Denied")}
                </a>
              </li>
            </ul>
            <div className="tw-flex tw-flex-col tw-gap-2" >
              {
                filteredRequests?.map(req => {
                  return <RequestCardMobile key={req.id}
                    request={req}
                    filter={filter}
                    onMessageIconClick={handleMessageClick}
                    onDeny={() => {
                      handleDeny(req, selectedMobileEpk._id);
                    }}
                    onApprove={() =>
                      handleApprove(
                        req,
                        selectedMobileEpk._id
                      )
                    }
                  />
                })
              }
            </div>
          </>
        )}

        <BottomNavigationBar selectedTab='Notifications' />
      </div >




      {/* wide screen */}

      < div className='tw-hidden md:tw-flex tw-h-screen tw-flex-col tw-bg-[#1E0039]' >
        <div className='tw-mb-8 tw-mt-24 tw-flex tw-justify-center tw-text-white md:tw-justify-start md:tw-pl-24'>
          <p className='tw-text-4xl'>{t("Filmmaker Dashboard")}</p>
        </div>
        <div className='tw-flex tw-h-5/6 tw-flex-row md:tw-mx-8'>
          <div className='tw-mt-12 tw-h-5/6 md:tw-ml-16'>
            {/* <Sidebar selectedTab="Notifications" /> */}

            <Sidebar selectedTab='Notifications' />
          </div>

          <div className='tw-mx-auto tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-4 md:tw-ml-16'>
            {loading ? (
              <LoadingSpin />
            ) : epkList.length === 0 ? (
              <div className='tw-mt-12'>
                <EmptyEpk />
              </div>
            ) : (
              <div className='tw-grid tw-h-full tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3'>
                <div className='tw-overflow-auto'>
                  <div>
                    <NotificationTextInfo />
                  </div>
                  {epkList?.map((epk, index) => (
                    <div
                      key={epk._id || index}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedEpk(index);
                        // setLikedUserList(epk.likes);
                        setRequestList({
                          requests: epk.requests,
                          fepkId: epk._id,
                        });
                      }}
                    >
                      <NotificationEpkCard
                        epkInfo={epk}
                        imgIsSelected={selectedEpk === index ? true : false}
                        onStarClick={handleStarClick}
                        onDollarClick={handleDollarClick}
                        onPlusClick={handlePlusClick}
                      />
                    </div>
                  ))}
                </div>
                <div className='tw-col-span-2 tw-mr-4 tw-mt-12 tw-overflow-auto  tw-scrollbar tw-scrollbar-track-white tw-scrollbar-thumb-[#1E0039]'>
                  <ul className='tw-flex tw-border-b tw-border-gray-200 tw-text-center tw-text-sm tw-font-medium tw-text-gray-500'>
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
                        href='#likes'
                        // className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                        className='tw-inline-block tw-w-full hover:tw-text-white'
                      >
                        {t("Stars & Likes")}
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
                        href='#epkrequests'
                        // className="tw-inline-block tw-w-full tw-p-4 hover:tw-text-white"
                        className='tw-inline-block tw-w-full hover:tw-text-white'
                      >
                        {t("EPK Requests")}
                      </a>
                    </li>
                  </ul>
                  {openTab === 1 && (
                    <div>
                      {likedUserList?.map((user) => (
                        // <UserCard UserInfo={user} key={user.id} />
                        <UserCard
                          key={user._id}
                          UserInfo={{
                            role: user.role,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                            website: user.website,
                            id: user._id,
                            picture: user.picture,
                          }}
                          onMessageIconClick={() => handleMessageClick(user._id)}
                        />
                      ))}
                    </div>
                  )}
                  {openTab === 2 && (
                    <div className='tw-mt-2 tw-flex tw-flex-col'>
                      <ul className='tw-font-regular tw-flex tw-w-4/5 tw-border-gray-200 tw-text-center tw-text-sm tw-text-gray-500 '>
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
                            href='#allrequests'
                            className='tw-inline-block tw-w-full tw-p-4 hover:tw-text-white'
                          >
                            {t("All Request")}
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
                            href='#pending'
                            className='tw-inline-block tw-w-full tw-p-4 hover:tw-text-white'
                          >
                            {t("Pending")}
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
                            href='#approved'
                            className='tw-inline-block tw-w-full tw-p-4 hover:tw-text-white'
                          >
                            {t("Approved")}
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
                            href='#refused'
                            className='tw-inline-block tw-w-full tw-p-4 hover:tw-text-white'
                          >
                            {t("Refused")}
                          </a>
                        </li>
                      </ul>
                      {filter === "allRequests" &&
                        requestList.requests?.map((request) => (
                          <div
                            className='tw-flex tw-flex-row tw-justify-between tw-border-b-2'
                            key={request.id}
                          >
                            <div className='tw-w-2/3'>
                              <RequestCard Request={request} />
                            </div>
                            <div className='tw-mt-4 tw-w-1/3 tw-py-2 sm:tw-py-4'>
                              <div className='tw-m-4 tw-flex tw-flex-col tw-items-center tw-justify-between'>
                                <div className='tw-self-center'>
                                  <p>{request.comment}</p>
                                </div>
                                <div className='tw-flex tw-items-end'>
                                  {request.status === "refused" && (
                                    <button
                                      disabled
                                      className='tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white '
                                    >
                                      {t("Refused")}
                                    </button>
                                  )}
                                  {request.status === "approved" && (
                                    <button
                                      disabled
                                      className='tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white '
                                    >
                                      {t("Approved")}
                                    </button>
                                  )}
                                  {request.status === "pending" && (
                                    <>
                                      <button
                                        className='tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white hover:tw-scale-105'
                                        onClick={() =>
                                          handleApprove(
                                            request,
                                            requestList.fepkId
                                          )
                                        }
                                      >
                                        {t("Approve")}
                                      </button>
                                      <button
                                        className='tw-m-8 tw-inline-block  tw-rounded-full tw-bg-[#1E0039] tw-px-4 tw-text-white hover:tw-scale-105'
                                        onClick={() =>
                                          handleDeny(request, requestList.fepkId)
                                        }
                                      >
                                        {t("Deny")}
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
                            request.status === filter && (
                              <div
                                className='tw-flex tw-flex-row tw-justify-between tw-border-b-2'
                                key={request.id}
                              >
                                <div className='tw-w-2/3'>
                                  <RequestCard Request={request} />
                                </div>
                                <div className='tw-mt-4 tw-w-1/3 tw-py-2 sm:tw-py-4'>
                                  <div className='tw-m-4 tw-flex tw-flex-col tw-items-center tw-justify-between'>
                                    <div className='tw-self-center'>
                                      <p>{request.comment}</p>
                                    </div>
                                    <div className='tw-flex tw-items-end'>
                                      {request.status === "refused" && (
                                        <button
                                          disabled
                                          className='tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white '
                                        >
                                          {t("Refused")}
                                        </button>
                                      )}
                                      {request.status === "approved" && (
                                        <button
                                          disabled
                                          className='tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white'
                                        >
                                          {t("Approved")}
                                        </button>
                                      )}
                                      {request.status === "pending" && (
                                        <>
                                          <button
                                            className='tw-m-8 tw-rounded-full tw-bg-[#712CB0] tw-px-4 tw-text-white hover:tw-scale-105'
                                            onClick={() =>
                                              handleApprove(
                                                request,
                                                requestList.fepkId
                                              )
                                            }
                                          >
                                            {t("Approve")}
                                          </button>
                                          <button
                                            className='tw-m-8 tw-inline-block  tw-rounded-full tw-bg-[#1E0039] tw-px-4 tw-text-white hover:tw-scale-105'
                                            onClick={() =>
                                              handleDeny(
                                                request,
                                                requestList.fepkId
                                              )
                                            }
                                          >
                                            {t("Deny")}
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
      </div >
    </>
  );
}
