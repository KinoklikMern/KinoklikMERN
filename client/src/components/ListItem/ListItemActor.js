import React from "react";
import "./ListItem.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../http-common";
import { useSelector } from "react-redux";

export default function ListItem({ title, status, type, role }) {
  const [actors, setActors] = useState([]);
  const [following, setFollowing] = useState([]);
 
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
            setActors(response.data);
              /*if(type === "ALL ACTORS"){
                setActors(response.data);
              }
              else{
                setActors(
                  response.data.filter((actor) =>{
                if(type === "MALE" || type === "FEMALE"){
                  return actor.sex === type
                }
              }
              ));
              }*/
          });
        break;
      case "following":
          http.get(`/users/getfollowing/${user.id}`).then((response) => {
              setActors(response.data);
          });
        break;
      case "most_starred":
          http.get(`users/mostlikes`).then((response) => {
              setActors(response.data);
            
          });
        break;
      case "most_followed":
          http.get(`users/mostfollowed`).then((response) => {
              setActors(response.data);
            
          });
        break;
      case "pre-production":
          http.get(`users/production`).then((response) => {
              //setActors(response.data);
            
          });
        break;
      case "production":
          http.get(`users/preproduction`).then((response) => {
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
          <a href= {`/actor/${actor._id}`}>
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
