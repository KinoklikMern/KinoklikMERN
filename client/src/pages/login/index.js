import "./style.css";
import LoginForm from "../../Auth/Registration/LoginForm"; 
import RegisterForm from "../../Auth/Registration/Registration";

export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}
