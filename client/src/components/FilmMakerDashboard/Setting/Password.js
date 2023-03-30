import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Password() {
  const { user } = useSelector((user) => ({ ...user }));
  const [disabled, setDisabled] = useState(true);
  const [pwdShow, setPwdShow] = useState(false);
  const [rePwdShow, setRePwdShow] = useState(false);
  return (
    <form className="tw-h-full">
      <div className="tw-grid tw-h-full tw-grid-cols-4 tw-gap-2 tw-py-4">
        <div className="tw-col-start-3 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center ">
          <div className="tw-flex tw-gap-2">
            <input
              placeholder="New Password"
              type={pwdShow ? "text" : "password"}
              className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-gray-300 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 placeholder:tw-text-sm"
            />

            <span
              className="tw-w-1/6 tw-self-center"
              onClick={() => {
                setPwdShow(!pwdShow);
              }}
            >
              <FontAwesomeIcon icon={pwdShow ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="tw-flex tw-gap-2">
            <input
              placeholder="Confirm New Password"
              type={rePwdShow ? "text" : "password"}
              className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-gray-300 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 placeholder:tw-text-sm "
            />

            <span
              className="tw-w-1/6 tw-self-center"
              onClick={() => {
                setRePwdShow(!rePwdShow);
              }}
            >
              <FontAwesomeIcon icon={rePwdShow ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <div className="tw-col-start-4 tw-place-self-end tw-px-12">
          {disabled === true ? (
            <button
              disabled
              className="tw-rounded-full tw-py-2 tw-px-8 disabled:tw-border-slate-200 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-shadow-none"
            >
              Save
            </button>
          ) : (
            <button
              className="tw-rounded-full tw-py-2 tw-px-8 tw-text-[#1E0039] tw-shadow-md tw-shadow-[#1E0039]/50"
              // onClick={() => saveUserProfile()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
