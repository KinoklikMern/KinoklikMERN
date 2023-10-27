import React, { useState, setState } from "react";
import SignupCss from "./signup.module.css";
import { useNavigate } from "react-router-dom";

function RegistrationPersonalInfo({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  role,
}) {
  const navigate = useNavigate();

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
  };

  return (
    <>
      <div className={SignupCss.personalInfo}>
        <div className={SignupCss.rolesMain}>
          <div className={`${SignupCss.roleImgMain} ${SignupCss.selected}`}>
            <button>
              <img src={role.image} alt="Filmmaker Icon"></img>

              <div className={SignupCss.mainText}>{role.label}</div>
            </button>
          </div>
        </div>
        <div className={SignupCss.form_input}>
          {/* <label className="form__label">First Name </label> */}
          <input
            className={SignupCss.form_input}
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className={SignupCss.form_input}>
          {/* <label className="form__label">Last Name </label> */}
          <input
            className={SignupCss.form_input}
            type="text"
            value={lastName}
            onChange={(e) => handleInputChange(e)}
            id="lastName"
            placeholder="LastName"
          />
        </div>
        <div className={SignupCss.form_input}>
          {/* <label className="form__label">Email </label> */}
          <input
            className={SignupCss.form_input}
            type="text"
            id="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>

        <div>
          {/* className={SignupCss.form_input} */}
          {/* <label className="form__label">Password </label> */}
          <input
            className={SignupCss.form_input2}
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div>
          {/* className={SignupCss.form_input} */}
          {/* <label className="form__label">Confirm Password </label> */}
          <input
            className={SignupCss.form_input2}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
    </>
  );
}

export default RegistrationPersonalInfo;
