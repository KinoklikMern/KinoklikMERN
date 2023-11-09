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
import ActorPageWhite from "../../images/icons/actorpageWhite.svg";
import { NotificationContext } from "../../context/NotificationContext";
import { useSelector } from "react-redux";

export default function Sidebar(props) {
  const SELECTED_TAB = props.selectedTab;
  const Role = props.role;
  console.info("select", SELECTED_TAB);

  // Yeming added
  const { messageCount, userInfo, clearMessageCount } =
    useContext(NotificationContext);

  // Access the user ID from Redux store
  const userId = useSelector((state) => state.user.id);

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
      ActiveIcon: ActorPageWhite,
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
  console.log("userId", userId);
  console.log("userInfo", userInfo);
  return (
    <>
      <nav
        className='tw-hidden tw-h-full tw-w-24 tw-flex-col tw-justify-between tw-gap-3 tw-rounded-lg tw-bg-[#fff] md:tw-flex'
        // style={{
        //   height: Role === "Actor" ? "115%" : "100%",
        // }}
      >
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
              className='tw-flex tw-flex-col tw-text-[#1E0039]'
              onClick={
                item.Title === "Messages" ? clearMessageCount : undefined
              }
            >
              <div className='tw-flex tw-justify-center '>
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

              {/* Display Message count*/}
              {item.Title === "Messages" &&
              messageCount > 0 &&
              userInfo === userId ? (
                <div className='tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-6 tw-w-6 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-white'>
                  {item.Title === "Messages" && messageCount > 9
                    ? "9+"
                    : messageCount}
                </div>
              ) : null}
            </a>
          </div>
        ))}
      </nav>

      {/* Tab bar for medium and small screens */}
      <div className='tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-z-50 tw-mx-auto tw-flex tw-w-full tw-bg-white tw-shadow-md md:tw-hidden'>
        <nav className='tw-flex tw-w-full tw-justify-between'>
          {sideBarList.map((item, index) => (
            <div
              key={index}
              className={
                "tw-group tw-relative tw-flex tw-w-1/4 tw-flex-col tw-items-center " +
                (SELECTED_TAB === item.Title ? "tw-bg-[#1E0039]" : "")
              }
            >
              <a
                href={item.href}
                className='tw-flex tw-flex-col tw-text-[#1E0039]'
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
                    width: item.size.width,
                    height: item.size.height,
                    maxWidth: "sm:tw-w-5",
                    maxHeight: "sm:tw-h-5",
                  }}
                />
                <p
                  className={
                    "tw-flex tw-justify-center tw-text-xs sm:tw-text-sm " +
                    (SELECTED_TAB === item.Title ? "tw-text-white" : "")
                  }
                >
                  {item.Title}
                </p>

                {/* Display Message count */}
                {item.Title === "Messages" &&
                messageCount > 0 &&
                userInfo === userId ? (
                  <div className='tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-4 tw-w-4 tw-items-center tw-justify-center tw-rounded-full tw-bg-red-500 tw-text-xs sm:tw-h-6 sm:tw-w-6'>
                    {item.Title === "Messages" && messageCount > 9
                      ? "9+"
                      : messageCount}
                  </div>
                ) : null}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
