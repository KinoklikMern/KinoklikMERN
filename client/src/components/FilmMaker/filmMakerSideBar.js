////////////////////////////////////////////////
// Create FilmmakerSideBar component
// Edit by Tony 
// On Feb 11, 2023
////////////////////////////////////////////////
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faPhotoFilm,
  faHome,
  faBell,
  faCog,
  faHandshake,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function FilmmakerSideBar() {
  return (
    <>
      <div class="sidebar-left">
        <div class="filmmaker-navbar px-1">
          <ul class="nav nav-tabs filmmaker-dash-ul" role="tablist">
            <li class="nav-link">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerDashboard">
                  <FontAwesomeIcon icon={faNewspaper} />
                </Link>
              </div>
            </li>
            <li class="nav-item" role="presentation">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerMovies">
                  <FontAwesomeIcon icon={faPhotoFilm} />
                </Link>
              </div>
            </li>

            <li class="nav-item" role="presentation">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerConnect">
                  <FontAwesomeIcon icon={faHandshake} />
                </Link>
              </div>
            </li>

            <li class="nav-item" role="presentation">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerNotifications">
                  <FontAwesomeIcon icon={faBell} />
                </Link>
              </div>
            </li>

            <li class="nav-link" role="tab" data-li="UserProfile">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerDashboardSecurityAccount">
                  <FontAwesomeIcon icon={faCog} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
