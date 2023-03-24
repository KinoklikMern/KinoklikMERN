import { Link } from "react-router-dom";
import KinoKlikIcon from "../../images/logo.png";

function NavbarBrand(props) {
  return (
    <div className="">
      <Link
        to="/"
        className="tw-flex tw-items-center tw-text-6xl tw-text-white hover:tw-text-white"
      >
        <img
          src={KinoKlikIcon}
          alt="KinoKlik Logo"
          className=" tw-mr-10 tw-h-20"
        ></img>
        {/* {props?.title} */}
      </Link>
    </div>
  );
}

export default NavbarBrand;
