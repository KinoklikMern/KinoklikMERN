import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CoverForm from "../components/Epk/Input/coverForm";
import LoglineForm from "../components/Epk/Input/loglineForm";
import SynopsisForm from "../components/Epk/Input/synopsisForm";
import UniquenessForm from "../components/Epk/Input/uniquenessForm";
import CastForm from "../components/Epk/Input/castForm";
import DirectorForm from "../components/Epk/Input/directorForm";
import ProducerForm from "../components/Epk/Input/producerForm";
import CinematographerForm from "../components/Epk/Input/cinematographerForm";
import StillsForm from "../components/Epk/Input/stillsForm";
import { renderCloseIcon } from "antd/es/modal/PurePanel";

function EPKDashboard() {

  return (
    <>
    <div>
      <br/>
      <CoverForm />
      <br/>
      <LoglineForm />
      <br/>
      <SynopsisForm />
      <br/>
      <UniquenessForm />
      <br/>
      <CastForm />
      <br/>
      <DirectorForm  />
      <br/>
      <ProducerForm  />
      <br/>
      <CinematographerForm />
      <br/>
      <StillsForm/>
    </div>
    </>
    );
}

export default EPKDashboard;
