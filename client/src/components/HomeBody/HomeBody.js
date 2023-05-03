import React from "react";
import "./HomeBody.css";
import "../ListItem/ListItem.css";
import "../List/List.css";
import List from "../List/List";
import FavouriteList from "../List/Favourite";
import Sponsored from "../Sponsored/Sponsored";
import http from "../../http-common";
import { useState, useRef, useEffect } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";

const HomeBody = () => {
  const [fepks, setFepks] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  /*
    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 62;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${1391 + distance}px)`;
        }
        if (direction === "right"
            && slideNumber < 2
        ) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-1391 + distance}px)`;
        }
    };
    */
  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
    });
  }, []);

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
          <List title="starred" />
        </div>
        <div>
          <div className="listTitle">
            <span>FOLLOWING</span>
          </div>
          <List title="following" />
        </div>
        <div>
          <div className="listTitle">
            <span>WISH LIST</span>
          </div>
          <List title="wish_to_buy" />
        </div>


        {genres.map((genre) => {
          return (
            <>
              <div className="listTitle">
                <span>{genre.toUpperCase()}</span>
              </div>

              <div className="list">
                <div className="wrapper">
                  <ArrowBackIosOutlined
                    className="sliderArrow left"
                    /* onClick={() => handleClick("left")} */ style={{
                      display: !isMoved && "none",
                    }}
                  />
                  <div className="container" ref={listRef}>
                    {fepks
                      .filter((fepk) => fepk.genre === genre)
                      .map((fepk) => {
                        return (
                          <>
                            <div className="listItem" key={fepk._id}>
                              <a href={`epk/${fepk.title}`}>
                                <img
                                  src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                                  alt=""
                                />
                              </a>
                            </div>
                          </>
                        );
                      })}
                  </div>
                  <ArrowForwardIosOutlined
                    className="sliderArrow right" /*onClick={() => handleClick("right")}*/
                  />
                </div>
              </div>
            </>
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
