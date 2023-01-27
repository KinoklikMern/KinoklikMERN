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
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import movie6 from "../../images/movies/movie6.jpg";
import { Link, NavLink } from "react-router-dom";

export default function Filmmaker() {
  return (
    <div class="filmmakerdash-container container-fluid">
      <div class="sidebar-container">
        <div class="sidebar-left">
          <div class="filmmaker-navbar px-1">
            <ul class="nav nav-tabs filmmaker-dash-ul" role="tablist">
              <li class="nav-link" role="tab" data-li="UploadMovie">
                <div class="sidebarnav-icon side-button">
                  <a href="/Notification.js">
                    <FontAwesomeIcon icon={faNewspaper} />
                  </a>
                </div>
              </li>
              <li class="nav-item" role="presentation">
                <div
                  class="nav-link tab-clickable"
                  data-bs-toggle="tab"
                  data-bs-target="#dashboard"
                  role="tab"
                >
                  <div class="sidebarnav-icon side-button">
                    <FontAwesomeIcon icon={faPhotoFilm} />
                  </div>
                </div>
              </li>

              <li class="nav-item" role="presentation">
                <div
                  class="nav-link tab-clickable"
                  data-bs-toggle="tab"
                  data-bs-target="#inbox"
                  role="tab"
                >
                  <div class="sidebarnav-icon side-button">
                    <Link to="/filmMakerDashboard" class="links">
                      <FontAwesomeIcon icon={faHome} />
                    </Link>
                  </div>
                </div>
              </li>

              <li class="nav-item" role="presentation">
                <div
                  class="nav-link tab-clickable"
                  data-bs-toggle="tab"
                  data-bs-target="#notifications"
                  role="tab"
                >
                  <div class="sidebarnav-icon side-button">
                    <FontAwesomeIcon icon={faBell} />
                  </div>
                </div>
              </li>

              <li class="nav-item" role="presentation">
                <div
                  class="nav-link tab-clickable"
                  data-bs-toggle="tab"
                  data-bs-target="#filmList"
                  role="tab"
                >
                  <div class="sidebarnav-icon side-button">
                    <br />
                  </div>
                </div>
              </li>

              <li class="nav-item" role="presentation">
                <div
                  class="nav-link tab-clickable"
                  data-bs-toggle="tab"
                  data-bs-target="#settings"
                  role="tab"
                >
                  <div class="sidebarnav-icon side-button">
                    <br />
                  </div>
                </div>
              </li>

              <li class="nav-link" role="tab" data-li="UserProfile">
                <div class="sidebarnav-icon side-button">
                  <Link to="/filmMakerDashboardSecurity" class="links">
                    <FontAwesomeIcon icon={faCog} />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

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
                  <div class="col">
                    <div class="card movie-card-selected">
                      <img src={movie6} alt="movie 6" />
                      <div class="card-body-selected"></div>
                    </div>
                    <div class="vertical-icons">
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faDollarSign} />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faStar} />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faBookmark} />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faShareNodes} />
                        </li>
                      </ul>
                    </div>

                    <div class="vertical-numbers">
                      <ul>
                        <li>200</li>
                        <li>200</li>
                        <li>200</li>
                        <li>200</li>
                      </ul>
                    </div>
                  </div>

                  <div class="side-info">
                    <FontAwesomeIcon icon={faImage} />
                    <br />
                    <FontAwesomeIcon icon={faFilm} />
                    <h3>Alberto Tihan - Distributor</h3>
                    <h3>alberto@tihanfilms.com</h3>
                    <h3>www.tihanfilms.com</h3>

                    {/* <FontAwesomeIcon icon={faImage}/>
                <br/>
                <FontAwesomeIcon icon={faPeopleGroup}/>
                <h3>Shadia Ali - Sales Agent</h3>
                <h3>info@alifilms.com</h3>
                <h3>www.AliFilms.com</h3>

                <FontAwesomeIcon icon={faImage}/>
                <br/>
                <FontAwesomeIcon icon={faCrown}/>
                <h3>Elisa Atristan - Film Festival</h3>
                <h3>Elisa.Atristan@tiff.net</h3>
                <h3>www.tiff.net</h3> */}
                  </div>
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
