import React, { useState, setState } from "react";
import axios from "axios";
import Logincss from "./login.module.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>Forgot your password?</div>

        <div className={Logincss.form}>
          <div className={Logincss.formbody}>
            <div className={Logincss.form_Message}>
              You will receive an email with instructions to reset
              <br /> your password if an account exists for this email address.
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
                placeholder="Email"
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
              Reset Password
            </button>
          </div>
          <div className={Logincss.form_Message}>
            <br />
            <p>
              Already hava an account?{" "}
              <a href="/login" className={Logincss.link}>
                Sign In
              </a>
            </p>
            <p>
              Don't have an account yet?{" "}
              <a href="/signup" className={Logincss.link}>
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendResetPasswordLink;
