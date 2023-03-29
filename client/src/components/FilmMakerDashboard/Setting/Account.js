import React from "react";

export default function Account() {
  return (
    <form>
      <div className="tw-grid tw-grid-cols-4 tw-gap-2 tw-py-4 ">
        <div className="tw-mt-8 tw-col-start-4 tw-flex tw-flex-col tw-justify-self-center">
          <input
            placeholder="Account Type"
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <button
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          >
            Delete Account
          </button>
          <button
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          >
            Confirm Delete Account
          </button>
        </div>
      </div>
    </form>
  );
}
