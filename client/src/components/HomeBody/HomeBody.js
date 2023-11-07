import React, { useState, useEffect, useRef } from "react";
import "./HomeBody.css";
import "../ListItem/ListItem.css";
import "../List/List.css";
import http from "../../http-common";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { FepkContext } from "../../context/FepkContext.js";
import StatusBtn from "../SwitchStatusBtn/Status";


const HomeBody = ({ role }) => {
  const [fepks, setFepks] = useState([]);
  const [filterQuery] = React.useContext(FepkContext);
  const [currentStatus, setCurrentStatus] = useState("All");
  const listRef = useRef();
  const isMoved = false;

  const actorId = "6483619d64b048f952a6fb5b";

  useEffect(() => {
    http.get(`fepks/`).then((response) => {
      setFepks(response.data);
    });
  }, []); // Fetch EPKs when the component loads

  const productionCategories = [
    { title: "POST PRODUCTION", status: "Postproduction" },
    { title: "PRODUCTION", status: "Production" },
    { title: "PRE PRODUCTION", status: "Preproduction" },
  ];

  const [filteredEPKs, setFilteredEPKs] = useState(fepks);

  const handleStatusChange = (status) => {
    setCurrentStatus(status);

    if (status === "All") {
      setFilteredEPKs(fepks); // Show all EPKs
    } else {
      // Filter EPKs based on the selected status
      const filtered = fepks.filter((fepk) => fepk.status === status);
      setFilteredEPKs(filtered);
    }
  };

  let genres = [];

  fepks.forEach((fepk) => {
    genres.push(fepk.genre);
  });
  genres = [...new Set(genres)].sort();

  return (
    <>
      <div>
        <StatusBtn onStatusChange={handleStatusChange} />
      </div>
      <div className="home">
        {productionCategories.map((category, index) => {
          const categoryFilteredEPKs = filteredEPKs.filter(
            (fepk) =>
              fepk.status === category.status &&
              (filterQuery !== ""
                ? filterQuery.includes(fepk.production_type)
                : true)
          );

          return categoryFilteredEPKs.length > 0 ? (
            <div className="list" key={index}>
              <div className="listTitle">
                <span>{category.title}</span>
              </div>
              <div className="wrapper">
                <ArrowBackIosOutlined
                  className="sliderArrow left"
                  style={{
                    display: !isMoved && "none",
                  }}
                />
          <div className="container" ref={listRef}>
    {categoryFilteredEPKs.map((fepk) => (
      <div className="listItem" key={fepk._id}>
        <a
          href={
            role === "actor"
              ? `/actor/${actorId}`
              : `epk/${fepk.title}`
          }
        >
          <img
            src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
            alt=""
          />
        </a>
      </div>
    ))}
  </div>
                <ArrowForwardIosOutlined className="sliderArrow right" />
              </div>
            </div>
          ) : null;
        })}
        {genres.map((genre, index) => {
          const genreFilteredEPKs = filteredEPKs.filter(
            (fepk) =>
              fepk.genre === genre &&
              (filterQuery !== ""
                ? filterQuery.includes(fepk.production_type)
                : true)
          );

          return (
            <React.Fragment key={index}>
              <div className="listTitle">
              </div>
              <div className="list">
                <div className="wrapper">
                  <ArrowBackIosOutlined
                    className="sliderArrow left"
                    style={{
                      display: !isMoved && "none",
                    }}
                  />
                  <div className="container" ref={listRef}>
                    {genreFilteredEPKs.map((fepk) => {
                      const formattedTitle = fepk.title.replace(/ /g, "_");
                      return (
                        <div className="listItem" key={fepk._id}>
                          <a
                            href={
                              role === "actor"
                                ? `/actor/${actorId}`
                                : `epk/${formattedTitle}`
                            }
                          >
                            <img
                              src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                              alt=""
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                  <ArrowForwardIosOutlined className="sliderArrow right" />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default HomeBody;