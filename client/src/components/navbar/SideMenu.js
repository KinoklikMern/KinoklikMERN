import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DashIcon } from "../../images/icons/dashFull-white.svg";
import { ReactComponent as LogoutIcon } from "../../images/icons/logout-icon.svg";
import { ReactComponent as SettingIcon } from "../../images/icons/Settings-full-white.svg";
import { ReactComponent as UploadFilmIcon } from "../../images/icons/UploadFilmIcon.svg";
import { ReactComponent as SettingDefaultIcon } from "../../images/icons/Settings-full-white.svg";
import { ReactComponent as SettingPurpleIcon } from "../../images/icons/Settings-full-purple.svg";
import { ReactComponent as DashbordDefaultIcon } from "../../images/icons/dashFull-white.svg";
import { ReactComponent as DashbordPurpleIcon } from "../../images/icons/dashFull-purple.svg";
import { ReactComponent as UploadFilmDefaultIcon } from "../../images/icons/UploadFilmIcon.svg";
import { ReactComponent as UploadFilmPurpleIcon } from "../../images/icons/UploadIcon.svg";
import { ReactComponent as LogoutDefaultIcon } from "../../images/icons/logout-icon.svg";
import { ReactComponent as LogoutPurpleIcon } from "../../images/icons/logout-icon-purple.svg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const SideProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredMenu, setHoveredMenu] = useState("");
  const { user } = useSelector((user) => ({ ...user }));
  const picture = user
    ? user.picture ==
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      : `${process.env.REACT_APP_AWS_URL}/${user.picture}`
    : null;
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }

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

  const [menuList, setMenuList] = useState([
    {
      name: "Upload EPK",
      url: `${user.role === "Filmmaker" ? "/uploadFepk" : ""}`,
      defaultIcon: <UploadFilmDefaultIcon />,
      hoverIcon: <UploadFilmPurpleIcon />,
    },
    {
      name: "My Settings",
      url: `${
        user.role === "Filmmaker"
          ? "/dashboard/settings"
          : "/userdashboard/settings"
      }`,
      defaultIcon: <SettingDefaultIcon />,
      hoverIcon: <SettingPurpleIcon />,
    },
    {
      name: "My Dashboard",
      url: `${
        user.role === "Filmmaker" ? "/dashboard/epks" : "/userdashboard/starred"
      }`,
      defaultIcon: <DashbordDefaultIcon />,
      hoverIcon: <DashbordPurpleIcon />,
    },
    {
      name: "Logout",
      url: "logout",
      defaultIcon: <LogoutDefaultIcon />,
      hoverIcon: <LogoutPurpleIcon />,
    },
  ]);
  return (
    <>
      <div className="tw-invisible tw-absolute tw-inset-y-0 tw-right-0 tw-z-40 tw-flex tw-h-screen tw-w-72 tw-flex-col tw-bg-[#1C0039] tw-duration-300 group-hover:tw-visible">
        <div className="tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-end">
            <div className="tw-mx-4 tw-inline-block">
              <img
                src={picture}
                alt="User Avatar"
                className="tw-flex tw-max-h-14"
              />
            </div>
            <div className="tw-mx-4 tw-inline-block">
              <FontAwesomeIcon
                icon={faBars}
                size="2xl"
                style={{ color: "#fff" }}
              />
            </div>
          </div>
        </div>
        <div className="tw-flex tw-h-screen tw-flex-col tw-items-end tw-justify-center tw-gap-5">
          {menuList?.map((menu, index) => (
            <>
              <div
                key={index}
                onClick={() => {
                  menu.url !== "logout" ? navigate(menu.url) : logout();
                }}
                onMouseOver={() => setHoveredMenu(menu.name)}
                onMouseOut={() => setHoveredMenu("")}
                className="tw-mx-3 tw-flex tw-w-5/6 tw-items-center tw-justify-end tw-gap-2 tw-px-3 tw-pt-4 tw-text-white hover:tw-scale-105 hover:tw-cursor-pointer hover:tw-rounded-xl hover:tw-bg-white hover:tw-text-[#1C0039]"
              >
                <p className="tw-pb-2 tw-text-2xl">{menu.name}</p>
                {menu.name === hoveredMenu ? menu.hoverIcon : menu.defaultIcon}
              </div>
              <div className="tw-mx-3 tw-w-5/6 tw-border-[1px] tw-border-[#712CB0]"></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
