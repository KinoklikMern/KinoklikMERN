import React, { useEffect, useState } from "react";
import "../HomeBody/HomeBody.css";
import "../List/List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { CookieSharp } from "@mui/icons-material";
import { FepkContext } from "../../context/FepkContext.js";

export default function FilterTag({role}) {
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);

  const actorFilterTag = [
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
  ]
  const FilterTag = [
    {
      name: "Male",
      isActive: false,
    },
    {
      name: "Female",
      isActive: false,
    },
    {
      name: "City",
      isActive: false,
    },
    {
      name: "Country",
      isActive: false,
    },
    {
      name: "All Actors",
      isActive: true,
    },
  ]

  const [filterTags, setFilterTags] = useState(role === "actor" ? FilterTag : actorFilterTag);

  console.log(filterQuery);

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

      // newQuery = isActive
      //   ? filterQuery.filter((item) => item !== name)
      //   : [...filterQuery, name];

      if (isActive) {
        newQuery = filterQuery.filter((item) => item !== name);
      } else {
        if (filterQuery.length === 4) {
          newQuery = [name];
        } else {
          newQuery = [...filterQuery, name];
        }
      }

      // console.log(newQuery);
      if (!isActive) {
        newTags[4].isActive = false; // set "all epks" to inactive
      }

      //if all other tags are active
      if (
        newQuery.length ===
        newTags.filter((tag) => tag.name !== "all epks").length
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
        newQuery = ["Movie", "TV Show", "Web Series", "Documentary"];
        // console.log(newTags);
        // console.log(newQuery);
      }

      //if all other tags are inactive
      if (
        newTags.filter((tag) => tag.name !== "all epks" && !tag.isActive)
          .length === 4
      ) {
        newTags = newTags.map((tag) =>
          tag.name === "all epks" ? { ...tag, isActive: true } : tag
        );
      }

      //if one of the other tags is active
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
      <div className="tw-relative tw-m-8 tw-flex tw-justify-between">
        {filterTags.map((tag, index) => (
          <FilterButton
            key={index}
            name={tag.name}
            clickHandler={clickHandler}
            isActive={tag.isActive}
          />
        ))}
      </div>
    </div>
  );
}
