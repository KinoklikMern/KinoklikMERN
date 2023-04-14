import CheckEmail from "../../components/Auth/Registration/CheckEmail";
import { useParams } from "react-router-dom";
export default function CheckEmailPage() {
  let { email } = useParams();
  return (
    <div>
      <CheckEmail EmailAddress={email} />
    </div>
  );
}
