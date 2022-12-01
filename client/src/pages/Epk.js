import React from "react";
import { useSelector } from "react-redux";
import AllSynopsis from "../components/Epk/Present/allSynopsis";
function EPK() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <AllSynopsis />
    </>
  );
}

export default EPK;
