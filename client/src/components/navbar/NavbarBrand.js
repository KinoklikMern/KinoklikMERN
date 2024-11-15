import { Link } from "react-router-dom";
import KinoKlikIcon from "../../images/logo.png";
import {isElement} from "react-dom/test-utils";

function NavbarBrand({ isGrayBackground }) {
    return (
        <div className="tw-z-40">
            <Link
                to="/"
                className="tw-flex tw-items-center tw-text-6xl hover:tw-text-white"
            >
                <img
                    src={KinoKlikIcon}
                    alt="KinoKlik Logo"
                    className={`tw-ml-2 tw-mr-10 tw-h-20 ${isGrayBackground ? "tw-filter tw-invert" : ""}`}
                />
            </Link>
        </div>
    );
}

export default NavbarBrand;
