import React, { useState, setState, useEffect } from "react";
import axios from "axios";
import SignupCss from "./signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RegistrationSuccess from "./RegistrationSuccess";
import RoleChoice from "./RoleChoise";
import RegistrationPersonalInfo from "./RegistrationPeronalInfo";
import filmmakerIcon from "../../../images/icons/filmmakerIcon.svg";
import actorIcon from "../../../images/icons/actorIcon.svg";
import producerIcon from "../../../images/icons/producerIcon.svg";
import viewerIcon from "../../../images/icons/viewerIcon.svg";
import writerIcon from "../../../images/icons/writerIcon.svg";
import soundIcon from "../../../images/icons/soundIcon.svg";
import salesAgentIcon from "../../../images/icons/salesAgentIcon.svg";
import festivalIcon from "../../../images/icons/festivalIcon.svg";
import investorIcon from "../../../images/icons/investorIcon.svg";
import editorIcon from "../../../images/icons/editorIcon.svg";
import { useTranslation } from "react-i18next";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [nextClicked, setNextClicked] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [role, setRole] = useState({
    label: t("An amazing and talented visionary filmmaker"),
    value: "Filmmaker",
    image: filmmakerIcon,
  });

  //Personal Info
  const [receiveNewsletter, setReceiveNewsletter] = useState(true);
  const initOptions = {
    filmmakers: false,
    actors: false,
    viewers: false,
    ecosystem: false,
    investors: false,
    general: false,
    allNewsletters: true,
  };
  const [newsletterOptions, setNewsletterOptions] = useState(initOptions);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // New state for the terms and conditions checkbox

  useEffect(() => {
    // Clear the error message when nextClicked changes
    setError("");
  }, [nextClicked]);

  const handleSubmit = async () => {
    // Validate the form fields
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setError(t("All fields are required."));
      return;
    }

    if (!isValidEmail.test(email)) {
      setError(t("Invalid Email"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("Passwords do not match."));
      return;
    }

    if (password.length < 8) {
      setError(t("Password must be at least 8 characters long!"));
      return;
    }
    if (agreeToTerms === false) {
      setError(t("Please check the user agreement option!"));
      return;
    }

    //Find newsLetter options
    let userOptions = [];
    // If the user wants to receive the newsletter
    //console.log(newsletterOptions["allNewsletters"]);
    if (receiveNewsletter) {
      if (newsletterOptions["allNewsletters"] === true) {
        userOptions = Object.keys(newsletterOptions).filter(
          (key) => key !== "allNewsletters"
        );
      } else {
        userOptions = Object.keys(newsletterOptions).filter((key) => {
          return key !== "allNewsletters" && newsletterOptions[key] === true;
        });
      }
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role: role.value,
          newsLetterOptions: userOptions,
        }
      );

      if (data.emailExists) {
        setError(t("Email is already in use."));
        return;
      }

      setError("");
      setSuccess(data.message);
      // eslint-disable-next-line no-unused-vars
      const { message, ...rest } = data;
      // navigate(`/login`);
      // navigate("/success"); // Navigate to the success page
      navigate("/verification", {
        state: { user: data.user },
        replace: true, // prevent user go back to the previous page
      });
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  const handleBack = () => {
    setNextClicked(false); // Set nextClicked to false
    // Navigate back to the previous page (RegistrationForm)
    navigate("/signup");
  };

  return (
    <>
      <div className={SignupCss.bg}>
        {!nextClicked && (
          <div className={SignupCss.form_titleMain}>
            {t("Sign up for KinoKlik")}{" "}
          </div>
        )}

        {/* <div className={SignupCss.form_titleMain}>Sign up for KinoKlik </div> */}

        <div
          className={SignupCss.form}
          // style={{
          //   margin: "2px",
          // }}
        >
          <div className={SignupCss.form_body}>
            {!nextClicked ? (
              <RoleChoice role={role} setRole={setRole} />
            ) : (
              <RegistrationPersonalInfo
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                role={role}
                receiveNewsletter={receiveNewsletter}
                setReceiveNewsletter={setReceiveNewsletter}
                newsletterOptions={newsletterOptions}
                setNewsletterOptions={setNewsletterOptions}
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
              />
            )}

            {nextClicked ? (
              <button onClick={handleSubmit} className={SignupCss.btn}>
                {t("Sign Up")}
              </button>
            ) : null}
            {
              <button
                className={nextClicked ? SignupCss.back : SignupCss.next}
                onClick={() => setNextClicked(!nextClicked)}
              >
                {!nextClicked ? t("Next") : t("Back")}
              </button>
            }

            <div className={SignupCss.form_Message}>
              {!nextClicked ? (
                <p>
                  {t("already signed up?")}{" "}
                  <Link to="/login" className={SignupCss.link}>
                    {t("Login")}
                  </Link>
                </p>
              ) : null}
              {/* Render the success component */}
              {success && <RegistrationSuccess />}
              {/* {success && <div className={SignupCss.error_text}>{success}</div>} */}
              {error && <div className={SignupCss.error_text}>*{error}</div>}
              <br />
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
