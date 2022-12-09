import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SynopsisForm from "../components/Epk/Input/synopsisForm";
import CastForm from "../components/Epk/Input/castForm";
import DirectorForm from "../components/Epk/Input/directorForm";
import ProducerForm from "../components/Epk/Input/producerForm";
import CinematographerForm from "../components/Epk/Input/cinematographerForm";
import { renderCloseIcon } from "antd/es/modal/PurePanel";

function EPKDashboard() {

  return (
    <>
    <div>
      <br/>
      <SynopsisForm />
      <br/>
      <CastForm />
      <br/>
      <DirectorForm  />
      <br/>
      <ProducerForm  />
      <br/>
      <CinematographerForm />
    </div>
    </>
    );
}

export default EPKDashboard;
