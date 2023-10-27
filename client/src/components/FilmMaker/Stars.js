/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import Axios from "axios";

export default function Stars() {
  const [epk, setEpk] = useState([]);
  const [users, setUsers] = useState([]);
  const [RequestUsers, setRequestUsers] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const epkid = queryParams.get("id");

  useEffect(() => {
    try {
      Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/filmMaker/selectedepk/" + epkid
      ).then((rs) => {
        setEpk(rs.data);
        setUsers(epk.favourites);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [epk.favourites, epkid]);

  const getRequestUsers = (id) => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/filmMaker/getUserbyId/" + id
    ).then((rs) => {
      setRequestUsers(epk.longSynopsis);
    });
  };

  return (
    <div>
      <div>
        {epk.likes == null
          ? "No one like it yet."
          : users == null
          ? setUsers(epk.likes)
          : users.map((user) => (
              <div class="row">
                <div class="col-6 g-3">
                  <img src={user.picture} alt="user img" />
                </div>
                <div class="col-6 g-3">
                  <p>{user.username == null ? " " : user.username}</p>
                  <p>
                    {user.firstName == null ? " " : user.firstName}{" "}
                    {user.lastName == null ? "" : user.lastName}
                  </p>
                  <p>{user.email == null ? " " : user.email}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
