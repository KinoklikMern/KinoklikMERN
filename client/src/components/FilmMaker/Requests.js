import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "../../http-common";
import "./filmMakerDashboard.scss";
import profileImage from "../../images/avatarDefault.jpeg";

export default function Requests() {
  const [fepk, setFepk] = useState([]);
  const [user, setUser] = useState([]);
  const [roleFilter, setRoleFilter] = useState([""]);
  const [statusFilter, setStatusFilter] = useState([""]);
  const [mediumSynopsis, setMediumSynopsis] = useState([]);
  const [longSynopsis, setLongSynopsis] = useState([]);
  const [uniqueness, setUniqueness] = useState([]);
  const [stillsApproval, setStillsApproval] = useState([]);

  let { fepkId } = useParams();

  // let approved = fepk.filter((e) => e.status === "approved");
  // let refused = fepk.filter((e) => e.status === "refused");
  // let pending = fepk.filter((e) => e.status === "pending");

  const [approvalData, setApprovalData] = useState({
    mediumSynopsis: fepk.mediumSynopsis,
    longSynopsis: fepk.longSynopsis,
    uniqueness: fepk.uniqueness,
    stillsApproval: fepk.stillsApproval,
  });

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      setMediumSynopsis(response.data.mediumSynopsis);
      setLongSynopsis(response.data.longSynopsis);
      setUniqueness(response.data.uniqueness);
      setStillsApproval(response.data.stillsApproval);
    });
  }, []);

  // medium synopsis approval requests
  function mediumSynopsisApproval(userId, status) {
    mediumSynopsis.map((medium) => {
      if (medium.user._id === userId) {
        medium.status = status;
      }
    });
    setApprovalData({ ...approvalData, mediumSynopsis: mediumSynopsis });
    http
      .put(`fepks/update/${fepkId}`, { mediumSynopsis: mediumSynopsis })
      .then((res) => {
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // long synopsis approval requests
  function longSynopsisApproval(userId, status) {
    longSynopsis.map((long) => {
      if (long.user._id === userId) {
        long.status = status;
      }
    });
    setApprovalData({ ...approvalData, longSynopsis: longSynopsis });
    http
      .put(`fepks/update/${fepkId}`, { longSynopsis: longSynopsis })
      .then((res) => {
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // uniqueness approval requests
  function uniquenessApproval(userId, status) {
    uniqueness.map((unique) => {
      if (unique.user._id === userId) {
        unique.status = status;
      }
    });
    setApprovalData({ ...approvalData, uniqueness: uniqueness });
    http
      .put(`fepks/update/${fepkId}`, { uniqueness: uniqueness })
      .then((res) => {
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // stills approval requests
  async function stillApproval(userId, status) {
    stillsApproval.map((still) => {
      if (still.user._id === userId) {
        still.status = status;
      }
    });
    setApprovalData({ ...approvalData, stillsApproval: stillsApproval });
    http
      .put(`fepks/update/${fepkId}`, { stillsApproval: stillsApproval })
      .then((res) => {
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRoleFilterChange(event) {
    setRoleFilter(event.target.value);
  }

  function handleStatusFilterChange(event) {
    setStatusFilter(event.target.value);
  }

  return (
    <div>
      <div class="row">
        <div class="col-md-6">
          <div className="filtersBar btn-group" id="roleFilter">
            <button
              className={`btn filtersBarBtn ${
                roleFilter === "" ? "active" : ""
              }`}
              onClick={() => handleRoleFilterChange("")}
            >
              All Users
            </button>
            <button
              className={`btn filtersBarBtn `}
              onClick={() => handleRoleFilterChange("Investor")}
            >
              Investor
            </button>
            <button
              className={`btn filtersBarBtn`}
              onClick={() => handleRoleFilterChange("Viewer")}
            >
              Viewer
            </button>
            <button
              className={`btn filtersBarBtn`}
              onClick={() => handleRoleFilterChange("Distributor")}
            >
              Distributor
            </button>
            <button
              className={`btn filtersBarBtn`}
              onClick={() => handleRoleFilterChange("Film_Festival")}
            >
              Film Festival
            </button>
            <button
              className={`btn filtersBarBtn`}
              onClick={() => handleRoleFilterChange("Sales_Agent")}
            >
              Sales Agent
            </button>
          </div>

          <div>
            <div className="filtersBar btn-group" id="statusFilter">
              <button
                className={`btn filtersBarBtn ${
                  statusFilter === "" ? "active" : ""
                }`}
                onClick={() => handleStatusFilterChange("")}
              >
                All EPK
              </button>

              <button
                className={`btn filtersBarBtn ${
                  statusFilter === "pending" ? "active" : ""
                }`}
                onClick={() => handleStatusFilterChange("pending")}
              >
                Pending
              </button>
              <button
                className={`btn filtersBarBtn ${
                  statusFilter === "approved" ? "active" : ""
                }`}
                onClick={() => handleStatusFilterChange("approved")}
              >
                Approved
              </button>
              <button
                className={`btn filtersBarBtn ${
                  statusFilter === "refused" ? "active" : ""
                }`}
                onClick={() => handleStatusFilterChange("refused")}
              >
                Denied
              </button>
            </div>
            <div className="actionBtn col-md-6">
              <button classname="btn">Approve All</button>
              <button classname="btn">Deny All</button>
            </div>
          </div>
        </div>
      </div>
      <div className="requestFeedContainer">
        {/* Medium Synopsis requests */}
        <div>
          {mediumSynopsis.map((medium) => {
            return (
              medium.status === "pending" && (
                <div style={{ margin: "20px 0 5px 0px" }}>
                  <h5>
                    User Name:{" "}
                    <b>
                      {medium.user.firstName} {medium.user.lastName}
                    </b>
                  </h5>
                  <p>
                    <img
                      src={`${medium.user.picture}`}
                      style={{ width: "40px", height: "auto" }}
                    />
                    medium.comment
                  </p>
                  <button
                    onClick={() =>
                      mediumSynopsisApproval(medium.user._id, "approved")
                    }
                  >
                    approve
                  </button>
                  &nbsp; &nbsp;
                  <button
                    onClick={() =>
                      mediumSynopsisApproval(medium.user._id, "refused")
                    }
                  >
                    refuse
                  </button>
                </div>
              )
            );
          })}
        </div>
        <hr></hr>
        <br></br>

        {/* Long Synopsis requests */}
        <div>
          {longSynopsis.map((long) => {
            return (
              long.status === "" && (
                <div style={{ margin: "20px 0 5px 0px" }}>
                  <h5>
                    User Name:{" "}
                    <b>
                      {long.user.firstName} {long.user.lastName}
                    </b>
                  </h5>
                  <p>
                    <img
                      src={`${long.user.picture}`}
                      style={{ width: "40px", height: "auto" }}
                    />
                    long.comment
                  </p>
                  <button
                    onClick={() =>
                      longSynopsisApproval(long.user._id, "approved")
                    }
                  >
                    approve
                  </button>
                  &nbsp; &nbsp;
                  <button
                    onClick={() =>
                      longSynopsisApproval(long.user._id, "refused")
                    }
                  >
                    refuse
                  </button>
                </div>
              )
            );
          })}
        </div>
        <hr></hr>
        <br></br>

        {/* Uniqueness requests */}
        <div>
          {uniqueness.map((unique) => {
            return (
              unique.status === "approved" && (
                <div style={{ margin: "20px 0 5px 0px" }}>
                  <h5>
                    User Name:{" "}
                    <b>
                      {unique.user.firstName} {unique.user.lastName}
                    </b>
                  </h5>
                  <p>
                    <img
                      src={`${unique.user.picture}`}
                      style={{ width: "40px", height: "auto" }}
                    />
                    unique.comment
                  </p>
                  <button
                    onClick={() =>
                      uniquenessApproval(unique.user._id, "approved")
                    }
                  >
                    approve
                  </button>
                  &nbsp; &nbsp;
                  <button
                    onClick={() =>
                      uniquenessApproval(unique.user._id, "refused")
                    }
                  >
                    refuse
                  </button>
                </div>
              )
            );
          })}
        </div>
        <hr></hr>
        <br></br>

        {/* Stills requests */}
        <div>
          {stillsApproval.map((still) => {
            return (
              still.status === "refused" && (
                <div style={{ margin: "20px 0 5px 0px" }}>
                  <h5>
                    User Name:{" "}
                    <b>
                      {still.user.firstName} {still.user.lastName}
                    </b>
                  </h5>
                  <p>
                    <img
                      src={`${still.user.picture}`}
                      style={{ width: "40px", height: "auto" }}
                    />
                    still.comment
                  </p>
                  <button
                    onClick={() => stillApproval(still.user._id, "approved")}
                  >
                    approve
                  </button>
                  &nbsp; &nbsp;
                  <button
                    onClick={() => stillApproval(still.user._id, "refused")}
                  >
                    refuse
                  </button>
                </div>
              )
            );
          })}
        </div>

        <div style={{ margin: "20px 0 5px 0px" }}>
          <h5>
            User Name: <b>Moosa Mughal</b>
          </h5>
          <p>
            <img
              src={`${profileImage}`}
              style={{ width: "40px", height: "auto" }}
            />
            Comment
          </p>
          <button>approve</button>
          &nbsp; &nbsp;
          <button>refuse</button>
        </div>
      </div>
    </div>
  );
}