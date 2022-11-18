import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <>
      <div class="navbar navbar-expand-sm navbar-light navbar-lewagon">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-3">
          <li class="nav-item">
              <button class=" anim-whatsnew whats-new">
                <span class="circle" aria-hidden="true">
                  <span class="whatsnew-icon arrow"></span>
                </span>

                <span>
                  <Link class="whatsnew-text" to="/home">
                    HOME
                  </Link>
                </span>
              </button>
            </li>
            <li class="nav-item">
              <button class=" anim-whatsnew whats-new">
                <span class="circle" aria-hidden="true">
                  <span class="whatsnew-icon arrow"></span>
                </span>

                <span>
                  <Link class="whatsnew-text" to="/my_list">
                    My list
                  </Link>
                </span>
              </button>
            </li>
            <li class="nav-item">
              <button class=" anim-whatsnew whats-new">
                <span class="circle" aria-hidden="true">
                  <span class="whatsnew-icon arrow"></span>
                </span>

                <span>
                  <Link class="whatsnew-text" to="/upload">
                  &nbsp;&nbsp;&nbsp;&nbsp;Upload movie
                  </Link>
                </span>
              </button>
            </li>

            <li class="nav-item">
              <button class=" anim-whatsnew whats-new">
                <span class="circle" aria-hidden="true">
                  <span class="whatsnew-icon arrow"></span>
                </span>

                <span>
                  <Link class="whatsnew-text" to="/dashboard">
                  &nbsp;&nbsp;&nbsp;&nbsp;Dashboard
                  </Link>
                </span>
              </button>
            </li>

            <li class="search__wrapper">
              <input
                type="text"
                name=""
                placeholder="  Search here..."
                class="search__field"
              ></input>
              <button type="submit" class="fa fa-search search__icon"></button>
            </li>
          </ul>
          <div class="nav-item dropdown">
            <a
              href="#"
              id="dlabel"
              data-toggle="dropdown"
              role="button"
              class=" dropdown-toggle nav-item nav-link  user-action navi-dropdown"
              data-target="#"
            >
              <b class="caret"></b>
            </a>
            <div class="dropdown-menu">
              <Link class="dropdown-item" to="/dashboard">
                Dashboard
              </Link>

              <Link class="dropdown-item" to="/edit_profile">
                {" "}
                Edit Profile{" "}
              </Link>

              <Link class="dropdown-item" to="/upload">
                Upload a movie
              </Link>
              <div class="divider dropdown-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
