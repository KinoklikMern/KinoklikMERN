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
              <p class="resourcesTitle">{resFile.resFile.title}</p>
              <p class="resourcesTime">{resFile.resFile.time}</p>
              <p class="resourcesDescription">
              {resFile.resFile.description}
              </p>
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

