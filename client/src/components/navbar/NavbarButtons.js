import React, { useEffect, useState } from "react";
import { Link, useMatch, useParams, useLocation} from "react-router-dom";
import { SideProfileMenu } from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FepkContext } from "../../context/FepkContext";
import { useTranslation } from "react-i18next";
import { getUserById } from "../../api/user";
import LanguageToggle from "../LanguageToggle";
import "./NavbarToggle.css";

function NavbarButtons({ user, setToggle, toggle, ismobile = false }) {
  const { t } = useTranslation();
  const { fepkId, fepkMaker, epkCollaborators } = React.useContext(FepkContext);
  const [picture, setPicture] = useState("");
  const { id: actorId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (user?.id) {
      getUserById(user.id)
        .then((res) => {
          setPicture(
            res.picture.startsWith("https")
              ? res.picture
              : `${process.env.REACT_APP_AWS_URL}/${res.picture}`
          );
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [user]);

  const matchFilmmaker = useMatch("/epk/*");
  const matchActor = useMatch("/actor/*");
  const isFilmmaker = !!matchFilmmaker;
  const isActor = !!matchActor;
  const isActorRole = user?.role === "Actor";
  const isOwner = user?.id === fepkMaker?._id;
  const isCollaborator = epkCollaborators?.some(
    (c) => c.user === user?.id || c.user?._id === user?.id
  );

  // Check if current user is the owner of the EPK or Actor profile
  const canEditFilmmaker = isFilmmaker && (isOwner || isCollaborator) && fepkId;
  const canEditActor = isActor && isActorRole && user?.id === actorId;
  const isCurrentlyEditing = new URLSearchParams(location.search).get("edit") === "true";

  return (
    <>
      {!user ? (
        <div className="tw-flex tw-items-center">
          <div className='tw-hidden md:tw-flex tw-items-center'>
            <LanguageToggle />
            <Link
              to='/login'
              className='md:tw-ml-10 tw-mr-4 tw-rounded-lg tw-border-2 tw-bg-transparent tw-px-4 tw-font-bold tw-text-white tw-shadow-[1px_1px_3px_0px_rgba(255,255,255)] tw-drop-shadow-lg hover:tw-text-gray-400'
            >
              {t("SIGN IN")}
            </Link>

            <Link
              to="/signup"
              className='md:tw-ml-10 tw-mr-4 tw-rounded-lg tw-border-2 tw-bg-transparent tw-px-4 tw-font-bold tw-text-white tw-shadow-[1px_1px_3px_0px_rgba(255,255,255)] tw-drop-shadow-lg hover:tw-text-gray-400'
            >
              {t("CREATE")}
            </Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <div
            className='tw-flex tw-items-center md:tw-hidden'
            onClick={() => setToggle((prev) => !prev)}
          >
            <button className={`toggle tw-mr-4 tw-bg-transparent ${toggle ? "activeNavItem" : ""}`}>
              <div className='bars' id='bar1'></div>
              <div className='bars' id='bar2'></div>
              <div className='bars' id='bar3'></div>
            </button>
          </div>
        </div>
      ) : (
        <div className='tw-flex tw-items-center tw-justify-center tw-p-4'>
          <div className='tw-mx-10 tw-inline-block tw-justify-center'>
            {/* Edit Icon Logic */}
            {canEditFilmmaker && !isCurrentlyEditing && (
             <Link 
               to={`/epk/${fepkId}?edit=true`}
              className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-bg-[#FF00A0] hover:tw-bg-[#cc0080] tw-text-white tw-font-bold tw-py-2 tw-px-4 md:tw-px-6 tw-rounded-full tw-shadow-lg tw-transition-all tw-mr-2 md:tw-mr-4"
             >
             <FontAwesomeIcon icon={faPen} className="tw-text-sm" />
             <span className="tw-hidden md:tw-inline">Edit EPK</span>
              </Link>
)}
            {canEditActor && (
              <Link to="/userdashboard/actor">
                <FontAwesomeIcon icon={faPen} color='white' />
              </Link>
            )}
          </div>

          <div className={`tw-group tw-mx-4 tw-inline-block tw-rounded-full ${ismobile ? 'tw-p-[1px] tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039]' : ''}`}>
            <img
              src={picture}
              alt='User Avatar'
              className='tw-h-14 tw-w-14 tw-rounded-full tw-object-cover'
            />
            <SideProfileMenu />
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarButtons;