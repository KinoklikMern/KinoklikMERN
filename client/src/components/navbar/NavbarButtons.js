import { React, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";

import Login from "../Auth/Registration/login";
import Register from "../Auth/Registration/register";

function NavbarButtons({ user, setToggle, toggle }) {
  const [userToggle, setUserToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");

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
  const navLinks = [
    {
      id: "settings",
      title: "MY SETTINGS",
      url: "/",
    },
    {
      id: "dashboard",
      title: "MY DASHBOARD",
      url: "/filmMakerDashboard",
    },
    {
      id: "logout",
      title: "LOGOUT",
      url: "/",
    },
  ];

  return (
    <>
      {!user ? (
        <>
          <div className="tw-hidden md:tw-flex">
            <button className="tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg tw-transition hover:tw-text-gray-400">
              <Login spanText="SIGN IN" />
            </button>
            <button className="tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400">
              <Register spanText="SIGN UP" />
            </button>
            <Link
              to="/uploadFepk"
              className="tw-mr-4 tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400 md:ml-10"
            >
              CREATE EPK
            </Link>
          </div>
          <div className="tw-flex tw-items-center md:tw-hidden" onClick={() => setToggle((prev) => !prev)}>
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
          <div
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
                    }else{setActive(nav.title)}
                    ;
                  }}
                >
                  <Link to={`${nav.url}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default NavbarButtons;
