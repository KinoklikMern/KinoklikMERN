import { getSidebarList } from "../../constants/sidebarOptions";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NotificationContext } from "../../context/NotificationContext";
import { useSelector } from "react-redux";
import { useContext } from "react";

  export default function Sidebar({ role }) {
  const { t } = useTranslation();
  const sideBarList = getSidebarList(role, t);
  const { messageCount, userInfo, clearMessageCount } = useContext(NotificationContext);
  const userId = useSelector((state) => state.user.id);

  const NavItem = ({ item, isMobile = false }) => (
    <NavLink
      to={item.to}
      onClick={item.Title === t("Messages") ? clearMessageCount : undefined}
      className={({ isActive }) => `
        tw-group tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-transition-all
        ${isMobile ? "tw-flex-1 tw-py-2" : "tw-w-full tw-py-4"}
        ${isActive ? "tw-bg-[#1E0039] tw-text-white" : "tw-text-[#1E0039]"}
        ${!isMobile && isActive ? "tw-rounded-xl" : ""} 
      `}
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? item.ActiveIcon : item.DefaultIcon}
            alt={item.Title}
            className={isMobile ? "tw-h-8 tw-w-8" : "tw-h-10 tw-w-10"}
          />
          <p className={`tw-text-xs ${isActive ? "tw-text-white" : "tw-text-[#1E0039]"}`}>
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

  return (
    <>
      {/* Desktop Sidebar (Left) */}
      <nav className="tw-hidden md:tw-flex tw-h-full tw-w-20 tw-flex-col tw-justify-between tw-rounded-lg tw-bg-white tw-border-r tw-py-4">
        {sideBarList.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </nav>

      {/* Mobile Bottom Bar */}
      <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-z-50 tw-flex tw-w-full tw-bg-white tw-shadow-md md:tw-hidden">
        <nav className="tw-flex tw-w-full">
          {sideBarList.map((item, index) => (
            <NavItem key={index} item={item} isMobile={true} />
          ))}
        </nav>
      </div>
    </>
  );
}