/* eslint-disable no-unused-vars */
import React, { useState, setState } from "react";
import SignupCss from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  //For Translation
  const { t } = useTranslation();

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
      actors: false,
      viewers: false,
      ecosystem: false,
      investors: false,
      general: false,
      allNewsletters: false,
    };
    if (option === "allNewsletters" && newsletterOptions[option] === true) {
      // If the user unchecks the "All Newsletters" option, uncheck all the other options
      setNewsletterOptions(initOptions);
    } else if (
      option === "allNewsletters" &&
      newsletterOptions[option] === false
    ) {
      setNewsletterOptions({ ...initOptions, allNewsletters: true });
    } else {
      // If the user checks/unchecks any other option, update the state accordingly
      setNewsletterOptions((prevOptions) => {
        // If the user unchecks any other option, uncheck the "All Newsletters" option
        if (prevOptions[option] === true) {
          return {
            ...prevOptions,
            [option]: !prevOptions[option],
            allNewsletters: false,
          };
        } else {
          // If the user checks all other options except option "All Newsletters", check the "All Newsletters" option
          const options = { ...prevOptions, [option]: !prevOptions[option] };
          if (
            Object.keys(options)
              .filter((key) => key !== "allNewsletters")
              .every((key) => options[key] === true)
          ) {
            return { ...initOptions, allNewsletters: true };
          }
          return {
            ...options,
            allNewsletters: false,
          };
        }
      });
    }
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
              {t("Sign up for KinoKlik")}{" "}
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
              placeholder={t("First Name")}
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
              placeholder={t("Last Name")}
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
            placeholder={t("Email")}
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
            placeholder={t("Password")}
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
            placeholder={t("Confirm Password")}
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
            {t(
              "I agree to the terms and conditions as set out by the user agreement"
            )}
            .
          </label>
        </div>

        {/*the newsletters opt-in */}
        <div className={SignupCss.newsletterOption}>
          <div className={SignupCss.headerLetter}>
            {t(
              "I want to stay up to date and receive newsletters from KinoKlik!"
            )}
          </div>
          <div className={SignupCss.yesNo}>
            <label className={SignupCss.yesAndNo}>
              <input
                type="radio"
                checked={receiveNewsletter}
                onChange={() => setReceiveNewsletter(true)}
              />
              {t("Yes")}
            </label>
            <label className={SignupCss.yesAndNo}>
              <input
                type="radio"
                checked={!receiveNewsletter}
                onChange={() => setReceiveNewsletter(false)}
              />
              {t("No")}
            </label>
          </div>
          {receiveNewsletter && (
            <div className={SignupCss.listOfAudiences}>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.filmmakers}
                  onChange={() => handleNewsletterOptionChange("filmmakers")}
                />
                {t("Filmmakers")}
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.actors}
                  onChange={() => handleNewsletterOptionChange("actors")}
                />
                {t("Actors")}
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.viewers}
                  onChange={() => handleNewsletterOptionChange("viewers")}
                />
                {t("Viewers")}
              </label>

              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.investors}
                  onChange={() => handleNewsletterOptionChange("investors")}
                />
                {t("Investors")}
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  checked={newsletterOptions.ecosystem}
                  onChange={() => handleNewsletterOptionChange("ecosystem")}
                  type="checkbox"
                />
                {t("Film Industry")}
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.general}
                  onChange={() => handleNewsletterOptionChange("general")}
                />
                {t("KinoKlik General")}
              </label>
              <label className="audience">
                <input
                  name="newsletterOption"
                  type="checkbox"
                  checked={newsletterOptions.allNewsletters}
                  onChange={() =>
                    handleNewsletterOptionChange("allNewsletters")
                  }
                />
                {t("All Newsletters")}
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
