import Login from "../Auth/Registration/login";
import Register from "../Auth/Registration/register";

import { Link, NavLink, useNavigate } from "react-router-dom";

function NavbarMenu({ toggle }) {
  return (
    <div
      className={`${
        toggle ? "" : "tw-hidden"
      } mobile-menu tw-mx-auto tw-max-w-xl tw-space-y-4 tw-self-center tw-text-center tw-transition tw-ease-in-out md:tw-hidden`}
    >
      <button className=" tw-w-full tw-block tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg tw-transition hover:tw-text-gray-400">
        <Login spanText="SIGN IN" />
      </button>
      <button className="tw-w-full tw-block tw-rounded-full tw-border-2 tw-bg-[#1e0039] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400">
        <Register spanText="SIGN UP" />
      </button>
      <Link
        to="/uploadFepk"
        className="tw-block tw-rounded-full tw-border-2 tw-bg-[#712cb0] tw-px-4 tw-text-white tw-drop-shadow-lg hover:tw-text-gray-400"
      >
        CREATE EPK
      </Link>
    </div>
  );
}

export default NavbarMenu;
