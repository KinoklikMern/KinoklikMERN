import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarBrand from "./NavbarBrand.js";
import NavbarButtons from "./NavbarButtons.js";
import NavbarMenu from "./NavbarMenu.js";
import BasicMenu from "../Epk/Input/fepkMenu.js";

export default function NotificationNavbar(props) {
    const [toggle, setToggle] = useState(false);
    const user = useSelector((state) => state.user);

    return (
        <>
            <nav className={` tw-hidden md:tw-block md:tw-w-full ${props.className} `}>
                <div
                    className={`tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between ${props.isGrayBackground ? 'tw-bg-backgroundGray' : 'tw-bg-gradient-to-b tw-from-[#000]/70 tw-to-transparent'
                        }`}
                >
                    {/* Logo and brand name */}
                    <NavbarBrand title={props.title} isGrayBackground={props.isGrayBackground} />

                    {/* Centered Film Link as Floating Button */}
                    {props.filmName && props.filmLink && (
                        <div
                            className="tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-flex tw-items-center"
                            style={{ maxWidth: "calc(100% - 15rem)" }}
                        >
                            <Link
                                to={props.filmLink}
                                className="tw-bg-customColor tw-text-white tw-font-bold tw-rounded-full tw-shadow-md hover:tw-bg-opacity-90 tw-px-4 tw-py-2 tw-text-sm md:tw-text-base lg:tw-text-lg tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
                                style={{ padding: "0 1rem" }}
                            >
                                {props.filmName}
                            </Link>

                            {/* Arrow dropdown menu */}
                            <div>
                                <BasicMenu color="customColor" />
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <NavbarButtons user={user} toggle={toggle} setToggle={setToggle} />

                    {/* Mobile Menu */}
                    {!user && <NavbarMenu toggle={toggle} setToggle={setToggle} />}
                </div>
            </nav>

            {/* mobile version */}

            <nav className={`md:tw-hidden tw-w-full ${props.className} `}>
                <div
                    className={`tw-mx-auto tw-flex tw-max-w-full tw-items-center tw-justify-between `}
                >
                    {/* Logo and brand name */}
                    <NavbarBrand isGrayBackground={true} />

                    {/* Centered Film Link as Floating Button */}
                    {props.filmName && props.filmLink && (
                        <div
                            className="tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-flex tw-items-center"
                            style={{ maxWidth: "calc(100% - 15rem)" }}
                        >
                            <Link
                                to={props.filmLink}
                                className="tw-bg-customColor tw-text-white tw-font-bold tw-rounded-full tw-shadow-md hover:tw-bg-opacity-90 tw-px-4 tw-py-2 tw-text-sm md:tw-text-base lg:tw-text-lg tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"
                                style={{ padding: "0 1rem" }}
                            >
                                {props.filmName}
                            </Link>

                            {/* Arrow dropdown menu */}
                            <div>
                                <BasicMenu color="customColor" />
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <NavbarButtons user={user} toggle={toggle} setToggle={setToggle} ismobile={true} />

                    {/* Mobile Menu */}
                    {!user && <NavbarMenu toggle={toggle} setToggle={setToggle} />}
                </div>
            </nav>
        </>

    );
}

