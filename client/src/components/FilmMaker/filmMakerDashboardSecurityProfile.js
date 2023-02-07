import { useSelector } from "react-redux";
import React from "react";
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
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";

export default function Filmmaker() {
  return (
    <div class="filmmakerdash-container container-fluid">
      <div class="sidebar-container">
        <FilmmakerSideBar />

        <div class="sidebar-right">
          <article
            class="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="llanfairpwllgwyngyll-left-tab"
            id="dashboard"
          >
            <div class=" sidebar-rightcontainer">
              <div class="item Dashboard">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                  <ul id="settingsbar">
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityProfile"
                        class="security-links"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityCompany"
                        class="security-links"
                      >
                        Company
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityPassword"
                        class="security-links"
                      >
                        Password
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityAccount"
                        class="security-links"
                      >
                        Account
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="profile-inputs">
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="First Name"
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="Last Name"
                  ></input>
                  <input type="text" id="" name="" placeholder="Email"></input>
                  <input type="text" id="" name="" placeholder="Phone"></input>
                  <input type="text" id="" name="" placeholder="City"></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="Province"
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="Country"
                  ></input>
                </div>
                <div class="side-id-2">
                  <h4>Upload</h4>
                  <FontAwesomeIcon icon={faUser} />
                </div>

                <div class="side-id">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
