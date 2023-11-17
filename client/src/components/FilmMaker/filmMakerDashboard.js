import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
//import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";
import { useTranslation } from 'react-i18next';

export default function Filmmaker() {
  const { t } = useTranslation();

  return (
    <div className="filmmakerdash-container container-fluid">
      <div className="sidebar-container">
        <FilmmakerSideBar />
        <div className="sidebar-right">
          <div className=" sidebar-rightcontainer">
            <div className="filmmaker-title">{t('Filmmaker Dashboard')}</div>
            <div className="side-id">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="upload-text">
              <div className="upload-button-text">
                {t("You don't have any EPK created. Start promoting your film right away!")}'
              </div>
              <div>
                <Link className="upload-button" to="/fepkUpload">
                  <FontAwesomeIcon icon={faPlus} />
                  <br />
                </Link>
                {t('Create your own EPK now!')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
