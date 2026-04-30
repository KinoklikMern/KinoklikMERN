import React, { useState, useEffect } from "react";
import "../components/HomeBody/HomeBody.css";
//import "../components/List/List.css";
import EPKFilter from "../components/Filter/EPKFilter.js";
import FilterButton from "../components/Filter/FilterButton.js";
import StatusBtn from "../components/SwitchStatusBtn/Status.js";
import http from "../http-common.js";
import SearchBar from "../components/HomeHead/SearchBar.js";
import { useTranslation } from "react-i18next";
import "../components/SwitchBtn/SwitchBtn.css";
import FilterTag from "../components/Filter/FilterTag.js";
import { FepkContext } from "../context/FepkContext.js";
import ActorFilterList from "../components/ListItem/ActorFilterList.js";
import { Link } from "react-router-dom";

function CatalogPage() {
  const { t } = useTranslation();
  const [fepks, setFepks] = useState([]);
  const [filteredEPKs, setFilteredEPKs] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("All");
  const [activeBtn, setActiveBtn] = useState("epk");
  const { 
    filterQuery: filterQueryActors, 
    setFilterQuery: setFilterQueryActors 
  } = React.useContext(FepkContext);

  const [filterTags, setFilterTags] = useState([
    {
      name: t("Movie"),
      isActive: false,
    },
    {
      name: t("TV Show"),
      isActive: false,
    },
    {
      name: t("Web Series"),
      isActive: false,
    },
    {
      name: t("Documentary"),
      isActive: false,
    },
    {
      name: t("all epks"),
      isActive: true,
    },
  ]);

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
      setFilteredEPKs(response.data);
    });
  }, [activeBtn]);

  const { filterQuery, clickHandler, setFilterQuery } = EPKFilter(
    fepks,
    filterTags,
    setFilterTags
  );

  const handleStatusChange = (status) => {
    if (currentStatus === status) {
      setCurrentStatus("All");
      setFilteredEPKs(fepks);
    } else {
      setCurrentStatus(status);
      const filtered = fepks.filter((fepk) => fepk.status === status);
      setFilteredEPKs(filtered);
    }
  };

  const handleClick = (btnId) => {
    setActiveBtn(btnId);
    if (btnId !== "actor") {
      setFilterQueryActors([]);
      setFilterQuery([]);
      setCurrentStatus("All");
      setFilteredEPKs(fepks);
    } else {
      setFilterTags([
        {
          name: t("Movie"),
          isActive: false,
        },
        {
          name: t("TV Show"),
          isActive: false,
        },
        {
          name: t("Web Series"),
          isActive: false,
        },
        {
          name: t("Documentary"),
          isActive: false,
        },
        {
          name: t("all epks"),
          isActive: true,
        },
      ]);
    }
  };

  useEffect(() => {
    let filtered = fepks;

    // Filter by status if not 'All'
    if (currentStatus !== "All") {
      filtered = filtered.filter((fepk) => fepk.status === currentStatus);
    }

    // Filter by tags if filterQuery is not empty
    if (filterQuery.length > 0) {
      filtered = filtered.filter((fepk) =>
        filterQuery.includes(fepk.production_type)
      );
    }

    setFilteredEPKs(filtered);
  }, [fepks, currentStatus, filterQuery]);

  return (
    <>
      <div className="tw-flex tw-items-end tw-justify-end tw-bg-[#1e0039]">
        <SearchBar />
      </div>
      <div className="switch-container">
        <div className="switch-btn">
          <button
            id="epk-btn"
            className={activeBtn === "epk" ? "active" : []}
            onClick={() => handleClick("epk")}
          >
            EPKs
          </button>

          <button
            id="actor-btn"
            className={activeBtn === "actor" ? "active" : []}
            onClick={() => handleClick("actor")}
          >
            {t("Actors")}
          </button>
        </div>
      </div>
      {activeBtn === "epk" ? (
        <>
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-around tw-bg-[#1e0039] tw-py-8 md:tw-flex-row">
            <StatusBtn onStatusChange={handleStatusChange} />
          </div>
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-around tw-bg-[#1e0039] md:tw-flex-row">
            {filterTags.map((tag, index) => (
              <FilterButton
                key={index}
                name={tag.name}
                clickHandler={clickHandler}
                isActive={tag.isActive}
              />
            ))}
          </div>
          <div className="home tw-overflow-y-auto">
            <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-py-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-5">
              {filteredEPKs.map((fepk) => {
                if (fepk.image_details === "") {
                  // Skip rendering this item if image_details (poster) because it looks
                  return null;
                }

                return (
                  <React.Fragment key={fepk._id}>
                     <div className="tw-w-full tw-h-[450px] max-[700px]:tw-w-[80%] max-[700px]:tw-mx-auto tw-my-4 tw-p-3">
                      <Link to={fepk.title ? `/epk/${fepk._id}` : `/`}>
                        <img
                          src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                          alt=""
                           className="tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-1000 hover:tw-scale-[1.05]"
                        />
                      </Link>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <FilterTag isActive={activeBtn} />
          <div className="home tw-flex tw-justify-center tw-overflow-y-auto">
            <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-px-3 tw-py-2 sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 xl:tw-grid-cols-5 2xl:tw-grid-cols-7">
              <ActorFilterList title="all_actors" type={filterQueryActors} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CatalogPage;