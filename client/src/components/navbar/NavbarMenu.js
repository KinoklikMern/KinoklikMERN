import Login from "../Auth/Registration/login";
import Register from "../Auth/Registration/register";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

function NavbarMenu({ toggle }) {
  const { t } = useTranslation();
  return (
    <div
      className={`${
        toggle ? "" : "tw-hidden"
      } mobile-menu tw-mx-auto tw-max-w-xl tw-space-y-4 tw-self-center tw-text-center tw-transition tw-ease-in-out md:tw-hidden`}
    >
      <button className=' tw-block tw-w-full tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg tw-transition hover:tw-text-gray-400'>
        <Login spanText={t('SIGN IN')} />
      </button>
      <button className='tw-block tw-w-full tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400'>
        <Register spanText={t('SIGN UP')} />
      </button>
      <Link
        to='/uploadFepk'
        className='tw-block tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400'
      >
        {t('CREATE EPK')}
      </Link>
    </div>
  );
}

export default NavbarMenu;
