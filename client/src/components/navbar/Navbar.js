/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarBrand from "./NavbarBrand.js";
import NavbarButtons from "./NavbarButtons.js";
import NavbarMenu from "./NavbarMenu.js";

function Navbar(props) {
  const [toggle, setToggle] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <nav className={`tw-w-full ${props.className}`}>
      <div className='tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between tw-bg-gradient-to-b tw-from-[#000]/70 tw-to-transparent'>
        {/* Logo and brand name */}
        <NavbarBrand title={props.title} />
        {/* Buttons */}
        <NavbarButtons user={user} toggle={toggle} setToggle={setToggle} />

        {/* Mobile Button */}
      </div>
      {/* Mobile Menu */}
      {!user && <NavbarMenu toggle={toggle} />}
    </nav>
  );
}

export default Navbar;
