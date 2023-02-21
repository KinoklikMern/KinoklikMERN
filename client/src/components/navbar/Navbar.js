/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import NavbarBrand from "./NavbarBrand.js";
import NavbarButtons from "./NavbarButtons.js";
import NavbarMenu from "./NavbarMenu.js";

import Login from "../Auth/Registration/login.js";
import Register from "../Auth/Registration/register.js";

function Navbar() {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <nav className="tw-w-full tw-bg-gradient-to-b tw-from-[#4b1a77] tw-to-[#1f0439] tw-p-2">
      <div className="tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between ">
        {/* Logo and brand name */}
        <NavbarBrand />
        {/* Buttons */}
        <NavbarButtons user={user} toggle={toggle} setToggle={setToggle}/>

        {/* Mobile Button */}
        
      </div>
      {/* Mobile Menu */}
      {!user && <NavbarMenu toggle={toggle}/>}
    </nav>
  );
}

export default Navbar;
