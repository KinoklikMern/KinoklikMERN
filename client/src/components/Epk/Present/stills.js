import React, { useState } from "react";

import "./stills.css";

function Stills(stillsFile) {
  console.log(stillsFile);

  return (


    <div style={{position: "relative"}}>

<br/>
      <div style={{backgroundColor: "#170B3B", height: 15}}/>

      {/* <h1 style={{color: "#4a3759", fontWeight: "normal"}}>Stills</h1> */}
      {/* Image 1 */}
      <div className="row">
        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills1Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}
            ></img>
        </div>

    
      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Image 2 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}
        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills2Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}

          ></img>
        </div>
      </div>

      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Image 3 */}
      <div className="row">
        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills3Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}
          ></img>
        </div>


      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Image 4 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}

        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills4Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}
          ></img>
        </div>
      </div>
      
      {/* Image 5 */}
      <div className="row">
        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills5Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}
            ></img>
        </div>

    
      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Image 6 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}
        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills6Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}

          ></img>
        </div>
      </div>

      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Image 7 */}
      <div className="row">
        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills7Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}
          ></img>
        </div>


      {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>  */}

      {/* Image 8 */}
      {/* Dark Blue: #170B3B Burgundy: #630330*/}

        <div className="col-sm m-4">
          <img 
            src={stillsFile.stillsFile.stills8Img_url} alt="Image"
            style={{height: "300px", borderRadius: "20px"}}
          ></img>
        </div>
      </div>
      
    </div>

   );
}
export default Stills;
