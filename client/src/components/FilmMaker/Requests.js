import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "../http-common";

export default function Requests() {
  const [fepk, setFepk] = useState([]);
  const [roleFilter, setRoleFilter] = useState([""]);
  const [statusFilter, setStatusFilter] = useState([""]);
  const [mediumSynopsis, setMediumSynopsis] = useState([]);
  const [longSynopsis, setLongSynopsis] = useState([]);
  const [uniqueness, setUniqueness] = useState([]);
  const [stillsApproval, setStillsApproval] = useState([]);

  let { fepkId } = useParams();

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
      <h2>Request Component</h2>
      <p>Placeholder text for the EPK Requests</p>
    </div>
  );
}
