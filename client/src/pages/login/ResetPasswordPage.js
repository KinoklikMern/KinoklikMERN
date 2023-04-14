import ResetPassword from "../../components/Auth/Registration/ResetPassword";
import { useLocation } from "react-router-dom";

export default function ResetPasswordPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  return (
    <div className="login">
      <div className="login_wrapper">
        <ResetPassword token={token} userId={id} />
      </div>
    </div>
  );
}
