import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./Header.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Login from "./Auth/Registration/login";
import Register from "./Auth/Registration/register";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
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
  return (
    <>
      <div className="navbar navbar-expand-sm navbar-light navbar-lewagon">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand text-headers-style" to="/home">
          <img
            src={require("../images/logo.png")}
            alt="Logo"
            className="navbar-logo"
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-3">
            <li className="nav-item">
              <button className=" anim-whatsnew whats-new">
                <span className="circle" aria-hidden="true">
                  <span className="whatsnew-icon arrow"></span>
                </span>

                <span>
                  <Link className="whatsnew-text" to="/home">
                    HOME
                  </Link>
                </span>
              </button>
            </li>
            {!user && (
              <li className="nav-item">
                <button className=" anim-whatsnew whats-new">
                  <span className="circle" aria-hidden="true">
                    <span className="whatsnew-icon arrow"></span>
                  </span>

                  <span>
                    <Link className="whatsnew-text" to="/my_list">
                      My list
                    </Link>
                  </span>
                </button>
              </li>
            )}
            {/*         <li className="nav-item">
              <button className=" anim-whatsnew whats-new">
                <span className="circle" aria-hidden="true">
                  <span className="whatsnew-icon arrow"></span>
                </span>
                <span>
                  <Link className="whatsnew-text" to="/upload">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Upload Movie
                  </Link>
                </span>
              </button>
            </li> */}
            {!user && (
              <li className="nav-item">
                <button className=" anim-whatsnew whats-new">
                  <span className="circle" aria-hidden="true">
                    <span className="whatsnew-icon arrow"></span>
                  </span>
                  <span>
                    <span className="whatsnew-text">
                      <Register />
                    </span>
                  </span>
                </button>
              </li>
            )}
            <li className="nav-item">
              {!user && (
                <button className=" anim-whatsnew whats-new">
                  <span className="circle" aria-hidden="true">
                    <span className="whatsnew-icon arrow"></span>
                  </span>

                  <span className="whatsnew-text">
                    <Login />
                  </span>
                </button>
              )}
              {user && (
                <button className=" anim-whatsnew whats-new" onClick={logout}>
                  <span className="circle" aria-hidden="true">
                    <span className="whatsnew-icon arrow"></span>
                  </span>

                  <span>
                    <Link className="whatsnew-text" to="/RegistrationForm">
                      &nbsp;&nbsp;&nbsp;&nbsp;logout
                    </Link>
                  </span>
                </button>
              )}
            </li>
            <li className="search__wrapper">
              <input
                type="text"
                name=""
                placeholder="  Search here..."
                className="search__field"
              ></input>
              <button
                type="submit"
                className="fa fa-search search__icon"
              ></button>
            </li>
          </ul>
          <div className="nav-item dropdown">
            <a
              href="#"
              id="dlabel"
              data-toggle="dropdown"
              role="button"
              className=" dropdown-toggle nav-item nav-link  user-action navi-dropdown"
              data-target="#"
            >
              <b className="caret"></b>
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/dashboard">
                Dashboard
              </Link>

              <Link className="dropdown-item" to="/edit_profile">
                {" "}
                Edit Profile{" "}
              </Link>

              <Link className="dropdown-item" to="/upload">
                Upload a movie
              </Link>
              <div className="divider dropdown-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
