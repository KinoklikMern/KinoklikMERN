import { stepLabelClasses } from "@mui/material";
import React, { useState } from "react";

import style from"./cast.module.css";

function Cast(castFile) {
  console.log(castFile);

  return (
    <div className={style.container}>
     

      <div className={style.title}>
      <p >Starring</p>
      </div>

      <div className={style.starcontainer}>
        <div className={style.el1}>
          <img 
            src={castFile.castFile.leadActor1Img_url} alt="actor pic"
            className={style.img}
            ></img>
          <h1 >
            {castFile.castFile.leadActor1Name}
          </h1>
        </div>
        
          <div className={style.el2}>
            <p className={style.biography}>          
            {castFile.castFile.leadActor1Biography}
            </p>  
        </div>
    
      <div className={style.el3}>
            <p className={style.biography}>          
              {castFile.castFile.leadActor2Biography}
            </p>
          </div>
        
        <div className={style.el4}>
          <img 
            src={castFile.castFile.leadActor2Img_url} 
            alt="actorpic"
            className={style.img}  
          />
          <h1>
            {castFile.castFile.leadActor2Name}
          </h1>
        </div>
     
        <div className={style.el5}>
          <img 
            src={castFile.castFile.supportingActor1Img_url} 
            alt="actorpic" 
            className={style.img}
          />
          <h1>
              {castFile.castFile.supportingActor1Name}
            </h1>
        </div>

        <div className={style.el6}>
            <p className={style.biography}>          
              {castFile.castFile.supportingActor1Biography}
            </p>
          </div>
        
    
      <div clasName={style.el7}>
            <p className={style.biography}>
              {castFile.castFile.supportingActor2Biography}
            </p>
          </div>
        
        <div className={style.el8}>
          <img 
            src={castFile.castFile.supportingActor2Img_url} 
            alt="actor pics"
            className={style.img}
          
          />
         
          <h1 >
            {castFile.castFile.supportingActor2Name}
          </h1>
        </div>
      
      </div>
    </div>

   );
}
export default Cast;
