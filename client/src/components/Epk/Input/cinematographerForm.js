import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const CinematographerForm = () => {
    const [image, setImage] = useState(null);
    const [biography, setBiography] = useState(null);
    const [header, setHeader] = useState(null);
    const [name, setName] = useState(null);
    const [cinematographerList, setCinematographerList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const cinematographerList1 = [
            { epk: epkID, image: image, header: header, name: name, biography: biography },
        ];
        console.log(cinematographerList1);
        createEpkCinematographer(cinematographerList1);

        async function createEpkCinematographer(cinematographerList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkCinematographer`, {
                method: "POST",
                body: JSON.stringify({
                    cinematographerList: cinematographerList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const cinematographerList = await response.json();

            setCinematographerList(cinematographerList);
            window.location = "/epk";
        }
    };

    const handleHeader = (event) => {
        setHeader(event.target.value);
        console.log(header);
    };

    const handleName = (event) => {
        setName(event.target.value);
        console.log(name);
    };

    const handleBiography = (event) => {
        setBiography(event.target.value);
        console.log(biography);
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
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Cinematographer</h5>
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col style={{width: "1000px"}} className="m-2">
                <div className="row">
                    <div className="col">
                    {/* <h4>Cinematographer</h4> */}
                    <input
                        name="name"
                        style={{ 
                            height: "30px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center' 
                        }}
                        placeholder="Cinematographer's Name"
                        onChange={handleName}
                    />
                    <input
                        name="header"
                        style={{ 
                            height: "30px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center' 
                        }}
                        placeholder="Header"
                        onChange={handleHeader}
                    />
                    <textarea
                        name="biography"
                        style={{ 
                            height: "200px", 
                            width: "300px",
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465' 
                        }}
                        placeholder="Enter Cinematographer's Biography here."
                        onChange={handleBiography}
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
export default CinematographerForm;