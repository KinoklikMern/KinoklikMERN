import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItem.css";
import "../List/List.css";
import List from "../List/ListActor";
import FavouriteList from "../List/Favourite";
import Sponsored from "../Sponsored/Sponsored";
import http from "../../http-common";
import { useState, useRef, useEffect } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { FepkContext } from "../../context/FepkContext.js";

const HomeBody = ({role}) => {
  const [fepks, setFepks] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);

  const listRef = useRef();

  const actorId = "6483619d64b048f952a6fb5b"

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
  })}, []);

  let genres = [];

  fepks.map((fepk) => {
    genres.push(fepk.genre);
  });
  genres = [...new Set(genres)].sort();

  return (
    <>
      <div className="home">
        <div>
          <div className="listTitle">
            <span>STARRED</span>
          </div>
          <List title="starred" type={filterQuery} role={role}/>
        </div>
        <div>
          <div className="listTitle">
            <span>FOLLOWING</span>
          </div>
          <List title="following" type={filterQuery} />
        </div>
        <div>
          <div className="listTitle">
            <span>MOST STARRED</span>
          </div>
          <List title="most_starred" type={filterQuery} />
        </div>
        <div>
          <div className="listTitle">
            <span>MOST FOLLOWED</span>
          </div>
          <List title="most_followed" type={filterQuery} />
        </div>
        <div>
          <div className="listTitle">
            <span>PRODUCTION</span>
          </div>
          <List title="production" type={filterQuery} />
        </div>
        <div>
          <div className="listTitle">
            <span>PRE-PRODUCTION</span>
          </div>
          <List title="pre-production" type={filterQuery} />
        </div>

      </div>
    </>
  );
};

export default HomeBody;
