import React from "react";
import { useSelector } from "react-redux";
import FepkCoverForm from "../components/Epk/Input/fepkCoverForm";
import LoginForm from "../components/Auth/Registration/loginform";

function FepkUploadDashboard() {
  // fetching user
  const user = useSelector((state) => state.user);
  let filmmaker_role;
  if (!user) {
    filmmaker_role = "noUser";
  } else {
    filmmaker_role = user.role;
  }
  const access = filmmaker_role === "Filmmaker";

  return (
    <>
      {access === true ? (
        <div>
          <br />
          <FepkCoverForm />
          <br />
        </div>
      ) : (
        <div>
          {/* <FepkDashboardNoAccess /> */}
          <LoginForm />
        </div>
      )}
    </>
  );
}

export default FepkUploadDashboard;
