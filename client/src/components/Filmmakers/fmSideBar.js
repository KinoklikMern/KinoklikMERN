import React, { useState } from "react";
import "./styles.scss";
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
import Company from "./Components/Company";
import Account from "./Components/Account";
import Profile from "./Components/Profile";
import Password from "./Components/Password";
import Settings from "./Components/Settings";

export default function FmSideBar() {
  const [activeTab, setActiveTab] = useState("createEPK");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  let component;
  switch (activeTab) {
    case "createEPK":
      component = <Company />;
      break;
    case "listEPK":
      component = <Account />;
      break;
    case "connectEPK":
      component = <Profile />;
      break;
    case "notifications":
      component = <Password />;
      break;
    case "settings":
      component = <Settings />;
      break;
    default:
      component = <Company />;
  }

  return (
    <div className="fmDash">
      <div className="fmSidebar">
        <button
          className={activeTab === "createEPK" ? "active" : ""}
          onClick={() => handleTabClick("createEPK")}
        >
          <FontAwesomeIcon icon={faNewspaper} />
        </button>
        <button
          className={activeTab === "listEPK" ? "active" : ""}
          onClick={() => handleTabClick("listEPK")}
        >
          <FontAwesomeIcon icon={faPhotoFilm} />
        </button>
        <button
          className={activeTab === "connectEPK" ? "active" : ""}
          onClick={() => handleTabClick("connectEPK")}
        >
          <img src={DashFull} alt="Connect" width="50" height="50" />
        </button>
        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => handleTabClick("notifications")}
        >
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => handleTabClick("password")}
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>

      <div className="container">
        <div className="sidebar">
          <p>Sidebar content goes here.</p>
        </div>
        <div className="content">{component}</div>
      </div>
    </div>
  );
}
