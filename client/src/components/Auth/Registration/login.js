import React, { useState, setState } from "react";
import "./style.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    console.log(email, password);
    try {
      const { data } = await axios.post("http://localhost:8000/users/login", {
        email: email,
        password: password,
      });
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      console.log(data);
      if (data.role === "FILM_MAKER") {
        navigate("/filmMakerDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="email">
          <label className="form__label" for="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>

        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
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
      <button onClick={() => handleSubmit()} type="submit" class="btn">
        Login
      </button>
    </div>
  );
}

export default Login;
