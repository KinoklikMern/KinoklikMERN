import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import UniquenessForm from "../components/Epk/Input/UniquenessForm"
import StillsForm from "../components/Epk/Input/StillsForm"



const UploadEpk = () => {
  return (
    <div>
      <UniquenessForm />
      <StillsForm/>
    </div>
  );

};

export default UploadEpk;