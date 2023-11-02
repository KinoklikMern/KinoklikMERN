/* eslint-disable no-unused-vars */
import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItem.css";
import "../List/List.css";
import http from "../../http-common";
import { useState, useRef, useEffect } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { FepkContext } from "../../context/FepkContext.js";

const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  // const [slideNumber, setSlideNumber] = useState(0);
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);

  const listRef = useRef();

  const actorId = "6483619d64b048f952a6fb5b";

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
      <div className='home'>
        {/* <div>
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
            <span>WISH LIST</span>
          </div>
          <List title="wish_to_buy" type={filterQuery} />
        </div> */}

        {genres.map((genre, index) => {
          return (
            <React.Fragment key={index}>
              <div className='listTitle'>
                <span>{genre.toUpperCase()}</span>
              </div>

              <div className='list'>
                <div className='wrapper'>
                  <ArrowBackIosOutlined
                    className='sliderArrow left'
                    /* onClick={() => handleClick("left")} */ style={{
                      display: !isMoved && "none",
                    }}
                  />
                  <div className='container' ref={listRef}>
                    {fepks
                      .filter(
                        (fepk) =>
                          fepk.genre === genre &&
                          (filterQuery !== ""
                            ? filterQuery.includes(fepk.production_type)
                            : true)
                      )
                      .map((fepk) => {
                        return (
                          <React.Fragment key={fepk._id}>
                            <div className='listItem'>
                              <a
                                href={
                                  role === "actor"
                                    ? `/actor/${actorId}`
                                    : `epk/${fepk.title}`
                                }
                              >
                                <img
                                  src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                                  alt=''
                                />
                              </a>
                            </div>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <ArrowForwardIosOutlined
                    className='sliderArrow right' /*onClick={() => handleClick("right")}*/
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {/* <div className="sponsTitle">
                    <span>SPONSORED RELEASED</span>
                </div>
                <Sponsored /> */}
      </div>
    </>
  );
};

export default HomeBody;
