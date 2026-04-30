import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Dashboard/Sidebar";
import LoadingSpin from "../../components/Dashboard/LoadingSpin";
import http from "../../http-common";
import { getMyCollaborations } from "../../api/epks";
import { useTranslation } from "react-i18next";

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
  const [collaborationList, setCollaborationList] = useState([]);
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
      http.get(`/fepks/getWishTobuyByUser/${userId}`),
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

    if (user?.token) {
      getMyCollaborations(user.token)
        .then((res) => setCollaborationList(res))
        .catch((err) => console.error("Collaborations fetch error:", err));
    }
  }, [userId, user?.token]);

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

  const selectClass =
    "tw-w-full tw-rounded-lg tw-border tw-border-[#1E0039] tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-text-[#1E0039] tw-cursor-pointer focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#6627a7]";

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
          {/* Header row: description + item toggle */}
          <div className="tw-mb-4 tw-flex tw-flex-col tw-gap-4 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between">
            <p className="tw-text-sm tw-text-gray-500">
              {itemFilter === 0 ? t("Find all the film EPKs you've saved here.") : itemFilter === 1 ? t("Find all the actors you've saved here.") : t("EPKs you've been invited to collaborate on.")}
            </p>
            <div className="tw-flex tw-gap-1 tw-rounded-xl tw-bg-gray-100 tw-p-1">
              <button
                onClick={() => handleItemBtnClick(0)}
                className={`tw-rounded-lg tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium tw-transition-colors ${itemFilter === 0 ? "tw-bg-[#1E0039] tw-text-white tw-shadow" : "tw-text-gray-500 hover:tw-text-[#1E0039]"}`}
              >
                {t("Film EPKs")}
              </button>
              <button
                onClick={() => handleItemBtnClick(1)}
                className={`tw-rounded-lg tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium tw-transition-colors ${itemFilter === 1 ? "tw-bg-[#1E0039] tw-text-white tw-shadow" : "tw-text-gray-500 hover:tw-text-[#1E0039]"}`}
              >
                {t("Actors")}
              </button>
              <button
                onClick={() => handleItemBtnClick(2)}
                className={`tw-rounded-lg tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium tw-transition-colors ${itemFilter === 2 ? "tw-bg-[#1E0039] tw-text-white tw-shadow" : "tw-text-gray-500 hover:tw-text-[#1E0039]"}`}
              >
                {t("Shared with me")}
              </button>
            </div>
          </div>

          {/* Filter row — hidden on Shared with me tab */}
          {itemFilter === 2 ? null : itemFilter === 0 ? (
            <div className="tw-mb-4 tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row">
              <select
                value={typeFilter}
                onChange={(e) => handleNumBtnClick(Number(e.target.value))}
                className={selectClass}
              >
                <option value={0}>{t("All types")}</option>
                <option value={1}>{t("Starred")}</option>
                <option value={2}>{t("Following")}</option>
                <option value={3}>{t("Wish to Buy")}</option>
              </select>
              <select
                value={productionFilter}
                onChange={(e) => handleBtnClick(Number(e.target.value))}
                className={selectClass}
              >
                <option value={0}>{t("All stages")}</option>
                <option value={1}>{t("Pre-Production")}</option>
                <option value={2}>{t("Production")}</option>
                <option value={3}>{t("Post-Production")}</option>
              </select>
            </div>
          ) : (
            <div className="tw-mb-4 tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-items-center">
              <select
                value={typeFilter}
                onChange={(e) => handleNumBtnClick(Number(e.target.value))}
                className={selectClass}
              >
                <option value={0}>{t("All types")}</option>
                <option value={1}>{t("Starred")}</option>
                <option value={2}>{t("Following")}</option>
              </select>
              <FilterWrapper label={t("Gender")} selectedValue={selectedGender}>
                <GenderDropdown selectedValue={selectedGender} onOptionSelect={handleGenderSelect} />
              </FilterWrapper>
              <FilterWrapper label={t("Ethnicity")} selectedValue={ethnicityLabel !== "All" ? t("ethnicities." + ethnicityLabel) : "All"} align="right">
                <EthnicityDropdown selectedValue={selectedEthnicity} onOptionSelect={handleEthnicitySelect} />
              </FilterWrapper>
              <FilterWrapper label={t("Age")} selectedValue={ageLabel} align="right">
                <AgeRangeDropdown selectedValue={selectedAgeRange} onOptionSelect={handleAgeRangeSelect} />
              </FilterWrapper>
              {(selectedGender !== "All" || selectedAgeRange !== "All" || selectedEthnicity !== "All") && (
                <button
                  onClick={() => { setSelectedGender("All"); setSelectedAgeRange("All"); setSelectedEthnicity("All"); setAgeLabel("All"); setEthnicityLabel("All"); }}
                  className="tw-whitespace-nowrap tw-rounded-lg tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-border-[#1E0039] hover:tw-text-[#1E0039]"
                >
                  {t("Clear")}
                </button>
              )}
            </div>
          )}
         <div className="tw-mt-10 tw-h-5/6 tw-overflow-auto tw-rounded-lg tw-bg-gray-300 tw-p-4">
          {loading ? (
            <LoadingSpin />
          ) : (
            <>
              {itemFilter === 2 ? (
                /* SHARED WITH ME */
                collaborationList.length === 0 ? (
                  <div className="tw-flex tw-h-full tw-items-center tw-justify-center tw-py-20">
                    <p className="tw-text-2xl tw-font-light tw-text-gray-600">{t("No EPKs shared with you yet.")}</p>
                  </div>
                ) : (
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-p-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 xl:tw-grid-cols-8">
                    {collaborationList.map((epk) => {
                      const imgSrc = epk.banner_url
                        ? `${process.env.REACT_APP_AWS_URL}/${epk.banner_url}`
                        : moviePic;
                      return (
                        <a key={epk._id} href={`/epk/${epk._id}?edit=true`} className="tw-transition-transform hover:tw-scale-105">
                          <img src={imgSrc} alt={epk.title} className="tw-aspect-square tw-w-full tw-rounded-lg tw-object-cover" />
                          <p className="tw-mt-1 tw-truncate tw-text-center tw-text-xs tw-text-[#1E0039]">{epk.title}</p>
                        </a>
                      );
                    })}
                  </div>
                )
              ) : (
                <>
                  {/* EMPTY STATE */}
                  {((itemFilter === 0 && filteredEpkList.length === 0) ||
                    (itemFilter === 1 && filteredActorList.length === 0)) ? (
                    <div className="tw-flex tw-h-full tw-items-center tw-justify-center tw-py-20">
                      <p className="tw-text-2xl tw-font-light tw-text-gray-600">
                        {itemFilter === 0 ? t("No EPKs found matching your search.") : t("No Actors found matching your search.")}
                      </p>
                    </div>
                  ) : (
                    /* GRID */
                    <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-p-2 md:tw-grid-cols-4 lg:tw-grid-cols-6 xl:tw-grid-cols-8">
                      {(itemFilter === 0 ? filteredEpkList : filteredActorList).map((item) => {
                        const isEpk = itemFilter === 0;
                        const linkPath = isEpk ? `/epk/${item._id}` : `/user/${item._id}`;
                        const imgSrc = isEpk
                          ? (item.banner_url ? `${process.env.REACT_APP_AWS_URL}/${item.banner_url}` : moviePic)
                          : (item.picture?.startsWith("https") ? item.picture : `${process.env.REACT_APP_AWS_URL}/${item.picture}`);
                        return (
                          <a key={item._id} href={linkPath} className="tw-transition-transform hover:tw-scale-105">
                            <img
                              src={imgSrc}
                              alt={isEpk ? item.title : `${item.firstName} ${item.lastName}`}
                              className={`tw-aspect-square tw-w-full tw-object-cover ${isEpk ? "tw-rounded-lg" : "tw-rounded-3xl"}`}
                            />
                            {!isEpk && (
                              <div className="tw-mt-1 tw-w-full tw-truncate tw-text-center">
                                <p className="tw-text-sm tw-font-medium">{`${item.firstName} ${item.lastName}`}</p>
                              </div>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}