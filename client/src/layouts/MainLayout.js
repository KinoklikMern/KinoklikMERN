import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div class="mainLayout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
