import React from "react";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../images/icons/plus-solid-white.svg";

export default function NewEpkBtn() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/uploadFepk")}
      className="tw-flex tw-h-12 tw-w-12 tw-flex-col tw-justify-center tw-rounded-lg tw-bg-[#1E0039] tw-p-3 hover:tw-scale-125 md:tw-h-20 md:tw-w-20"
    >
      <div className="tw-flex tw-justify-center">
        <img src={PlusIcon} alt="" className="tw-h-24 tw-w-24" />
      </div>
    </div>
  );
}
