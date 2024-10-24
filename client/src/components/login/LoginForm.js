import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next'
const loginInfos = {
  email: "",
  password: "",
};
export default function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required(t(("Email address is required.")))
      .email(t(("Must be a valid email.")))
      .max(100),
    password: Yup.string().required(t(("Password is required"))),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
        {t('Facebook helps you connect and share with the people in your life.')}
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder={t("Email address or phone number")}
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder={t("Password")}
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  {t('Log In')}
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            {t('Forgotten password?')}
          </Link>
          <DotLoader color="#1876f2" loading={loading} size={30} />

          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">{t('Create Account')}</button>
        </div>
        <Link to="/" className="sign_extra">
          <b>{t('Create a Page')}</b> {t('for a celebrity, brand or business.')}
        </Link>
      </div>
    </div>
  );
}
