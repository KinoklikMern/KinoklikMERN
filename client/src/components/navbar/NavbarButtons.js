/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link, useNavigate, useParams, useMatch } from "react-router-dom";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { SideProfileMenu } from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBars } from "@fortawesome/free-solid-svg-icons";
import { FepkContext } from "../../context/FepkContext";

//import Login from "../Auth/Registration/login";
//import Register from "../Auth/Registration/register";

function NavbarButtons({ user, setToggle, toggle }) {
  const [fepkId, setFepkId, fepkMaker, setFepkMaker] =
    React.useContext(FepkContext);
  const [userToggle, setUserToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const picture = user
    ? user.picture ==
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      : `${process.env.REACT_APP_AWS_URL}/${user.picture}`
    : null;

  const logout = () => {
    Cookies.set("user", null);
    console.log(user);
    console.log("log out");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    console.log(user);
    navigate("/");
  };

  // -- CHIHYIN --
  // show the edit icon for actor account owner, direct to the page "/userdashboard/actor"
  // also keep the functionality for filmmakers to edit
  const { actorId } = useParams();
  const matchFilmmaker = useMatch("/epk/*");
  const matchActor = useMatch("/actor/*");
  const isFilmmaker = !!matchFilmmaker;
  const isActor = !!matchActor;
  const isActorRole = user && user.role === "Actor";
  const editForFilmmaker =
    isFilmmaker && user.id === fepkMaker._id && fepkId !== "";
  const editForActor = user && isActor && isActorRole;

  const editPageUrl = isActorRole
    ? "/userdashboard/actor"
    : `/editFepk/${fepkId}`;

  return (
    <>
      {!user ? (
        <>
          <div className="tw-hidden md:tw-flex">
            {/* <button className="tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg tw-transition hover:tw-text-gray-400">
              <Login spanText="SIGN IN" />
            </button> 
            <button className="tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400">
              <Register spanText="SIGN UP" />
            </button> */}
            <Link
              to="/login"
              className="md:ml-10 tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400"
            >
              SIGN IN
            </Link>

            {/* <Link
              to="/signup"
              className="md:ml-10 tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400"
            >
              SIGN UP
            </Link> */}
            <Link
              to={user ? "/uploadFepk" : "/signup"}
              className="md:ml-10 tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400"
            >
              CREATE EPK
            </Link>
          </div>
          <div
            className="tw-flex tw-items-center md:tw-hidden"
            onClick={() => setToggle((prev) => !prev)}
          >
            <button className="mobile-menu-button tw-rounded-sm tw-bg-purple-200 tw-p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="tw-h-6 tw-w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    toggle
                      ? "M6 18L18 6M6 6l12 12" // 3 lines
                      : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" // X
                  }
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ------modified by rucheng-------- */}
          <div className="tw-static tw-flex tw-items-center tw-justify-center tw-p-4">
            {/*
            <div className="tw-mx-10 tw-inline-block tw-justify-center">
              {user.id === fepkMaker._id && fepkId !== "" ? (
                <a href={`/editFepk/${fepkId}`}>
                  <FontAwesomeIcon icon={faPen} color="white" />
                </a>
              ) : null}
            </div>
            */}
            {/* ------modified by CHIHYIN-------- */}
            <div className="tw-mx-10 tw-inline-block tw-justify-center">
              {editForFilmmaker || editForActor ? (
                <Link to={editPageUrl}>
                  <FontAwesomeIcon icon={faPen} color="white" />
                </Link>
              ) : null}
            </div>
            <div className="tw-group tw-mx-4 tw-inline-block">
              <img
                src={picture}
                alt="User Avatar"
                className="tw-flex tw-max-h-14"
              />
            </div>
            <div className="tw-group tw-mx-4 tw-inline-block">
              <FontAwesomeIcon
                icon={faBars}
                size="2xl"
                style={{ color: "#fff" }}
              />
              <SideProfileMenu />
            </div>
          </div>
          {/* -------- */}
          {/* <div
            className="tw-my-auto"
            onClick={() => setUserToggle((prev) => !prev)}
          >
            <img
              src={user.picture}
              alt="User Avatar"
              className="tw-max-h-14"
            ></img>
          </div>
          <div
            className={`${
              userToggle ? "tw-flex" : "tw-hidden"
            } sidebar tw-absolute tw-top-20 tw-right-0 tw-z-10 tw-mx-4 tw-my-2 tw-min-w-[140px] tw-rounded-xl tw-bg-gray-500 tw-p-6`}
          >
            <ul className="tw-flex tw-flex-1 tw-list-none tw-flex-col tw-items-start tw-justify-end">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`tw-font-poppins tw-cursor-pointer tw-text-[16px] tw-font-medium ${
                    active === nav.title ? "tw-text-dimWhite" : "tw-text-white"
                  } ${index === navLinks.length - 1 ? "tw-mb-0" : "tw-mb-4"}`}
                  onClick={() => {
                    if (nav.title === "LOGOUT") {
                      logout();
                    } else {
                      setActive(nav.title);
                    }
                  }}
                >
                  <Link to={`${nav.url}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div> */}
        </>
      )}
    </>
  );
}

export default NavbarButtons;
