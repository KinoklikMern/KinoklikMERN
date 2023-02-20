import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FepkCoverForm from "../components/Epk/Input/fepkCoverForm";
import FepkDashboardNoAccess from "../components/Epk/Input/fepkDashboardNoAccess";


function FepkUploadDashboard() {

  // fetching user details from local storage
  const user = JSON.parse(localStorage.getItem("persist:root")).user;
  const filmmaker_role = JSON.parse(user).role;
  const access = (filmmaker_role === "FILM_MAKER");

  return (
    <>
    {access === true ?
    (
      <div>
        <br/>
        <FepkCoverForm />
        <br/>
      </div>
    ):
    (
      <div>
        <FepkDashboardNoAccess />
      </div> 
    )
    }
    </>
  );
}

export default FepkUploadDashboard;
