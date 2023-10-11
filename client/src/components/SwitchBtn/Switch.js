import { useState } from "react";
import "./SwitchBtn.css";

export default function SwitchBtn({role}) {
  const [activeBtn, setActiveBtn] = useState(role === "actor" ? "actor": "epk");

  function handleClick(button) {
    if(activeBtn === "epk"){
      if(button === "actor"){
        setActiveBtn("actor");
      }
      else{
        setActiveBtn("epk");
      }
    }
    else if(activeBtn === "actor"){
      if(button === "actor"){
        setActiveBtn("actor");
      }
      else{
        setActiveBtn("epk");
      }
    }
  }

  return (
    <div className="switch-container">
        <div className="switch-btn">
        <a href="/">
        <button
          id="epk-btn"
          className={activeBtn === "epk" ? "active" : ""}
          onClick={() => handleClick("epk")}
        >
          EPKs
        </button>
        </a>
        <a href="/actors">
        <button
          id="actor-btn"
          className={activeBtn === "actor" ? "active" : ""}
          onClick={() => handleClick("actor")}
        >
          Actors
        </button>
        </a>
    </div>
    </div>
  );
}