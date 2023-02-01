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
} from "@fortawesome/free-solid-svg-icons";
import movie6 from "../../images/movies/movie6.jpg";
import movie2 from "../../images/movies/movie2.jpeg";
import movie5 from "../../images/movies/movie5.jpg";

import { Link, NavLink } from "react-router-dom";
import FilmmakerSideBar from "./filmMakerSideBar";
export default function FilmmakerMovies() {
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
                <h1>Filmmaker Dashboard</h1>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                  <div class="col">
                    <Link to="/filmMakerSelectedMovie" class="links">
                      <div class="card movie-card">
                        <img src={movie6} alt="movie 6" />
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center pb-1 small-numbers">
                            <p>200</p>
                            <p>200</p>
                            <p>200</p>
                            <p>200</p>
                          </div>

                          <div class="d-flex justify-content-between align-items-center pb-1">
                            <FontAwesomeIcon icon={faDollarSign} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faBookmark} />
                            <FontAwesomeIcon icon={faShareNodes} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div class="col">
                    <div class="card movie-card">
                      <img src={movie2} alt="movie 2" />
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center pb-1 small-numbers">
                          <p>200</p>
                          <p>200</p>
                          <p>200</p>
                          <p>200</p>
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
