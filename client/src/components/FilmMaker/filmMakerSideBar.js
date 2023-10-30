////////////////////////////////////////////////
// Create FilmmakerSideBar component
// Edit by Tony
// On Feb 11, 2023
////////////////////////////////////////////////
import { Link, NavLink } from "react-router-dom";
// import "./filmMakerDashboard.scss";
import StarIcon from "../../images/icons/star.svg";
import FlagIcon from "../../images/icons/flag.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellFullIcon from "../../images/icons/bellFull.svg";
import SettingsIcon from "../../images/icons/settings.svg";

export default function FilmmakerSideBar() {
  return (
    <>
      <div className="sidebar-left">
        <div className="filmmaker-navbar px-1">
          {/* <ul className="nav nav-tabs filmmaker-dash-ul" role="tablist"> */}
          <ul className="nav nav-tabs">
            {/* <li className="nav-link"> */}
            <li className="nav-item">
              <div className="sidebarnav-icon side-button">
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
            {/* <li className="nav-item" role="presentation">
              <div className="sidebarnav-icon side-button" disabled>
                <Link to="/filmMakerMovies">
                  <FontAwesomeIcon icon={faPhotoFilm} />                  
                </Link>
              </div>
            </li> */}
            <li className="nav-item" role="presentation">
              <div className="sidebarnav-icon side-button">
                <NavLink to="/filmMakerConnect" activeclassname="active">
                  {({ isActive }) => (
                    <>
                      {isActive ? (
                        <img
                          src={BellFullIcon}
                          alt="/"
                          style={{ width: 50, height: 50 }}
                        />
                      ) : (
                        <img
                          src={BellIcon}
                          alt="/"
                          style={{ width: 50, height: 50 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </div>
            </li>

            <li className="nav-item" role="presentation">
              <div className="sidebarnav-icon side-button">
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

            <li className="nav-link" role="tab" data-li="UserProfile">
              <div className="sidebarnav-icon side-button">
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
