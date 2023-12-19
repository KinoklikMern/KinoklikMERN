import React, { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import "./NavbarToggle.css";
import { SideProfileMenu } from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FepkContext } from "../../context/FepkContext";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../api/epks";
import { getUserById } from "../../api/user";

function NavbarButtons({ user, setToggle, toggle }) {
  const { t } = useTranslation();
  const [fepkId] = React.useContext(FepkContext);
  const [picture, setPicture] = useState("");
  const [epk, setEpk] = useState();
  const [filmmakerId, setFilmmakerId] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    if (user && user.id) {
      getUserById(user.id)
        .then((res) => {
          // console.log("User data:", res);
          setPicture(
            res.picture.startsWith("https")
              ? `${res.picture}`
              : `${process.env.REACT_APP_AWS_URL}/${res.picture}`
          );
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    } else {
      console.log("User ID not available");
    }
  }, [user]);

  useEffect(() => {
    getFepksById(fepkId)
      .then((res) => {
        const fepk = res;
        if (fepk) {
          setEpk(fepk);

          if (fepk.film_maker && fepk.film_maker._id) {
            setFilmmakerId(fepk.film_maker._id);
          }
          if (fepk.title) {
            setTitle(fepk.title);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching epk:", error);
      });
  }, [fepkId]);

  // -- CHIHYIN --
  // show the edit icon for actor account owner, direct to the page "/userdashboard/actor"
  // also keep the functionality for filmmakers to edit
  const actorId = window.location.pathname.split("/")[2];
  const matchFilmmaker = useMatch("/epk/*");
  const matchActor = useMatch("/actor/*");
  const isFilmmaker = !!matchFilmmaker;
  const isActor = !!matchActor;
  const isActorRole = user?.role === "Actor"; // Optional chaining here
  // const editForFilmmaker =
  //   isFilmmaker && user?.id === epk.film_maker._id && fepkId !== ""; // Optional chaining here
  const editForActor = user && isActor && isActorRole && user?.id === actorId; // Optional chaining here

  // const editPageUrl = isActorRole
  //   ? "/userdashboard/actor"
  //   : epk.title
  //   ? `/editFepk/${epk.title.replace(/ /g, "-")}`
  //   : "/";

  return (
    <>
      {!user ? (
        <>
          <div className="tw-hidden md:tw-flex">
            <Link
              to="/login"
              className="md:ml-10 tw-mr-4 tw-rounded-lg tw-border-2 tw-bg-transparent tw-px-4 tw-font-bold tw-text-white tw-shadow-[1px_1px_3px_0px_rgba(255,255,255)] tw-drop-shadow-lg hover:tw-text-gray-400"
            >
              {t("SIGN IN")}
            </Link>

            <Link
              to={user ? "/uploadFepk" : "/signup"}
              className="md:ml-10 tw-mr-4 tw-rounded-lg tw-border-2 tw-bg-transparent tw-px-4 tw-font-bold tw-text-white tw-shadow-[1px_1px_3px_0px_rgba(255,255,255)] tw-drop-shadow-lg hover:tw-text-gray-400"
            >
              {t("CREATE EPK")}
            </Link>
          </div>
          <div
            className="tw-flex tw-items-center md:tw-hidden"
            onClick={() => setToggle((prev) => !prev)}
          >
            <button
              className={`toggle tw-mr-4 tw-bg-transparent ${
                toggle ? "activeNavItem" : ""
              }`}
            >
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ------modified by rucheng-------- */}
          <div className="tw-flex tw-items-center tw-justify-center tw-p-4">
            {/* ------modified by CHIHYIN-------- */}
            <div className="tw-mx-10 tw-inline-block tw-justify-center">
              {/* Filmmaker */}
              {epk && filmmakerId ? (
                isFilmmaker && user?.id === filmmakerId && fepkId !== "" ? (
                  <Link
                    to={
                      !isActorRole
                        ? title
                          ? `/editFepk/${title.replace(/ /g, "-")}`
                          : "/"
                        : ""
                    }
                  >
                    <FontAwesomeIcon icon={faPen} color="white" />
                  </Link>
                ) : null
              ) : null}
              {/* Actor */}
              {editForActor ? (
                <Link to={isActorRole ? "/userdashboard/actor" : ""}>
                  <FontAwesomeIcon icon={faPen} color="white" />
                </Link>
              ) : null}
            </div>
            <div className="tw-group tw-mx-4 tw-inline-block">
              <img
                src={picture}
                alt="User Avatar"
                className="tw-h-14 tw-w-14 tw-rounded-full tw-object-cover"
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
