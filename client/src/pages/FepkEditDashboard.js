import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
import { Button, Col, Row } from "antd";
import FepkEditCoverForm from "../components/Epk/Input/fepkEditCoverForm";
import LoglineForm from "../components/Epk/Input/loglineFepkForm";
import DetailsForm from "../components/Epk/Input/detailsFepkForm";
import SynopsisForm from "../components/Epk/Input/fepkSynopsisForm";
import UniquenessForm from "../components/Epk/Input/fepkUniquenessForm";
import StillsForm from "../components/Epk/Input/fepkStills";

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
      <SynopsisForm />
      <br/>
      <UniquenessForm />
      <br/>
      <StillsForm />
      <br/>
    </div>
    
    </>
  );
}
export default FepkEditDashboard;
