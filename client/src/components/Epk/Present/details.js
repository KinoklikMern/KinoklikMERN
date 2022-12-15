import React, { useState } from "react";

import "./details.css";

function Details(detailsFile) {
    console.log(detailsFile);

    return (
      <div style={{position: "relative"}}>
        {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>   */}
        <div >
          <div className="row" style={{background: "#ffffff"}}>
            <div className="col-sm m-4">
              <img 
                src={detailsFile.detailsFile.image}  alt="Image"
                style={{height: "500px", borderRadius: "20px"}}
                ></img>
              <br/>
            </div>
            <div className="col-sm">
            <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                
              </h4>
              <br/>
                <h4  style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Directed by {detailsFile.detailsFile.director}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Produced by {detailsFile.detailsFile.producer}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Writer: {detailsFile.detailsFile.writer}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Cinematographer: {detailsFile.detailsFile.cinematographer}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Editor: {detailsFile.detailsFile.editor}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Sound: {detailsFile.detailsFile.sound}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Studio: {detailsFile.detailsFile.productionCo}
                </h4>
                <br/>
                <h4 style={{textAlign: "left", color:'#000000', fontWeight: 'normal'}}>
                  Distributed by: {detailsFile.detailsFile.distributionCo}
                </h4>
            </div>
            <div className="col-sm">
              <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                Starring:
              </h4>
                <br/>
                <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                  {detailsFile.detailsFile.leadActor1}
                </h4>
                <br/>
                <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                  {detailsFile.detailsFile.leadActor2}
                </h4>
                <br/>
                <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                  {detailsFile.detailsFile.supportingActor1}
                </h4>
                <br/>
                <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                  {detailsFile.detailsFile.supportingActor2}
                </h4>
                <br/><br/><br/><br/>
                <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                  Production Year: {detailsFile.detailsFile.productionYear}
                </h4>
                <br/>
                <h4 style={{textAlign: "center", color:'#000000', fontWeight: 'normal'}}>
                  Duration: {detailsFile.detailsFile.durationMin} Minutes
                </h4>
            </div>
          </div>
        </div>
      </div>
   );
}
export default Details;
