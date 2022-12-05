import React, { useState } from "react";

import "./director.css";

function Director(directorFile) {
    console.log(directorFile);

    return (
        <div className="container">
            <img
                src={directorFile.directorFile.image}
                alt="hey"
                style={{ height: "50%" }}
            />
            <div className="centered">
                <h3>{directorFile.directorFile.text}</h3>
            </div>
        </div>
    );
}
export default Director;
