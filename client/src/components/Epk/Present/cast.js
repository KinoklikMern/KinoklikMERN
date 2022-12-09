import React, { useState } from "react";

import "./cast.css";

function Cast(castFile) {
  console.log(castFile);

  return (


    <div style={{position: "relative"}}>

<br/>
      <div style={{backgroundColor: "#170B3B", height: 15}}/>

      <h1 style={{color: "#000000", fontWeight: "normal"}}>Starring</h1>
      {/* Lead Actor 1 */}
      <div className="row">
        <div className="col-sm m-4">
          <img 
            src={castFile.castFile.leadActor1Img_url} alt="Image"
            style={{width: "75%", borderRadius: "20px"}}
            ></img>
          <br/>
          <h1 className= "text-center" style={{color: "#000000", fontWeight: "bold"}}>
            {castFile.castFile.leadActor1Name}
          </h1>
        </div>
        <div className="col-sm">
          <div style={{margin: 0, position: "relative", top: "15%"}}>
            <h2 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
              Starring
            </h2>
            <br/>
            <h2 className="text-center mx-4" style={{color: "#000000", fontWeight: 'normal'}}>          
            {castFile.castFile.leadActor1Biography}
            </h2>
          </div>
        </div>
      </div>
    
      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Lead Actor 2 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}
      <div className="row mx-1" style={{background: "#ffffff"}}>
        <div className="col-sm">
          <div style={{margin: 0, position: "relative", top: '15%'}}>
            <h2 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
              Starring
            </h2>
            <br/>
            <h2 className="text-center mx-5" style={{color: "#000000", fontWeight: 'normal'}}>          
              {castFile.castFile.leadActor2Biography}
            </h2>
          </div>
        </div>
        <div className="col-sm m-4">
          <img 
            src={castFile.castFile.leadActor2Img_url} alt="Image"
            style={{width: "75%", borderRadius: "20px"}}

          ></img>
          <br/>
          <h1 className= "text-center" style={{color: "#000000", fontWeight: "bold"}}>
            {castFile.castFile.leadActor2Name}
          </h1>
        </div>
      </div>

      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Supporting Actor 1 */}
      <div className="row">
        <div className="col-sm m-4">
          <img 
            src={castFile.castFile.supportingActor1Img_url} alt="Image"
            style={{width: "75%", borderRadius: "20px"}}
          ></img>
          <br/>
          <h1 className= "text-center" style={{color: "#000000", fontWeight: "bold"}}>
              {castFile.castFile.supportingActor1Name}
            </h1>
        </div>
        <div className="col-sm">
          <div style={{margin: 0, position: "relative", top: "15%"}}>
            <h2 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
              Starring
            </h2>
            <br/>
            <h2 className="text-center mx-4" style={{color: "#000000", fontWeight: 'normal'}}>          
              {castFile.castFile.supportingActor1Biography}
            </h2>
          </div>
        </div>
      </div>

      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Supporting Actor 2 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}
      <div className="row mx-1" style={{background: "#ffffff"}}>
        <div className="col-sm">
          <div style={{margin: 0, position: "relative", top: "15%"}}>

            <h2 className="text-center mx-5" style={{color: "#000000", fontWeight: 'normal'}}>
              {castFile.castFile.supportingActor2Biography}
            </h2>
          </div>
        </div>
        <div className="col-sm m-4">
          <img 
            src={castFile.castFile.supportingActor2Img_url} alt="Image"
            style={{width: "75%", borderRadius: "20px"}}
          ></img>
          <br/>
          <h1 className= "text-center" style={{color: "#000000", fontWeight: "bold"}}>
            {castFile.castFile.supportingActor2Name}
          </h1>
        </div>
      </div>
      
    </div>

   );
}
export default Cast;
