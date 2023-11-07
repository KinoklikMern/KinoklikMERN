/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../ListItem/ListItem.css";
import "../List/List.css";
import http from "../../http-common";
import StatusBtn from "../SwitchStatusBtn/Status";

const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filteredEPKs, setFilteredEPKs] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("All");

  const actorId = "6483619d64b048f952a6fb5b";

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
    if (currentStatus === "All") {
      setFilteredEPKs(fepks);
    }
  }, [fepks, currentStatus]);

  return (
    <>
      <div>
        <StatusBtn onStatusChange={handleStatusChange} />
      </div>

      <div className='home tw-flex tw-justify-center tw-overflow-y-auto'>
        <div className='tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-5'>
          {filteredEPKs.map((fepk) => {
            const formattedTitle = fepk.title.replace(/ /g, "_");
            return (
              <React.Fragment key={fepk._id}>
                <div className='listItem tw-p-3'>
                  <a
                    href={
                      role === "actor"
                        ? `/actor/${actorId}`
                        : `epk/${formattedTitle}`
                    }
                  >
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                      alt=''
                      className='tw-aspect-1 tw-w-full'
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
