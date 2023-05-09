import React from "react";
import "./ListItem.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../http-common";
import { useSelector } from "react-redux";

export default function ListItem({ title, status, type }) {
  let production_type = type;
  if (type && type.length === 0) {
    production_type = ["Movie", "TV Show", "Web Series", "Documentary"];
  }
  const [fepks, setFepks] = useState([]);
  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let id;
  if (!user) {
    id = "0";
  } else {
    id = user.id;
  }

  useEffect(() => {
    switch (title) {
      case "starred":
        http.get(`fepks/getStarredFepksByUser/${id}`).then((response) => {
          if (production_type.length !== 0) {
            setFepks(
              response.data.filter((epk) =>
                production_type.includes(epk.production_type)
              )
            );
            console.log(fepks);
          } else {
            setFepks(response.data);
          }
        });
        break;
      case "following":
        http.get(`fepks/getFollowingFepksByUser/${id}`).then((response) => {
          if (production_type.length !== 0) {
            setFepks(
              response.data.filter((epk) =>
                production_type.includes(epk.production_type)
              )
            );
            console.log(fepks);
          } else {
            setFepks(response.data);
          }
        });
        break;
      case "wish_to_buy":
        http.get(`fepks/getWishTobuyByUser/${id}`).then((response) => {
          if (production_type.length !== 0) {
            setFepks(
              response.data.filter((epk) =>
                production_type.includes(epk.production_type)
              )
            );
            console.log(fepks);
          } else {
            setFepks(response.data);
          }
        });
        break;
      case "all":
        console.log(production_type);
        http.get(`fepks`).then((response) => {
          if (production_type.length !== 0) {
            setFepks(
              response.data.filter(
                (epk) =>
                  epk.status === status &&
                  production_type.includes(epk.production_type)
              )
            );
            console.log(fepks);
          } else {
            setFepks(response.data);
          }
        });
    }
  }, [type]);

  return (
    <>
      {fepks &&
        fepks.map((fepk) => (
          <div className="listItem" key={fepk._id}>
            <a href={`epk/${fepk.title}`}>
              <img
                src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                alt=""
              />
            </a>
          </div>
        ))}
    </>
  );
}
