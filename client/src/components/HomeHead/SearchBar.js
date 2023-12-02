import React, { useEffect, useState } from "react";
import SearchIcon from "../../images/icons/SearchIcon.svg";
import { getAllFepks } from "../../api/epks";
import { getAllUsers } from "../../api/user";
import emptyBanner from "../../images/empty_banner.jpeg";

export default function SearchBar() {
  const [finalSearchList, setFinalSearchList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchChar, setSearchChar] = useState("");

  useEffect(() => {
    getAllFepks().then((res) => {
      setFinalSearchList((prevFinalSearchList) => [
        ...prevFinalSearchList,
        ...res,
      ]);
    });

    getAllUsers().then((res) => {
      setFinalSearchList((prevFinalSearchList) => [
        ...prevFinalSearchList,
        ...res,
      ]);
    });
  }, []);

  const searchHandler = (e) => {
    setSearchChar(e.target.value);
    const searchString = e.target.value.toLowerCase();

    if (!searchString.trim()) {
      // If the search input is empty, set searchList to an empty array
      setSearchList([]);
    } else {
      setSearchList(
        finalSearchList?.filter((item) => {
          // Check if the item is an epk (movie) and includes the search string in its title
          if (item.title && item.title.toLowerCase().includes(searchString)) {
            return true;
          }
          // Check if the item is an actor and includes the search string in firstName or lastName
          else if (
            (item.firstName &&
              item.firstName.toLowerCase().includes(searchString)) ||
            (item.lastName &&
              item.lastName.toLowerCase().includes(searchString))
          ) {
            return true;
          }
          return false;
        })
      );
    }
  };

  return (
    <div className=' tw-flex tw-flex-col tw-text-white'>
      <div className='tw-group tw-relative tw-mx-12'>
        <div className='tw-invisible tw-absolute tw-right-0 tw-top-0 group-hover:tw-visible '>
          <input
            type='search'
            className='tw-flex tw-h-full tw-rounded-full tw-border-0 tw-border-b-2 tw-border-r-2 tw-border-white/75 tw-bg-gray-600/50 tw-duration-300 md:tw-w-64 lg:tw-w-96'
            onChange={searchHandler}
          />
          {searchList.length !== 0 && (
            <div className='tw-max-h-56 tw-divide-y  tw-divide-dashed tw-overflow-auto tw-rounded-xl tw-bg-white tw-text-[#1E0039]'>
              {searchList?.map((item) => (
                <a
                  key={item._id}
                  href={
                    item.title ? `/epk/${item.title}` : `/actor/${item._id}`
                  }
                  className='tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 hover:tw-scale-105'
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
                      alt=''
                      className='tw-h-12 tw-w-12 tw-object-cover'
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
            alt=''
            style={{ width: "65%", height: "65%" }}
            className='tw-flex tw-cursor-pointer tw-self-end '
          />
        </div>
      </div>
    </div>
  );
}
