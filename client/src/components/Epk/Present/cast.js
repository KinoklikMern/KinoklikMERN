import React, { useState } from "react";

import "./cast.css";

function Cast(castFile) {
    console.log(castFile);

    return (

<div className = "container">
<div className="row">
  <div className="col-sm m-4">
    <img 
    src={castFile.castFile.leadActor1Img_url} alt="Image"
    style={{width: "100%"}}
    ></img>
  </div>
  <div className="col-sm">
    <div style={{margin: 0, position: "relative", top: "15%"}}>
      <h1 className= "text-center" style={{color: "#7F00FF", fontWeight: "bold"}}>
      {castFile.castFile.leadActor1Name}
      </h1>
      <h2 className="text-center mx-4" style={{color: "#000000", fontWeight: 'normal'}}>          
      {castFile.castFile.leadActor1Biography}
      </h2>
    </div>
  </div>
</div>
<div style={{backgroundColor: "#7F00FF", height: 15}}/> 

<div className="row mx-1" style={{background: "#630330"}}>
  <div className="col-sm">
    <div style={{margin: 0, position: "relative", top: '15%'}}>
      <h1 className= "text-center" style={{color: "#7F00FF", fontWeight: "bold"}}>
      {castFile.castFile.leadActor2Name}
      </h1>
      <h2 className="text-center mx-5" style={{color: "#ffffff", fontWeight: 'normal'}}>          
      {castFile.castFile.leadActor2Biography}
      </h2>
    </div>
  </div>
  <div className="col-sm m-4">
    <img 
    src={castFile.castFile.leadActor2Img_url} alt="Image"
    style={{width: "100%"}}
    ></img>
  </div>
</div>

<div style={{backgroundColor: "#7F00FF", height: 15}}/> 

<div className="row">
  <div className="col-sm m-4">
    <img 
    src={castFile.castFile.supportingActor1Img_url} alt="Image"
    style={{width: "100%"}}
    ></img>
  </div>
  <div className="col-sm">
    <div style={{margin: 0, position: "relative", top: "15%"}}>
      <h1 className= "text-center" style={{color: "#7F00FF", fontWeight: "bold"}}>
      {castFile.castFile.supportingActor1Name}
      </h1>
      <h2 className="text-center mx-4" style={{color: "#000000", fontWeight: 'normal'}}>          
      {castFile.castFile.supportingActor1Biography}
      </h2>
    </div>
  </div>
</div>

<div style={{backgroundColor: "#7F00FF", height: 15}}/> 

<div className="row mx-1" style={{background: "#630330"}}>
  <div className="col-sm">
    <div style={{margin: 0, position: "relative", top: "15%"}}>
      <h1 className= "text-center" style={{color: "#7F00FF", fontWeight: "bold"}}>
      {castFile.castFile.supportingActor2Name}
      </h1>
      <h2 className="text-center mx-5" style={{color: "#ffffff", fontWeight: 'normal'}}>
      {castFile.castFile.supportingActor2Biography}
      </h2>
    </div>
  </div>
  <div className="col-sm m-4">
    <img 
    src={castFile.castFile.supportingActor2Img_url} alt="Image"
    style={{width: "100%"}}
    ></img>
  </div>
</div>
  
<div style={{backgroundColor: "#7F00FF", height: 15}}/> 
</div>

   );
}
export default Cast;
