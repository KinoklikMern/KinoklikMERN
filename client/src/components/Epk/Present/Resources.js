import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Resources.css";
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faReadme,
} from "@fortawesome/free-brands-svg-icons";

function Resources(resFile) {
  return (
    <>
      <br />
      <div style={{backgroundColor: "#170B3B", height: 15}}/>

      <Container class="container-fluid resourcesCard">
        <div class="row">
          <img
            src={resFile.resFile.image}
            alt="..."
            height=""
            width=""
            class="col-6 resourcesImg"
          />
          <div class="col-6">
            <div class="col-12">
              <h2 class="resourcesTitle">{resFile.resFile.title}</h2>
              <h3 class="resourcesTime">{resFile.resFile.time}</h3>
              <h4 class="resourcesDescription">
              {resFile.resFile.description}
              </h4>
            </div>
            <div class="col-12 resourcesIcons">
              <a href="#" class="fa fa-facebook">
                {" "}
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" class="fa fa-facebook">
                {" "}
                <FontAwesomeIcon icon={faFacebook} size="2x" /> 
              </a>
              <a href="#" class="fa fa-facebook">
                {" "}
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="#" class="fa fa-facebook">
                {" "}
                <FontAwesomeIcon icon={faReadme} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Resources;