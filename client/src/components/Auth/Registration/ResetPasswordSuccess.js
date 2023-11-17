import React from "react";
import successchanged from "../../../images/icons/success-reset.png";
import Logincss from "./login.module.css";
import { useTranslation } from 'react-i18next';

export default function ResetPasswordSuccess(props) {
  //   let { email } = useParams();
  const { t } = useTranslation();

  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>
          <div className="container">
            <img
              src={successchanged}
              alt="success"
              style={{ width: 100, height: 100 }}
            />
          </div>
          {t('Password Changed!')}
        </div>

        <div className={Logincss.form}>
          <div className={Logincss.form_Message}>
            <p> {t('Your password has been changed successfully.')}</p>
            <br />

            <br />
          </div>
        </div>
      </div>
    </>
  );
}
