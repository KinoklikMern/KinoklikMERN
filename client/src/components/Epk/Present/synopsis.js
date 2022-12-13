import React, { useState, useEffect, useRef } from "react";


import "./synopsis.css";

function Synopsis(synopsFile) {
  console.log(synopsFile);

  const [toggle, setToggle] = useState(false)
  const [heightEl, setHeightEl] = useState();

  const refHeight = useRef()
    
  useEffect(() => {
    setHeightEl(`${refHeight.current.scrollHeight}px`)
  }, [])


  const toggleState = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <button 
      onClick={toggleState}
      className="accordion-visible">
        <span>
        <p class="capitalize-me">{synopsFile.synopsFile.type} Synopsis</p> 
        </span>
      </button>
    <div 
    className={toggle ? "accordion-toggle animated" : 
    "accordion-toggle"}
    style={{height: toggle ? `${heightEl}` : "0px"}}
    ref={refHeight}
    >
    <br/>
    <img
          src={synopsFile.synopsFile.image}
          alt="hey"
          style={{ width: "100%", borderRadius: "35px" }}
        />
          <h3 className="centered" style={{width: "60%", position: "relative", justifyContent: "center"}}>{synopsFile.synopsFile.text}</h3>
          <br/>
    </div>

      {/* <div style={{
        justifyContent: 'center',
        alignItems: 'center'}}>
      <h2 class="capitalize-me" style={{backgroundColor: "#170B3B", height: 40}}>{synopsFile.synopsFile.type} Synopsis</h2>  
        <img
          src={synopsFile.synopsFile.image}
          alt="hey"
          style={{ width: "100%", borderRadius: "35px" }}
        />
          <h3 className="centered">{synopsFile.synopsFile.text}</h3>

      </div> */}
    </>
  );
}
export default Synopsis;