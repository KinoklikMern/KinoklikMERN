import React, { useState } from "react";
import axios from "axios";
import SignupCss from "./signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RegistrationSuccess from "./RegistrationSuccess";
import { useTranslation } from "react-i18next";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Filmmaker");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  //individual registration form
  const options = [
    {
      label: t("Filmmaker"),
      value: "Filmmaker",
    },
    {
      label: t("Actor"),
      value: "Actor",
    },
    {
      label: t("Distributor"),
      value: "Distributor",
    },
    {
      label: t("Sales_Agent"),
      value: "Sales Agent",
    },
    {
      label: t("Film_Festival"),
      value: "Film Festival",
    },
    {
      label: t("Investor"),
      value: "Investor",
    },
    {
      label: t("Viewer"),
      value: "Viewer",
    },
    {
      label: t("Producer"),
      value: "Producer",
    },
    {
      label: t("Cinematographer"),
      value: "Cinematographer",
    },
    {
      label: t("Editor"),
      value: "Editor",
    },
    {
      label: t("Writer"),
      value: "Writer",
    },
    {
      label: t("Director"),
      value: "Director",
    },
    {
      label: t("Sound"),
      value: "Sound",
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
  };

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

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role: role,
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

  return (
    <>
      <div className={SignupCss.bg}>
        <div className={SignupCss.form_title}>{t("Sign up for KinoKlik")}</div>
        <div
          className={SignupCss.form}
          style={{
            margin: "20px",
          }}
        >
          <div className={SignupCss.form_body}>
            <div className={SignupCss.form_input1}>
              <div className={SignupCss.form_input1}>
                {options.map((option) => (
                  <button
                    key={option.value}
                    className={`${SignupCss.btn1} ${
                      role === option.value ? SignupCss.selected : ""
                    }`}
                    value={option.value}
                    onClick={(e) => setRole(e.target.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <br />
            <div className={SignupCss.form_input}>
              {/* <label className="form__label">First Name </label> */}
              <input
                className={SignupCss.form_input}
                type='text'
                value={firstName}
                onChange={(e) => handleInputChange(e)}
                id='firstName'
                placeholder={t("First Name")}
              />
            </div>
            <div className={SignupCss.form_input}>
              {/* <label className="form__label">Last Name </label> */}
              <input
                className={SignupCss.form_input}
                type='text'
                value={lastName}
                onChange={(e) => handleInputChange(e)}
                id='lastName'
                placeholder={t("LastName")}
              />
            </div>
            <div className={SignupCss.form_input}>
              {/* <label className="form__label">Email </label> */}
              <input
                className={SignupCss.form_input}
                type='text'
                id='email'
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
                type='password'
                id='password'
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
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => handleInputChange(e)}
                placeholder={t("Confirm Password")}
              />
            </div>
          </div>
          <div className={SignupCss.form_Message}>
            <button>{t("Next")}</button>
            <p>
              {t("already signed up?")}{" "}
              <Link to='/login' className={SignupCss.link}>
                {t("Login")}
              </Link>
            </p>
            {/* Render the success component */}
            {success && <RegistrationSuccess />}
            {/* {success && <div className={SignupCss.error_text}>{success}</div>} */}
            {error && <div className={SignupCss.error_text}>*{error}</div>}
            <br />
            <button
              onClick={() => handleSubmit()}
              type='submit'
              className={SignupCss.btn}
            >
              {t("Sign Up")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
