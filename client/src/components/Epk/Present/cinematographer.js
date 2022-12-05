import React, { useState } from "react";

import "./cinematographer.css";

function Cinematographer(cinematographerFile) {
    console.log(cinematographerFile);

    return (
        <div className="container">
            <img
                src={cinematographerFile.cinematographerFile.image}
                alt="hey"
                style={{ height: "50%" }}
            />
            <div className="centered">
                <h3>{cinematographerFile.cinematographerFile.text}</h3>
            </div>
        </div>
    );
}
export default Cinematographer;
