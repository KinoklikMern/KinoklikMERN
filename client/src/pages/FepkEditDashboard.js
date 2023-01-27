import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
import { Button, Col, Row } from "antd";
import FepkEditCoverForm from "../components/Epk/Input/fepkEditCoverForm";
import LoglineForm from "../components/Epk/Input/loglineFepkForm";
import DetailsForm from "../components/Epk/Input/detailsFepkForm";


function FepkEditDashboard() {
    return (
    
    <>
    
    <div>
      <br/>
      <FepkEditCoverForm />
      <br/>
      <DetailsForm />
      <br/>
      <LoglineForm />
      <br/>
    </div>
    
    </>
  );
}
export default FepkEditDashboard;
