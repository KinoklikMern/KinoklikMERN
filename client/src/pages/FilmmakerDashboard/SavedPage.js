import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/FilmMakerDashboard/Sidebar";
import LoadingSpin from "../../components/FilmMakerDashboard/LoadingSpin";
import http from "../../http-common";
import { useTranslation } from "react-i18next";

import StarMidnightIcon from "../../images/icons/StarMidnight.svg";
import StarWhiteIcon from "../../images/icons/StarFULL.svg";
import PlusIcon from "../../images/icons/PlusEmpty.svg";
import PlusWhiteIcon from "../../images/icons/PlusFULL.svg";
import DollarIcon from "../../images/icons/DollarEmpty.svg";
import DollarWhiteIcon from "../../images/icons/DollarFull.svg";
import moviePic from "../../images/movie11.jpg";

import GenderDropdown from "../../components/Filter/GenderDropdown";
import AgeRangeDropdown from "../../components/Filter/AgeRangeDropdown";
import EthnicityDropdown from "../../components/Filter/EthnicityDropdown";
import FilterWrapper from "../../components/Filter/FilterWrapper";

export default function SavedPage() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const userId = user?.id || "0";
  const userRole = user?.role || "User";

  const [starEpkList, setStarEpkList] = useState([]);
  const [followEpkList, setFollowEpkList] = useState([]);
  const [buyEpkList, setBuyEpkList] = useState([]);
  const [actorFollowedList, setActorFollowedList] = useState([]);
  const [actorStarredList, setActorStarredList] = useState([]);
  const [filteredEpkList, setFilteredEpkList] = useState([]);
  const [filteredActorList, setFilteredActorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productionFilter, setProductionFilter] = useState(0);
  const [itemFilter, setItemFilter] = useState(0); // 0: EPK, 1: Actor
  const [typeFilter, setTypeFilter] = useState(0); // 0: All, 1: Star, 2: Follow, 3: Buy

  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAgeRange, setSelectedAgeRange] = useState("All");
  const [selectedEthnicity, setSelectedEthnicity] = useState("All");
  const [ageLabel, setAgeLabel] = useState("All");
  const [ethnicityLabel, setEthnicityLabel] = useState("All");
  
  useEffect(() => {
    if (userId === "0") return;
    
    setLoading(true);
    Promise.all([
      http.get(`/fepks/getStarredFepksByUser/${userId}`),
      http.get(`/fepks/getFollowingFepksByUser/${userId}`),
      http.get(`/fepks/getWishToBuyByUser/${userId}`),
      http.get(`/users/followed/${userId}`),
      http.get(`/users/starred/${userId}`),
    ])
      .then(([starFepk, followFepk, buyFepk, actorsFollowed, actorsStarred]) => {
        setStarEpkList(starFepk.data);
        setFollowEpkList(followFepk.data);
        setBuyEpkList(buyFepk.data);
        setActorFollowedList(actorsFollowed.data);
        setActorStarredList(actorsStarred.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (itemFilter === 0) {
      // --- EPK FILTERING ---
      let prodStatus = productionFilter === 1 ? ["Preproduction"] : 
                       productionFilter === 2 ? ["Production"] : 
                       productionFilter === 3 ? ["Postproduction"] : 
                       ["Preproduction", "Production", "Postproduction"];

      let source = typeFilter === 1 ? starEpkList : 
                   typeFilter === 2 ? followEpkList : 
                   typeFilter === 3 ? buyEpkList : 
                   [...starEpkList, ...followEpkList, ...buyEpkList];

      const unique = Array.from(new Map(source.map(item => [item._id, item])).values());
      setFilteredEpkList(unique.filter(epk => prodStatus.includes(epk.status)));
    } else {
      // --- ACTOR FILTERING ---
      let source = typeFilter === 1 ? actorStarredList : 
                   typeFilter === 2 ? actorFollowedList : 
                   [...actorStarredList, ...actorFollowedList];

      const unique = Array.from(new Map(source.map(item => [item._id, item])).values());

      setFilteredActorList(unique.filter(actor => {
        const matchGender = selectedGender === "All" || actor.gender === selectedGender;
        const matchAge = selectedAgeRange === "All" || Number(actor.age) === Number(selectedAgeRange);
        const matchEthnicity = selectedEthnicity === "All" || actor.ethnicity === selectedEthnicity;
        return matchGender && matchAge && matchEthnicity;
      }));
    }
  }, [itemFilter, typeFilter, productionFilter, selectedGender, selectedAgeRange, selectedEthnicity, starEpkList, followEpkList, buyEpkList, actorFollowedList, actorStarredList]);
          

  const handleItemBtnClick = (index) => {
    setItemFilter(index);
    if (index === 1 && typeFilter !== 1 && typeFilter !== 2) {
      setTypeFilter(0);
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
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };
  const handleAgeRangeSelect = (label, value) => {
    setSelectedAgeRange(value);
    setAgeLabel(label);
  };
  const handleEthnicitySelect = (label, value) => {
    setSelectedEthnicity(value);
    setEthnicityLabel(label);
  };

  return (
    <div className="tw-flex tw-h-screen tw-flex-col tw-overflow-hidden tw-bg-[#1E0039]">
      <div className="tw-mb-8 tw-mt-24 tw-flex tw-justify-start tw-pl-24 tw-text-white">
        <p className="tw-text-4xl">
          {userRole === "Filmmaker" ? t("Filmmaker Dashboard") : userRole + " " + t("Dashboard")}
        </p>
      </div>

      <div className="tw-flex tw-h-5/6 tw-flex-row md:tw-mx-8">
        <div className="tw-mt-12 tw-h-5/6 md:tw-ml-16">
          <Sidebar role={userRole} />
        </div>

        <div className="tw-scrollbar-w-36 tw-mx-auto tw-mt-12 tw-h-5/6 tw-w-5/6 tw-overflow-auto tw-rounded-lg tw-bg-white tw-p-6 md:tw-ml-16">
          <div className="tw-flex tw-h-1/6 tw-w-full tw-flex-col tw-items-center tw-justify-center">
            <div className="tw-flex tw-w-full tw-justify-between">
              <div className="tw-flex tw-h-9 tw-w-2/5 tw-items-center tw-justify-start tw-pl-2 tw-text-sm tw-text-[#1E0039] md:tw-text-base">
                {itemFilter === 0 ? "Find all the film EPKs you've saved here." : "Find all the actors you've saved here."}
              </div>
              <div className="tw-flex tw-h-9 tw-w-3/5 tw-items-center tw-justify-center tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)]">
                <div
                  className={(itemFilter === 0 ? "tw-w-2/3 tw-bg-[#1E0039] tw-text-white" : "tw-w-1/3 tw-bg-white tw-text-[#1E0039]") + " tw-flex tw-h-full tw-items-center tw-justify-center hover:tw-cursor-pointer"}
                  onClick={() => handleItemBtnClick(0)}
                >
                  Film EPKs
                </div>
                <div
                  className={(itemFilter === 1 ? "tw-w-2/3 tw-bg-[#1E0039] tw-text-white" : "tw-w-1/3 tw-bg-white tw-text-[#1E0039]") + " tw-flex tw-h-full tw-items-center tw-justify-center hover:tw-cursor-pointer"}
                  onClick={() => handleItemBtnClick(1)}
                >
                  Actors
                </div>
              </div>
            </div>

            {itemFilter === 0 ? (
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-justify-between md:tw-flex-row">
                <div className="md:tw-w-3/6">
                  <div className="tw-mb-2 tw-flex tw-h-7 tw-justify-between tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)]">
                    <button className={(typeFilter === 0 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(0)}>{t("All")}</button>
                    <button className={(typeFilter === 1 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(1)}>
                      <img src={typeFilter === 1 ? StarWhiteIcon : StarMidnightIcon} alt="Star" style={{ width: 22, height: 22 }} />
                    </button>
                    <button className={(typeFilter === 2 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(2)}>
                      <img src={typeFilter === 2 ? PlusWhiteIcon : PlusIcon} alt="Plus" style={{ width: 20, height: 20 }} />
                    </button>
                    <button className={(typeFilter === 3 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(3)}>
                      <img src={typeFilter === 3 ? DollarWhiteIcon : DollarIcon} alt="Dollar" style={{ width: 18, height: 18 }} />
                    </button>
                  </div>
                </div>
                <div className="md:tw-w-3/6">
                  <div className="tw-mb-2 tw-flex tw-h-7 tw-justify-between tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] md:tw-ml-6">
                    <button className={(productionFilter === 0 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleBtnClick(0)}>{t("All")}</button>
                    <button className={(productionFilter === 1 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleBtnClick(1)}>{t("Pre-Production")}</button>
                    <button className={(productionFilter === 2 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleBtnClick(2)}>{t("Production")}</button>
                    <button className={(productionFilter === 3 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleBtnClick(3)}>{t("Post-Production")}</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tw-mt-4 tw-flex tw-w-full tw-flex-col tw-justify-between md:tw-flex-row">
                <div className="md:tw-w-3/6">
                  <div className="tw-mb-2 tw-flex tw-h-7 tw-justify-between tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)]">
                    <button className={(typeFilter === 0 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(0)}>{t("All")}</button>
                    <button className={(typeFilter === 1 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(1)}>
                      <img src={typeFilter === 1 ? StarWhiteIcon : StarMidnightIcon} alt="Star" style={{ width: 22, height: 22 }} />
                    </button>
                    <button className={(typeFilter === 2 ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} onClick={() => handleNumBtnClick(2)}>
                      <img src={typeFilter === 2 ? PlusWhiteIcon : PlusIcon} alt="Plus" style={{ width: 20, height: 20 }} />
                    </button>
                    <button className="tw-opacity-0 tw-cursor-default" disabled><img src={DollarIcon} alt="Dollar" style={{ width: 18 }} /></button>
                  </div>
                </div>
                <div className="md:tw-w-3/6">
                  <div className="tw-mb-2 tw-flex tw-h-7 tw-justify-between tw-rounded-xl tw-bg-white tw-px-4 tw-text-xs tw-shadow-[3px_5px_10px_1px_rgba(30,0,57,0.8)] md:tw-ml-6">
                    <button className={(selectedGender === "All" && selectedAgeRange === "All" && selectedEthnicity === "All" ? "tw-bg-[#6627a7] tw-text-white" : "tw-bg-white") + " tw-rounded-lg tw-px-2"} 
                      onClick={() => { setSelectedGender("All"); setSelectedAgeRange("All"); setSelectedEthnicity("All"); setAgeLabel("All"); setEthnicityLabel("All"); }}>{t("All")}</button>
                    <FilterWrapper label={t("Gender")} selectedValue={selectedGender}><GenderDropdown selectedValue={selectedGender} onOptionSelect={handleGenderSelect} /></FilterWrapper>
                    <FilterWrapper label={t("Ethnicity")} selectedValue={ethnicityLabel !== "All" ? t("ethnicities." + ethnicityLabel) : "All"}><EthnicityDropdown selectedValue={selectedEthnicity} onOptionSelect={handleEthnicitySelect} /></FilterWrapper>
                    <FilterWrapper label={t("Age")} selectedValue={ageLabel}><AgeRangeDropdown selectedValue={selectedAgeRange} onOptionSelect={handleAgeRangeSelect} /></FilterWrapper>
                  </div>
                </div>
              </div>
            )}
          </div>

         <div className="tw-mt-10 tw-h-5/6 tw-overflow-auto tw-rounded-lg tw-bg-gray-300 tw-p-4">
          {loading ? (
            <LoadingSpin />
          ) : (
            <>
              {/* 1. HANDLE EMPTY STATES INLINE */}
              {((itemFilter === 0 && filteredEpkList.length === 0) || 
                (itemFilter === 1 && filteredActorList.length === 0)) ? (
                <div className="tw-flex tw-h-full tw-items-center tw-justify-center tw-py-20">
                  <p className="tw-text-2xl tw-font-light tw-text-gray-600">
                    {itemFilter === 0 
                      ? t("No EPKs found matching your search.") 
                      : t("No Actors found matching your search.")}
                  </p>
                </div>
              ) : (
                /* 2. RENDER THE GRID */
                <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-p-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 xl:tw-grid-cols-8">
                  {(itemFilter === 0 ? filteredEpkList : filteredActorList).map((item) => {
                    const isEpk = itemFilter === 0;
                    const linkPath = isEpk ? `/epk/${item._id}` : `/actor/${item._id}`;
                    
                    // Resolve Image URL
                    const imgSrc = isEpk
                      ? (item.banner_url ? `${process.env.REACT_APP_AWS_URL}/${item.banner_url}` : moviePic)
                      : (item.picture?.startsWith("https") ? item.picture : `${process.env.REACT_APP_AWS_URL}/${item.picture}`);

                    return (
                      <a 
                        key={item._id} 
                        href={linkPath} 
                        className="tw-transition-transform hover:tw-scale-105"
                      >
                        <img
                          src={imgSrc}
                          alt={isEpk ? item.title : `${item.firstName} ${item.lastName}`}
                          className={`tw-aspect-square tw-w-full tw-object-cover ${isEpk ? "tw-rounded-lg" : "tw-rounded-3xl"}`}
                        />
                        
                        {!isEpk && (
                          <div className="tw-mt-1 tw-w-full tw-truncate tw-text-center">
                            <p className="tw-text-sm tw-font-medium">
                              {`${item.firstName} ${item.lastName}`}
                            </p>
                          </div>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}