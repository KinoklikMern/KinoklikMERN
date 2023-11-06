/* eslint-disable no-unused-vars */
import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItem.css";
import "../List/List.css";
import http from "../../http-common";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { FepkContext } from "../../context/FepkContext.js";

const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [filterQuery, setFilterQuery] = React.useContext(FepkContext);

  const listRef = useRef();

  const actorId = "6483619d64b048f952a6fb5b";

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
    });
  }, []);

  const rowSize = 8;
  const fepksInEachRow = useMemo(() => {
    const result = [];
    for (let i = 0; i < fepks.length; i += rowSize) {
      result.push(fepks.slice(i, i + rowSize));
    }
    return result;
  }, [fepks]);

  return (
    <>
      <div className='home'>
        {fepksInEachRow.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className='listTitle'>
                <span>Placeholder</span>
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
                    {item.map((fepk) => {
                      const formattedTitle = fepk.title.replace(/ /g, "_");
                      return (
                        <React.Fragment key={fepk._id}>
                          <div className='listItem'>
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
