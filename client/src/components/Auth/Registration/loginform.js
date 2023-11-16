import React, { useState } from "react";
import axios from "axios";
import Logincss from "./login.module.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";
import { useTranslation } from 'react-i18next';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const socket = io(backendUrl);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // For Translation
  const { t } = useTranslation();

  //individual login form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value.trim());
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    // Check if no email or password is provided
    if (!email || !password) {
      setError(t("Please provide both email and password."));
      return;
    }
    console.log(email, password);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          email: email,
          password: password,
        }
      );

      // Yeming added
      console.log("data", data);

      // let userId;
      // if (data.user && data.user.id) {
      //   userId = data.user.id;
      // } else if (data.id) {
      //   userId = data.id;
      // }

      // console.log("User ID:", userId);

      // if (!data.isVerified) {
      //   navigate("/verification", {
      //     state: { user: { ...data.user, id: userId } },
      //   });
      //   return;
      // }

      if (data.user && !data.isVerified) {
        navigate("/verification", { state: { user: data.user } });
        return;
      }

      setError("");
      setSuccess(data.message);
      // eslint-disable-next-line no-unused-vars
      const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));

      if (socket && !socket.connected) {
        socket.connect(); // Ensure the socket connects if it's not already
      }

      // Dispatching the USER_ONLINE action
      if (data && data.id) {
        // Emit the setup event to the socket server
        console.log("Setting up user on socket.io for user:", data.id);
        socket.emit("setup", { id: data.id });
      }

      console.log(data);
      navigate("/");
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>Sign in</div>
        <div className={Logincss.form}>
          <div className={Logincss.formbody}>
            <div className="email">
              {/* <label className="form__label">Email </label> */}
              <input
                type="email"
                id="email"
                className={Logincss.form_input}
                value={email}
                onChange={(e) => handleInputChange(e)}
                placeholder={t("Email")}
              />
            </div>
            <br />
            <div className="password">
              {/* <label className="form__label">Password </label> */}
              <input
                className={Logincss.form_input}
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
                placeholder={t("Password")}
              />
            </div>
            <br />
            <div className={Logincss.form_Message}>
              {success && <div className={Logincss.error_text}>{success}</div>}
              {error && <div className={Logincss.error_text}>*{error}</div>}
              <br />
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className={Logincss.btn}
              >
                {t('Sign In')}
              </button>
              <br />
              <br />
              <p>
                {t("Don't have an account yet?")}{" "}
                <a href="/signup" className={Logincss.link}>
                  {t('Create Account')}
                </a>
              </p>{" "}
              <p>
                {t("Forgot password?")}{" "}
                <a href="/sendresetpasswordlink" className={Logincss.link}>
                  {t('Reset my Password')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
