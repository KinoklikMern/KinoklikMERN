import React from "react";
import { Link } from "react-router-dom";
import SuccessCss from "./success.module.css";
import { useTranslation } from 'react-i18next';

const RegistrationSuccess = () => {
  // const { state } = useLocation();
  // const user = state?.user;

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) navigate("/");
  // }, [navigate, user]);
  const { t } = useTranslation();

  return (
    <div className={`tw-flex tw-flex-col tw-justify-center ${SuccessCss.bg}`}>
      <div className="tw-text-center">
        <h2 className="tw-text-8xl tw-font-semibold tw-text-white">
          {t('Congratulations!')}
        </h2>
        <h3 className="mt-3 tw-text-5xl tw-font-semibold tw-text-white">
          {t('Your account has been verified!')}
        </h3>
      </div>
      {/* <div className="flex-grow"></div> */}
      <div className="text-center tw-mt-20">
        <button className={SuccessCss.btn}>
          <Link to="/login">{t('Log In')}</Link>
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
