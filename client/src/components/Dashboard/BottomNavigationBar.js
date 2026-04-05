/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useRef } from "react";
import EpkIcon from "../../images/icons/epk.svg";
import ActiveEpkIcon from "../../images/icons/star-file-white.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import ActiveBellIcon from "../../images/icons/active-bell.svg";
import SettingsIcon from "../../images/icons/setting.svg";
import ActiveSettingsIcon from "../../images/icons/Settings-full-white.svg";
import MessageIcon from "../../images/icons/messgge.svg";
import ActiveMessageIcon from "../../images/icons/message-white.svg";
import SavedIcon from "../../images/icons/save-icon.svg";
import ActiveSavedIcon from "../../images/icons/save.svg";
import { NotificationContext } from "../../context/NotificationContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function BottomNavigationBar(props) {
  const { t } = useTranslation();

  const SELECTED_TAB = props.selectedTab;

  const { notificationCount, messageCount, userInfo, clearMessageCount } =
    useContext(NotificationContext);


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

  const sideBarList = [
    {
      Title: t("EPKs"),
      DefaultIcon: EpkIcon,
      ActiveIcon: ActiveEpkIcon,
      href: "/dashboard/epks",
      size: {
        width: 70,
        // height: 50,
      },
    },
    {
      Title: t("Notifications"),
      DefaultIcon: BellIcon,
      ActiveIcon: ActiveBellIcon,
      href: "/dashboard/notifications",
      size: {
        //width: 50,
        // height: 50,
      },
    },
    {
      Title: t("Messages"),
      DefaultIcon: MessageIcon,
      ActiveIcon: ActiveMessageIcon,
      href: "/dashboard/chat",
      size: {
        // width: 50,
        // height: 50,
      },
    },
    {
      Title: t("Saved"),
      DefaultIcon: SavedIcon,
      ActiveIcon: ActiveSavedIcon,
      href: "/dashboard/saved",
      size: {
        // width: 70,
        // height: 40,
      },
    },
    {
      Title: t("Settings"),
      DefaultIcon: SettingsIcon,
      ActiveIcon: ActiveSettingsIcon,
      href: "/dashboard/settings",
      size: {
        // width: 50,
        // height: 50,
      },
    },
  ];

  return (

    // Bottom bar for mobile screens 
    < nav className="tw-flex tw-justify-center tw-gap-6 tw-bg-[#ECF0F1] tw-mt-10 tw-p-3 " >
      {
        sideBarList.map((item, index) => (
          <div
            key={index}
            className={"tw-p-3 sm:tw-p-4 md:tw-p-6  tw-rounded-[30px] tw-opacity-80 " +
              (index === 1 || index === 2
                ? "tw-shadow-softDual"
                : "tw-shadow-multiSoft")
            }

          >
            <a
              href={item.href}
              className=""
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
                className="tw-h-9 tw-w-auto tw-object-contain !tw-rounded-none"

              />
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
        ))
      }
    </nav >

  );
}
