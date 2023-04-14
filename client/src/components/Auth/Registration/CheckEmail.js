import React, { useState, setState } from "react";
import successemail from "../../../images/icons/success-email.png";
import Logincss from "./login.module.css";

export default function CheckEmail(props) {
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
          Check Your Email
        </div>

        <div className={Logincss.form}>
          <div className={Logincss.formbody}>
            <p>
              Please check the email address
              <br />
              {emailAddress} for instructions to reset
              <br /> your password.
            </p>
            <br />

            <br />
          </div>
        </div>
      </div>
    </>
  );
}
