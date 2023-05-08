/* eslint-disablecase */
import React, { useEffect, useState } from "react";
import "../components/HomeBody/HomeBody.css";
import "../components/List/List.css";
import List from "../components/List/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

function CatelogPage() {
  const [filterQuery, setFilterQuery] = useState([]);
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

  // useEffect(() => {
  //   setFilterQuery(["Movie", "TV Show", "Web Series", "Documentary"]);
  // }, []);
  console.log(filterQuery);
  const clickHandler = (name, isActive) => {
    setFilterQuery([]);
    console.log(filterQuery);
    const newFilterTags = filterTags.map((tag) => {
      console.log(tag);
      console.log(name);
      console.log(filterQuery);
      if (tag.name === name) {
        switch (name) {
          case "movie":
            if (!isActive) setFilterQuery([...filterQuery, "Movie"]);
            else setFilterQuery(filterQuery.filter((item) => item !== "Movie"));
            break;
          case "tv shows":
            if (!isActive) setFilterQuery([...filterQuery, "TV Show"]);
            else
              setFilterQuery(filterQuery.filter((item) => item !== "TV Show"));
            break;
          case "web-series":
            if (!isActive) setFilterQuery([...filterQuery, "Web Series"]);
            else
              setFilterQuery(
                filterQuery.filter((item) => item !== "Web Series")
              );
            break;
          case "Documentaries":
            if (!isActive) setFilterQuery([...filterQuery, "Documentary"]);
            else
              setFilterQuery(
                filterQuery.filter((item) => item !== "Documentary")
              );
            break;
          case "all epks":
            if (!isActive)
              setFilterQuery(["Movie", "TV Show", "Web Series", "Documentary"]);
            else
              setFilterQuery(
                filterQuery.filter(
                  (item) =>
                    item !== "Movie" &&
                    item !== "TV Show" &&
                    item !== "Web Series" &&
                    item !== "Documentary"
                )
              );
            break;
          default:
            break;
        }

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
        <List title="all" status="Postproduction" type={filterQuery} />
      </div>
      <div>
        <div className="listTitle">
          <span>PRODUCTION</span>
        </div>
        <List title="all" status="Production" type={filterQuery} />
      </div>
      <div>
        <div className="listTitle">
          <span>PRE PRODUCTION</span>
        </div>
        <List title="all" status="Preproduction" type={filterQuery} />
      </div>
    </div>
  );
}

export default CatelogPage;
