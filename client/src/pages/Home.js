import React from "react";
import { useSelector } from "react-redux";
import HomeHead from "./HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBottom from "../components/HomeBottom";
import Festival from '../components/Festival/Festival';
import Landing1 from "../components/LandingPage/Landing1";
import Landing2 from "../components/LandingPage/Landing2";
import Landing3 from "../components/LandingPage/Landing3";
import Landing4 from "../components/LandingPage/Landing4";
import Landing5 from "../components/LandingPage/Landing5";
import Landing6 from "../components/LandingPage/Landing6";


function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <div>
        {user && <h3>Welcome back!</h3>}
        <h2>
          {" "}
          {user?.firstName} {user?.lastName}
        </h2>
        {/* <HomeHead />
        <HomeBody />
        <Festival />
        <HomeBottom /> */}
        <Landing1 />
        <Landing2 />
        <Landing3 />
        <Landing4 />
        <Landing5 />
        <Landing6 />

      </div>
    </>
  );
}

export default Home;
