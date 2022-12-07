import React, { useState } from "react";

import "./director.css";

function Director(directorFile) {
    console.log(directorFile);

    return (
      <div >
        <div style={{backgroundColor: "#7F00FF", height: 15}}/>  
        <div >
          <div className="row" style={{background: '#ffffff'}}>
            <div className="col-sm m-4">
              <img 
                src={directorFile.directorFile.image}  alt="Image"
                style={{width: "100%"}}
              ></img>
            </div>
            <div className="col-sm">
              <h1 className="text-center mt-5" style={{color: '#000000'}}>DIRECTOR</h1>
              <div>
                <h3 className= "text-center" style={{color:'#000000', fontWeight: 'bold'}}>
                  {directorFile.directorFile.header}
                </h3>
                <br/>
                <h2 className= "text-center" style={{color:'#000000', fontWeight: 'bold'}}>
                  {directorFile.directorFile.name}
                </h2>
                <h2 className="text-center mx-4" style={{color: '#000000', fontWeight: 'normal'}}>          
                  {directorFile.directorFile.biography}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
   );
}
export default Director;
