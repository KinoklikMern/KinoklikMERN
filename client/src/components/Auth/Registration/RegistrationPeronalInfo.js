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
  receiveNewsletter,
  setReceiveNewsletter,
  newsletterOptions,
  setNewsletterOptions,
  agreeToTerms,
  setAgreeToTerms,
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

  const handleNewsletterOptionChange = (option) => {
    const initOptions = {
      filmmakers: false,
      viewers: false,
      ecosystemPlayers: false,
      investors: false,
      technicalUpdates: false,
      allNewsletters: false,
    };
    const updatedOptions = { ...initOptions, [option]: true };
    setNewsletterOptions(updatedOptions);
  };
  const handleReceiveNewsletterChange = (e) => {
    setReceiveNewsletter(e.target.checked);
  };

  return (
    <>
      <div className={SignupCss.personalInfo}>
        <div className={SignupCss.rolesMain}>
          <div className={SignupCss.form_titleMainPAndRole}>
            <div className={SignupCss.form_titleMainPI}>
              Sign up for KinoKlik{" "}
            </div>
            {/* <div className={SignupCss.mainText}>{role.label}</div> */}
            <div className={SignupCss.imageAndTextPI}>
              <div
                className={`${SignupCss.roleImgMainPI} ${SignupCss.selected}`}
              >
                {/* <button> */}
                <img src={role.image} alt="Filmmaker Icon"></img>

                {/* </button> */}
              </div>
              <div className={SignupCss.textImgMainPI}>{role.label}</div>
            </div>
          </div>
        </div>
        <div className={SignupCss.nameFields}>
          {/*<div className={SignupCss.form_input}>*/}
          <div>
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
          {/* <div className={SignupCss.form_input}>*/}
          <div>
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

        {/* New terms and conditions checkbox */}
        <div className={SignupCss.termsAndConditions}>
          <label className={SignupCss.termsCheckboxLabel}>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            I agree to the terms and conditions as set out by the user
            agreement.
          </label>
        </div>

        {/*the newsletters opt-in */}
        <div className={SignupCss.newsletterOption}>
          <div className={SignupCss.headerLetter}>
            I want to stay up to date and receive newsletters from KinoKlik!
          </div>
          <div className={SignupCss.yesNo}>
            <label className={SignupCss.yesAndNo}>
              <input
                type="checkbox"
                checked={receiveNewsletter}
                onChange={() => setReceiveNewsletter(true)}
              />
              Yes
            </label>
            <label className={SignupCss.yesAndNo}>
              <input
                type="checkbox"
                checked={!receiveNewsletter}
                onChange={() => setReceiveNewsletter(false)}
              />
              No
            </label>
          </div>
          {receiveNewsletter && (
            <div className={SignupCss.listOfAudiences}>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.filmmakers}
                  onChange={handleNewsletterOptionChange("filmmakers")}
                />
                Filmmakers (Directors & Producers)
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.viewers}
                  onChange={handleNewsletterOptionChange("viewers")}
                />
                Viewers
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  checked={newsletterOptions.ecosystemPlayers}
                  onChange={(e) =>
                    handleNewsletterOptionChange("ecosystemPlayers")
                  }
                  type="checkbox"
                />
                Film Ecosystem & Industry Players
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.investors}
                  onChange={handleNewsletterOptionChange("investors")}
                />
                Investors & VCs Updates
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.technicalUpdates}
                  onChange={handleNewsletterOptionChange("technicalUpdates")}
                />
                KinoKlik Technical Updates
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.allNewsletters}
                  onChange={handleNewsletterOptionChange("allNewsletters")}
                />
                All Newsletters
              </label>
            </div>
          )}
        </div>
        {/* <div className="SignupCss.buttonsSignUpAndBack">
          <button onClick={handleSubmit} className={SignupCss.btn}>
            Sign Up
          </button>

          {showBackButton && ( // Conditionally render the "Back" button here
            <button onClick={handleBack} className={SignupCss.back}>
              Back
            </button>
          )}
        </div> */}
      </div>
    </>
  );
}

export default RegistrationPersonalInfo;
