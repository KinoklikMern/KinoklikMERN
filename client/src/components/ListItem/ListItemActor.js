import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import http from "../../http-common";
import "./ListItemActor.css";

export default function ListItem({ title, type }) {
  const { user } = useSelector(({ user }) => ({ user }));

  const id = user?.id || "0";
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;

        switch (title) {
          case "all_actors":
            response = await http.get(`users/getactors`);
            break;
          default:
            return;
        }

        let filteredActors = response.data;

        if (type.length > 0) {
          type.forEach((filter) => {
            if (filter.startsWith("Age Range:")) {
              const [minAge, maxAge] = filter
                .replace("Age Range:", "")
                .split("-")
                .map((age) => parseInt(age, 10));

              filteredActors = filteredActors.filter(
                (actor) => actor.age >= minAge && actor.age <= maxAge
              );
            } else if (filter === "Male" || filter === "Female") {
              filteredActors = filteredActors.filter(
                (actor) => actor.sex === filter
              );
            } else if (filter.startsWith("Ethnicity:")) {
              const ethnicity = filter.replace("Ethnicity:", "").trim();
              filteredActors = filteredActors.filter(
                (actor) => actor.ethnicity === ethnicity
              );
            } else if (filter.startsWith("Representation:")) {
              const representation = filter
                .replace("Representation:", "")
                .trim();
              const hasAgent = representation === "Yes";

              filteredActors = filteredActors.filter(
                (actor) => actor.hasAgent === hasAgent
              );
            } else if (filter.startsWith("City:")) {
              const city = filter.replace("City:", "").trim();
              filteredActors = filteredActors.filter(
                (actor) => actor.city === city
              );
            } else if (filter.startsWith("Country:")) {
              const country = filter.replace("Country:", "").trim();
              filteredActors = filteredActors.filter(
                (actor) => actor.country === country
              );
            }
          });
        }

        setActors(filteredActors);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    fetchData();
  }, [title, type]);


  return (
    <>
    {actors?.map((actor) => (
      <div className="listItemactor" key={actor._id}>
        <a href={`/actor/${actor._id}`}>
          <img
            className="actor-image"
            src={`${process.env.REACT_APP_AWS_URL}/${actor.picture}`}
            alt=""
          />
              <div className="overlay">
                  <p className="actorname">{`${actor.firstName} ${actor.lastName}`}</p>
            </div>
            <div className="overlay">
                  <p className="actor-name">{`${actor.firstName} ${actor.lastName}`}</p>
            </div>
            </a>
           
          </div>
        ))}
    </>
  );
}
