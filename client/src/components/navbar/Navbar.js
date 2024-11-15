import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarBrand from "./NavbarBrand.js";
import NavbarButtons from "./NavbarButtons.js";
import NavbarMenu from "./NavbarMenu.js";

function Navbar(props) {
    const [toggle, setToggle] = useState(false);
    const user = useSelector((state) => state.user);

    return (
        <nav className={`tw-w-full ${props.className} `}>
            <div
                className={`tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between ${
                    props.isGrayBackground ? 'tw-bg-backgroundGray' : 'tw-bg-gradient-to-b tw-from-[#000]/70 tw-to-transparent'
                }`}
            >
                {/* Logo and brand name */}
                <NavbarBrand title={props.title} isGrayBackground={props.isGrayBackground}/>

                {/* Centered Film Link as Floating Button */}
                {props.filmName && props.filmLink && (
                    <Link
                        to={props.filmLink}
                        className="tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-bg-customColor tw-text-white tw-font-bold tw-rounded-full tw-shadow-md hover:tw-bg-opacity-90 tw-px-4 tw-py-2 tw-text-sm md:tw-text-base lg:tw-text-lg tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
                        style={{padding: '0 1rem', maxWidth: 'calc(100% - 15rem)'}}
                    >
                        {props.filmName}
                    </Link>
                )}

                {/* Buttons */}
                <NavbarButtons user={user} toggle={toggle} setToggle={setToggle}/>

                {/* Mobile Menu */}
                {!user && <NavbarMenu toggle={toggle} setToggle={setToggle}/>}
            </div>
        </nav>

    );
    console.log(props.className);
}

export default Navbar;
