import React from "react";
import { useSelector } from "react-redux";
import HomeHead from "./HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBottom from "../components/HomeBottom";
import Festival from "../components/Festival/Festival";
import Landing1 from "../components/LandingPage/Landing1";
import Landing2 from "../components/LandingPage/Landing2";
import Landing3 from "../components/LandingPage/Landing3";
import Landing4 from "../components/LandingPage/Landing4";
import Landing5 from "../components/LandingPage/Landing5";

import Landing8 from "../components/LandingPage/Landing8";
import Landing9 from "../components/LandingPage/Landing9";
import Landing10 from "../components/LandingPage/Landing10";

function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <div>
        {user && (
          <>
            <HomeHead />
            <HomeBody />
            <Festival />
            <HomeBottom />
          </>
        )}
        {!user && (
          <>
            <Landing1 />
            <Landing2 />
            <Landing3 />
            <Landing4 />
            <Landing5 />

            <Landing8 />
            <Landing9 />
            <Landing10 />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
