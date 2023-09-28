import React from "react";
export default function AccessDeniedPage() {
  return (
    <div className="tw-grid tw-min-h-full tw-place-items-center tw-bg-white tw-px-6 tw-py-24 sm:tw-py-32 lg:tw-px-8">
      <div className="tw-text-center">
        <p className="tw-text-base tw-font-semibold tw-text-indigo-600">403</p>
        <h1 className="tw-mt-4 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-5xl">
          Access denied
        </h1>
        <p className="tw-mt-6 tw-text-base tw-leading-7 tw-text-gray-600">
          Sorry, you need to sign in to get access to this page.
        </p>
        <div className="tw-mt-10 tw-flex tw-items-center tw-justify-center tw-gap-x-6">
          <a
            href="/login"
            className="tw-rounded-md tw-bg-indigo-600 tw-px-3.5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-white tw-shadow-sm hover:tw-bg-indigo-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-indigo-600"
          >
            Sign in
          </a>
          <a href="/" className="tw-text-sm tw-font-semibold tw-text-gray-900">
            Go back home <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
