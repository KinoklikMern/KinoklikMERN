import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwitchBtn from "../components/SwitchBtn/Switch";
import HomeHead from "../components/HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBodyActor from "../components/HomeBody/HomeBodyActor";
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
import MainLayout from "../layouts/MainLayout";
import { FepkContext } from "../context/FepkContext";
import FilterTag from "../components/Filter/FilterTag";
import { Link, useNavigate } from "react-router-dom";

function Home({ role }) {
  const { user } = useSelector((user) => ({ ...user }));

  const [fepkMaker, setFepkMaker] = React.useContext(FepkContext);
  // Yeming edit
  const [verificationMessage, setVerificationMessage] = useState(null);

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("/verification", { state: { user } });
  };

  useEffect(() => {
    setFepkMaker("");

    if (user && !user.isVerified) {
      setVerificationMessage(
        <div className="tw-bg-customColor">
          <p className="tw-p-2 tw-text-center tw-text-lg tw-text-blue-50">
            You haven't verified your account. Please click the link below to
            verify:
          </p>
          <p className="tw-font-semiblod tw-text-center tw-text-lg tw-text-white">
            <button
              onClick={navigateToVerification}
              className="tw-font-semiblod tw-border-none tw-bg-transparent tw-p-0 tw-text-blue-50 hover:tw-underline"
            >
              Verify your account
            </button>
          </p>
        </div>
      );
    } else {
      setVerificationMessage(null);
    }
  }, [user, user?.isVerified]);

  return (
    <>
      <div>
        {user && (
          <>
            <HomeHead role={role} />
            {verificationMessage}
            <SwitchBtn role={role} />
            <FilterTag role={role} />
            {role === "actor" ? <HomeBodyActor /> : <HomeBody role={role} />}
            {/* <Festival /> */}

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
