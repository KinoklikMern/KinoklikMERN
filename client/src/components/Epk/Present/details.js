import React, { useState } from "react";

import style from "./details.module.css";

function Details(detailsFile) {
    // console.log(detailsFile);

    return (
      <div className={style.container}>
   
      <div className={style.detailContainer}> 
            <div className={style.el1}>
              <img 
                src={detailsFile.detailsFile.image}  alt="poster"
                className={style.img}
                ></img>
            </div>
            <div className={style.el2}>
                <p>
                  Directed by: {detailsFile.detailsFile.director}
                </p>
               
                <p>
                  Produced by: {detailsFile.detailsFile.producer}
                </p>
             
                <p >
                  Writer: {detailsFile.detailsFile.writer}
                </p>
                
                <p>
                  Cinematographer: {detailsFile.detailsFile.cinematographer}
                </p>
               
                <p >
                  Editor: {detailsFile.detailsFile.editor}
                </p>
           
                <p >
                  Sound: {detailsFile.detailsFile.sound}
                </p>
              
                <p >
                  Studio: {detailsFile.detailsFile.productionCo}
                </p>
                
                <p >
                  Distributed by: {detailsFile.detailsFile.distributionCo}
                </p>
            </div>

            <div className={style.el3}>
              <p>
                Starring:
              </p>
                
                <p>
                  {detailsFile.detailsFile.leadActor1}
                </p>
                
                <p >
                  {detailsFile.detailsFile.leadActor2}
                </p>
               
                <p>
                  {detailsFile.detailsFile.supportingActor1}
                </p>
                
                <p>
                  {detailsFile.detailsFile.supportingActor2}
                  <br/><br/>
                </p>
               
                <p className={style.bottom}>
                  Production Year: {detailsFile.detailsFile.productionYear}
                </p>
                
                <p className={style.bottom}>
                  Duration: {detailsFile.detailsFile.durationMin} Minutes
                </p>
            </div>
          </div>
          </div>
         
        
     
   );
}
export default Details;
