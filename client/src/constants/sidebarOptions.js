import MainMetricsIcon from "../images/icons/dashFull.svg";
import MainMetricsWhiteIcon from "../images/icons/dashFull-white.svg";
import UsersIcon from "../images/icons/people-3-v3-white.svg";
import UsersActiveIcon from "../images/icons/people-3-v3.svg";
import AnalyticsIcon from "../images/icons/analytics-white.svg";
import AnalyticsActiveIcon from "../images/icons/analytics.svg";
import StarIcon from "../images/icons/star.svg";
import StartWhiteIcon from "../images/icons/star-file-white.svg";
import BellIcon from "../images/icons/bellEmpty.svg";
import BellWhiteIcon from "../images/icons/bellFull.svg";
import SettingsIcon from "../images/icons/settings.svg";
import SettingsWhiteIcon from "../images/icons/Settings-full-white.svg";
import MessageIcon from "../images/icons/message.svg";
import MessageWhiteIcon from "../images/icons/message-white.svg";
import SavedIcon from "../images/Save.ico";
import SavedWhiteIcon from "../images/icons/save.svg";
import ActorPage from "../images/icons/actorpage.svg";
import ActorPageWhite from "../images/icons/actorpageWhite.svg";

const TABS = (t) => ({
  METRICS: { Title: t("Main Metrics"), to: "/admindashboard/main", DefaultIcon: MainMetricsWhiteIcon, ActiveIcon: MainMetricsIcon },
  USERS: { Title: t("Users"), to: "/admindashboard/users", DefaultIcon: UsersIcon, ActiveIcon: UsersActiveIcon },
  ANALYTICS: { Title: t("Analytics"), to: "/admindashboard/analytics", DefaultIcon: AnalyticsIcon, ActiveIcon: AnalyticsActiveIcon },
  ADMIN_EPKS: { Title: t("EPKs"), to: "/admindashboard/epks", DefaultIcon: StartWhiteIcon, ActiveIcon: StarIcon },

  EDIT_USER_PAGE: { Title: t("Your Bio"), to: "/dashboard/user", DefaultIcon: ActorPage, ActiveIcon: ActorPageWhite },
  SAVED: { Title: t("Saved"), to: "/dashboard/saved", DefaultIcon: SavedIcon, ActiveIcon: SavedWhiteIcon },
  REQUESTS: { Title: t("Requests"), to: "/dashboard/requests", DefaultIcon: BellIcon, ActiveIcon: BellWhiteIcon },
  MESSAGES: { Title: t("Messages"), to: "/dashboard/chat", DefaultIcon: MessageIcon, ActiveIcon: MessageWhiteIcon },
  SETTINGS: { Title: t("Settings"), to: "/dashboard/settings", DefaultIcon: SettingsIcon, ActiveIcon: SettingsWhiteIcon },

  EPKS: {Title: t("EPKs"), to: "/dashboard/epks", DefaultIcon: StarIcon, ActiveIcon: StartWhiteIcon},
  NOTIFICATIONS: {Title: t("Notifications"), to: "/dashboard/notifications", DefaultIcon: BellIcon, ActiveIcon: BellWhiteIcon}
});

export const getSidebarList = (role, t) => {
  const tabs = TABS(t);
  switch (role) {
    case "Admin":
      return [tabs.METRICS, tabs.USERS, tabs.ANALYTICS, tabs.ADMIN_EPKS];
    case "Actor":
      return [tabs.EDIT_USER_PAGE, tabs.REQUESTS, tabs.MESSAGES, tabs.SAVED, tabs.SETTINGS];
    default: // Filmmaker
      return [tabs.EPKS, tabs.EDIT_USER_PAGE, tabs.NOTIFICATIONS, tabs.REQUESTS, tabs.MESSAGES, tabs.SAVED, tabs.SETTINGS];
  }
};