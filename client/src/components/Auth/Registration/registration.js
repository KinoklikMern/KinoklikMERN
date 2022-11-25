import React, { useState, setState } from "react";
import "./style.css";
import axios from "axios";
function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const options = [
    {
      label: "Viewer",
      value: "Viewer",
    },
    {
      label: "FILM_MAKER",
      value: "FILM_MAKER",
    },
    {
      label: "Sales_Agent",
      value: "Sales_Agent",
    },
    {
      label: "Distributor",
      value: "Distributor",
    },
    {
      label: "Film_Festival",
      value: "Film_Festival",
    },
  ];
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (id === "website") {
      setWebsite(value);
    }
    if (id === "phone") {
      setPhone(value);
    }
  };

  const handleSubmit = async () => {
    console.log(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      website,
      role
    );
    try {
      const { data } = await axios.post(
        "http://localhost:8000/users/register",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          website: website,
          role: role,
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
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label">First Name </label>
            <input
              className="form__input"
              type="text"
              value={firstName}
              onChange={(e) => handleInputChange(e)}
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="lastname">
            <label className="form__label">Last Name </label>
            <input
              type="text"
              name=""
              id="lastName"
              value={lastName}
              className="form__input"
              onChange={(e) => handleInputChange(e)}
              placeholder="LastName"
            />
          </div>
          <div className="email">
            <label className="form__label">Email </label>
            <input
              type="email"
              id="email"
              className="form__input"
              value={email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
            />
          </div>
          <div className="role">
            <label className="form__label">Role </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {role != "Viewer" && (
            <div>
              please enter extra information
              <div className="phone">
                <label className="form__label">phone number </label>
                <input
                  className="form__input"
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="phone number"
                />
              </div>
              <div className="website">
                <label className="form__label">Website </label>
                <input
                  className="form__input"
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="website"
                />
              </div>
            </div>
          )}
          <div className="password">
            <label className="form__label">Password </label>
            <input
              className="form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
            />
          </div>
          <div className="confirm-password">
            <label className="form__label">Confirm Password </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e)}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        {error && <div className="error_text">{error}</div>}
        {success && <div className="success_text">{success}</div>}
        <button onClick={() => handleSubmit()} type="submit" className="btn">
          Register
        </button>
      </div>
    </>
  );
}

export default RegistrationForm;
