import React, { useState, useEffect } from "react";
import "./HomeBody.css";
import "../List/List.css";
import "../ListItem/ListItem.css";
import EPKFilter from "../Filter/EPKFilter";
import FilterButton from "../Filter/FilterButton";
import http from "../../http-common";
import StatusBtn from "../SwitchStatusBtn/Status";
import { useTranslation } from "react-i18next";

const HomeBody = ({ role }) => {
  const { t } = useTranslation();
  
  const [fepks, setFepks] = useState([]);
  const [filteredEPKs, setFilteredEPKs] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("All");
  //For Translation

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
  }, []);

  const { filterQuery, setFilterQuery, clickHandler } = EPKFilter(
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

export default HomeBody;
