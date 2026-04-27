import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { resendEmailVerificationToken, verifyUserEmail } from "../../../api/users";
import EmailCss from "./emailVerification.module.css";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  
  const user = state?.user;
  const inputRefs = useRef([]); 

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);


  useEffect(() => {
    inputRefs.current[activeOtpIndex]?.focus();
  }, [activeOtpIndex]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    const char = value.substring(value.length - 1);
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < OTP_LENGTH - 1) {
      setActiveOtpIndex(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        setActiveOtpIndex(index - 1);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOTPResend = async () => {
    try {
      const response = await resendEmailVerificationToken(user?.id);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message || t("OTP Resent Successfully"));
      }
    } catch (error) {
      toast.error(t("An error occurred while resending OTP"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length < OTP_LENGTH || isNaN(otpString)) {
      toast.error(t("Invalid OTP!"));
      return;
    }

    try {
      const response = await verifyUserEmail({
        OTP: otpString,
        userId: user?.id,
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        
        const loggedInUser = response.user || user;
        if (loggedInUser) {
          Cookies.set("user", JSON.stringify(loggedInUser), { expires: 1 });
          dispatch({ type: "LOGIN", payload: loggedInUser });
          
          const routes = {
            'Filmmaker': "/dashboard/settings",
            'Admin': "/admindashboard/main"
          };
          navigate(routes[loggedInUser.role] || "/userdashboard/settings", { replace: true });
        }
      }
    } catch (error) {
      toast.error(t("An error occurred while verifying email"));
    }
  };

  return (
    <div className={`${EmailCss.bg} tw-flex tw-h-screen tw-items-center tw-justify-center`}>
      <form
        onSubmit={handleSubmit}
        className={`tw-mb-8 tw-flex-col tw-content-center tw-space-y-6 tw-rounded tw-p-6 ${EmailCss.spinButtonNone}`}
      >
        <div>
          <h1 className="font-semiblod text-center tw-mb-8 tw-text-3xl tw-text-customColor">
            {t('Please enter the OTP to verify your account')}
          </h1>
          <p className="text-center tw-text-xl tw-text-customColor">
            {t('OTP has been sent to your email')}
          </p>
        </div>

        <div className="tw-flex tw-items-center tw-justify-center tw-space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              value={digit}
              onFocus={() => setActiveOtpIndex(index)}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`tw-border-dark-subtle tw-focus:border-white tw-h-12 tw-w-12 tw-rounded tw-border-2 tw-bg-transparent tw-text-center tw-text-xl tw-font-semibold tw-text-midnight tw-outline-none ${EmailCss.spinButtonNone}`}
            />
          ))}
        </div>

        <div className="tw-mt-3 tw-flex tw-items-center tw-justify-center">
          <button type="submit" className={EmailCss.btn}>
            {t('Verify Account')}
          </button>
        </div>

        <div className="tw-flex tw-items-center tw-justify-center">
          <button
            onClick={handleOTPResend}
            type="button"
            className="tw-bg-transparent tw-font-semibold tw-text-midnight hover:tw-underline"
          >
            {t('Resend OTP')}
          </button>
        </div>
      </form>
    </div>
  );
}