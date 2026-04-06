import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Password() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const userId = user?.id || "0";

  const [disabled, setDisabled] = useState(true);
  const [pwdShow, setPwdShow] = useState(false);
  const [rePwdShow, setRePwdShow] = useState(false);

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
    userId: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setDisabled(false);
  };

  const savePassword = () => {
    if (!passwordData.newPassword) {
      toast.error(t("Password cannot be empty"));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t("Passwords don't match!"));
      return;
    }

    setDisabled(true);
    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/changePassword`, passwordData)
      .then((res) => {
        toast.success(res.data.message || t("Password updated!"));
        setPasswordData({ ...passwordData, newPassword: "", confirmPassword: "" });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || t("Error updating password"));
        setDisabled(false);
      });
  };

  return (
    <div className='tw-h-full tw-py-4 lg:tw-px-24'>
      <div className='tw-mt-8 tw-flex tw-flex-col tw-gap-4 tw-max-w-md'>
        
        {/* New Password Field */}
        <div className='tw-relative'>
          <input
            name='newPassword'
            value={passwordData.newPassword}
            placeholder={t("New Password")}
            type={pwdShow ? "text" : "password"}
            onChange={handleChange}
            className='tw-h-12 tw-w-full tw-rounded-lg tw-border-2 tw-px-6 tw-pr-12 tw-text-[#1E0039] tw-transition-colors focus:tw-border-[#1E0039] tw-outline-none'
          />
          <button
            type="button"
            className='tw-absolute tw-right-4 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400'
            onClick={() => setPwdShow(!pwdShow)}
          >
            <FontAwesomeIcon icon={pwdShow ? faEye : faEyeSlash} />
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className='tw-relative'>
          <input
            name='confirmPassword'
            value={passwordData.confirmPassword}
            placeholder={t("Confirm New Password")}
            type={rePwdShow ? "text" : "password"}
            onChange={handleChange}
            className='tw-h-12 tw-w-full tw-rounded-lg tw-border-2 tw-px-6 tw-pr-12 tw-text-[#1E0039] tw-transition-colors focus:tw-border-[#1E0039] tw-outline-none'
          />
          <button
            type="button"
            className='tw-absolute tw-right-4 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400'
            onClick={() => setRePwdShow(!rePwdShow)}
          >
            <FontAwesomeIcon icon={rePwdShow ? faEye : faEyeSlash} />
          </button>
        </div>

        <div className='tw-mt-4 tw-text-end'>
          <button
            disabled={disabled}
            onClick={savePassword}
            className='tw-rounded-full tw-bg-[#1E0039] tw-px-10 tw-py-2 tw-font-bold tw-text-white tw-transition-all hover:tw-opacity-90 disabled:tw-bg-gray-200 disabled:tw-text-gray-400'
          >
            {t("Save Password")}
          </button>
        </div>
      </div>
    </div>
  );
}