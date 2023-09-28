////////////////////////////////////////////////
// Create filmMakerSelectedEpk page
// Edit by Tony
// On Feb 15, 2023
////////////////////////////////////////////////
import { React, useEffect, useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import movie6 from "../../images/movies/movie6.jpg";
import { Link, NavLink } from "react-router-dom";
import FilmMakerSideBar from "../../components/FilmMaker/filmMakerSideBar";
import Stars from "../../components/FilmMaker/Stars";
import Requests from "../../components/FilmMaker/Requests";

export default function Filmmaker() {
  const queryParams = new URLSearchParams(window.location.search);
  const epkid = queryParams.get("id");

  const [epk, setEpk] = useState([]);
  const [users, setUsers] = useState([]);
  const [RequestUsers, setRequestUsers] = useState([]);
  const [requestFilter, setRequestFilter] = useState(["Pending"]);
  const [roleFilter, setRoleFilter] = useState(["Investors"]);
  const [activeTab, setActiveTab] = useState(["Stars"]);

  let component;
  switch (activeTab) {
    case "Stars":
      component = <Stars />;
      break;
    case "Requests":
      component = <Requests />;
      break;
    default:
      component = <Stars />;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
  }, []);

  const getRequestUsers = (id) => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/filmMaker/getUserbyId/" + id
    ).then((rs) => {
      setRequestUsers(epk.longSynopsis);
    });
  };

  return (
    <div class="filmmakerdash-container container-fluid">
      <div class="sidebar-container">
        <FilmMakerSideBar />

        <div class="sidebar-right row">
          <div class="col-4">
            <div class="row row-cols-md-3 g-5">
              <div class="col">
                <div class="card movie-card">
                  <img
                    src={`${
                      process.env.REACT_APP_AWS_URL + "/" + epk.banner_url
                    }`}
                    alt="movie banner"
                  />
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center pb-1 small-numbers">
                      <p>
                        {epk.wishes_to_buy == null
                          ? "0"
                          : epk.wishes_to_buy.length}
                      </p>
                      <p>{epk.likes == null ? "0" : epk.likes.length}</p>
                      <p>
                        {epk.favourites == null ? "0" : epk.favourites.length}
                      </p>
                      <p>{epk.sharings == null ? "0" : epk.sharings.length}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center pb-1">
                      <FontAwesomeIcon icon={faDollarSign} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faBookmark} />
                      <FontAwesomeIcon icon={faShareNodes} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-8 top-50 start-50">
            <h3>
              <button
                className={activeTab === "Stars" ? "active" : ""}
                onClick={() => handleTabClick("Stars")}
              >
                Stars
              </button>
              |{" "}
              <button
                className={activeTab === "Requests" ? "active" : ""}
                onClick={() => handleTabClick("Requests")}
              >
                EPK Requests
              </button>
            </h3>
            <hr />
            <div>{component}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
