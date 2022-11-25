import React from "react";
import HomeHead from "./HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBottom from "../components/HomeBottom";
import Festival from '../components/Festival/Festival';


function Home() {
  return (
    <>
      <div>
        <HomeHead />
        <HomeBody />
        <Festival />
        <HomeBottom />
      </div>
    </>
  );
}

export default Home;
