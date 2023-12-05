import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";
import { useTranslation } from 'react-i18next';

export default function Filmmaker() {
  const { t } = useTranslation();

  return (
    <div className="filmmakerdash-container container-fluid">
      <div className="sidebar-container">
        <FilmmakerSideBar />

        <div className="sidebar-right">
          <article
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="llanfairpwllgwyngyll-left-tab"
            id="dashboard"
          >
            <div className=" sidebar-rightcontainer">
              <div className="item Dashboard">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  <ul id="settingsbar">
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityProfile"
                        className="security-links"
                      >
                        {t('Profile')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityCompany"
                        className="security-links"
                      >
                        {t('Company')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityPassword"
                        className="security-links"
                      >
                        {t('Password')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/filmMakerDashboardSecurityAccount"
                        className="security-links"
                      >
                        {t('Account')}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="profile-inputs">
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("First Name")}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Last Name")}
                  ></input>
                  <input type="text" id="" name="" placeholder={t("Email")}></input>
                  <input type="text" id="" name="" placeholder={t("Phone")}></input>
                  <input type="text" id="" name="" placeholder={t("City")}></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Province")}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Country")}
                  ></input>
                </div>
                <div className="side-id-2">
                  <h4> {t('Upload')}</h4>
                  <FontAwesomeIcon icon={faUser} />
                </div>

                <div className="side-id">
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
