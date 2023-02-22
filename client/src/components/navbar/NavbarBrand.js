import { Link } from "react-router-dom";
import KinoKlikIcon from "../../images/logo.png";

function NavbarBrand() {
  return (
    <div className="">
      <Link to="/" className="tw-flex tw-items-center tw-text-6xl tw-text-white hover:tw-text-white">
        <img src={KinoKlikIcon} alt="KinoKlik Logo" className=" tw-h-20 tw-mr-10"></img>
        KinoKlik
      </Link>
    </div>
  );
}

export default NavbarBrand;
