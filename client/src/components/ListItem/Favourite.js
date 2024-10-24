import React from "react";
import "./ListItem.css";
import { useState, useEffect } from "react";
import http from "../../http-common";
import { useSelector } from "react-redux";

export default function Favourite() {
  const [fepks, setFepks] = useState([]);
  // fetching user
  const user = useSelector((state) => state.user);
  let id;
  if (!user) {
    id = "0";
  } else {
    id = user.id;
  }

  useEffect(() => {
    http.get(`fepks/favourite/byuser/${id}`).then((response) => {
      setFepks(response.data);
    });
  }, [id]);
  return (
    <>
      {fepks &&
        fepks.map((fepk) => (
          <div className="listItem" key={fepk._id}>
            <a href={`epkview/${fepk._id}`}>
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
