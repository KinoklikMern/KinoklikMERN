import React, { useState } from "react";

import "./uniqueness.css";

function Uniqueness(uniquenessFile) {
  console.log(uniquenessFile);

  return (


    <div style={{position: "relative"}}>

<br/>
      <div style={{backgroundColor: "#170B3B", height: 15}}/>

      {/* <h1 style={{color: "#4a3759", fontWeight: "normal"}}>Uniqueness</h1> */}
      {/* Uniqueness 1 */}
      <div className="row">

          <h1 className= "text-center" style={{color: "#000000", fontWeight: "normal"}}>
            {uniquenessFile.uniquenessFile.uniqueness1Title}
          </h1>
        <div className="col-sm m-4">
          <img 
            src={uniquenessFile.uniquenessFile.uniqueness1Img_url} alt="Image"
            style={{width: "75%", borderRadius: "20px"}}
            ></img>
        </div>
        <div className="col-sm">
          <div style={{margin: 0, position: "relative", top: "15%"}}>
          <br/>
            <br/>
            <h2 className="text-center mx-4" style={{color: "#000000", fontWeight: 'normal'}}>          
            {uniquenessFile.uniquenessFile.uniqueness1Description}
            </h2>
          </div>
        </div>
      </div>
    
      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Uniqueness 2 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}
      <div className="row mx-1" style={{background: "#ffffff"}}>
      <h1 className= "text-center" style={{color: "#000000", fontWeight: "bold"}}>
            {uniquenessFile.uniquenessFile.uniqueness2Title}
        </h1>
        <div className="col-sm">
          <div style={{margin: 0, position: "relative", top: '15%'}}>
          <br/>
            <br/>
            <h2 className="text-center mx-5" style={{color: "#000000", fontWeight: 'normal'}}>          
              {uniquenessFile.uniquenessFile.uniqueness2Description}
            </h2>
          </div>
        </div>
        <div className="col-sm m-4">
          <img 
            src={uniquenessFile.uniquenessFile.uniqueness2Img_url} alt="Image"
            style={{width: "75%", borderRadius: "20px"}}

          ></img>
        </div>
      </div>

     
    </div>

   );
}
export default Uniqueness;
