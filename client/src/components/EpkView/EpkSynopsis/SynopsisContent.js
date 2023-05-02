import React from "react";
import RequestButton from "../miscellaneous/RequestButton";

export default function SynopsisContent({ name, image, text }) {
  return (
    <div>
      <img src={image} />
      <span>{text}</span>
      {name != "short" && <RequestButton />}
    </div>
  );
}
