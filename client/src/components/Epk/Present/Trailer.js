import React, { useState } from "react";
import style from "./Trailer.module.css";
import trailer from"./movie2.jpeg";

function Trailer() {

    return (
        <div className={style.container}>
            
         
            <img 
                src={trailer}  
                alt="poster"  
                className={style.img}      
                />
            <p className={style.text}>Text text text...</p>

        </div>
        
    )

}

export default Trailer;