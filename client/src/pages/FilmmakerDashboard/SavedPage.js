import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import ActorSidebar from "../../components/UserDashboard/Sidebar";
import LoadingSpin from "../../components/FilmMakerDashboard/LoadingSpin";
import EmptyEpk from "../../components/FilmMakerDashboard/Starred/EmptyEpk";
import http from "../../http-common";
import { useTranslation } from "react-i18next";
import StarMidnightIcon from "../../images/icons/StarMidnight.svg";
import StarWhiteIcon from "../../images/icons/StarFULL.svg";
import PlusIcon from "../../images/icons/PlusEmpty.svg";
import PlusWhiteIcon from "../../images/icons/PlusFULL.svg";
import DollarIcon from "../../images/icons/DollarEmpty.svg";
import DollarWhiteIcon from "../../images/icons/DollarFull.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import moviePic from "../../images/movie11.jpg";

export default function SavedPage() {
  const { t } = useTranslation();
  const [starEpkList, setStarEpkList] = useState([]);
  const [followEpkList, setFollowEpkList] = useState([]);
  const [buyEpkList, setBuyEpkList] = useState([]);
  const [actorFollowedList, setActorFollowedList] = useState([]);
  const [actorStarredList, setActorStarredList] = useState([]);
  const [filteredEpkList, setFilteredEpkList] = useState([]);
  const [filteredActorList, setFilteredActorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productionFilter, setProductionFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(0);
  const [itemFilter, setItemFilter] = useState(0);
  const [maleFilter, setMaleFilter] = useState(true); //Male
  const [femaleFilter, setFemaleFilter] = useState(true); //All

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
  } else {
    userId = user.id;
    userRole = user.role;
  }
  useEffect(() => {
    try {
      Promise.all([
        http.get(`/fepks/getStarredFepksByUser/${userId}`),
        http.get(`/fepks/getFollowingFepksByUser/${userId}`),
        http.get(`/fepks/getWishToBuyByUser/${userId}`),
        http.get(`/users/followed/${userId}`),
        http.get(`/users/starred/${userId}`),
      ]).then(
        ([
          starFepkRes,
          followFepkRes,
          buyFepkRes,
          actorsFollowedRes,
          actorsStarredRes,
        ]) => {
          const starData = starFepkRes.data;
          const followData = followFepkRes.data;
          const buyData = buyFepkRes.data;
          const actorsFollowedData = actorsFollowedRes.data;
          setStarEpkList(starData);
          setFollowEpkList(followData);
          setBuyEpkList(buyData);
          setActorFollowedList(actorsFollowedData);
          setActorStarredList(actorsStarredRes.data);

          setLoading(false);
        }
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [userId]);

  useEffect(() => {
    let filterProArr = [];
    switch (productionFilter) {
      case 1:
        filterProArr = ["Preproduction"];
        break;
      case 2:
        filterProArr = ["Production"];
        break;
      case 3:
        filterProArr = ["Postproduction"];
        break;
      default:
        filterProArr = ["Preproduction", "Production", "Postproduction"];
        break;
    }

    if (itemFilter === 0) {
      //EPK
      switch (typeFilter) {
        case 1:
          //Starred
          setFilteredEpkList(
            starEpkList.filter((epk) => filterProArr.includes(epk.status))
          );
          break;
        case 2:
          //Follow
          setFilteredEpkList(
            followEpkList.filter((epk) => filterProArr.includes(epk.status))
          );
          break;
        case 3:
          //Wish to buy
          setFilteredEpkList(
            buyEpkList.filter((epk) => filterProArr.includes(epk.status))
          );
          break;
        default:
          //All
          const list = [...starEpkList, ...followEpkList, ...buyEpkList];
          //Remove duplicate
          const uniqueEpkList = list.filter(
            (item, index) =>
              list.findIndex((epk) => epk.title === item.title) === index
          );
          setFilteredEpkList(
            uniqueEpkList.filter((epk) => filterProArr.includes(epk.status))
          );
          break;
      }
    } else {
      //Actor
      let filteSexArr = [];
      if (maleFilter === true && femaleFilter === true) {
        filteSexArr = ["Male", "Female"];
      } else if (maleFilter === true) {
        filteSexArr = ["Male"];
      } else if (femaleFilter === true) {
        filteSexArr = ["Female"];
      }

      if (typeFilter === 2) {
        //Followed
        if (maleFilter === true && femaleFilter === true) {
          setFilteredActorList(actorFollowedList); //for all genders, dont need to filter
        } else
          setFilteredActorList(
            actorFollowedList.filter((actor) => filteSexArr.includes(actor.sex))
          );
      } else if (typeFilter === 1) {
        //Starred
        if (maleFilter === true && femaleFilter === true) {
          setFilteredActorList(actorStarredList); //for all genders, dont need to filter
        } else
          setFilteredActorList(
            actorStarredList.filter((actor) => filteSexArr.includes(actor.sex))
          );
      }
    }
  }, [
    itemFilter,
    typeFilter,
    maleFilter,
    femaleFilter,
    productionFilter,
    starEpkList,
    followEpkList,
    buyEpkList,
    actorFollowedList,
    actorStarredList,
  ]);

  const handleItemBtnClick = (index) => {
    setItemFilter(index);
    if (index === 1 && typeFilter !== 1 && typeFilter !== 2) {
      setTypeFilter(2);
    } else if (index === 0) {
      setTypeFilter(0);
    }
  };
  const handleNumBtnClick = (index) => {
    setTypeFilter(index);
  };
  const handleBtnClick = (index) => {
    setProductionFilter(index);
  };
  const handleGenderClick = (index) => {
    switch (index) {
      case 0:
        setMaleFilter(!maleFilter);
        break;
      case 1:
        setFemaleFilter(!femaleFilter);
        break;
      default: //all
        if (maleFilter === true && femaleFilter === true) {
          setMaleFilter(false);
          setFemaleFilter(false);
        } else {
          setMaleFilter(true);
          setFemaleFilter(true);
        }
        break;
    }
  };

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        {userRole === "Filmmaker" || userRole === "FILM_MAKER" ? (
          <p className="tw-text-4xl">{t("Filmmaker Dashboard")}</p>
        ) : (
          <p className="tw-text-4xl">
            {userRole} {t("Dashboard")}
          </p>
        )}
      </div>
      <div className="tw-mx-8 tw-flex tw-h-5/6 tw-flex-row">
        <div className="tw-ml-16 tw-mt-12 tw-h-5/6">
          {userRole === "Filmmaker" || userRole === "FILM_MAKER" ? (
            <Sidebar selectedTab="Saved" />
          ) : (
            <ActorSidebar selectedTab="Saved" role={userRole} />
          )}
        </div>
        <div className="tw-scrollbar-w-36 tw-ml-16 tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-3xl tw-bg-white tw-pb-6 tw-pl-4 tw-pr-6  tw-pt-1 tw-scrollbar tw-scrollbar-track-gray-500 tw-scrollbar-thumb-[#1E0039]">
          <div className="tw-flex tw-h-1/6 tw-w-full tw-flex-col tw-items-center tw-justify-center">
            <div className="tw-flex tw-w-full tw-justify-between">
              <div className="tw-w-2/5  tw-pl-2 tw-text-base tw-text-[#1E0039]">
                Find all the film EPKs you've saved here.
              </div>
              <div className="tw-flex tw-h-full tw-w-3/5 tw-items-center tw-justify-center  tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)]">
                <div
                  className={`${
                    itemFilter === 0
                      ? "tw-w-2/3 tw-bg-[#1E0039] tw-text-[white]"
                      : "tw-w-1/3 tw-bg-[white] tw-text-[#1E0039]"
                  }  tw-flex tw-h-full  tw-items-center tw-justify-center tw-text-center hover:tw-cursor-pointer`}
                  onClick={() => handleItemBtnClick(0)}
                >
                  Film EPKs
                </div>
                <div
                  className={`${
                    itemFilter === 1
                      ? "tw-w-2/3 tw-bg-[#1E0039] tw-text-[white]"
                      : "tw-w-1/3 tw-bg-[white] tw-text-[#1E0039]"
                  }  tw-flex tw-h-full  tw-items-center tw-justify-center tw-text-center hover:tw-cursor-pointer`}
                  onClick={() => handleItemBtnClick(1)}
                >
                  Actors
                </div>
              </div>
            </div>
            {itemFilter === 0 ? (
              // Film EPKs filter
              <div className="tw-mt-4 tw-flex tw-w-full tw-justify-between">
                <div className="tw-w-1/6"></div>
                <div className="tw-w-2/6">
                  <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-5  tw-justify-between tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)]">
                    <button
                      className={`${
                        typeFilter === 0
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-truncate tw-rounded-lg tw-px-2 `}
                      onClick={() => handleNumBtnClick(0)}
                    >
                      {t("All")}
                    </button>
                    <button
                      className={`${
                        typeFilter === 1
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-flex tw-flex-col  tw-items-center tw-justify-center tw-rounded-lg tw-px-2 `}
                      onClick={() => handleNumBtnClick(1)}
                    >
                      <img
                        src={
                          typeFilter === 1 ? StarWhiteIcon : StarMidnightIcon
                        }
                        alt="Star"
                        style={{
                          width: 22,
                          height: 22,
                        }}
                        className={`tw-mt-1 `}
                      />
                    </button>
                    <button
                      className={`${
                        typeFilter === 2
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-rounded-lg  tw-px-2 `}
                      onClick={() => handleNumBtnClick(2)}
                    >
                      <img
                        src={typeFilter === 2 ? PlusWhiteIcon : PlusIcon}
                        alt="Plus"
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        className="tw-mt-0.5"
                      />
                    </button>
                    <button
                      className={`${
                        typeFilter === 3
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-rounded-lg  tw-px-2 `}
                      onClick={() => handleNumBtnClick(3)}
                    >
                      <img
                        src={typeFilter === 3 ? DollarWhiteIcon : DollarIcon}
                        alt="Dollar"
                        style={{
                          width: 18,
                          height: 18,
                        }}
                        className="tw-scale-75"
                      />
                    </button>
                  </div>
                </div>
                <div className=" tw-w-1/2">
                  <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-5  tw-justify-between  tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] ">
                    <button
                      className={`${
                        productionFilter === 0
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-truncate tw-rounded-lg tw-px-2 `}
                      onClick={() => handleBtnClick(0)}
                    >
                      {t("All")}
                    </button>
                    <button
                      className={`${
                        productionFilter === 1
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-truncate tw-rounded-lg tw-px-2 `}
                      onClick={() => handleBtnClick(1)}
                    >
                      {t("Pre-Production")}
                    </button>
                    <button
                      className={`${
                        productionFilter === 2
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-truncate tw-rounded-lg tw-px-2 `}
                      onClick={() => handleBtnClick(2)}
                    >
                      {t("Production")}
                    </button>
                    <button
                      className={`${
                        productionFilter === 3
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-truncate tw-rounded-lg tw-px-2 `}
                      onClick={() => handleBtnClick(3)}
                    >
                      {t("Post-Production")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Actors Filter
              <div className="tw-mt-4 tw-flex tw-w-full tw-justify-between">
                <div className="tw-w-1/6"></div>
                <div className="tw-ml-20 tw-w-1/6">
                  <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-5 tw-justify-between tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)]">
                    <button
                      className={`${
                        typeFilter === 2
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-rounded-lg  tw-px-2 `}
                      onClick={() => handleNumBtnClick(2)}
                    >
                      <img
                        src={typeFilter === 2 ? PlusWhiteIcon : PlusIcon}
                        alt="Plus"
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        className="tw-mt-0.5"
                      />
                    </button>
                    <button
                      className={`${
                        typeFilter === 1
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-flex tw-flex-col  tw-items-center tw-justify-center tw-rounded-lg tw-px-2 `}
                      onClick={() => handleNumBtnClick(1)}
                    >
                      <img
                        src={
                          typeFilter === 1 ? StarWhiteIcon : StarMidnightIcon
                        }
                        alt="Star"
                        style={{
                          width: 22,
                          height: 22,
                        }}
                        className={`tw-mt-1 `}
                      />
                    </button>
                  </div>
                </div>
                <div className="tw-w-5/12">
                  <div className="tw-mb-2 tw-ml-6 tw-flex tw-h-5 tw-justify-between tw-gap-2 tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs ">
                    <button
                      className={`${
                        maleFilter === true
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-rounded-lg  tw-px-2 `}
                      onClick={() => handleGenderClick(0)}
                    >
                      {t("Male")}
                      {!maleFilter ? (
                        <FontAwesomeIcon
                          className="tw-pl-3"
                          icon={faPlus}
                          style={{ color: "#aaaaaa" }}
                        />
                      ) : (
                        <FontAwesomeIcon className="tw-pl-3" icon={faCheck} />
                      )}
                    </button>
                    <button
                      className={`${
                        femaleFilter === true
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-rounded-lg  tw-px-2 `}
                      onClick={() => handleGenderClick(1)}
                    >
                      {t("Female")}
                      {!femaleFilter ? (
                        <FontAwesomeIcon
                          className="tw-pl-3"
                          icon={faPlus}
                          style={{ color: "#aaaaaa" }}
                        />
                      ) : (
                        <FontAwesomeIcon className="tw-pl-3" icon={faCheck} />
                      )}
                    </button>
                    <button
                      className={`${
                        femaleFilter === true && maleFilter === true
                          ? "tw-bg-[#6627a7] tw-text-white"
                          : "tw-bg-white tw-text-midnight"
                      } tw-rounded-lg  tw-px-2`}
                      onClick={() => handleGenderClick(2)}
                    >
                      {t("All Actors")}
                      {!femaleFilter || !maleFilter ? (
                        <FontAwesomeIcon
                          className="tw-pl-3"
                          icon={faPlus}
                          style={{ color: "#aaaaaa" }}
                        />
                      ) : (
                        <FontAwesomeIcon className="tw-pl-3" icon={faCheck} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="tw-scrollbar-w-36  tw-h-5/6 tw-overflow-auto tw-rounded-3xl tw-bg-gray-300 tw-p-4  tw-scrollbar tw-scrollbar-track-white tw-scrollbar-thumb-[#6627a7]">
            {itemFilter === 0 ? (
              // Film EPKs
              <div
                className="tw-flex tw-flex-col tw-gap-12"
                style={{
                  display: "grid",
                  justifyItems: "center",
                }}
              >
                {loading ? (
                  <LoadingSpin />
                ) : filteredEpkList.length === 0 ? (
                  <EmptyEpk flag={2} />
                ) : (
                  <>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-p-2  md:tw-grid-cols-4 lg:tw-grid-cols-6 xl:tw-grid-cols-8">
                      {filteredEpkList.map((epk, index) => (
                        <a key={index} href={`/epk/${epk.title}`}>
                          <img
                            src={
                              epk.banner_url === ""
                                ? moviePic
                                : `${process.env.REACT_APP_AWS_URL}/${epk.banner_url}`
                            }
                            className="tw-aspect-1 tw-h-40  tw-w-full tw-rounded-3xl tw-object-cover "
                            alt="movie cover"
                          />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Actors
              <div
                className="tw-flex tw-flex-col tw-gap-12"
                style={{
                  display: "grid",
                  justifyItems: "center",
                }}
              >
                {loading ? (
                  <LoadingSpin />
                ) : filteredActorList.length === 0 ? (
                  <EmptyEpk flag={1} />
                ) : (
                  <>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-p-2  md:tw-grid-cols-4 lg:tw-grid-cols-6 xl:tw-grid-cols-10">
                      {filteredActorList.map((actor, index) => (
                        <a key={index} href={`/actor/${actor._id}`}>
                          <img
                            src={
                              actor.picture &&
                              !actor.picture.startsWith("https")
                                ? `${process.env.REACT_APP_AWS_URL}/${actor.picture}`
                                : actor.picture
                            }
                            className="tw-aspect-1 tw-h-40  tw-w-full tw-rounded-3xl tw-object-cover "
                            alt="movie cover"
                          />
                          <div className="tw-w-full tw-overflow-hidden tw-whitespace-nowrap tw-text-center">
                            <p className="tw-max-w-full tw-truncate ">{`${actor.firstName} ${actor.lastName}`}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
