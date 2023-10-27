import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// import "../../../styles/tailwind.css";

import {
  resendEmailVerificationToken,
  verifyUserEmail,
} from "../../../api/user";
import EmailCss from "./emailVerification.module.css";

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;
  // validate the otp
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  // const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const inputRef = useRef();

  const { state } = useLocation();
  const user = state?.user;

  // const isVerified = user?.isVerified;

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];

    // Allow re-typing and delete on backspace
    if (value.length === 1 && currentOTPIndex < OTP_LENGTH) {
      newOtp[currentOTPIndex] = value;
      focusNextInputField(currentOTPIndex);
    } else if (value.length === 0) {
      newOtp[currentOTPIndex] = ""; // Clear the current input
      focusPrevInputField(currentOTPIndex);
    }

    // new added
    // currentOTPIndex =
    //   value.length === 0 ? currentOTPIndex - 1 : currentOTPIndex;

    // newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    // if (!value) focusPrevInputField(currentOTPIndex);
    // else focusNextInputField(currentOTPIndex);
    setOtp([...newOtp]);
  };

  const handleOTPResend = async () => {
    // console.log("User Object:", user); // Log the user object
    try {
      const { error, message } = await resendEmailVerificationToken(user.id);

      if (error) {
        enqueueSnackbar(error, { variant: "error" });
      } else {
        enqueueSnackbar(message, { variant: "success" });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      enqueueSnackbar("An error occurred while resending OTP", {
        variant: "error",
      });
    }
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User:", user);
    if (!isValidOTP(otp)) {
      enqueueSnackbar("Invalid OTP!", { variant: "error" });
      return;
    }
    // submit otp
    try {
      console.log("User ID being sent:", user?.id);
      const { error, message } = await verifyUserEmail({
        OTP: otp.join(""),
        userId: user?.id,
      });
      if (error) {
        enqueueSnackbar(error, { variant: "error" });
      } else {
        enqueueSnackbar(message, { variant: "success" });
        console.log(message);
        // navigate("/success");

        // Navigate based on user authentication and verification
        if (user) {
          if (user.isVerified) {
            navigate("/");
          } else {
            navigate("/success");
          }
        } else {
          navigate("/success");
        }
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      enqueueSnackbar("An error occurred while verifying email", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <div
      className={`${EmailCss.bg} tw-flex tw-h-screen tw-items-center tw-justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        className={`tw-mb-8 tw-flex-col tw-content-center tw-space-y-6 tw-rounded tw-p-6 ${EmailCss.spinButtonNone}`}
      >
        <div>
          <h1 className="font-semiblod text-center tw-mb-8 tw-text-3xl tw-text-customColor">
            Please enter the OTP to verify your account
          </h1>

          <p className="text-center tw-text-xl tw-text-customColor">
            OTP has been sent to your email
          </p>
        </div>

        <div className="tw-flex  tw-items-center tw-justify-center tw-space-x-2">
          {otp.map((_, index) => {
            return (
              <input
                ref={activeOtpIndex === index ? inputRef : null}
                key={index}
                type="number"
                value={otp[index] || ""}
                onChange={handleOtpChange}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`tw-border-dark-subtle tw-focus:border-white tw-h-12 tw-w-12 tw-rounded tw-border-2 tw-bg-transparent tw-text-center tw-text-xl tw-font-semibold tw-text-midnight tw-outline-none ${EmailCss.spinButtonNone}`}
              />
            );
          })}
        </div>

        <div className="tw-mt-3 tw-flex tw-items-center tw-justify-center">
          <button type="submit" className={EmailCss.btn}>
            Verify Account
          </button>
        </div>

        <div className="tw-flex tw-items-center tw-justify-center">
          <button
            onClick={handleOTPResend}
            type="button"
            className="tw-bg-transparent tw-font-semibold tw-text-midnight hover:tw-underline"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
}
