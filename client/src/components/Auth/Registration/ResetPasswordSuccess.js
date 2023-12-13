import React, { useState, useEffect } from "react";
import successchanged from "../../../images/icons/success-reset.png";
import Logincss from "./login.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordSuccess(props) {
  //   let { email } = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    // Exit the effect if count is already 0
    if (count === 0) {
      navigate("/login");
      return;
    }

    const timeoutId = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    // Clear the timeout when the component unmounts or when count reaches 0
    return () => clearTimeout(timeoutId);
  }, [count, navigate]);

  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>
          <div className="container">
            <img
              src={successchanged}
              alt="success"
              style={{ width: 100, height: 100 }}
            />
          </div>
          {t("Password Changed!")}
        </div>

        <div className={Logincss.form}>
          <div className={Logincss.form_Message}>
            <p> {t("Your password has been changed successfully.")}</p>
            <div>
              {t(`Redirecting in `)}
              <span className="tw-text-red-600">{count}</span>
              {t(` seconds...`)}
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
