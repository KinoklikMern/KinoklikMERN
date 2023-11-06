import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SettingDefaultIcon } from "../../images/icons/Settings-full-white.svg";
import { ReactComponent as SettingPurpleIcon } from "../../images/icons/Settings-full-purple.svg";
// import { ReactComponent as DashbordDefaultIcon } from "../../images/icons/dashFull-white.svg";
// import { ReactComponent as DashbordPurpleIcon } from "../../images/icons/dashFull-purple.svg";
import { ReactComponent as UploadFilmDefaultIcon } from "../../images/icons/UploadFilmIcon.svg";
import { ReactComponent as UploadFilmPurpleIcon } from "../../images/icons/UploadIcon.svg";
import { ReactComponent as LogoutDefaultIcon } from "../../images/icons/logout-icon.svg";
import { ReactComponent as LogoutPurpleIcon } from "../../images/icons/logout-icon-purple.svg";
import { ReactComponent as NotificationsDefaultIcon } from "../../images/icons/bell-white.svg";
import { ReactComponent as NotificationsPurpleIcon } from "../../images/icons/bell-purple.svg";
import { ReactComponent as MessagesDefaultIcon } from "../../images/icons/message-icon.svg";
import { ReactComponent as MessagesPurpleIcon } from "../../images/icons/message-purple.svg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { NotificationContext } from "../../context/NotificationContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const socket = io(backendUrl);

