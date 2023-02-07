import { useSelector } from "react-redux";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComments,
  faPlusCircle,
  faHome,
  faInbox,
  faBell,
  faCamera,
  faCog,
  faNewspaper,
  faPhotoFilm,
  faDollarSign,
  faStar,
  faBookmark,
  faShareNodes,
  faImage,
  faFilm,
  faPeopleGroup,
  faCrown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

import "./filmMakerDashboard.scss";
import movie6 from "../../images/movies/movie6.jpg";
import movie2 from "../../images/movies/movie2.jpeg";
import movie5 from "../../images/movies/movie5.jpg";
import FilmmakerSideBar from "./filmMakerSideBar";

export default function Filmmaker() {
  return (
    <div class="filmmakerdash-container container-fluid">
      <div class="sidebar-container">
        <FilmmakerSideBar />
        <div class="sidebar-right">
          <div class=" sidebar-rightcontainer">
            <div class="filmmaker-title">Filmmaker Dashboard</div>
            <div class="side-id">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div class="upload-text">
              <div class="upload-button-text">
                You don't have any EPK created. Start promoting your film right
                away!
              </div>
              <div>
                <Link class="upload-button" to="/fepkUpload">
                  <FontAwesomeIcon icon={faPlus} />
                  <br />
                </Link>
                Create your own EPK now!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
