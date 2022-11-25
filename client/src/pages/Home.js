import React from "react";
import { useSelector } from "react-redux";
import HomeHead from "./HomeHead";
import Homebody from "./Homebody";
import HomeBottom from "../components/HomeBottom";


function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <div>
        {user && <h3>wellcome back</h3>}
        <h2>
          {" "}
          {user?.firstName} {user?.lastName}
        </h2>
        <HomeHead />
        <Homebody />
        <HomeBottom />
        <br />
      </div>
    </>
  );
}

export default Home;
