import React from "react";
import "./ListItem.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../http-common";
import { useSelector } from "react-redux";

export default function ListItem() {
  const [fepks, setFepks] = useState([]);

  const user = useSelector((state) => state.user);
  let id;
  if (!user) {
    id = "0";
  } else {
    id = user.id;
  }

  useEffect(() => {
    http.get(`/getactorbymovie/${id}`).then((response) => {
      setFepks(response.data);
    });
  }, []);

  return (
    <>
      {fepks &&
        fepks.map((fepk) => (
          <div className='listItem' key={fepk._id}>
            <a href={`epk/${fepk.title}`}>
              <img
                src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                alt=''
              />
            </a>
          </div>
        ))}
    </>
  );
}
