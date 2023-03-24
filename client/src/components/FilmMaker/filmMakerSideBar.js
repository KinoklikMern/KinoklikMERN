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
import DashFull from "../../images/icons/dashFull.svg";
//import "./filmMakerDashboard.scss";
import StarIcon from "../../images/icons/star.svg";
import StarFullIcon from "../../images/icons/star.svg";
import FlagIcon from "../../images/icons/flag.svg";
import FlagFullIcon from "../../images/icons/flagFull.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellFullIcon from "../../images/icons/bellFull.svg";
import SettingsIcon from "../../images/icons/settings.svg";
import SettingFullIcon from "../../images/icons/settingsFull.svg";

export default function FilmmakerSideBar() {
  return (
    <>
      <div class="sidebar-left">
        <div class="filmmaker-navbar px-1">
          {/* <ul class="nav nav-tabs filmmaker-dash-ul" role="tablist"> */}
          <ul class="nav nav-tabs">
            {/* <li class="nav-link"> */}
            <li class="nav-item">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerDashboard">
                  {/* <FontAwesomeIcon icon={faNewspaper} /> */}
                  <img
                    src={StarIcon}
                    alt="/"
                    style={{ width: 50, height: 50 }}
                  />
                </Link>
              </div>
            </li>
            {/* <li class="nav-item" role="presentation">
              <div class="sidebarnav-icon side-button" disabled>
                <Link to="/filmMakerMovies">
                  <FontAwesomeIcon icon={faPhotoFilm} />                  
                </Link>
              </div>
            </li> */}
            <li class="nav-item" role="presentation">
              <div class="sidebarnav-icon side-button">
                <NavLink to="/filmMakerConnect" activeClassName="active">
                  {/* <FontAwesomeIcon icon={faBell} /> */}
                  {(isActive) => (
                    <>
                      {isActive ? (
                        <img
                          src={BellIcon}
                          alt="/"
                          style={{ width: 50, height: 50 }}
                        />
                      ) : (
                        <img
                          src={BellFullIcon}
                          alt="/"
                          style={{ width: 50, height: 50 }}
                        />
                      )}
                    </>
                  )}
                  <img
                    src={BellIcon}
                    alt="/"
                    style={{ width: 50, height: 50 }}
                  />
                </NavLink>
              </div>
            </li>

            <li class="nav-item" role="presentation">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerNotifications">
                  {/* <FontAwesomeIcon icon={faBell} /> */}
                  <img
                    src={FlagIcon}
                    alt="/"
                    style={{ width: 50, height: 50 }}
                  />
                </Link>
              </div>
            </li>

            <li class="nav-link" role="tab" data-li="UserProfile">
              <div class="sidebarnav-icon side-button">
                <Link to="/filmMakerDashboardSecurityProfile">
                  {/* <FontAwesomeIcon icon={faCog} /> */}
                  <img
                    src={SettingsIcon}
                    alt="/"
                    style={{ width: 50, height: 50 }}
                  />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
