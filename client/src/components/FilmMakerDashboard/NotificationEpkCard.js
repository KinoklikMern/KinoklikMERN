import React, { useState } from "react";
import movieSample1 from "../../images/movies/movie8.jpg";
import movieSample2 from "../../images/movies/movie7.jpg";
import movieSample3 from "../../images/movies/movie5.jpg";

export default function NotificationEpkCard(props) {
  const epkInfo = props.epkInfo;
  const BANNER_IMG = `${process.env.REACT_APP_AWS_URL}/${epkInfo.banner_url}`;
  return (
    <>
      <img
        className="tw-h-full tw-w-full"
        src={BANNER_IMG}
        alt=""
      />
    </>
  );
}
