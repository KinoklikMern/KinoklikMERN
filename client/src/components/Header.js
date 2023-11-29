import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Login from "./Auth/Registration/login";
import Register from "./Auth/Registration/register";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
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
      <div className='navbar navbar-expand-sm navbar-light navbar-lewagon'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <Link className='navbar-brand text-headers-style' to='/home'>
          <img
            src={require("../images/logo.png")}
            alt='Logo'
            className='navbar-logo'
          />
        </Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mx-3'>
            <li className='nav-item'>
              <button className=' anim-whatsnew whats-new'>
                <span className='circle' aria-hidden='true'>
                  <span className='whatsnew-icon arrow'></span>
                </span>

                <span>
                  <Link className='whatsnew-text' to='/home'>
                    {t("HOME")}
                  </Link>
                </span>
              </button>
            </li>
            {!user && (
              <li className='nav-item'>
                <button className=' anim-whatsnew whats-new'>
                  <span className='circle' aria-hidden='true'>
                    <span className='whatsnew-icon arrow'></span>
                  </span>

                  <span>
                    <Link className='whatsnew-text' to='/my_list'>
                      {t("My list")}
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
              <li className='nav-item'>
                <button className=' anim-whatsnew whats-new'>
                  <span className='circle' aria-hidden='true'>
                    <span className='whatsnew-icon arrow'></span>
                  </span>
                  <span>
                    <span className='whatsnew-text'>
                      <Register />
                    </span>
                  </span>
                </button>
              </li>
            )}
            <li className='nav-item'>
              {!user && (
                <button className=' anim-whatsnew whats-new'>
                  <span className='circle' aria-hidden='true'>
                    <span className='whatsnew-icon arrow'></span>
                  </span>

                  <span className='whatsnew-text'>
                    <Login />
                  </span>
                </button>
              )}
              {user && (
                <button className=' anim-whatsnew whats-new' onClick={logout}>
                  <span className='circle' aria-hidden='true'>
                    <span className='whatsnew-icon arrow'></span>
                  </span>

                  <span>
                    <Link className='whatsnew-text' to='/RegistrationForm'>
                      &nbsp;&nbsp;&nbsp;&nbsp;{t("logout")}
                    </Link>
                  </span>
                </button>
              )}
            </li>
            <li className='search__wrapper'>
              <input
                type='text'
                name=''
                placeholder={t("  Search here...")}
                className='search__field'
              ></input>
              <button
                type='submit'
                className='fa fa-search search__icon'
              ></button>
            </li>
          </ul>
          <div className='nav-item dropdown'>
            <a
              href='#menu'
              id='dlabel'
              data-toggle='dropdown'
              role='button'
              className=' dropdown-toggle nav-item nav-link  user-action navi-dropdown'
              data-target='#'
            >
              <b className='caret'></b>
            </a>
            <div className='dropdown-menu'>
              <Link className='dropdown-item' to='/dashboard'>
                {t("Dashboard")}
              </Link>

              <Link className='dropdown-item' to='/edit_profile'>
                {" "}
                {t("Edit Profile")}{" "}
              </Link>

              <Link className='dropdown-item' to='/upload'>
                {t("Upload a movie")}
              </Link>
              <div className='divider dropdown-divider'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
