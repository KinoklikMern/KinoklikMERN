import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";

export default function filmMakerNotifications() {
  return (
    <div className="filmmakerdash-container">
      <div className="sidebar-container">
        <FilmmakerSideBar />
        <div className="sidebar-right">
          <article
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="llanfairpwllgwyngyll-left-tab"
            id="dashboard"
          >
            <div className="sidebar-rightcontainer">
              <div className="item Dashboard">
                <h1>Filmmaker Dashboard</h1>

                {/* <Link to="/uploadFepk"> */}
                <Button>Notifications Page</Button>
                <br />
                <br />
                {/* </Link> */}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
