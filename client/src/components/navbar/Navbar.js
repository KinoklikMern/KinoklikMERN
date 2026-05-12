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

    const gradientStyle = {
        background: props.isGrayBackground 
            ? 'var(--backgroundGray, #808080)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)'
    };

    return (
        <nav 
            className={`tw-w-full tw-fixed tw-top-0 tw-left-0 tw-z-[1000] ${props.className}`}
            style={gradientStyle}
        >
            <div className="tw-relative tw-flex tw-h-16 md:tw-h-20 tw-items-center tw-justify-between tw-px-2 md:tw-px-6 tw-mt-2 tw-max-w-full">
                
                <div className="tw-flex-none tw-z-30">
                    <NavbarBrand title={props.title} isGrayBackground={props.isGrayBackground}/>
                </div>

                {props.filmName && props.filmLink && (
                    <div className="tw-absolute tw-left-1/2 tw-top-1/2 tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-hidden sm:tw-flex tw-items-center tw-z-10">
                        <Link
                            to={props.filmLink}
                            className="tw-bg-customColor tw-text-white tw-font-bold tw-rounded-full tw-px-3 tw-py-1 tw-text-xs md:tw-text-base tw-truncate tw-max-w-[150px]"
                        >
                            {props.filmName}
                        </Link>
                        <BasicMenu color="customColor" />
                    </div>
                )}

                <div className="tw-flex tw-items-center tw-justify-end tw-gap-1 sm:tw-gap-3 tw-z-30">
                    <div className="tw-hidden sm:tw-block tw-flex-none">
                        <SearchBar />
                    </div>
                    
                    <div className="tw-flex-none">
                        <NavbarButtons user={user} toggle={toggle} setToggle={setToggle}/>
                    </div>

                    {!user && (
                        <div className="tw-flex-none">
                            <NavbarMenu toggle={toggle} setToggle={setToggle}/>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;