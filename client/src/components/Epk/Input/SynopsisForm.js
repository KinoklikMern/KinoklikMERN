import React, { useState, useEffect } from "react";


import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";


const SynopsisForm = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [short, setshort] = useState(null);
  const [medium, setMedium] = useState(null);
  const [long, setslong] = useState(null);
  const [synopsisList, setSynopsisList] = useState(null);

  const submit = () => {
    const shortSynopsis = {
      epk: 1,
      image: image1,
      text: short,
      type: "short",
    };
    const mediumSynopsis = {
      epk: 1,
      image: image2,
      text: medium,
      type: "medium",
    };
  
    createEpkSynopsis(shortSynopsis, mediumSynopsis);

    async function createEpkSynopsis(
      shortSynopsis,
      mediumSynopsis,
     
    ) {
      const response = await fetch(
        "http://localhost:8000/epk/createEpkSynopsis",
        {
          method: "POST",
          body: JSON.stringify({
            shortSynopsis: shortSynopsis,
            mediumSynopsis: mediumSynopsis
        
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const synopsisList = await response.json();

      console.log(synopsisList.shortSynopsis);
      setSynopsisList(synopsisList);
      localStorage.setItem("synopsisList", synopsisList);
      window.location = "/epk";

  
    }
  };
  const handleShort = (event) => {
    setshort(event.target.value);
    console.log(short);
  };
  const handleMedium = (event) => {
    setMedium(event.target.value);
    console.log(medium);
  };


  return (
    <>
      {" "}
      <h1 className="text-center text-primary">Uniqueness</h1>
      <br />
      <Row
        justify="space-around"
        className="text-center "
       
      >
        <Col span={6} className="m-2 bg-light">
      
          <UploadFile setImage={setImage1} />
          {image1 && (
            <img
              src={image1}
              alt="hey"
              style={{ height: "350px", width: "300px" }}
            />
          )}
        </Col>
        <Col span={6} className="m-2 bg-light">
        
       
          <UploadFile setImage={setImage2} />
          {image2 && (
            <img
              src={image2}
              alt="hey"
              style={{ height: "350px", width: "300px" }}
            />
          )}
        </Col>
   
      </Row>
      <Row>
        <button className="btn btn-primary" onClick={submit} value="save" />
      </Row>
    </>
  );
};
export default SynopsisForm;