export const SideProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredMenu, setHoveredMenu] = useState("");
  const { user } = useSelector((user) => ({ ...user }));

  const {
    notificationCount,
    messageCount,
    userInfo,
    clearNotificationCount,
    clearMessageCount,
  } = useContext(NotificationContext);

  // const userId = useSelector((state) => state.user.id);
  const userId = user.id;

  const menuList = [
    {
      name: "Upload EPK",
      url: `${user.role === "Filmmaker" ? "/uploadFepk" : ""}`,
      defaultIcon: <UploadFilmDefaultIcon />,
      hoverIcon: <UploadFilmPurpleIcon />,
      display: user.role === "Filmmaker",
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
      display: true,
    },
    // {
    //   name: "My Dashboard",
    //   url: `${
    //     user.role === "ADMIN"
    //       ? "admindashboard/main"
    //       : user.role === "Filmmaker"
    //       ? "/dashboard/epks"
    //       : user.role === "Actor"
    //       ? "/userdashboard/actor"
    //       : "/userdashboard/starred"
    //   }`,
    //   defaultIcon: <DashbordDefaultIcon />,
    //   hoverIcon: <DashbordPurpleIcon />,
    // },
    {
      name: "Notifications",
      url: "/dashboard/notifications",
      defaultIcon: <NotificationsDefaultIcon />,
      hoverIcon: <NotificationsPurpleIcon />,
      display: user.role === "Filmmaker",
    },
    {
      name: "Messages",
      url:
        user.role === "Filmmaker" ? "/dashboard/chat" : "/userdashboard/chat",
      defaultIcon: <MessagesDefaultIcon />,
      hoverIcon: <MessagesPurpleIcon />,
      // display: user.role === "Filmmaker" || user.role !== "ADMIN",
      display: true,
    },
    // {
    //   name: "My Dashboard",
    //   url: "/admindashboard/main",
    //   defaultIcon: <DashbordDefaultIcon />,
    //   hoverIcon: <DashbordPurpleIcon />,
    //   display: user.role === "ADMIN",
    // },
    {
      name: "Logout",
      url: "logout",
      defaultIcon: <LogoutDefaultIcon />,
      hoverIcon: <LogoutPurpleIcon />,
      display: true,
    },
  ];
  // const filteredMenuList =
  //   user?.role !== "Filmmaker" ? menuList.slice(1) : menuList;

  // Filter menu based on display property
  const filteredMenuList = menuList.filter((menu) => menu.display);

  const picture = user
    ? user.picture ===
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      ? "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png"
      : `${process.env.REACT_APP_AWS_URL}/${user.picture}`
    : null;

  const logout = () => {
    // const currentUser = Cookies.get("user")
    //   ? JSON.parse(Cookies.get("user"))
    //   : null;

    // // Cookies.set("user", null);
    // Cookies.remove("user"); // Use remove instead of set to null
    // // console.log(user);
    // // console.log("log out");

    // // Dispatching the USER_OFFLINE action
    // if (currentUser && currentUser.id) {
    //   // If using socket.io and you have a socket instance available
    //   if (socket && socket.connected) {
    //     // Inform the server of the logout
    //     socket.emit("logout", currentUser.id);
    //     // Disconnect the socket
    //     socket.disconnect();
    //   }
    //   // console.log(`Dispatching USER_OFFLINE for user:`, currentUser.id);
    //   // dispatch({ type: "USER_OFFLINE", payload: { userId: currentUser.id } });
    // }

    const currentUser = JSON.parse(Cookies.get("user") || "null");

    if (currentUser && currentUser.id && socket) {
      socket.emit("logout", currentUser.id); // Notify server of intent to logout
      // Delay the disconnection slightly to ensure the logout event is processed
      setTimeout(() => {
        socket.disconnect(); // Disconnect the socket
      }, 1000);
    }

    // Clear user data from cookies
    Cookies.remove("user");

    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    console.log("Logout actions dispatched.");
    // console.log(`Logout actions dispatched for user:`, currentUser.id);
    // console.log(user);
    navigate("/");
  };

  // console.log("sidemenu userId:", userId);
  // console.log("sidemenu userInfo:", userInfo);
  // console.log("sidemenu messageCount:", messageCount);
  // console.log("sidemenu notificationCount:", notificationCount);
  return (
    <>
      <div className="tw-invisible tw-absolute tw-inset-y-0 tw-right-0 tw-z-40 tw-flex tw-h-screen tw-w-72 tw-flex-col tw-bg-[#1C0039] tw-duration-300 group-hover:tw-visible">
        <div className="tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-end">
            <div className="tw-group tw-mx-4 tw-inline-block ">
              <img
                src={picture}
                alt="User Avatar"
                className="tw-h-14 tw-w-14 tw-rounded-full tw-object-cover"
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
          {filteredMenuList.map((menu, index) => (
            <React.Fragment key={index}>
              <div
                //key={index}
                onClick={() => {
                  if (menu.name === "Notifications") {
                    clearNotificationCount();
                  } else if (menu.name === "Messages") {
                    clearMessageCount();
                  }
                  menu.url !== "logout" ? navigate(menu.url) : logout();
                }}
                onMouseOver={() => setHoveredMenu(menu.name)}
                onMouseOut={() => setHoveredMenu("")}
                className="tw-mx-3 tw-flex tw-w-5/6 tw-items-center tw-justify-end tw-gap-2 tw-px-3 tw-pt-4 tw-text-white hover:tw-scale-105 hover:tw-cursor-pointer hover:tw-rounded-xl hover:tw-bg-white hover:tw-text-[#1C0039]"
              >
                <p className="tw-pb-2 tw-text-2xl">{menu.name}</p>

                {/* display red indicator */}
                <div className="tw-relative">
                  {(menu.name === "Notifications" &&
                    notificationCount > 0 &&
                    userInfo === userId) ||
                  (menu.name === "Messages" &&
                    messageCount > 0 &&
                    userInfo === userId) ? (
                    <div className="tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white">
                      {menu.name === "Notifications" && notificationCount > 9
                        ? "9+"
                        : menu.name === "Notifications"
                        ? notificationCount
                        : menu.name === "Messages" && messageCount > 9
                        ? "9+"
                        : messageCount}
                    </div>
                  ) : null}

                  {menu.name === hoveredMenu
                    ? menu.hoverIcon
                    : menu.defaultIcon}
                </div>
              </div>
              <div className="tw-mx-3 tw-w-5/6 tw-border-[1px] tw-border-[#712CB0]"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
