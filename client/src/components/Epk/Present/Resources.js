import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import style from "./Resources.module.css";
import { Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faReadme,
} from "@fortawesome/free-brands-svg-icons";
import { SyncOutlined } from "@mui/icons-material";

function Resources(resFile) {
  return (
    <div className={style.container}>
      

      <div className={style.resourcesCard}>
        <div >
          <img
            src={resFile.resFile.image}
            alt="resource pics"
          
            className={style.img}
          />
          </div>

          <div className={style.text}>
              <p >{resFile.resFile.title}</p>
              <p >{resFile.resFile.time}</p>
              <p > {resFile.resFile.description} </p>
            
           <div className={style.icon}>
              <a href="#" >
                {" "}
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" >
                {" "}
                <FontAwesomeIcon icon={faFacebook} size="2x" /> 
              </a>
              <a href="#" >
                {" "}
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" >
                {" "}
                <FontAwesomeIcon icon={faReadme} size="2x" />
              </a>
              </div>
            </div>
          </div>
        </div>
      
   
  );
}

export default Resources;

