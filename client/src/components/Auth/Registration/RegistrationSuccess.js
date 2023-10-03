import React from "react";
import { Link } from "react-router-dom";
import SignupCss from "./signup.module.css";

const RegistrationSuccess = () => {
  return (
    <div className={`flex flex-col justify-center h-screen ${SignupCss.bg}`}>
      <div className="text-center mt-8">
        <h2 className="text-white tw-text-6xl tw-font-semibold">
          Congratulations!
        </h2>
        <h3 className="text-white mt-3 tw-text-3xl tw-font-semibold">
          Your Account has been Created!
        </h3>
      </div>
      <div className="flex-grow"></div>
      <div className="mt-8 text-center">
        <button className={SignupCss.btn}>
          <Link to="/login">Log In</Link>
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
