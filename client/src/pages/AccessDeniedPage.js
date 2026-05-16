import React from "react";
import ErrorPage from "./ErrorPage";

export default function AccessDeniedPage() {
  return <ErrorPage code={403} />;
}
