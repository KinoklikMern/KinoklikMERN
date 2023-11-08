import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItemActor.css";
import "../List/List.css";
import List from "../List/ListActor";
import http from "../../http-common";
import { useState, useEffect } from "react";
import { FepkContext } from "../../context/FepkContext.js";

const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  // const [isMoved, setIsMoved] = useState(false);
  // const [slideNumber, setSlideNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);

  // const listRef = useRef();

  // const actorId = "6483619d64b048f952a6fb5b"

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
    });
  }, []);

  let genres = [];

  fepks.forEach((fepk) => {
    genres.push(fepk.genre);
  });
  genres = [...new Set(genres)].sort();

  return (
    <>
      <div className='home tw-overflow-y-auto'>
        {/* <div>
          <div className="listTitle">
            <span>STARRED</span>
          </div>
          <List title="starred" type={filterQuery} role={role} />
        </div>
        <div>
          <div className="listTitle">
            <span>FOLLOWING</span>
          </div>
          <List title="following" type={filterQuery} />
        </div> */}
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
        <div>
          <div className='listTitle'>
            <span>PRODUCTION</span>
          </div>
          <List title='production' type={filterQuery} />
        </div>
        <div>
          <div className='listTitle'>
            <span>PRE-PRODUCTION</span>
          </div>
          <List title='pre-production' type={filterQuery} />
        </div>
      </div>
    </>
  );
};

export default HomeBody;
