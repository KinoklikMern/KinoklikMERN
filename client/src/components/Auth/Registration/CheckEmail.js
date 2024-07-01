import React from 'react';
import successemail from '../../../images/icons/success-email.png';
import Logincss from './login.module.css';
import { useTranslation } from 'react-i18next';

export default function CheckEmail(props) {
  const { t } = useTranslation();
  const emailAddress = props.EmailAddress;
  //   let { email } = useParams();
  return (
    <>
      <div className={Logincss.bg}>
        <div className={Logincss.form_title}>
          <div className="container">
            <img
              src={successemail}
              alt="success-email"
              style={{ width: 100, height: 100 }}
            />
          </div>
          {t('Check Your Email')}
        </div>

        <div className={Logincss.form}>
          <div className={Logincss.form_Message}>
            <p>
              {t('Please check the email address')}
              <br />
              <span className={Logincss.link}>{emailAddress}</span>
              <br />
              {t('for instructions to reset your password.')}
            </p>
            <br />

            <br />
          </div>
        </div>
      </div>
    </>
  );
}
