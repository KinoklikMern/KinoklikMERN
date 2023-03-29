import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./MainLayout.css";

function MainLayout(props) {
  return (
    <div className="mainLayout">
      <Navbar className={props.className} title={props.title} />
      <Outlet />
    </div>
  );
}

export default MainLayout;
