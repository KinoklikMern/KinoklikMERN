import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItemActor"; 
import { useState, useEffect } from "react";
import { FepkContext } from "../../context/FepkContext.js";
import ListItem from "../ListItem/ListItemActor"; 

const HomeBodyActor = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);

  return (
    <>
      <div className='home tw-flex tw-justify-center tw-overflow-y-auto'>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-py-2 sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 xl:tw-grid-cols-5 2xl:tw-grid-cols-8">
        <ListItem title='all_actors' type={filterQuery} />
        </div>
      </div>
    </>
  );
};

export default HomeBodyActor;