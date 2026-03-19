import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import http from "../../http-common";
import "./ListItemActor.css";
import { AGE_OPTIONS } from '../../constants/AgeOptions.js';
import { Link } from "react-router-dom";

export default function ListItem({ title, type }) {
  //const { user } = useSelector(({ user }) => ({ user }));

  const selectUserData = useMemo(() => (state) => state.user, []);
  const user = useSelector(selectUserData);

  const titleToEndpoint = {
    all_actors: "users/getactors",
    // Add more titles and corresponding endpoints as needed
  };

  // eslint-disable-next-line no-unused-vars
  const id = user?.id || "0";
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = titleToEndpoint[title];

        if (!endpoint) {
          // Handle the case where the title is not found
          return;
        }

        const response = await http.get(endpoint);

        let filteredActors = response.data;

        if (type.length > 0) {
          type.forEach((filter) => {
            if (filter.startsWith("Age Range:")) {
              const ageId = filter.replace("Age Range:", "").trim();
              
              const rangeOption = AGE_OPTIONS.find(opt => opt.value === ageId);
              
              if (rangeOption) {
                const [minAge, maxAge] = rangeOption.label.split("-").map(a => parseInt(a, 10));
                
                filteredActors = filteredActors.filter(
                  (actor) => actor.age >= minAge && actor.age <= maxAge
                );
              }
            } else if (filter.startsWith("Gender:")) {
              const gender = filter.replace("Gender:", "").trim();
              filteredActors = filteredActors.filter(
                (actor) => actor.gender === gender
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
        setActors(filteredActors.reverse()); // Reverse the order before setting the state
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, type]);

  return (
    <>
      {actors?.map((actor) => (
        <div className="listItemactor" key={actor._id}>
          <Link to={`/actor/${actor._id}`}>
            <img
              className="actor-image"
              src={
                actor.picture && !actor.picture.startsWith("https")
                  ? `${process.env.REACT_APP_AWS_URL}/${actor.picture}`
                  : actor.picture
              }
              alt=""
            />
            <div className="overlay">
              <p className="actorname">{`${actor.firstName} ${actor.lastName}`}</p>
            </div>
            <div className="overlay">
              <p className="actor-name">{`${actor.firstName} ${actor.lastName}`}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}