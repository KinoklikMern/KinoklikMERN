import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarBrand from "./NavbarBrand.js";
import NavbarButtons from "./NavbarButtons.js";
import NavbarMenu from "./NavbarMenu.js";
import BasicMenu from "../Epk/Input/fepkMenu";
import SearchBar from "./SearchBar.js";

function Navbar(props) {
    const [toggle, setToggle] = useState(false);
    const user = useSelector((state) => state.user);

    return (
        <nav className={`tw-w-full ${props.className}`}>
            <div
                className={`tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between tw-pt-2 tw-relative ${
                    props.isGrayBackground ? 'tw-bg-backgroundGray' : 'tw-bg-gradient-to-b tw-from-[#000]/70 tw-to-transparent'
                }`}
            >
                {/* LEFT: Logo - Added shrink-0 so the logo doesn't disappear on desktop */}
                <div className="tw-flex-shrink-0 tw-z-30">
                    <NavbarBrand title={props.title} isGrayBackground={props.isGrayBackground}/>
                </div>

                {/* CENTER: Film Link - sm:flex ensures it only shows on tablet/desktop */}
                {props.filmName && props.filmLink && (
                    <div
                        className="tw-hidden sm:tw-flex tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-items-center tw-z-10"
                        style={{ maxWidth: "calc(100% - 20rem)" }}
                    >
                        <Link
                            to={props.filmLink}
                            className="tw-bg-customColor tw-text-white tw-font-bold tw-rounded-full tw-shadow-md hover:tw-bg-opacity-90 tw-px-4 tw-py-2 tw-text-sm md:tw-text-base lg:tw-text-lg tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
                        >
                            {props.filmName}
                        </Link>
                        <BasicMenu color="customColor" />
                    </div>
                )}

                {/* RIGHT: Search, Toggle, Profile */}
                <div className="tw-flex tw-items-center tw-justify-end tw-gap-2 tw-pr-2 tw-z-30">
                    {/* Only show SearchBar on Desktop */}
                    <div className="tw-hidden lg:tw-block">
                        <SearchBar/>
                    </div>
                    
                    {/* The profile pic and language toggle wrapper */}
                    <div className="tw-flex-shrink-0">
                        <NavbarButtons user={user} toggle={toggle} setToggle={setToggle}/>
                    </div>

                    {!user && (
                        <div className="tw-flex-shrink-0">
                            <NavbarMenu toggle={toggle} setToggle={setToggle}/>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;