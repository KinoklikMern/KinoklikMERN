import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function LoginModal({ open, close, setRefresh }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`, 
        { email, password }
      );

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      
      setRefresh(true);
      close();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || t("Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-[999] tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-backdrop-blur-sm">
      <div className="tw-relative tw-w-full tw-max-w-md tw-rounded-2xl tw-bg-[#2d0a4d] tw-p-8 tw-shadow-2xl tw-border tw-border-white/10">
        
        <button 
          onClick={close}
          className="tw-absolute tw-right-4 tw-top-4 tw-text-gray-400 hover:tw-text-white"
        >
          ✕
        </button>

        <h2 className="tw-mb-6 tw-text-center tw-text-2xl tw-font-bold tw-text-white">
          {t("Sign In")}
        </h2>

        {errorMsg && (
          <div className="tw-mb-4 tw-rounded tw-bg-red-500/20 tw-p-2 tw-text-center tw-text-sm tw-text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="tw-space-y-4">
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-1">
              {t("Email address")}
            </label>
            <input
              type="email"
              required
              className="tw-w-full tw-rounded-lg tw-border tw-border-white/20 tw-bg-white/5 tw-p-3 tw-text-white tw-outline-none focus:tw-border-[#712cb0] focus:tw-ring-1 focus:tw-ring-[#712cb0]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-1">
              {t("Password")}
            </label>
            <input
              type="password"
              required
              className="tw-w-full tw-rounded-lg tw-border tw-border-white/20 tw-bg-white/5 tw-p-3 tw-text-white tw-outline-none focus:tw-border-[#712cb0] focus:tw-ring-1 focus:tw-ring-[#712cb0]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="tw-w-full tw-rounded-lg tw-bg-[#712cb0] tw-py-3 tw-font-bold tw-text-white tw-shadow-lg tw-transition-all hover:tw-bg-[#8a3fd4] active:tw-scale-[0.98] disabled:tw-opacity-50"
          >
            {loading ? t("Signing In...") : t("Sign In")}
          </button>
        </form>

        <div className="tw-mt-6 tw-text-center tw-text-sm tw-text-gray-400">
          <p>
            {t("Don't have an account yet?")}{" "}
            <Link to="/signup" className="tw-text-[#a362e5] hover:tw-underline">
              {t("Create Account")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}