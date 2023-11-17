import React, { useContext } from "react";
import MainMetricsIcon from "../../images/icons/dashFull.svg";
import MainMetricsWhiteIcon from "../../images/icons/dashFull-white.svg";
import UsersIcon from "../../images/icons/people-3-v3-white.svg";
import UsersActiveIcon from "../../images/icons/people-3-v3.svg";
import AnalyticsIcon from "../../images/icons/analytics-white.svg";
import AnalyticsActiveIcon from "../../images/icons/analytics.svg";
import StarIcon from "../../images/icons/star.svg";
import StartWhiteIcon from "../../images/icons/star-file-white.svg";
import adminImg from "../../images/img_ellipse9.png";
import { useTranslation } from "react-i18next";

export default function LeftSidebar(props) {
  const { t } = useTranslation();
  const SELECTED_TAB = props.selectedTab;

  const Role = props.role;
  // console.info("select", SELECTED_TAB);

  const sideBarList1 = [
    {
      Title: "Main Metrics",
      DefaultIcon: MainMetricsWhiteIcon,
      ActiveIcon: MainMetricsIcon,
      href: "/admindashboard/main",
      size: {
        width: 80,
        height: 80,
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

  const sideBarList = sideBarList1;

  // console.log(sideBarList);
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
            {t("KinoKlik Admin")}
          </p>
        </div>
      </nav>
    </>
  );
}
