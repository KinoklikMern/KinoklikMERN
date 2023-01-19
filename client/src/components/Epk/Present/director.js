import React, { useState } from "react";

import style from"./director.module.css";

function Director(directorFile) {
    console.log(directorFile);

    return (
     
          <div className={style.container}>
            <div className={style.directorcontainer}>
              <div className={style.el1}>
              <img 
                src={directorFile.directorFile.image}  alt="director pic"
                className={style.img}
                />
              <h1>
                {directorFile.directorFile.name}
              </h1>
            </div>
            <div className={style.el2}>
             <h1 >Director</h1>
             <p>
                  {directorFile.directorFile.header}
             </p>
                <br/>
                <p>          
                  {directorFile.directorFile.biography}
                </p>
              </div>
            </div>
          </div>
       
      
   );
}
export default Director;