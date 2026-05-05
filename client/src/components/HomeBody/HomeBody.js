import React, { useState, useEffect } from "react";
import "./HomeBody.css";
import EPKFilter from "../Filter/EPKFilter";
import FilterButton from "../Filter/FilterButton";
import StatusBtn from "../SwitchStatusBtn/Status";
//import { useTranslation } from "react-i18next";

const HomeBody = ({ role, data }) => {
  // const { t } = useTranslation();

  const [filteredEPKs, setFilteredEPKs] = useState([]);
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

  const { filterQuery, clickHandler } = EPKFilter(
    data, // Pass data directly here
    filterTags,
    setFilterTags
  );

  const handleStatusChange = (status) => {
    if (currentStatus === status) {
      setCurrentStatus("All");
      setFilteredEPKs(data);
    } else {
      setCurrentStatus(status);
      const filtered = data.filter((fepk) => fepk.status === status);
      setFilteredEPKs(filtered);
    }
  };

  useEffect(() => {
    let filtered = data || [];

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
  }, [data, currentStatus, filterQuery]);

  return (
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
        <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-pb-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-5">
          {filteredEPKs.map((fepk) => {
            if (fepk.image_details === "") {
              // Skip rendering this item if image_details (poster) because it looks
              return null;
            }
            return (
              <React.Fragment key={fepk._id}>
                 <div className="tw-w-full tw-h-[450px] max-[700px]:tw-w-[80%] max-[700px]:tw-mx-auto tw-my-4 tw-p-3">
                  <a
                    href={
                      role === "actor"
                        ? `/user/${fepk._id}`
                        : fepk.title
                        ? `epk/${fepk._id}`
                        : "/"
                    }
                  >
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                      alt=""
                      className="tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-1000 hover:tw-scale-[1.05]"
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

export default HomeBody;
