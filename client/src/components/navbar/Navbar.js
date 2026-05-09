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
        <nav className={`tw-w-full tw-relative tw-z-[1000] ${props.className}`}>
            <div className={`tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between tw-px-4 tw-h-20 ${
                props.isGrayBackground ? 'tw-bg-backgroundGray' : 'tw-bg-gradient-to-b tw-from-[#000]/70 tw-to-transparent'
            }`}>
                
                <div className="tw-flex-shrink-0 tw-z-20">
                    <NavbarBrand title={props.title} isGrayBackground={props.isGrayBackground}/>
                </div>

                {props.filmName && props.filmLink && (
                    <div className="tw-hidden lg:tw-flex tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-items-center tw-z-10">
                        <Link
                            to={props.filmLink}
                            className="tw-bg-customColor tw-text-white tw-font-bold tw-rounded-full tw-px-4 tw-py-2 tw-text-base tw-whitespace-nowrap tw-max-w-[200px] tw-truncate"
                        >
                            {props.filmName}
                        </Link>
                        <BasicMenu color="customColor" />
                    </div>
                )}

                <div className="tw-flex tw-items-center tw-justify-end tw-flex-1 md:tw-flex-none tw-gap-2 tw-z-20">
                    <div className="tw-hidden sm:tw-block">
                        <SearchBar/>
                    </div>
                    <div className="tw-flex-shrink-0">
                        <NavbarButtons user={user} toggle={toggle} setToggle={setToggle}/>
                    </div>
                    
                    {!user && <NavbarMenu toggle={toggle} setToggle={setToggle}/>}
                </div>
            </div>
        </nav>

    );
}

export default Navbar;