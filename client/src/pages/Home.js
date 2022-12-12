import React from "react";
import { useSelector } from "react-redux";
import HomeHead from "./HomeHead";
import HomeBody from "../components/HomeBody/HomeBody";
import HomeBottom from "../components/HomeBottom";
import Festival from '../components/Festival/Festival';


function Home() {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <>
      <div>
        {user && <h3>Welcome back</h3>}
        <h2>
          {" "}
          {user?.firstName} {user?.lastName}
        </h2>
        <HomeHead />
        <HomeBody />
        <Festival />
        <HomeBottom />
      </div>
    </>
  );
}

export default Home;
