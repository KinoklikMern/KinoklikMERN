import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggle from "../LanguageToggle";

function NavbarMenu({ toggle, setToggle }) {
  const { t } = useTranslation();

  const handleItemClick = () => {
    setToggle(false);
  };

  return (
    <div
      className={`${
        toggle ? "" : "tw-hidden"
      } mobile-menu tw-mx-auto tw-max-w-xl tw-space-y-4 tw-self-center tw-px-5 tw-pt-5 tw-text-center tw-transition tw-ease-in-out md:tw-hidden`}
    >
      <Link
        to="/login"
        className='tw-block tw-w-full tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-py-2 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400'
        onClick={handleItemClick}
      >
        {t("SIGN IN")}
      </Link>

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
