import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const ERROR_CONFIG = {
  403: {
    title: "Access denied",
    message: "Sorry, you need to sign in to get access to this page.",
    primaryAction: { label: "Sign in", to: "/login" },
    secondaryAction: { label: "Go back home", to: "/" },
  },
  404: {
    title: "Page not found",
    message: "Sorry, we couldn't find the page you're looking for.",
    primaryAction: { label: "Go back home", to: "/" },
  },
  500: {
    title: "Something went wrong",
    message: "Sorry, an unexpected error occurred on our end.",
    primaryAction: { label: "Go back home", to: "/" },
  },
};

export default function ErrorPage({ code = 404, title, message }) {
  const { t } = useTranslation();
  const config = ERROR_CONFIG[code] ?? ERROR_CONFIG[500];
  const resolvedTitle = title ?? config.title;
  const resolvedMessage = message ?? config.message;

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-b tw-from-[#4b1a77] tw-to-[#1f0439] tw-flex tw-flex-col">
      <Navbar className="tw-bg-gradient-to-b tw-from-[#4b1a77] tw-to-[#1f0439]" />
      <div className="tw-flex-1 tw-grid tw-place-items-center tw-px-6 tw-py-24 sm:tw-py-32 lg:tw-px-8">
        <div className="tw-text-center">
          <p className="tw-text-base tw-font-semibold tw-text-purple-300">{code}</p>
          <h1 className="tw-mt-4 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-white sm:tw-text-5xl">
            {t(resolvedTitle)}
          </h1>
          <p className="tw-mt-6 tw-text-base tw-leading-7 tw-text-purple-200">
            {t(resolvedMessage)}
          </p>
          <div className="tw-mt-10 tw-flex tw-items-center tw-justify-center tw-gap-x-6">
            <Link
              to={config.primaryAction.to}
              className="tw-rounded-md tw-bg-white tw-px-3.5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-[#4b1a77] tw-shadow-sm hover:tw-bg-purple-100 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-white"
            >
              {t(config.primaryAction.label)}
            </Link>
            {config.secondaryAction && (
              <Link to={config.secondaryAction.to} className="tw-text-sm tw-font-semibold tw-text-white hover:tw-text-purple-200">
                {t(config.secondaryAction.label)} <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
