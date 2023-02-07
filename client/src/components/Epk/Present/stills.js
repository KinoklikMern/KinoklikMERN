import React, { useState } from "react";

import style from "./stills.module.css";

function Stills(stillsFile) {
  console.log(stillsFile);

  return (
<div className={style.container}>

<div className={style.stillcontainer}>
  
        <div className={style.el1}> 
          <img  
            src={stillsFile.stillsFile.stills1Img_url} 
            alt="still pic"
            className={style.img1}
            />
        </div>
        <div className={style.el2}>
          <img 
            src={stillsFile.stillsFile.stills2Img_url} 
            alt="still pic"
            className={style.img2}

          />
        </div>
      
      
        <div className={style.el3}>
          <img 
            src={stillsFile.stillsFile.stills3Img_url} 
            alt="still pic"
            className={style.img3}
          ></img>
        </div>
        <div className={style.el4}>
          <img 
            src={stillsFile.stillsFile.stills4Img_url} 
            alt="still pics"
            className={style.img4}
          />
        </div>
    
      </div>
      </div> 
      
      
    

   );
}
export default Stills;
