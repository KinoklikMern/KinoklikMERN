import React from "react";

import LoginForm from "./LoginForm";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
   const { isLoggedIn, role, login } = React.useContext(AuthContext);
// const isLoggedIn= true; // 
// const role ="admin";//
// const login =true;//
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get("username"), data.get("password"));
  };

  if (role === "admin") {
    navigate("/admin", { replace: true });
  } else if (isLoggedIn) {
    // navigate("/userdashboard", { replace: true });
    navigate("/home", { replace: true });
  }
  return <LoginForm handleSubmit={handleSubmit} />;
}

export default Login;