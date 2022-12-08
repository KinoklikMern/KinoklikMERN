import React, { useState } from "react";

import "./synopsis.css";

function Synopsis(synopsFile) {
  console.log(synopsFile);

  return (
    <>
      <div style={{
        justifyContent: 'center',
        alignItems: 'center'}}>
      <h2 class="capitalize-me" style={{backgroundColor: "#170B3B", height: 40}}>{synopsFile.synopsFile.type} Synopsis</h2>  
        <img
          src={synopsFile.synopsFile.image}
          alt="hey"
          style={{ width: "100%", borderRadius: "35px" }}
        />
          <h3 className="centered">{synopsFile.synopsFile.text}</h3>

      </div>
    </>
  );
}
export default Synopsis;