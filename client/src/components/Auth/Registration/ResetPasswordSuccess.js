import React, { useState, setState } from "react";
import successchanged from "../../../images/icons/success-reset.png";
import Logincss from "./login.module.css";

export default function ResetPasswordSuccess(props) {
  const emailAddress = props.EmailAddress;
  //   let { email } = useParams();
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
          Password Changed!
        </div>

        <div className={Logincss.form}>
          <div className={Logincss.form_Message}>
            <p>Your password has been changed successfully.</p>
            <br />

            <br />
          </div>
        </div>
      </div>
    </>
  );
}
