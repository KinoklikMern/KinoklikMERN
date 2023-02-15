import KinoKlikIcon from "../../images/logo.png";

function NavbarBrand() {
  return (
    <div className="">
      <a href="#" className="tw-flex tw-items-center tw-text-6xl tw-text-white">
        <img src={KinoKlikIcon} alt="KinoKlik Logo" className=" tw-h-20"></img>
        KinoKlik
      </a>
    </div>
  );
}

export default NavbarBrand;
