import React, { useState } from "react";

import "./synopsis.css";

function Synopsis(synopsFile) {
  console.log(synopsFile);

  return (
    <div className="container">
      <img
        src={synopsFile.synopsFile.image}
        alt="hey"
        style={{ height: "100%" }}
      />
      <div className="centered">
        <h3>{synopsFile.synopsFile.text}</h3>
      </div>
    </div>
  );
}
export default Synopsis;
