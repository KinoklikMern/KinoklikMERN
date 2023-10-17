import React, { useContext } from "react";
import StarIcon from "../../images/icons/star.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellWhiteIcon from "../../images/icons/bellFull.svg";
import FlagIcon from "../../images/icons/flag.svg";
import SettingsIcon from "../../images/icons/settings.svg";
import SettingsWhiteIcon from "../../images/icons/Settings-full-white.svg";
import MessageIcon from "../../images/icons/message.svg";
import MessageWhiteIcon from "../../images/icons/message-white.svg";
import { NotificationContext } from "../../context/NotificationContext";
import { useSelector } from "react-redux";

export default function Sidebar(props) {
  const SELECTED_TAB = props.selectedTab;

  // Yeming added
  const { notificationCount, messageCount, filmmakerInfo } =
    useContext(NotificationContext);

  console.info("select", SELECTED_TAB);

  // Access the user ID from Redux store
  const userId = useSelector((state) => state.user.id);

  // console.log("notificationCount", notificationCount);
  const sideBarList = [
    {
      Title: "EPKs",
      DefaultIcon: StarIcon,
      ActiveIcon: StartWhiteIcon,
      href: "/dashboard/epks",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Notifications",
      DefaultIcon: BellIcon,
      ActiveIcon: BellWhiteIcon,
      href: "/dashboard/notifications",
      size: {
        width: 70,
        height: 70,
      },
    },
    {
      Title: "Messages",
      DefaultIcon: MessageIcon,
      ActiveIcon: MessageWhiteIcon,
      href: "/dashboard/chat",
      size: {
        width: 60,
        height: 60,
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
      Title: "Settings",
      DefaultIcon: SettingsIcon,
      ActiveIcon: SettingsWhiteIcon,
      href: "/dashboard/settings",
      size: {
        width: 60,
        height: 60,
      },
    },
  ];
  return (
    <>
      <nav className="tw-flex tw-h-full tw-w-24 tw-flex-col tw-justify-around tw-gap-3 tw-rounded-lg tw-bg-[#fff] tw-py-16">
        {sideBarList.map((item, index) => (
          <div
            key={index}
            className={
              // "tw-flex tw-justify-center hover:tw-scale-105 " +
              "tw-group tw-relative " +
              (SELECTED_TAB === item.Title ? "tw-bg-[#1E0039]" : "")
            }
          >
            <a
              href={item.href}
              className="tw-flex tw-flex-col tw-text-[#1E0039]"
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
                className={
                  "tw-flex tw-justify-center tw-text-sm " +
                  (SELECTED_TAB === item.Title ? "tw-text-white" : "")
                }
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
                filmmakerInfo === userId) ||
              (item.Title === "Messages" && messageCount > 0) ? (
                <div className="tw-absolute tw-top-0 tw-right-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white">
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
