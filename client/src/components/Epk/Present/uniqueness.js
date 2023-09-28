import React, { useState } from "react";

import style from"./uniqueness.module.css";

function Uniqueness(uniquenessFile) {
  console.log(uniquenessFile);

  return (


    <div  className={style.container} >
      
      <div >
         <p className={style.title}>
            {uniquenessFile.uniquenessFile.uniqueness1Title}
         </p>
          </div>

        <div className={style.uniqueContainer}>
          <div>
          <img 
            src={uniquenessFile.uniquenessFile.uniqueness1Img_url} alt="uniqueness"
            className={style.img}
            />
        </div>
        <div >
            <p className={style.text}>          
            {uniquenessFile.uniquenessFile.uniqueness1Description}
            </p>
          </div>
        </div>
      </div>
    
     

     
    

   );
}
export default Uniqueness;
