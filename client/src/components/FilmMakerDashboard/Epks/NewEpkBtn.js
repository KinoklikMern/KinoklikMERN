import React from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../images/icons/plus-solid-white.svg";


export default function NewEpkBtn() {
const navigate = useNavigate();
  return (
    <div onClick={()=>navigate("/uploadFepk")} className="tw-flex tw-w-12 tw-h-12 md:tw-w-20 md:tw-h-20 tw-flex-col tw-justify-center tw-rounded-lg tw-bg-[#1E0039] tw-p-3 hover:tw-scale-125">
      <div className="tw-flex tw-justify-center">
        <img
          src={PlusIcon}
          className="tw-w-24 tw-h-24"
        />
      </div>
    </div>
  );
}
