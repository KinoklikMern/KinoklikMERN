import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="mainLayout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
