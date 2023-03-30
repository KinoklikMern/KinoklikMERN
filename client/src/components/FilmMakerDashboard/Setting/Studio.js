import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Studio() {
  const { user } = useSelector((user) => ({ ...user }));
  const [disabled, setDisabled] = useState(true);
  return (
    <form className="tw-h-full">
      <div className="tw-grid tw-grid-cols-4 tw-gap-2 tw-py-4 tw-h-full">
        <div className="tw-col-start-2 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center">
          <input
            placeholder="Studio Name"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            placeholder="Studio Website"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            placeholder="Studio Email"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            placeholder="Phone"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            placeholder="City"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            placeholder="Province"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            placeholder="Country"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
        </div>
        <div className="tw-col-start-4 tw-place-self-end tw-px-12">
          {disabled === true ? (
            <button
              disabled
              className="tw-rounded-full tw-py-2 tw-px-8 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-border-slate-200 disabled:tw-shadow-none"
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
