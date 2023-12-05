import React from "react";
import "./ListItem.css";
import { useState, useEffect } from "react";
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
    http.get(`/fepks/getmoviesbyactor/${id}`).then((response) => {
      setFepks(response.data);
    });
  }, [id]);

  return (
    <>
      <div className='tw-w-full'>
        <div className='listContainer'>
          {fepks &&
            fepks.map((fepk) => (
              <div className='' key={fepk._id}>
                <a href={`/epk/${fepk.title}`}>
                  <img
                    src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                    alt=''
                    className='tw-h-full tw-w-56'
                  />
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
