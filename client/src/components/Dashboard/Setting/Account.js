import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Account() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    // Using a native confirm for now - it's accessible and zero-code. 
    if (window.confirm(t("Are you sure you want to delete your account? This action is permanent."))) {
      performDelete();
    }
  };

  const performDelete = () => {
    setIsDeleting(true);
    Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/deleteAccount/${user?.id}`)
      .then((res) => {
        toast.success(t("Account deleted successfully"));
        
        Cookies.remove("user");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || t("Error deleting account"));
        setIsDeleting(false);
      });
  };

  return (
    <div className='tw-h-full tw-py-4 lg:tw-px-24'>
      <div className='tw-mt-8 tw-flex tw-flex-col tw-gap-6 tw-max-w-md'>
        
        <div className="tw-flex tw-flex-col tw-gap-2">
          <label className="tw-text-sm tw-font-bold tw-text-[#1E0039]">{t("Account Type")}</label>
          <input
            readOnly
            value={user?.role || ""}
            className='tw-h-12 tw-w-full tw-rounded-lg tw-border-2 tw-bg-gray-50 tw-px-6 tw-text-[#1E0039] tw-outline-none'
          />
        </div>

        <div className="tw-mt-4 tw-rounded-xl tw-bg-red-50 tw-p-6 tw-border tw-border-red-100">
          <h3 className="tw-text-red-700 tw-font-bold tw-mb-2">{t("Danger Zone")}</h3>
          <p className="tw-text-sm tw-text-red-600 tw-mb-4">
            {t("Once you delete your account, there is no going back. Please be certain.")}
          </p>
          <button
            disabled={isDeleting}
            onClick={handleDeleteClick}
            className='tw-w-full tw-rounded-lg tw-bg-red-600 tw-py-3 tw-font-bold tw-text-white tw-transition-colors hover:tw-bg-red-700 disabled:tw-bg-gray-400'
          >
            {isDeleting ? t("Deleting...") : t("Delete Account")}
          </button>
        </div>

      </div>
    </div>
  );
}