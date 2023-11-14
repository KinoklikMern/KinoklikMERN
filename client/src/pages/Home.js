import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SwitchBtn from "../components/SwitchBtn/Switch";
import HomeHead from "../components/HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBodyActor from "../components/HomeBody/HomeBodyActor";
import HomeBottom from "../components/HomeBottom";
import Landing1 from "../components/LandingPage/Landing1";
import Landing2 from "../components/LandingPage/Landing2";
import Landing3 from "../components/LandingPage/Landing3";
import Landing4 from "../components/LandingPage/Landing4";
import Landing5 from "../components/LandingPage/Landing5";

import Landing8 from "../components/LandingPage/Landing8";
import Landing9 from "../components/LandingPage/Landing9";
import Landing10 from "../components/LandingPage/Landing10";
import { FepkContext } from "../context/FepkContext";
import FilterTag from "../components/Filter/FilterTag";
function Home({ role }) {
  const { user } = useSelector((user) => ({ ...user }));
  // eslint-disable-next-line no-unused-vars
  const [fepkMaker, setFepkMaker] = React.useContext(FepkContext);
  useEffect(() => {
    setFepkMaker("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {user && (
          <>
            <HomeHead role={role} />
            <SwitchBtn role={role} />
            <FilterTag role={role} />
            {role === "actor" ? <HomeBodyActor /> : <HomeBody role={role} />}
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
