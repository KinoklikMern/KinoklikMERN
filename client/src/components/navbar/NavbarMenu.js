import Login from "../Auth/Registration/login";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggle from "../LanguageToggle";

function NavbarMenu({ toggle, setToggle }) {
  const { t } = useTranslation();

  const handleItemClick = () => {
    setToggle(false);
  };

  const handleSignInClick = () => {
    setToggle(false);
    window.location.href = "/login";
  };

  return (
    <div
      className={`${
        toggle ? "" : "tw-hidden"
      } mobile-menu tw-mx-auto tw-max-w-xl tw-space-y-4 tw-self-center tw-px-5 tw-pt-5 tw-text-center tw-transition tw-ease-in-out md:tw-hidden`}
    >
      <button
        className='tw-block tw-w-full tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg tw-transition hover:tw-text-gray-400'
        onClick={handleSignInClick}
      >
        <Login spanText={t("SIGN IN")} />
      </button>
      <Link
        to='/signup'
        className='tw-block tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400'
        onClick={handleItemClick}
      >
        {t("CREATE EPK")}
      </Link>
      <LanguageToggle />
    </div>
  );
}

export default NavbarMenu;
