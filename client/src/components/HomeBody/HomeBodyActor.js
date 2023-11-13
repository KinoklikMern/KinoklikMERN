import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItemActor.css";
import "../List/List.css";
import List from "../List/ListActor";
import http from "../../http-common";
import { useState, useEffect } from "react";
import { FepkContext } from "../../context/FepkContext.js";

const HomeBodyActor = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);




  return (
    <>
      <div className='home tw-overflow-y-auto'>
        <div>
          <div className='listTitle'>
            <span>MOST STARRED</span>
          </div>
          <List title='most_starred' type={filterQuery} />
        </div>
        <div>
          <div className='listTitle'>
            <span>MOST FOLLOWED</span>
          </div>
          <List title='most_followed' type={filterQuery} />
        </div>
      </div>
    </>
  );
};

export default HomeBodyActor;
