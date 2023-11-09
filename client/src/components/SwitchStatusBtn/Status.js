import React, { useState } from "react";
import "./Status.css";

export default function StatusBtn({ onStatusChange }) {
  const [activeBtn, setActiveBtn] = useState("All"); // Default status is "All"

  const handleClick = (status) => {
    if (status === activeBtn) {
      setActiveBtn("All");
      onStatusChange("All");
    } else {
      setActiveBtn(status);
      onStatusChange(status); // Call the provided callback to update EPK status filter
    }
  };

  return (
    <div className='switchstat-container'>
      <div className='switchstat-btn'>
        <button
          id='Preproduction'
          className={activeBtn === "Preproduction" ? "active" : "deactive"}
          onClick={() => handleClick("Preproduction")}
        >
          Pre-Production
        </button>

        <button
          id='Production'
          className={activeBtn === "Production" ? "active" : "deactive"}
          onClick={() => handleClick("Production")}
        >
          Production
        </button>

        <button
          id='Postproduction'
          className={activeBtn === "Postproduction" ? "active" : "deactive"}
          onClick={() => handleClick("Postproduction")}
        >
          Post-Production
        </button>
      </div>
    </div>
  );
}
