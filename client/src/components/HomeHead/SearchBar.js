import React, { useState } from "react";
import SearchIcon from "../../images/icons/SearchIcon.svg";
import demo from "../../images/movies/movie1.jpeg";

export default function SearchBar({ EpkList }) {
  const [searchList, setSearchList] = useState([]);
  const [searchChar, setSearchChar] = useState("");
  const searchHandler = (e) => {
    setSearchChar(e.target.value);
    setSearchList(
      EpkList?.filter((epk) => {
        return (
          epk.title.toLowerCase().includes(searchChar.toLowerCase()) == true
        );
      })
    );
  };
  return (
    <div className=" tw-flex tw-flex-col tw-items-end tw-justify-end tw-text-white">
      <div className="tw-group tw-relative tw-mx-24 tw-mt-6 ">
        <div className="tw-invisible tw-absolute tw-right-0 tw-top-0 group-hover:tw-visible ">
          <input
            type="search"
            className="tw-flex tw-h-full tw-w-96 tw-rounded-full tw-border-0 tw-border-r-2 tw-border-b-2 tw-border-white/75 tw-bg-gray-400/25 tw-duration-300"
            // value={inputChar}
            onChange={searchHandler}
          />
          {searchList.length !== 0 && (
            <div className="tw-max-h-56 tw-overflow-auto  tw-bg-gray-300 tw-text-[#1E0039]">
              {searchList?.map((epk) => (
                <a
                  href={`/epk/${epk.title}`}
                  className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 hover:tw-scale-105 hover:tw-text-white"
                >
                  <p>{epk.title}</p>
                  <span>
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${epk.image_details}`}
                      style={{ height: "50px" }}
                    />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <img
            src={SearchIcon}
            style={{ width: "65%", height: "65%" }}
            className="tw-flex tw-cursor-pointer tw-self-end "
          />
        </div>
      </div>
    </div>
  );
}
