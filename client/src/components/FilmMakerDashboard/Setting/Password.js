import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Password() {
  
  return (
    <form>
      <div className="tw-grid tw-grid-cols-4 tw-gap-2 tw-py-4 ">
        <div className="tw-col-start-3 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center ">
          <div className="tw-flex tw-gap-4">
            <input
              placeholder="New Password"
              type="password"
              className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-gray-300 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
            />

            <span className="tw-self-center">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="tw-self-center">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>

          <div className="tw-flex tw-gap-4">
            <input
              placeholder="Confirm New Password"
              type="password"
              className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-gray-300 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
            />

            <span className="tw-self-center">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="tw-self-center">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
