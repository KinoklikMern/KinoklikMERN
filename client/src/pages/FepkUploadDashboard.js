import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FepkCoverForm from "../components/Epk/Input/fepkCoverForm";


function FepkUploadDashboard() {
  return (
    <>
    <div>
      <br/>
      <FepkCoverForm />
      <br/>
    </div>
    </>
  );
}

export default FepkUploadDashboard;
