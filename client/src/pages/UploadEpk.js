import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import EpkCoverForm from "../components/Epk/Input/EpkCoverForm"
import SynopsisForm from "../components/Epk/Input/synopsisForm"



const UploadEpk = () => {
  return (
    <div>
      <EpkCoverForm />
      <SynopsisForm/>
    </div>
  );

};

export default UploadEpk;
