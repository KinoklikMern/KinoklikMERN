import React, { useState, useEffect, useRef } from "react";


import style from "./synopsis.module.css";

function Synopsis(synopsFile) {
  console.log(synopsFile);

  const [toggle, setToggle] = useState(false)



  const toggleState = () => {
    setToggle(!toggle);
  }

  return (
    <div className={style.container}>
      <div className={style.synopsis}>
        <div >
        <h2  className={style.type}>{synopsFile.synopsFile.type} Synopsis</h2>  
        </div>
 
      
      <div className={style.position}> 
      <button className={synopsFile.synopsFile.type==="short" ? style.none :style.button}
      onClick={toggleState}
      >
        
        {synopsFile.synopsFile.type} Synopsis
      
        
      </button>
    
 
    {!toggle &&<div className={synopsFile.synopsFile.type==="short" ? style.content1 :style.content}>
        <img
          src={synopsFile.synopsFile.image}
          alt="hey"
          className={style.img}
        />
          <h3 className={style.centered}>{synopsFile.synopsFile.text}</h3>

      </div>}

      {toggle &&<div className={ style.content1 }>
        <img
          src={synopsFile.synopsFile.image}
          alt="hey"
          className={style.img}
        />
          <h3 className={style.centered}>{synopsFile.synopsFile.text}</h3>

      </div>}
      </div>
    </div>
    </div>
  );
}
export default Synopsis;
