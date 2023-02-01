import React, { useState, setState } from "react";
import axios from "axios";
import Logincss from "./login.module.css";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

    
 //individual login form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };
 //add some validation
  const handleSubmit = async () => {
    console.log(email, password);
    try {
      const { data } = await axios.post(
        "${process.env.REACT_APP_BACKEND_URL}/users/login",
        {
          email: email,
          password: password,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className={Logincss.form}>
        <div className={Logincss.formbody}>
          <div className="email">
            <label className="form__label">Email </label>
            <input
              type="email"
              id="email"
              className={Logincss.form_input}
              value={email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
            />
          </div>
          <div className="password">
            <label className="form__label">Password </label>
            <input
              className={Logincss.form_input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
            />
          </div>
        </div>
        {error && <div className="error_text">{error}</div>}
        {success && <div className="success_text">{success}</div>}
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className={Logincss.btn}
        >
          Sign In
        </button>
      </div>
    </>
  );
}

export default LoginForm;