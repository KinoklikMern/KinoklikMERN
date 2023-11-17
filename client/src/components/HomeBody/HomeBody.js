import React, { useState, useEffect } from "react";
import "./HomeBody.css";
import "../List/List.css";
import "../ListItem/ListItem.css";
import http from "../../http-common";
import StatusBtn from "../SwitchStatusBtn/Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filteredEPKs, setFilteredEPKs] = useState([]);
  const [filterQuery, setFilterQuery] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("All");
//For Translation

  const [filterTags, setFilterTags] = useState([
    
    {
      name: ("Movie"),
      isActive: false,
    },
    {
      name: ("TV Show"),
      isActive: false,
    },
    {
      name: ("Web Series"),
      isActive: false,
    },
    {
      name: ("Documentary"),
      isActive: false,
    },
    {
      name: ("all epks"),
      isActive: true,
    },
  ]);

  // const actorId = "6483619d64b048f952a6fb5b";

  const clickHandler = (name, isActive) => {
    let newTags;
    let newQuery;

    if (name === "all epks") {
      newTags = filterTags.map((tag) => ({
        ...tag,
        isActive: tag.name === name,
      }));
      newQuery = isActive
        ? []
        : ["Movie", "TV Show", "Web Series", "Documentary"];
    } else {
      newTags = filterTags.map((tag) =>
        tag.name === name ? { ...tag, isActive: !isActive } : tag
      );

      if (isActive) {
        newQuery = filterQuery.filter((item) => item !== name);
      } else {
        if (filterQuery.length === 4) {
          newQuery = [name];
        } else {
          newQuery = [...filterQuery, name];
        }
      }

      if (!isActive) {
        newTags[4].isActive = false; // set "all epks" to inactive
      }

      if (
        newQuery.length ===
        newTags.filter((tag) => tag.name !== "all epks").length
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
        newQuery = ["Movie", "TV Show", "Web Series", "Documentary"];
      }

      if (
        newTags.filter((tag) => tag.name !== "all epks" && !tag.isActive)
          .length === 4
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
      }

      if (
        newTags.filter((tag) => tag.name !== "all epks" && tag.isActive)
          .length !== 0
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: false } : tag
        );
      }
    }

    setFilterTags(newTags);
    setFilterQuery(newQuery);
  };

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
      setFilteredEPKs(response.data);
    });
  }, []);

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
      <div>
        <StatusBtn onStatusChange={handleStatusChange} />
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-around tw-bg-[#1e0039] tw-pb-1 md:tw-flex-row">
        {filterTags.map((tag, index) => (
          <FilterButton
            key={index}
            name={tag.name}
            clickHandler={clickHandler}
            isActive={tag.isActive}
          />
        ))}
      </div>
      <div className="home tw-flex tw-justify-center tw-overflow-y-auto">
        <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-py-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-5">
          {filteredEPKs.map((fepk) => {
            if (fepk.image_details === "") {
              // Skip rendering this item if image_details (poster) because it looks
              return null;
            }
            const formattedTitle = fepk.title.replace(/ /g, "_");
            return (
              <React.Fragment key={fepk._id}>
                <div className="listItem tw-p-3">
                  <a
                    href={
                      role === "actor"
                        ? `/actor/${fepk._id}`
                        : `epk/${formattedTitle}`
                    }
                  >
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                      alt=""
                      className="tw-aspect-1 tw-w-full"
                    />
                  </a>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

// Extract FilterButton as a separate component
const FilterButton = ({ name, isActive, clickHandler }) => {
  return (
    <>
      <button
        className={`tw-text-small tw-mb-1 tw-mr-5 tw-w-48 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase md:tw-w-auto ${
          !isActive
            ? "tw-bg-[#1E0039] tw-text-[#AAAAAA]"
            : "tw-bg-white tw-text-[#1E0039]"
        }`}
        type="button"
        onClick={() => clickHandler(name, isActive)}
      >
        {name}
        {!isActive ? (
          <FontAwesomeIcon
            className="tw-pl-5"
            icon={faPlus}
            style={{ color: "#aaaaaa" }}
          />
        ) : (
          <FontAwesomeIcon className="tw-pl-5" icon={faCheck} />
        )}
      </button>
    </>
  );
};

export default HomeBody;
