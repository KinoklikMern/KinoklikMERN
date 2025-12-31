import React, { useState } from "react";
import axios from "axios";
import Logincss from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function SendResetPasswordLink() {
  const [email, setEmail] = useState("");
  //   const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  //   const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  //   const [open, setOpen] = useState(false);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //individual login form
  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value.trim());
  };

  const handleSubmit = async () => {
    console.log(email);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/forget-password`,
        {
          email: email,
        }
      );
      setError("");
      setSuccess(data.message);
      // eslint-disable-next-line no-unused-vars
      const { message, ...rest } = data;
      //   dispatch({ type: "LOGIN", payload: data });
      //   Cookies.set("user", JSON.stringify(data));

      console.log(data);
      navigate(`/checkemail/${email}`);
    } catch (error) {
      console.log(error);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  //For Translation
  const { t } = useTranslation();


  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>{t('Forgot your password?')}</div>

        <div className={Logincss.form}>
          <div className={Logincss.formbody}>
            <div className={Logincss.form_Message}>
              {t('You will receive an email with instructions to reset')}
              <br /> {t('your password if an account exists for this email address.')}
            </div>
            <br />
            <div className="email">
              {/* <label className="form__label">Email: </label> */}
              <input
                type="email"
                id="email"
                value={email}
                className={Logincss.form_input}
                onChange={(e) => handleInputChange(e)}
                placeholder={t("Email")}
              />
            </div>
            <br />

            {error && <div className={Logincss.error_text}>*{error}</div>}
            {success && <div className="success_text">{success}</div>}
            <br />
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className={Logincss.btn}
            >
              {t('Reset Password')}
            </button>
          </div>
          <div className={Logincss.form_Message}>
            <br />
            <p>
              {t('Already hava an account?')}{" "}
              <a href="/login" className={Logincss.link}>
                {t('Sign In')}
              </a>
            </p>
            <p>
              {t("Don't have an account yet?")}{" "}
              <a href="/signup" className={Logincss.link}>
                {t('Create Account')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendResetPasswordLink;
