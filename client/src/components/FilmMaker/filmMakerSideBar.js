import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faPhotoFilm,
  faHome,
  faBell,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function FilmmakerSideBar() {
  return (
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
  );
}
