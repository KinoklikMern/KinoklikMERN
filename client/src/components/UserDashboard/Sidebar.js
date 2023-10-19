import React, { useContext } from "react";
import StarIcon from "../../images/icons/StarEmpty.svg";
import StarWhiteIcon from "../../images/icons/StarFULL.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellWhiteIcon from "../../images/icons/bellFull.svg";
import PlusIcon from "../../images/icons/PlusEmpty.svg";
import PlusWhiteIcon from "../../images/icons/PlusFULL.svg";
import SettingsIcon from "../../images/icons/settings.svg";
import SettingsWhiteIcon from "../../images/icons/Settings-full-white.svg";
import MessageIcon from "../../images/icons/message.svg";
import MessageWhiteIcon from "../../images/icons/message-white.svg";
import ActorPage from "../../images/icons/actorpage.svg";

export default function Sidebar(props) {
  const SELECTED_TAB = props.selectedTab;
  const Role = props.role;
  console.info("select", SELECTED_TAB);

  const sideBarList1 = [
    {
      Title: "Starred",
      DefaultIcon: StarIcon,
      ActiveIcon: StarWhiteIcon,
      href: "/userdashboard/starred",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Following",
      DefaultIcon: PlusIcon,
      ActiveIcon: PlusWhiteIcon,
      href: "/userdashboard/following",
      size: {
        width: 70,
        height: 70,
      },
    },

    {
      Title: "Requests",
      DefaultIcon: BellIcon,
      ActiveIcon: BellWhiteIcon,
      href: "/userdashboard/requests",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Messages",
      DefaultIcon: MessageIcon,
      ActiveIcon: MessageWhiteIcon,
      href: "/userdashboard/chat",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Settings",
      DefaultIcon: SettingsIcon,
      ActiveIcon: SettingsWhiteIcon,
      href: "/userdashboard/settings",
      size: {
        width: 60,
        height: 60,
      },
    },
  ];

  const sideBarList2 = [
    {
      Title: "Actor Page",
      DefaultIcon: ActorPage,
      ActiveIcon: ActorPage,
      href: "/userdashboard/actor",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Starred",
      DefaultIcon: StarIcon,
      ActiveIcon: StarWhiteIcon,
      href: "/userdashboard/starred",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Following",
      DefaultIcon: PlusIcon,
      ActiveIcon: PlusWhiteIcon,
      href: "/userdashboard/following",
      size: {
        width: 70,
        height: 70,
      },
    },

    {
      Title: "Requests",
      DefaultIcon: BellIcon,
      ActiveIcon: BellWhiteIcon,
      href: "/userdashboard/requests",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Messages",
      DefaultIcon: MessageIcon,
      ActiveIcon: MessageWhiteIcon,
      href: "/userdashboard/chat",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "Settings",
      DefaultIcon: SettingsIcon,
      ActiveIcon: SettingsWhiteIcon,
      href: "/userdashboard/settings",
      size: {
        width: 60,
        height: 60,
      },
    },
  ];

  const sideBarList = Role === "Actor" ? sideBarList2 : sideBarList1;

  console.log(sideBarList);
  return (
    <>
      <nav
        className="tw-flex tw-h-full tw-w-24 tw-flex-col tw-justify-around tw-gap-3 tw-rounded-lg tw-bg-[#fff] tw-py-16"
        style={{
          height: Role === "Actor" ? "115%" : "100%",
        }}
      >
        {sideBarList.map((item, index) => (
          <div
            key={index}
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
