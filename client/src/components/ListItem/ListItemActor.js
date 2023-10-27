import React from "react";
import "./ListItemActor.css";
import { useState, useRef, useEffect } from "react";
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
    const fetchData = async () => {
      try {
        let response = null;

        switch (title) {
          case "starred":
            response = await http.get(`users/starred/${user.id}`);
            break;
          case "following":
            response = await http.get(`users/getfollowing/${user.id}`);
            break;
          case "most_starred":
            response = await http.get(`users/mostlikes`);
            break;
          case "most_followed":
            response = await http.get(`users/mostfollowed`);
            break;
          case "pre-production":
            response = await http.get(`users/production`);
            break;
          case "production":
            response = await http.get(`users/preproduction`);
            break;
          default:
            return;
        }

        let filteredActors = response.data;

        console.log("filteredActors", filteredActors);
        console.log("type", type);
        if (type.length > 0) {
          type.forEach((filter) => {
            if (filter.startsWith("Age Range:")) {
              const [minAge, maxAge] = filter
                .replace("Age Range:", "")
                .split("-")
                .map((age) => parseInt(age, 10)); // iterate over these two strings and convert them to integers,a base of 10 (decimal)

              console.log("minAge:", minAge);
              console.log("maxAge:", maxAge);

              // Filter actors by age range
              filteredActors = filteredActors.filter(
                (actor) => actor.age >= minAge && actor.age <= maxAge
              );
            } else if (filter === "Male") {
              filteredActors = filteredActors.filter(
                (actor) => actor.sex === filter
              );
            } else if (filter === "Female") {
              filteredActors = filteredActors.filter(
                (actor) => actor.sex === filter
              );
            } else if (filter.startsWith("Ethnicity:")) {
              const ethnicity = filter.replace("Ethnicity:", "").trim();

              // Filter actors by city
              filteredActors = filteredActors.filter(
                (actor) => actor.ethnicity === ethnicity
              );
            } else if (filter.startsWith("Representation:")) {
              const representation = filter
                .replace("Representation:", "")
                .trim();

              // Map the filter value to a boolean representation
              let hasAgent;

              if (representation === "Yes") {
                hasAgent = true;
              } else if (representation === "No") {
                hasAgent = false;
              }

              // Filter actors by representation
              filteredActors = filteredActors.filter(
                (actor) => actor.hasAgent === hasAgent
              );
            } else if (filter.startsWith("City:")) {
              const city = filter.replace("City:", "").trim();

              // Filter actors by city
              filteredActors = filteredActors.filter(
                (actor) => actor.city === city
              );
            } else if (filter.startsWith("Country:")) {
              const country = filter.replace("Country:", "").trim();

              // Filter actors by country
              filteredActors = filteredActors.filter(
                (actor) => actor.country === country
              );
            } else if (filter.includes("All Actors")) {
              setActors(response.data);
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
      {actors &&
        //6483619d64b048f952a6fb5b
        actors.map((actor) => (
          <div className="listItemactor" key={actor._id}>
            
            <a href={`/actor/${actor._id}`}>
              <img  className="actor-image"
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
