import React from "react";
import "./ListItem.css";
import { useState, useEffect } from "react";
import http from "../../http-common";
import { useSelector } from "react-redux";
import {useTranslation} from 'react-i18next';

export default function ListItem({ title, status, type, role }) {
  const { t } = useTranslation();
  let production_type = type;
  if (type && type.length === 0) {
    production_type = ["Movie", "TV Show", "Web Series", t("Documentary")];
  }
  const [fepks, setFepks] = useState([]);
  // const [actors, setActors] = useState([]);
  // fetching user
  //: `epk/${fepk.title}`
  const user = useSelector((state) => state.user);
  let id;
  if (!user) {
    id = "0";
  } else {
    id = user.id;
  }

  useEffect(() => {
    // eslint-disable-next-line default-case
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      {fepks &&
        fepks.map((fepk) => {
          // Replace spaces '%20' with underscores
          const formattedTitle = fepk.title.replace(/ /g, "_");

          return (
            <div className='listItem' key={fepk._id}>
              <a
                href={
                  role === "actor"
                    ? `/actor/6487758c553b5011282f72a5`
                    : `epk/${formattedTitle}`
                }
              >
                <img
                  src={
                    role === "actor"
                      ? `${process.env.REACT_APP_AWS_URL}/${fepk.picture}`
                      : `${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`
                  }
                  alt=''
                />
              </a>
            </div>
          );
        })}
    </>
  );
}
