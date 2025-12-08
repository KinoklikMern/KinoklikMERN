import React, { useState } from "react";
import axios from "axios";
import Logincss from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ResetPassword(props) {
  const token = props.token;
  const userId = props.userId;
  const [password, setPassword] = useState("");
  const [retypepassword, setRetypePassword] = useState("");
  //   const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  //   const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  //individual login form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "password") {
      setPassword(value);
    }
    if (id === "retypepassword") {
      setRetypePassword(value);
    }
  };

  const handleSubmit = async () => {
    // console.log(email);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/reset-password`,
        {
          newPassword: password,
          retypePassword: retypepassword,
          token: token,
          userId: userId,
        }
      );
      setError("");
      setSuccess(data.message);
      // eslint-disable-next-line no-unused-vars
      const { message, ...rest } = data;

      console.log(data);
      navigate(`/resetpasswordsuccesss`);
    } catch (error) {
      console.log(error);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>{t('Reset your password')}</div>

        <div className={Logincss.form}>
          <div className={Logincss.form_Message}>
            <p>{t('Enter a new password below to change your password')}.</p>
            <br />
            <div>
              {/* <label className="form__label">Email: </label> */}
              <input
                type="password"
                id="password"
                value={password}
                className={Logincss.form_input}
                onChange={(e) => handleInputChange(e)}
                placeholder={t("New password")}
              />
            </div>
            <br />
            <div>
              {/* <label className="form__label">Email: </label> */}
              <input
                type="password"
                id="retypepassword"
                value={retypepassword}
                className={Logincss.form_input}
                onChange={(e) => handleInputChange(e)}
                placeholder={t("Re-enter new password")}
              />
            </div>
            <br />

            {error && <div className={Logincss.error_text}>*{error}</div>}
            {success && <div className="success_text">*{success}</div>}
            <br />
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className={Logincss.btn}
            >
              {t('Reset Password')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
