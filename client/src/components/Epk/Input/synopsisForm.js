import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";
import { Link } from "react-router-dom";

const SynopsisForm = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [short, setshort] = useState(null);
  const [medium, setMedium] = useState(null);
  const [long, setslong] = useState(null);
  const [synopsisList, setSynopsisList] = useState(null);
  const epkID = 5;
  const submit = () => {
    /*     const shortSynopsis = {
      epk: epkID,
      image: image1,
      text: short,
      type: "short",
    };
    const mediumSynopsis = {
      epk: epkID,
      image: image2,
      text: medium,
      type: "medium",
    };
    const longSynopsis = {
      epk: epkID,
      image: image3,
      text: long,
      type: "long",
    }; */
    const synopsisList1 = [
      { epk: epkID, image: image1, text: short, type: "short" },
      { epk: epkID, image: image2, text: medium, type: "medium" },
      { epk: epkID, image: image3, text: long, type: "long" },
    ];
    console.log(synopsisList1);
    createEpkSynopsis(synopsisList1);

    async function createEpkSynopsis(synopsisList1) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkSynopsis`, {
        method: "POST",
        body: JSON.stringify({
          synopsisList: synopsisList1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const synopsisList = await response.json();

      setSynopsisList(synopsisList);
      // localStorage.setItem("epk", 1);
      window.location = "/epk";

      /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
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
  const handleLong = (event) => {
    setslong(event.target.value);
    console.log(long);
  };

  return (
    <>
        <div style={{boxShadow: '1px 2px 9px #311465', marginLeft: "10%", width: "80%", background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
                backgroundColor:"white"}}>
        <div className="row">
          <div className="col-1">
            <Link className="navbar-brand text-headers-style" to="/home">
              <img
                src={require("../../../images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          </div>
          <div className="col-3  m-3">
           <h2 className="col align-items-start" style={{color: "#311465", fontWeight: 'normal' }}>EPK Dashboard</h2>
          </div>
          <div className="col-2 m-3">
          <Link className="col align-items-end" to="/Epk"  style={{ color: "#311465", textDecoration: 'none', fontWeight: 'normal', fontSize: '20px' }}>
                View EPK Page
              </Link>
          </div>
          <div className="col">            
          </div>
        </div>
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Synopsis</h5>

      <Row
        justify="space-around"
        className="text-center "
        /*  style={{height: "70vh" }}*/
      >
        <Col style={{width: "1300px", height: "500px"}} className="m-2">
        <div className="row">
          <div className="col">
          {/* <h4>Short Synopsis</h4> */}
          <textarea
            name="short"
            style={{ 
              height: "200px", 
              width: "300px", 
              borderRadius: "5px", 
              marginBottom: "5px",
              boxShadow: '1px 2px 9px #311465',
              textAlign: 'center'}}
              placeholder="Short Synopsis, max 30 words"
            onChange={handleShort}
          />
          <UploadFile setImage={setImage1} />

            {image1 && (
              <img
                src={image1}
                alt="hey"
                style={{ height: "200px", boxShadow: '1px 2px 9px #000000'}}
              />
            )}
          </div>

          <div className="col">
          {/* <h4>Medium Synopsis</h4> */}
          <textarea
            name="medium"
            style={{ 
              height: "200px", 
              width: "300px", 
              borderRadius: "5px", 
              marginBottom: "5px",
              boxShadow: '1px 2px 9px #311465',
              textAlign: 'center'}}
            placeholder="Medium Synopsis, max 70 words"
            onChange={handleMedium}
          ></textarea>
          <UploadFile setImage={setImage2} />

            {image2 && (
              <img
                src={image2}
                alt="hey"
                style={{ height: "200px", boxShadow: '1px 2px 9px #000000'}}
              />
            )}
          </div>
          <div className="col">
          {/* <h4>Long Synopsis</h4> */}
          <textarea
            name="long"
            style={{ 
              height: "200px", 
              width: "300px", 
              borderRadius: "5px", 
              marginBottom: "5px",
              boxShadow: '1px 2px 9px #311465',
              textAlign: 'center'}}
            placeholder="Long Synopsis, max 120 words"
            onChange={handleLong}
          ></textarea>
          <UploadFile setImage={setImage3} />

            {image3 && (
              <img
                src={image3}
                alt="hey"
                style={{ height: "200px", boxShadow: '1px 2px 9px #000000'}}
                />
            )}
          </div>
        </div>
        </Col>
      </Row>
      <Row justify="space-around" className="text-center ">
        <div
          style={{
            height: "50px",
            width: "120px",
            marginLeft: "80%"
          }}
        >
          <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={submit} value="save">
            Save
          </Button>
        </div>
      </Row>
      </div>
    </>
  );
};
export default SynopsisForm;
