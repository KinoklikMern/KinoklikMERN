import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DashIcon } from "../../images/icons/dashFull-white.svg";
import { ReactComponent as LogoutIcon } from "../../images/icons/logout-icon.svg";
import { ReactComponent as SettingIcon } from "../../images/icons/Settings-full-white.svg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";



export const SideProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));

  const logout = () => {
    Cookies.set("user", null);
    console.log(user);
    console.log("log out");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    console.log(user);
    navigate("/");
  };
  return (
    <>
      <div className="tw-invisible tw-absolute  tw-inset-y-0 tw-right-0 tw-flex tw-h-screen tw-w-64 tw-flex-col tw-justify-center tw-gap-6 tw-rounded-l-side tw-bg-[#D9D9D9] tw-bg-opacity-50 group-hover:tw-visible tw-duration-300">
        <div
          onClick={() => {
            navigate("/filmMakerDashboardSecurity");
          }}
          className="tw-flex tw-items-center tw-gap-2 tw-place-self-end tw-pr-3 hover:tw-scale-125 hover:tw-cursor-pointer"
        >
          <p className="tw-pb-2 tw-text-2xl tw-text-white">
            My Settings
          </p>
          <SettingIcon />
        </div>
        <div
          onClick={() => {
            navigate("/filmMakerDashboard");
          }}
          className="tw-flex tw-items-center tw-gap-2 tw-place-self-end tw-pr-3 hover:tw-cursor-pointer hover:tw-scale-125"
        >
          <p className="tw-pb-2 tw-text-2xl tw-text-white">
            My Dashboard
          </p>
          <DashIcon fill="white" />
        </div>
        <div
          onClick={logout}
          className="tw-flex tw-items-center tw-gap-2 tw-place-self-end tw-pr-3 hover:tw-scale-125 hover:tw-cursor-pointer"
        >
          <p className="tw-pb-2 tw-text-2xl tw-text-white">
            Log Out
          </p>
          <LogoutIcon fill="white" />
        </div>
      </div>
    </>
  );
};
