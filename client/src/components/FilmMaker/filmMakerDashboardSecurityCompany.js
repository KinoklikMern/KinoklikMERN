import React from "react";
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

        <div className="sidebar-right sidebar-right-setting-container">
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
                        {t('Studio')}
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
                <div className="profile-inputs company-inputs-margin">
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Studio Name")}
                  ></input>
                  {/* <input
                    type="text"
                    id=""
                    name=""
                    placeholder="Studio Website"
                  ></input> */}
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Studio Email")}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Studio Phone")}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Studio City")}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Studio Province")}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder= {t("Studio Country")}
                  ></input>
                </div>

                {/* <div className="side-id">
                  <FontAwesomeIcon icon={faUser} />
                </div> */}
                <div classNameName="d-flex justify-content-end settingsSaveBtn">
                  <button type="submit" classNameName="btn btn-secondary">
                    {t('Save')}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
