import React, { useState } from "react";

import "./logline.css";

function Logline(loglineFile) {
    console.log(loglineFile);

    return (
        <div style={{position: "relative"}}>
        {/* <div style={{backgroundColor: "#170B3B", height: 15}}/> */}
            <div >
            {/* Dark Blue: #170B3B Burgundy: #630330*/}
                <div className="row" style={{background: "#FFFFFF"}}>
                    <div className="col-sm m-4">
                        <div >
                            <h2 style={{ position: "relative", width: "800px", color:'#000000', fontWeight: 'bold',  marginTop: "50px", left: "50%",
                                transform: "translate(-50%, -50%)"}}>
                                {loglineFile.loglineFile.message}
                            </h2>
                        <img 
                            src={loglineFile.loglineFile.image}  alt="Image"
                            style={{width: "75%", borderRadius: "30px"}}
                        ></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Logline;
