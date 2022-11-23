import React from "react";
import HomeHead from "./HomeHead";
import Homebody from "./Homebody";
import HomeBottom from "../components/HomeBottom";


function Home() {
  return (
    <>
      <div>
        <HomeHead />
        <Homebody />
        <HomeBottom />
        <br />
      </div>
    </>
  );
}

export default Home;
