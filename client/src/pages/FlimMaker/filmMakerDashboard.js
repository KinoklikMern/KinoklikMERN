////////////////////////////////////////////////
// Create filmMakerDashboard page
// Edit by Tony
// On Jan 15, 2023
////////////////////////////////////////////////
import { React, useEffect, useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
// import "./filmMakerDashboardPage.scss";
import FilmMakerSideBar from "../../components/FilmMaker/filmMakerSideBar";
import {useTranslation} from 'react-i18next';

export default function Filmmaker() {
  const [epkList, setEpkList] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    try {
      Axios.get(process.env.REACT_APP_BACKEND_URL + "/filmmaker/").then(
        (rs) => {
          setEpkList(rs.data);
        }
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);

  return (
    <div className="filmmakerdash-container">
      <div className="sidebar-container">
        <FilmMakerSideBar />

        <div className="sidebar-right">
          <article
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="llanfairpwllgwyngyll-left-tab"
            id="dashboard"
          >
            <div className="sidebar-rightcontainer">
              <div className="item Dashboard">
                <h1>{t("Filmmaker Dashboard")}</h1>

                <Link to="/uploadFepk">
                  <Button>{t("Create New Film EPK")}</Button>
                  <br />
                  <br />
                </Link>

                {!epkList
                  ? () => (
                      <div>
                        <p className="icon-plus">
                        {t("You don`t have any EPK created.To start promoting your ")}
                          {t(" film right away.")}
                        </p>
                        <Button> {t("Create your free film EPK now!")} </Button>
                      </div>
                    )
                  : null}

                <div className="row g-5">
                  {epkList.map((epk, index) => (
                    <div key={index} className="col-4">
                      <Link
                        to={`/filmMakerSelectedEpk?id=${epk._id}`}
                        className="links"
                      >
                        <div className="card movie-card">
                          <img
                            src={`${process.env.REACT_APP_AWS_URL}/${epk.banner_url}`}
                            alt="movie banner"
                          />

                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center pb-1 small-numbers">
                              <p>
                                {epk.wishes_to_buy == null
                                  ? "0"
                                  : epk.wishes_to_buy.length}
                              </p>
                              <p>
                                {epk.likes == null ? "0" : epk.likes.length}
                              </p>
                              <p>
                                {epk.favourites == null
                                  ? "0"
                                  : epk.favourites.length}
                              </p>
                              <p>
                                {epk.sharings == null
                                  ? "0"
                                  : epk.sharings.length}
                              </p>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pb-1">
                              <FontAwesomeIcon icon={faDollarSign} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faBookmark} />
                              <FontAwesomeIcon icon={faShareNodes} />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to={`/editFepk/${epk._id}`}
                        style={{ color: "white", float: "right" }}
                      >
                        {t("update")}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
