/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useMatch, useParams, useLocation} from "react-router-dom";
import { SideProfileMenu } from "./SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FepkContext } from "../../context/FepkContext";
import { useTranslation } from "react-i18next";
import { getUserById } from "../../api/users";
import LanguageToggle from "../LanguageToggle";
import "./NavbarToggle.css";

// Import the new Wizard!
import CreateEpkWizard from "../Dashboard/Epks/CreateEpkWizard/CreateEpkWizard"; 
 
function NavbarButtons({ user, setToggle, toggle, ismobile = false }) {
  const { t } = useTranslation();
  const { fepkId, fepkMaker, epkCollaborators } = React.useContext(FepkContext);
  const [picture, setPicture] = useState("");
  const { id: profileId } = useParams();
  const location = useLocation();

  // Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);

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

    // --- 1. PAGE TYPE DETECTION ---
  const isEpkViewPage = location.pathname.startsWith('/epk/');
  const isUserViewPage = location.pathname.startsWith('/user/');
  const isCurrentlyEditing = new URLSearchParams(location.search).get("edit") === "true";

  // EPK Permissions: User is the Maker OR is in the Collaborators array
  const isOwner = user?.id === fepkMaker?._id || user?.id === fepkMaker;
  const isCollaborator = epkCollaborators?.some(
    (c) => (c.user?._id || c.user || c) === user?.id
  );
  const canEditEPK = isEpkViewPage && (isOwner || isCollaborator) && fepkId;

  const canEditProfile = isUserViewPage && user?.id === profileId;

  return (
    <>
      {!user ? (
        <div className="tw-flex tw-items-center">
          <div className='tw-hidden md:tw-flex tw-items-center'>
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
            <LanguageToggle />
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
          <div className='tw-mx-4 md:tw-mx-8 tw-flex tw-items-center tw-justify-center'>
            
            {/* CREATE EPK BUTTON (White & Pink) */}
            {isEpkViewPage && !isCollaborator && (
              <button
                onClick={() => setIsWizardOpen(true)}
                className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-bg-white hover:tw-bg-gray-100 tw-text-[#FF00A0] tw-font-bold tw-py-2 tw-px-4 md:tw-px-6 tw-rounded-full tw-shadow-lg tw-transition-all tw-mr-2 md:tw-mr-4 tw-border-none tw-cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} className="tw-text-sm" />
                <span className="tw-hidden md:tw-inline">Create EPK</span>
              </button>
            )}

            {/* EDIT BUTTON (Dynamic for both EPK and User Profile) */}
            {(canEditEPK || canEditProfile) && !isCurrentlyEditing && (
             <Link 
               to={`${location.pathname}?edit=true`}
               className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-bg-[#FF00A0] hover:tw-bg-[#cc0080] tw-text-white tw-font-bold tw-py-2 tw-px-4 md:tw-px-6 tw-rounded-full tw-shadow-lg tw-transition-all tw-mr-2 md:tw-mr-4 tw-no-underline"
             >
               <FontAwesomeIcon icon={faPen} className="tw-text-sm" />
               <span className="tw-hidden md:tw-inline">
                 {isEpkViewPage ? "Edit EPK" : "Edit Profile"}
               </span>
             </Link>
            )}
             <LanguageToggle />
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

      {/* Modal stays hidden in the background until triggered */}
      <CreateEpkWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </>
  );
}

export default NavbarButtons;