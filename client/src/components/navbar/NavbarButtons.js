/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import Cookies from "js-cookie";

import { useDispatch } from "react-redux";
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
    ? user.picture ===
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
  const actorId = window.location.pathname.split("/")[2];
  const matchFilmmaker = useMatch("/epk/*");
  const matchActor = useMatch("/actor/*");
  const isFilmmaker = !!matchFilmmaker;
  const isActor = !!matchActor;
  const isActorRole = user?.role === "Actor"; // Optional chaining here
  const editForFilmmaker =
    isFilmmaker && user?.id === fepkMaker._id && fepkId !== ""; // Optional chaining here
  const editForActor = user && isActor && isActorRole && user?.id === actorId; // Optional chaining here

  const editPageUrl = isActorRole
    ? "/userdashboard/actor"
    : `/editFepk/${fepkId}`;

  return (
    <>
      {!user ? (
        <>
          <div className='tw-hidden md:tw-flex'>
            <Link
              to='/login'
              className='md:ml-10 tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400'
            >
              SIGN IN
            </Link>

            <Link
              to={user ? "/uploadFepk" : "/signup"}
              className='md:ml-10 tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400'
            >
              REGISTER
            </Link>
          </div>
          <div
            className='tw-flex tw-items-center md:tw-hidden'
            onClick={() => setToggle((prev) => !prev)}
          >
            <button className='mobile-menu-button tw-rounded-sm tw-bg-purple-200 tw-p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='tw-h-6 tw-w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
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
          <div className='tw-flex tw-items-center tw-justify-center tw-p-4'>
            {/* ------modified by CHIHYIN-------- */}
            <div className='tw-mx-10 tw-inline-block tw-justify-center'>
              {editForFilmmaker || editForActor ? (
                <Link to={editPageUrl}>
                  <FontAwesomeIcon icon={faPen} color='white' />
                </Link>
              ) : null}
            </div>
            <div className='tw-group tw-mx-4 tw-inline-block'>
              <img
                src={picture}
                alt='User Avatar'
                className='tw-h-14 tw-w-14 tw-rounded-full tw-object-cover'
              />
              <SideProfileMenu />
            </div>
          </div>
          {/* -------- */}
        </>
      )}
    </>
  );
}

export default NavbarButtons;
