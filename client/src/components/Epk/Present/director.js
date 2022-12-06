import React, { useState } from "react";

import "./director.css";

function Director(directorFile) {
    console.log(directorFile);

    return (
        // <div className="container">
        //     <img
        //         src={directorFile.directorFile.image}
        //         alt="hey"
        //         style={{ height: "50%" }}
        //     />
        //     <div className="centered">
        //         <h3>{directorFile.directorFile.text}</h3>
        //     </div>
        // </div>

    // <div className="row mx-1" style={{background: "#630330"}}>
    //     <div className="col-sm">
    //         <h1 className="text-center mt-5">DIRECTOR</h1>
    //         <div style={{margin: 0, position: 'relative', top: '5%'}}>
    //             <h3 className= "text-center" style={{color:'#7F00FF', fontWeight: 'bold'}}>
    //             {directorFile.directorFile.text}
    //             </h3>
    //             <br/>
    //             <h2 className= "text-center" style={{color:'#7F00FF', fontWeight: 'bold'}}>
    //             {directorFile.directorFile.text}
    //             </h2>
    //             <h2 className="text-center mx-4">          
    //             {directorFile.directorFile.text}
    //             </h2>
    //         </div>
    //     </div>
    //     <div className="col-sm m-4">
    //         <img 
    //         src={directorFile.directorFile.image} alt="Image"
    //         style={{width: "100%"}}
    //         ></img>
    //     </div>
    // </div>
    <div className = "container">
            <div className = "container">
        <div className="row" style={{background: "#630330"}}>
            <div className="col-sm m-4">
                    <h1 className="text-center mt-5">DIRECTOR</h1>
                    <div style={{margin: 0, position: 'relative', top: '5%'}}>
                      <h3 className= "text-center" style={{color:'#7F00FF', fontWeight: 'bold'}}>
                      {directorFile.directorFile.header}
                      </h3>
                      <br/>
                      <h2 className= "text-center" style={{color:'#7F00FF', fontWeight: 'bold'}}>
                      {directorFile.directorFile.name}
                      </h2>
                      <h2 className="text-center mx-4">          
                      {directorFile.directorFile.biography}
                      </h2>
                    </div>
                </div>
                <div className="col-sm m-4">
                    <img 
                        src={directorFile.directorFile.image}  alt="Image"
                        style={{width: "100%"}}
                    ></img>
                </div>
            </div>
         </div>
         </div>
    );
}
export default Director;
