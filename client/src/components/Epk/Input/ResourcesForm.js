import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import { Link } from "react-router-dom";

import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";

const ResourcesForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState(null);
  const [resourcesList, setResourcesList] = useState(null);
  const epkID = 5;
  const submit = () => {
    const resource = {
      epk: epkID,
      image: image,
      title: title,
      time: time,
      description: description,
    };
    console.log(resource);
    createEpkResources(resource);

    async function createEpkResources(resource) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/epkResources`, {
        method: "POST",
        body: JSON.stringify({
          resource: resource,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resourcesList = await response.json();

      setResourcesList(resourcesList);
      console.log(resourcesList);
      // localStorage.setItem("epk", 1);
      //window.location = "/epk";

      /*  console.log(shortResources);
      console.log(mediumResources);
      console.log(longResources);*/
    }
  };

  const handleImage = (event) => {
    setImage(event.target.value);
    console.log(image);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };
  const handleTime = (event) => {
    setTime(event.target.value);
    console.log(time);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
    console.log(description);
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
    <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Resources</h5>
        <br />
        <Row
            justify="space-around"
            className="text-center "
        >
            <Col style={{width: "1000px"}} className="m-2 ">
            <div className="row">
                <div className="col">
                {/* <h4>Producer</h4> */}
                <input
                    name="title"
                    style={{ 
                        height: "30px", 
                        width: "300px", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'
                    }}
                    placeholder="Title"
                    onChange={handleTitle}
                />
                <input
                    name="time"
                    style={{ 
                        height: "30px", 
                        width: "300px", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'
                    }}
                    placeholder="Time"
                    onChange={handleTime}
                />
                <textarea
                    name="description"
                    style={{ 
                    height: "200px", 
                    width: "300px", 
                    borderRadius: "5px", 
                    marginBottom: "5px",
                    boxShadow: '1px 2px 9px #311465'
                    }}
                    placeholder="Enter Resources' Description here."
                    onChange={handleDescription}
                />
                <UploadFile setImage={setImage} />
                </div>
                <div className="col">
                {image && (
                    <img
                        src={image}
                        alt="dir"
                        style={{ height: "300px", boxShadow: '1px 2px 9px #000000'}}
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
export default ResourcesForm;