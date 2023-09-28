import React, { useState } from "react";

import style from "./logline.module.css";

function Logline(loglineFile) {
    console.log(loglineFile);

    return (
        <div className={style.container}>
            <div className={style.logline}>
                <div>
                <p >{loglineFile.loglineFile.message}</p>
            </div>
            <div>
            <img 
            src={loglineFile.loglineFile.image}  alt="logline"
            className={style.img}>

            </img>

             </div>
             </div>
         </div>
                  
    );
}
export default Logline;
