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

  const [role, setRole] = useState({
    label: "An amazing and talented visionary filmmaker",
    value: "Filmmaker",
    image: filmmakerIcon,
  });

  useEffect(() => {
    // Clear the error message when nextClicked changes
    setError("");
  }, [nextClicked]);

  const handleSubmit = async () => {
    console.log(firstName, lastName, email, password, confirmPassword, role);

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
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail.test(email)) {
      setError("Invalid Email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
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
        }
      );

      if (data.emailExists) {
        setError("Email is already in use.");
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

  return (
    <>
      <div className={SignupCss.bg}>
        <div className={SignupCss.form_titleMain}>Sign up for KinoKlik </div>
        <div
          className={SignupCss.form}
          style={{
            margin: "20px",
          }}
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
              />
            )}
            <button
              className={SignupCss.next}
              onClick={() => setNextClicked(!nextClicked)}
            >
              {!nextClicked ? "Next" : "Back"}
            </button>
            <div className={SignupCss.form_Message}>
              <p>
                already signed up?{" "}
                <Link to="/login" className={SignupCss.link}>
                  Login
                </Link>
              </p>
              {/* Render the success component */}
              {success && <RegistrationSuccess />}
              {/* {success && <div className={SignupCss.error_text}>{success}</div>} */}
              {error && <div className={SignupCss.error_text}>*{error}</div>}
              <br />
              {nextClicked ? (
                <button
                  onClick={() => handleSubmit()}
                  type="submit"
                  className={SignupCss.btn}
                >
                  Sign Up
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
