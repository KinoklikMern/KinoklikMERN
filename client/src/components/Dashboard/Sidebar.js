import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../context/NotificationContext";
import { useSelector } from "react-redux";

import MainMetricsIcon from "../../images/icons/dashFull.svg";
import MainMetricsWhiteIcon from "../../images/icons/dashFull-white.svg";
import UsersIcon from "../../images/icons/people-3-v3-white.svg";
import UsersActiveIcon from "../../images/icons/people-3-v3.svg";
import AnalyticsIcon from "../../images/icons/analytics-white.svg";
import AnalyticsActiveIcon from "../../images/icons/analytics.svg";
import StarIcon from "../../images/icons/star.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import FlagIcon from "../../images/icons/flag.svg";
import FlagWhiteIcon from "../../images/icons/flagFull.svg";
import BellIcon from "../../images/icons/bellEmpty.svg";
import BellWhiteIcon from "../../images/icons/bellFull.svg";
import SettingsIcon from "../../images/icons/settings.svg";
import SettingsWhiteIcon from "../../images/icons/Settings-full-white.svg";
import MessageIcon from "../../images/icons/message.svg";
import MessageWhiteIcon from "../../images/icons/message-white.svg";
import SavedIcon from "../../images/Save.ico";
import SavedWhiteIcon from "../../images/icons/save.svg";
import ActorPage from "../../images/icons/actorpage.svg";
import ActorPageWhite from "../../images/icons/actorpageWhite.svg";

export default function Sidebar({ role }) {
  const { t } = useTranslation();
  const { messageCount, userInfo, clearMessageCount } = useContext(NotificationContext);
  const userId = useSelector((state) => state.user.id);

  const sideBarList = useMemo(() => {
    const TABS = (t, userId) => ({
      METRICS: { Title: t("Main Metrics"), to: "/admindashboard/main", DefaultIcon: MainMetricsWhiteIcon, ActiveIcon: MainMetricsIcon },
      USERS: { Title: t("Users"), to: "/admindashboard/users", DefaultIcon: UsersIcon, ActiveIcon: UsersActiveIcon },
      ANALYTICS: { Title: t("Analytics"), to: "/admindashboard/analytics", DefaultIcon: AnalyticsIcon, ActiveIcon: AnalyticsActiveIcon },
      ADMIN_EPKS: { Title: t("EPKs"), to: "/admindashboard/epks", DefaultIcon: StartWhiteIcon, ActiveIcon: StarIcon },
      REPORTS: { Title: t("Reports"), to: "/admindashboard/reports", DefaultIcon: FlagWhiteIcon, ActiveIcon: FlagIcon },

      EDIT_USER_PAGE: { Title: t("Your Profile"), to: `/user/${userId}`, DefaultIcon: ActorPage, ActiveIcon: ActorPageWhite },
      SAVED: { Title: t("Saved"), to: "/dashboard/saved", DefaultIcon: SavedIcon, ActiveIcon: SavedWhiteIcon },
      REQUESTS: { Title: t("Requests"), to: "/dashboard/requests", DefaultIcon: BellIcon, ActiveIcon: BellWhiteIcon },
      MESSAGES: { Title: t("Messages"), to: "/dashboard/chat", DefaultIcon: MessageIcon, ActiveIcon: MessageWhiteIcon },
      SETTINGS: { Title: t("Settings"), to: "/dashboard/settings", DefaultIcon: SettingsIcon, ActiveIcon: SettingsWhiteIcon },

      EPKS: {Title: t("EPKs"), to: "/dashboard/epks", DefaultIcon: StarIcon, ActiveIcon: StartWhiteIcon},
      NOTIFICATIONS: {Title: t("Notifications"), to: "/dashboard/notifications", DefaultIcon: BellIcon, ActiveIcon: BellWhiteIcon}
    });

    const tabs = TABS(t, userId);
    switch (role) {
      case "Admin": return [tabs.METRICS, tabs.USERS, tabs.ANALYTICS, tabs.ADMIN_EPKS, tabs.REPORTS];
      case "Actor": return [tabs.EDIT_USER_PAGE, tabs.REQUESTS, tabs.MESSAGES, tabs.SAVED, tabs.SETTINGS];
      default: return [tabs.EPKS, tabs.EDIT_USER_PAGE, tabs.NOTIFICATIONS, tabs.REQUESTS, tabs.MESSAGES, tabs.SAVED, tabs.SETTINGS];
    }
  }, [role, t, userId]);

  const isAdmin = role === "Admin";

  const NavItem = ({ item, isMobile = false }) => (
    <NavLink
      to={item.to}
      onClick={item.Title === t("Messages") ? clearMessageCount : undefined}
      className={({ isActive }) => `
        tw-group tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-transition-all
        ${isMobile ? "tw-flex-1 tw-py-2" : "tw-w-full tw-py-3"}
        ${isAdmin
          ? isActive
            ? "tw-bg-[#712CB0] tw-rounded-xl tw-text-white"
            : "tw-text-white/70"
          : isActive
            ? "tw-bg-[#1E0039] tw-rounded-xl tw-text-white"
            : "tw-text-[#1E0039]"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <img
            src={isAdmin ? item.DefaultIcon : (isActive ? item.ActiveIcon : item.DefaultIcon)}
            alt={item.Title}
            className={`${isMobile ? "tw-h-8 tw-w-8" : "tw-h-8 tw-w-8"} ${isAdmin ? "tw-brightness-0 tw-invert" : ""}`}
          />
          <p className={`tw-text-xs tw-mt-1 ${
            isAdmin
              ? isActive ? "tw-text-white" : "tw-text-white/60"
              : isActive ? "tw-text-white" : "tw-text-[#1E0039]"
          }`}>
            {item.Title}
          </p>

          {item.Title === t("Messages") && messageCount > 0 && userInfo === userId && (
            <div className={`tw-absolute tw-bg-red-500 tw-text-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold
              ${isMobile ? "tw-right-4 tw-top-1 tw-h-4 tw-w-4 tw-text-[8px]" : "tw-right-2 tw-top-1 tw-h-5 tw-w-5 tw-text-[10px]"}
            `}>
              {messageCount > 9 ? "9+" : messageCount}
            </div>
          )}
        </>
      )}
    </NavLink>
  );

  const renderNavItems = (isMobile) =>
    sideBarList.map((item, index) => <NavItem key={index} item={item} isMobile={isMobile} />);

  return (
    <>
      {/* Desktop Sidebar (Left) */}
      <nav className={`tw-hidden md:tw-flex tw-h-full tw-w-20 tw-flex-col tw-items-stretch tw-rounded-lg tw-border-r tw-py-4 tw-gap-1 ${
        isAdmin ? "tw-bg-[#280D41] tw-border-white/10" : "tw-bg-white tw-border-r"
      }`}>
        {renderNavItems(false)}
      </nav>

      {/* Mobile Bottom Bar */}
      <div className={`tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-z-50 tw-flex tw-w-full tw-shadow-md md:tw-hidden ${
        isAdmin ? "tw-bg-[#280D41]" : "tw-bg-white"
      }`}>
        <nav className="tw-flex tw-w-full">
          {renderNavItems(true)}
        </nav>
      </div>
    </>
  );
}