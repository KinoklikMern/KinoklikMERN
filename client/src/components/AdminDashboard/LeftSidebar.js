import React, { useContext } from "react";
import MainMetricsIcon from "../../images/icons/img_grid.svg";
import MainMetricsWhiteIcon from "../../images/icons/img_grid_white_a700.svg";
import UsersIcon from "../../images/icons/img_user.svg";
import UsersActiveIcon from "../../images/icons/img_user_gray_900.svg";
import AnalyticsIcon from "../../images/icons/img_analyticsicon1.svg";
import AnalyticsActiveIcon from "../../images/icons/img_analyticsicon.svg";
import StarIcon from "../../images/icons/star.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import adminImg from "../../images/img_ellipse9.png";

export default function LeftSidebar(props) {
  const SELECTED_TAB = props.selectedTab;

  const Role = props.role;
  console.info("select", SELECTED_TAB);

  const sideBarList1 = [
    {
      Title: "Main Metrics",
      DefaultIcon: MainMetricsWhiteIcon,
      ActiveIcon: MainMetricsIcon,
      href: "/admindashboard/main",
      size: {
        width: 50,
        height: 50,
      },
    },
    {
      Title: "Users",
      DefaultIcon: UsersIcon,
      ActiveIcon: UsersActiveIcon,
      href: "/admindashboard/users",
      size: {
        width: 62,
        height: 62,
      },
    },

    {
      Title: "Analytics",
      DefaultIcon: AnalyticsIcon,
      ActiveIcon: AnalyticsActiveIcon,
      href: "/admindashboard/analytics",
      size: {
        width: 60,
        height: 60,
      },
    },
    {
      Title: "EPKs",
      DefaultIcon: StartWhiteIcon,
      ActiveIcon: StarIcon,
      href: "/admindashboard/epks",
      size: {
        width: 60,
        height: 60,
      },
    },
  ];

  // const sideBarList2 = [
  //   {
  //     Title: "Actor Page",
  //     DefaultIcon: ActorPage,
  //     ActiveIcon: ActorPage,
  //     href: "/userdashboard/actor",
  //     size: {
  //       width: 60,
  //       height: 60,
  //     },
  //   },
  //   {
  //     Title: "Starred",
  //     DefaultIcon: StarIcon,
  //     ActiveIcon: StarWhiteIcon,
  //     href: "/userdashboard/starred",
  //     size: {
  //       width: 60,
  //       height: 60,
  //     },
  //   },
  //   {
  //     Title: "Following",
  //     DefaultIcon: PlusIcon,
  //     ActiveIcon: PlusWhiteIcon,
  //     href: "/userdashboard/following",
  //     size: {
  //       width: 70,
  //       height: 70,
  //     },
  //   },

  //   {
  //     Title: "Requests",
  //     DefaultIcon: BellIcon,
  //     ActiveIcon: BellWhiteIcon,
  //     href: "/userdashboard/requests",
  //     size: {
  //       width: 60,
  //       height: 60,
  //     },
  //   },
  //   {
  //     Title: "Messages",
  //     DefaultIcon: MessageIcon,
  //     ActiveIcon: MessageWhiteIcon,
  //     href: "/userdashboard/chat",
  //     size: {
  //       width: 60,
  //       height: 60,
  //     },
  //   },
  //   {
  //     Title: "Settings",
  //     DefaultIcon: SettingsIcon,
  //     ActiveIcon: SettingsWhiteIcon,
  //     href: "/userdashboard/settings",
  //     size: {
  //       width: 60,
  //       height: 60,
  //     },
  //   },
  // ];

  // const sideBarList = Role === "Actor" ? sideBarList2 : sideBarList1;
  const sideBarList = sideBarList1;

  console.log(sideBarList);
  return (
    <>
      <nav
        className="tw-flex tw-h-full tw-w-60 tw-flex-col tw-justify-between tw-gap-3 tw-rounded-lg tw-bg-[#1E0039] tw-py-6"
        style={{
          height: Role === "Actor" ? "115%" : "100%",
        }}
      >
        {sideBarList.map((item, index) => (
          <div
            key={index}
            className={`tw-flex tw-h-full tw-w-full tw-justify-around  
              ${
                SELECTED_TAB === item.Title ? "tw-bg-white" : ""
              } hover:tw-scale-105`}
            style={{ height: 70 }}
          >
            <a
              href={item.href}
              className="tw-flex tw-w-full tw-flex-col tw-text-white"
            >
              <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-gap-[20px]">
                <img
                  src={
                    SELECTED_TAB === item.Title
                      ? item.ActiveIcon
                      : item.DefaultIcon
                  }
                  className="tw-w-2/5 tw-pl-5"
                  alt={item.Title}
                  style={{ width: item.size.width, height: item.size.height }}
                />
                <p
                  className={
                    SELECTED_TAB === item.Title
                      ? "tw-w-3/5 tw-text-xl tw-text-[#1E0039]"
                      : "tw-w-3/5 tw-text-xl"
                  }
                >
                  {item.Title}
                </p>
              </div>
            </a>
          </div>
        ))}
        {/* <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-end  tw-text-center"></div> */}
        <div className="tw-flex  tw-w-full tw-flex-col tw-items-center tw-justify-end  tw-text-center">
          <img
            className="tw-md:h-auto tw-mt-8 tw-h-10 tw-w-10 tw-rounded-[50%]"
            src={adminImg}
            alt="ellipseTwelve"
          />
          <p className="tw-font-inter tw-mt-1 tw-text-base tw-text-white">
            KinoKlik Admin
          </p>
        </div>
      </nav>
    </>
  );
}
