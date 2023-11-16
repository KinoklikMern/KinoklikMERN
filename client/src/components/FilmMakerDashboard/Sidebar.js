import React, { useContext, useState, useEffect, useRef } from "react";
import StarIcon from "../../images/icons/star.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import StarIcon1 from "../../images/icons/StarEmpty.svg";
import StarWhiteIcon1 from "../../images/icons/StarFULL.svg";
import PlusIcon from "../../images/icons/PlusEmpty.svg";
import PlusWhiteIcon from "../../images/icons/PlusFULL.svg";
import DollarIcon from "../../images/icons/DollarEmpty.svg";
import DollarWhiteIcon from "../../images/icons/DollarFull.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellWhiteIcon from "../../images/icons/bellFull.svg";
import SettingsIcon from "../../images/icons/settings.svg";
import SettingsWhiteIcon from "../../images/icons/Settings-full-white.svg";
import MessageIcon from "../../images/icons/message.svg";
import MessageWhiteIcon from "../../images/icons/message-white.svg";
import { NotificationContext } from "../../context/NotificationContext";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function Sidebar(props) {
  const { t } = useTranslation();

  const SELECTED_TAB = props.selectedTab;

  const { notificationCount, messageCount, userInfo, clearMessageCount } =
    useContext(NotificationContext);

  // console.info("select", SELECTED_TAB);

  // Access the user ID from Redux store
  const userId = useSelector((state) => state.user.id);

  const sidebarRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    // Function to check if the sidebar has a scrollbar
    const checkIfScrollable = () => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const hasScrollbar = sidebar.scrollHeight > sidebar.clientHeight;
      setIsScrollable(hasScrollbar);
    };

    checkIfScrollable();
    window.addEventListener("resize", checkIfScrollable);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", checkIfScrollable);
  }, []);

  // console.log("notificationCount", notificationCount);
  const sideBarList = [
    {
      Title: (t("EPKs")),
      DefaultIcon: StarIcon,
      ActiveIcon: StartWhiteIcon,
      href: "/dashboard/epks",
      size: {
        width: 50,
        height: 50,
      },
    },
    {
      Title: (t("Notifications")),
      DefaultIcon: BellIcon,
      ActiveIcon: BellWhiteIcon,
      href: "/dashboard/notifications",
      size: {
        width: 50,
        height: 50,
      },
    },
    {
      Title: (t("Messages")),
      DefaultIcon: MessageIcon,
      ActiveIcon: MessageWhiteIcon,
      href: "/dashboard/chat",
      size: {
        width: 50,
        height: 50,
      },
    },

    {
      Title: (t("Starred")),
      DefaultIcon: StarIcon1,
      ActiveIcon: StarWhiteIcon1,
      href: "/dashboard/starred",
      size: {
        width: 50,
        height: 50,
      },
    },
    {
      Title: (t("Following")),
      DefaultIcon: PlusIcon,
      ActiveIcon: PlusWhiteIcon,
      href: "/dashboard/following",
      size: {
        width: 50,
        height: 50,
      },
    },
    {
      Title: (t("WishToBuy")),
      DefaultIcon: DollarIcon,
      ActiveIcon: DollarWhiteIcon,
      href: "/dashboard/wishtobuy",
      size: {
        width: 40,
        height: 40,
      },
    },
    // report part
    // {
    //   Title: "Report",
    //   DefaultIcon: FlagIcon,
    //   ActiveIcon: FlagIcon,
    //   href: "#",
    //   size:{
    //     width: 60,
    //     height: 60
    //   },
    // },
    {
      Title: (t("Settings")),
      DefaultIcon: SettingsIcon,
      ActiveIcon: SettingsWhiteIcon,
      href: "/dashboard/settings",
      size: {
        width: 50,
        height: 50,
      },
    },
  ];

  // console.log("filmmaker", filmmakerInfo);
  // console.log("userId", userId);
  // console.log("messageCount", messageCount);
  return (
    <>
      {/* <nav className="tw-hidden tw-h-full tw-w-24 tw-flex-col tw-justify-around tw-gap-3 tw-rounded-lg tw-bg-[#fff] tw-py-16 md:tw-flex"> */}
      {/* <nav className="overflow-y-auto tw-hidden tw-h-full tw-w-18 tw-flex-col tw-justify-between tw-gap-3 tw-space-y-1 tw-rounded-lg tw-bg-[#fff] tw-py-4 md:tw-flex"> */}
      <nav
        className={`overflow-y-auto tw-hidden tw-h-full tw-w-18 tw-flex-col tw-justify-between tw-gap-3 tw-space-y-1 tw-rounded-lg tw-bg-[#fff] tw-py-4 md:tw-flex ${
          isScrollable ? "tw-w-20" : ""
        }`}
        ref={sidebarRef}
      >
        {sideBarList.map((item, index) => (
          <div
            key={index}
            // className={
            //   // "tw-flex tw-justify-center hover:tw-scale-105 " +
            //   "tw-group tw-relative " +
            //   (SELECTED_TAB === item.Title ? "tw-bg-[#1E0039]" : "")
            // }
            className={`tw-group tw-relative ${
              SELECTED_TAB === item.Title ? "tw-rounded-xl tw-bg-[#1E0039]" : ""
            } tw-flex tw-justify-center`}
          >
            <a
              href={item.href}
              className="tw-flex tw-flex-col tw-text-[#1E0039]"
              onClick={
                item.Title === "Messages" ? clearMessageCount : undefined
              }
            >
              <div className="tw-flex tw-justify-center">
                <img
                  src={
                    SELECTED_TAB === item.Title
                      ? item.ActiveIcon
                      : item.DefaultIcon
                  }
                  alt={item.Title}
                  style={{ width: item.size.width, height: item.size.height }}
                />
              </div>
              <p
                // className={
                //   // "tw-flex tw-justify-center tw-text-sm " +
                //   "tw-flex tw-justify-center tw-text-xs " +
                //   (SELECTED_TAB === item.Title ? "tw-text-white" : "")
                // }
                className={`tw-flex tw-justify-center ${
                  item.Title === "Notifications" ? "tw-text-xs1" : "tw-text-xs"
                } ${SELECTED_TAB === item.Title ? "tw-text-white" : ""}`}
              >
                {item.Title}
              </p>
              {/* Display notification count and Message count*/}
              {/* {item.Title === "Notifications" && notificationCount > 0 && (
                <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </div>
              )} */}
              {(item.Title === "Notifications" &&
                notificationCount > 0 &&
                userInfo === userId) ||
              (item.Title === "Messages" &&
                messageCount > 0 &&
                userInfo === userId) ? (
                <div className="tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white">
                  {item.Title === "Notifications" && notificationCount > 9
                    ? "9+"
                    : item.Title === "Notifications"
                    ? notificationCount
                    : item.Title === "Messages" && messageCount > 9
                    ? "9+"
                    : messageCount}
                </div>
              ) : null}
            </a>
          </div>
        ))}
      </nav>

      {/* Bottom bar for mobile screens */}

      <nav className="tw-fixed tw-bottom-0 tw-left-0 tw-z-50 tw-flex tw-w-full tw-border-gray-300 tw-bg-white tw-shadow-md md:tw-hidden">
        {sideBarList.map((item, index) => (
          <div
            key={index}
            className={
              "tw-group tw-relative tw-flex tw-w-1/4 tw-flex-col tw-items-center tw-justify-center " +
              (SELECTED_TAB === item.Title ? "tw-bg-[#1E0039]" : "")
            }
          >
            <a
              href={item.href}
              className="tw-flex tw-flex-col tw-text-[#1E0039]"
              onClick={
                item.Title === "Messages" ? clearMessageCount : undefined
              }
            >
              <img
                src={
                  SELECTED_TAB === item.Title
                    ? item.ActiveIcon
                    : item.DefaultIcon
                }
                alt={item.Title}
                style={{
                  width: item.size.width / 2,
                  height: item.size.height / 2,
                }} // Adjust the size for mobile view
              />
              <p
                className={
                  "tw-flex tw-justify-center tw-text-xs " + // Adjust the font size for mobile view
                  (SELECTED_TAB === item.Title ? "tw-text-white" : "")
                }
              >
                {item.Title}
              </p>
              {(item.Title === "Notifications" &&
                notificationCount > 0 &&
                userInfo === userId) ||
              (item.Title === "Messages" &&
                messageCount > 0 &&
                userInfo === userId) ? (
                <div className="tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white">
                  {item.Title === "Notifications" && notificationCount > 9
                    ? "9+"
                    : item.Title === "Notifications"
                    ? notificationCount
                    : item.Title === "Messages" && messageCount > 9
                    ? "9+"
                    : messageCount}
                </div>
              ) : null}
            </a>
          </div>
        ))}
      </nav>
    </>
  );
}
