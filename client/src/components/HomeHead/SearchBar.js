import React, { useState, useRef } from "react";
import SearchIcon from "../../images/icons/SearchIcon.svg";
import { searchUsers } from "../../api/users";
import { searchFepks } from "../../api/epks";
import emptyBanner from "../../images/empty_banner.jpeg";

export default function SearchBar() {
  const [searchList, setSearchList] = useState([]);
  const debounceRef = useRef(null);

  const searchHandler = (e) => {
    const query = e.target.value;

    clearTimeout(debounceRef.current);

    if (!query.trim() || query.trim().length < 2) {
      setSearchList([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const [users, fepks] = await Promise.all([
          searchUsers(query.trim()),
          searchFepks(query.trim()),
        ]);
        setSearchList([...(fepks || []), ...(users || [])]);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 300);
  };

  return (
    <div className=" tw-flex tw-flex-col tw-text-white">
      <div className="tw-group tw-relative tw-mx-12">
        <div className="tw-invisible tw-absolute tw-right-0 tw-top-0 group-hover:tw-visible ">
          <input
            type="search"
            className="tw-flex tw-h-full tw-rounded-full tw-border-0 tw-border-b-2 tw-border-r-2 tw-border-white/75 tw-bg-gray-600/50 tw-duration-300 md:tw-w-64 lg:tw-w-96"
            onChange={searchHandler}
          />
          {searchList.length !== 0 && (
            <div className="tw-max-h-56 tw-divide-y tw-divide-dashed tw-overflow-auto tw-rounded-xl tw-bg-white tw-text-[#1E0039]">
              {searchList.map((item) => (
                <a
                  key={item._id}
                  href={item.title ? `/epk/${item._id}` : `/user/${item._id}`}
                  className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 hover:tw-scale-105"
                >
                  <p>{item.title || `${item.firstName} ${item.lastName}`}</p>
                  <span>
                    <img
                      src={
                        item.image_details
                          ? !item.image_details.startsWith("https")
                            ? `${process.env.REACT_APP_AWS_URL}/${item.image_details}`
                            : item.image_details
                          : item.picture
                          ? item.picture.startsWith("https")
                            ? item.picture
                            : `${process.env.REACT_APP_AWS_URL}/${item.picture}`
                          : emptyBanner
                      }
                      alt=""
                      className="tw-h-12 tw-w-12 tw-object-cover"
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
            alt=""
            style={{ width: "65%", height: "65%" }}
            className="tw-flex tw-cursor-pointer tw-self-end "
          />
        </div>
      </div>
    </div>
  );
}
