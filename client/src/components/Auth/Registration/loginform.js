import React, { useState, setState } from "react";
import axios from "axios";
import Logincss from "./login.module.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log(email, password);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          email: email,
          password: password,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      console.log(data);
      // if (data.role === "FILM_MAKER") {
      //   navigate("/filmMakerDashboard");
      // } else if (data.role === "Viewer") {
      //   navigate("/");
      // }
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
                placeholder="Email"
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
                placeholder="Password"
              />
            </div>
            <br />
          </div>
          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}
          <br />
          <button
            onClick={() => handleSubmit()}
            type="submit"
            className={Logincss.btn}
          >
            Sign In
          </button>

          <div className={Logincss.link}>
            <br />
            <br />
            <p>
              Don't have an account yet? <a href="/signup">Create Account</a>
            </p>
            <p>
              Forgot password?{" "}
              <a href="/sendresetpasswordlink">Reset my Password</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
