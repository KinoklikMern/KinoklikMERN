import React, { useState, useEffect, useRef } from "react";
import "./HomeBody.css";
import List from "../List/List";
import http from "../../http-common";
import StatusBtn from "../SwitchStatusBtn/Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filterQuery, setFilterQuery] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("All");
  
  const [filterTags, setFilterTags] = useState([
    {
      name: "Movie",
      isActive: false,
    },
    {
      name: "TV Show",
      isActive: false,
    },
    {
      name: "Web Series",
      isActive: false,
    },
    {
      name: "Documentary",
      isActive: false,
    },
    {
      name: "all epks",
      isActive: true,
    },
  ]);

  const clickHandler = (name, isActive) => {
    let newTags;
    let newQuery;

    if (name === "all epks") {
      newTags = filterTags.map((tag) => ({
        ...tag,
        isActive: tag.name === name,
      }));
      newQuery = isActive ? [] : ["Movie", "TV Show", "Web Series", "Documentary"];
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
        newTags.filter((tag) => tag.name !== "all epks" && !tag.isActive).length === 4
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
      }

      if (
        newTags.filter((tag) => tag.name !== "all epks" && tag.isActive).length !== 0
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: false } : tag
        );
      }
    }

    setFilterTags(newTags);
    setFilterQuery(newQuery);
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);

    if (status === "All") {
      setFilteredEPKs(fepks); // Show all EPKs
    } else {
      // Filter EPKs based on the selected status
      const filtered = fepks.filter((fepk) => fepk.status === status);
      setFilteredEPKs(filtered);
    }
  };

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
    });
  }, []);

  const productionCategories = [
    { title: "POST-PRODUCTION", status: "Postproduction" },
    { title: "PRODUCTION", status: "Production" },
    { title: "PRE-PRODUCTION", status: "Preproduction" },
  ];

  const [filteredEPKs, setFilteredEPKs] = useState(fepks);

  return (
    <div className="home">
      <div>
        <StatusBtn onStatusChange={handleStatusChange} />
      </div>
      <div className="tw-m-8 tw-flex tw-justify-between">
        {filterTags.map((tag, index) => (
          <FilterButton
            key={index}
            name={tag.name}
            clickHandler={clickHandler}
            isActive={tag.isActive}
          />
        ))}
      </div>

      {productionCategories.map((category, index) => {
        const categoryFilteredEPKs = filteredEPKs.filter(
          (fepk) =>
            fepk.status === category.status &&
            (filterQuery.length === 0 || filterQuery.includes(fepk.production_type))
        );

        return categoryFilteredEPKs.length > 0 ? (
          <div className="list" key={index}>
            <div className="listTitle">
              <span>{category.title}</span>
            </div>
            <List
              title="all"
              status={category.status}
              type={filterQuery}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

// Extract FilterButton as a separate component
const FilterButton = ({ name, isActive, clickHandler }) => {
  return (
    <>
      <button
        className={`tw-text-small tw-mb-1 tw-mr-5 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase ${
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