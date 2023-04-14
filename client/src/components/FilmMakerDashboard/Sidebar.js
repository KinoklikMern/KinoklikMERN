import React from "react";
import StarIcon from "../../images/icons/star.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellWhiteIcon from "../../images/icons/bellFull.svg";
import FlagIcon from "../../images/icons/flag.svg";
import SettingsIcon from "../../images/icons/settings.svg";
import SettingsWhiteIcon from "../../images/icons/Settings-full-white.svg";
import MessageIcon from "../../images/icons/message.svg"
import MessageWhiteIcon from "../../images/icons/message-white.svg"

export default function Sidebar(props) {
  const SELECTED_TAB = props.selectedTab;
  console.info("select", SELECTED_TAB);
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
        width: 70,
        height: 70,
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
        {sideBarList.map((item) => (
          <div
            className={
              "tw-flex tw-justify-center hover:tw-scale-105 " +
              (SELECTED_TAB === item.Title ? "tw-bg-[#1E0039]" : "")
            }
          >
            <a
              href={item.href}
              className="tw-flex tw-flex-col tw-text-[#1E0039]"
            >
              <div className="tw-flex tw-justify-center ">
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
            </a>
          </div>
        ))}
      </nav>
    </>
  );
}
