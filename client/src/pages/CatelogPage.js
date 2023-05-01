import React, { useState } from "react";
import "../components/HomeBody/HomeBody.css";
import "../components/List/List.css";
import List from "../components/List/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

function CatelogPage() {
  const [filterTags, setFilterTags] = useState([
    {
      name: "movie",
      isActive: false,
    },
    {
      name: "tv shows",
      isActive: false,
    },
    {
      name: "web-series",
      isActive: false,
    },
    {
      name: "Documentaries",
      isActive: false,
    },
    {
      name: "all epks",
      isActive: false,
    },
  ]);
  const clickHandler = (name) => {
    const newFilterTags = filterTags.map((tag) => {
      if (tag.name == name) {
        return { ...tag, isActive: !tag.isActive };
      }
      return tag;
    });
    setFilterTags(newFilterTags);
  };

  // button components
  const FilterButton = ({ name, isActive, clickHandler }) => {
    return (
      <>
        <button
          className={`tw-text-small tw-mr-5 tw-mb-1 tw-rounded-full tw-border-2 tw-px-4 tw-py-2 tw-font-bold tw-uppercase ${
            !isActive
              ? "tw-bg-[#1E0039] tw-text-[#AAAAAA]"
              : "tw-bg-white tw-text-[#1E0039]"
          }`}
          type="button"
          onClick={() => clickHandler(name)}
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

  return (
    <div className="home">
      <div className="tw-m-8">
        {filterTags.map((tag, index) => (
          <FilterButton
            key={index}
            name={tag.name}
            clickHandler={clickHandler}
            isActive={tag.isActive}
          />
        ))}
      </div>
      <div>
        <div className="listTitle">
          <span>POST PRODUCTION</span>
        </div>
        <List title="all" status="Postproduction" />
      </div>
      <div>
        <div className="listTitle">
          <span>PRODUCTION</span>
        </div>
        <List title="all" status="Production" />
      </div>
      <div>
        <div className="listTitle">
          <span>PRE PRODUCTION</span>
        </div>
        <List title="all" status="Preproduction" />
      </div>
    </div>
  );
}

export default CatelogPage;
