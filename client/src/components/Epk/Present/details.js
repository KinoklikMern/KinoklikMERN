import React, { useState } from "react";

import "./details.css";

function Details(detailsFile) {
    console.log(detailsFile);

    return (
      <div style={{position: "relative"}}>
        {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>   */}
        <div >
          <div className="row" style={{background: "#170B3B"}}>
            <div className="col-sm m-4">
              <img 
                src={detailsFile.detailsFile.image}  alt="Image"
                style={{width: "75%", borderRadius: "20px"}}
                ></img>
              <br/>
              <h1 className= "text-center" style={{color:'#ffffff', fontWeight: 'bold'}}>
                {detailsFile.detailsFile.name}
              </h1>
            </div>
            <div className="col-sm">
            <br/>
              <h2 className="text-center mt-5" style={{color: '#ffffff', fontWeight: 'normal'}}>details</h2>
              <div>
                <h2 className= "text-center" style={{color:'#ffffff', fontWeight: 'normal'}}>
                  {detailsFile.detailsFile.header}
                </h2>
                <br/>
                <h2 className="text-center mx-4" style={{color: '#ffffff', fontWeight: 'normal'}}>          
                  {detailsFile.detailsFile.biography}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
   );
}
export default Details;
