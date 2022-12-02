import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllSynopsis from "../components/Epk/Present/allSynopsis";
function EPK() {
  const { user } = useSelector((user) => ({ ...user }));
  const synopsisList = JSON.parse(localStorage.getItem("synopsisList"));
  return (
    <>
      <AllSynopsis synopsisList={synopsisList} />
    </>
  );
}

export default EPK;
