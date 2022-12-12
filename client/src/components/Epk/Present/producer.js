import React, { useState } from "react";

import "./producer.css";

function Producer(producerFile) {
    console.log(producerFile);

    return (
        <div style={{position: "relative"}}>
        {/* <div style={{backgroundColor: "#170B3B", height: 15}}/> */}
            <div >
            {/* Dark Blue: #170B3B Burgundy: #630330*/}
                <div className="row" style={{background: "#170B3B"}}>
                    <div className="col-sm m-4">
                        <br/>
                        <h2 className="text-center mt-5" style={{color:'#ffffff', fontWeight: 'normal'}}>Producer</h2>
                        <div >
                            <h2 className= "text-center" style={{color:'#ffffff', fontWeight: 'normal'}}>
                                {producerFile.producerFile.header}
                            </h2>
                            <br/>

                            <h2 className="text-center mx-4" style={{color:'#ffffff', fontWeight: 'normal'}}>          
                                {producerFile.producerFile.biography}
                            </h2>
                        </div>
                    </div>
                    <div className="col-sm m-4">
                        <img 
                            src={producerFile.producerFile.image}  alt="Image"
                            style={{width: "75%", borderRadius: "20px"}}
                        ></img>
                        <br/>
                        <h1 className= "text-center" style={{marginTop: "10px", color:'#ffffff', fontWeight: 'bold'}}>
                            {producerFile.producerFile.name}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Producer;
