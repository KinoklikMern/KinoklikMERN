import React, { useState } from "react";

import "./cinematographer.css";

function Cinematographer(cinematographerFile) {
    console.log(cinematographerFile);

    return (
        // <div className="container">
        //     <img
        //         src={cinematographerFile.cinematographerFile.image}
        //         alt="hey"
        //         style={{ height: "50%" }}
        //     />
        //     <div className="centered">
        //         <h3>{cinematographerFile.cinematographerFile.text}</h3>
        //     </div>
        // </div>


                <div className = "container">
                    <div style={{backgroundColor: "#7F00FF", height: 15}}/>  
                    <div className = "container">
                    <div className="row" style={{background: '#D3D3D3'}}>
                      <div className="col-sm m-4">
                        <img 
                        src={cinematographerFile.cinematographerFile.image}  alt="Image"
                        style={{width: "100%"}}
                        ></img>
                      </div>
                      <div className="col-sm">
                        <h1 className="text-center mt-5">CINEMATOGRAPHY</h1>
                        <div style={{margin: 0, position: 'relative', top: '5%'}}>
                          <h3 className= "text-center" style={{color:'#7F00FF', fontWeight: 'bold'}}>
                          {cinematographerFile.cinematographerFile.header}
                          </h3>
                          <br/>
                          <h2 className= "text-center" style={{color:'#7F00FF', fontWeight: 'bold'}}>
                          {cinematographerFile.cinematographerFile.name}
                          </h2>
                          <h2 className="text-center mx-4">          
                          {cinematographerFile.cinematographerFile.biography}
                          </h2>
                        </div>
                      </div>
                      </div>
                      </div>                    </div>
   );
}
export default Cinematographer;
