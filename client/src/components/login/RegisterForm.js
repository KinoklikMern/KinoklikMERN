import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInfos);
  const { firstName, lastName, email, password } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required(t("What's your First name ?"))
      .min(2, t("First name must be between 2 and 16 characters."))
      .max(16, t("First name must be between 2 and 16 characters."))
      .matches(
        /^[aA-zZ]+$/,
        t("Numbers and special characters are not allowed.")
      ),
    lastName: Yup.string()
      .required(t("What's your Last name ?"))
      .min(2, t("Last name must be between 2 and 16 characters."))
      .max(16, t("Last name must be between 2 and 16 characters."))
      .matches(
        /^[aA-zZ]+$/,
        t("Numbers and special characters are not allowed.")
      ),
    email: Yup.string()
      .required(
        t(
          "You'll need this when you log in and if you ever need to reset your password."
        )
      )
      .email(t("Enter a valid email address.")),
    password: Yup.string()
      .required(
        t(
          "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
        )
      )
      .min(6, t("Password must be atleast 6 characters."))
      .max(36, t("Password can't be more than 36 characters")),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon'></i>
          <span>{t("Sign Up")}</span>
          <span>{t("it's quick and easy")}</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            email,
            password,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            registerSubmit();
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder={t("First name")}
                  name='firstName'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder={t("Surname")}
                  name='lastName'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder={t("email address")}
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder={t("New password")}
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  {"Gender"} <i className='info_icon'></i>
                </div>
              </div>
              <div className='reg_infos'>
                {t("By clicking Sign Up, you agree to our")}{" "}
                <span>{t("Terms, Data Policy")} &nbsp;</span>
                {t("and")} <span>{t("Cookie Policy.")}</span>{" "}
                {t("You may receive SMS notifications from us")}
                {t("and can opt out at any time.")}
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>{"Sign Up"}</button>
              </div>
              <DotLoader color='#1876f2' loading={loading} size={30} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
