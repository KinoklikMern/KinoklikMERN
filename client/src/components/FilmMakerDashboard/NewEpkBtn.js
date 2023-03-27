import React from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../images/icons/plus-solid.svg";


export default function NewEpkBtn() {
const navigate = useNavigate();
  return (
    <div onClick={()=>navigate("/uploadFepk")} className="tw-flex tw-w-20 md:tw-w-80 tw-flex-col tw-justify-center tw-rounded-lg tw-bg-[#fff] tw-p-3 hover:tw-scale-125">
      <div className="tw-flex tw-justify-center">
        <img
          src={PlusIcon}
          className="tw-w-12 tw-h-12"
          // style={{ width: 60, height: 60}}
        />
      </div>
      <span className="tw-flex tw-justify-center tw-invisible tw-h-0 md:tw-h-auto md:tw-visible ">Create new film EPK!</span>
    </div>
  );
}
