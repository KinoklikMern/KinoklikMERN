import React from "react";
import "./ListItem.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../http-common";
import { useSelector } from "react-redux";

export default function ListItem({ title, status, type, role }) {
  let production_type = type;
  if (type && type.length === 0) {
    production_type = ["Movie", "TV Show", "Web Series", "Documentary"];
  }
  const [actors, setActors] = useState([]);
  // fetching user
  //: `epk/${fepk.title}`
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
          http.get(`users/starred/${user.id}`).then((response) => {
            
              //setActors(response.data);
            
          });
        break;
      case "following":
          http.get(`/users/followed/${user.id}`).then((response) => {
              //setActors(response.data);
            
          });
        break;
      case "wish_to_buy":
          http.get(`users/getactors`).then((response) => {
            
              //setActors(response.data);
            
          });
        break;
    }
  }, [type]);

  return (
    <>
      {actors &&
      
      //6483619d64b048f952a6fb5b
      actors.map((actor) => (
        <div className="listItem" key={actor._id}>
          <a href= {`/actor/6487758c553b5011282f72a5`}>
            <img
              src={`${process.env.REACT_APP_AWS_URL}/${actor.picture}`}
              alt=""
            />
          </a>
        </div>
      ))}
    </>
  );
}
