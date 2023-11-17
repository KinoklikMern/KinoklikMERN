import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Logincss from "./login.module.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const socket = io(backendUrl);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the email input field when the component loads
    emailInputRef.current.focus();
  }, []);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if no email or password is provided
    if (!email || !password) {
      setError("Please provide both email and password.");
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
        {/* <div className={Logincss.form}> */}
        <form onSubmit={handleSubmit} className={Logincss.form}>
          <div className={Logincss.formbody}>
            <div className="email tw-align-center tw-relative tw-flex tw-justify-start">
              {/* <label className="form__label">Email </label> */}
              <input
                type="email"
                id="email"
                className={`${Logincss.form_input} tw-flex-1 tw-rounded tw-border tw-pl-3 tw-pr-3`}
                value={email}
                onChange={(e) => handleInputChange(e)}
                placeholder="Email"
                ref={emailInputRef}
              />
            </div>
            <br />
            <div className="password tw-align-center tw-relative tw-flex tw-justify-start">
              {/* <label className="form__label">Password </label> */}
              <input
                className={`${Logincss.form_input} tw-flex-1 tw-rounded tw-border tw-pl-3 tw-pr-12`}
                // type="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
                placeholder="Password"
              />

              <button
                type="button"
                className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-w-10 tw-items-center tw-justify-center tw-bg-transparent tw-outline-none"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye }
                  className="tw-text-lg tw-text-gray-500"
                />
              </button>
            </div>
            <br />
            <div className={Logincss.form_Message}>
              {success && <div className={Logincss.error_text}>{success}</div>}
              {error && <div className={Logincss.error_text}>*{error}</div>}
              <br />
              <button
                // onClick={() => handleSubmit()}
                type="submit"
                className={Logincss.btn}
              >
                Sign In
              </button>
              <br />
              <br />
              <p>
                Don't have an account yet?{" "}
                <a href="/signup" className={Logincss.link}>
                  Create Account
                </a>
              </p>{" "}
              <p>
                Forgot password?{" "}
                <a href="/sendresetpasswordlink" className={Logincss.link}>
                  Reset my Password
                </a>
              </p>
            </div>
          </div>
        </form>
        {/* </div> */}
      </div>
    </>
  );
}

export default LoginForm;
