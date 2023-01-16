import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const UniquenessForm = () => {
  const [uniqueness1Title, setUniqueness1Title] = useState(null);
  const [uniqueness1Description, setUniqueness1Description] = useState(null);
  const [uniqueness1Img_url, setUniqueness1Img_url] = useState(null);
  const [uniqueness2Title, setUniqueness2Title] = useState(null);
  const [uniqueness2Description, setUniqueness2Description] = useState(null);
  const [uniqueness2Img_url, setUniqueness2Img_url] = useState(null);

    const [uniquenessList, setUniquenessList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const uniquenessList1 = [
            { 
                epk: epkID,
                uniqueness1Title: uniqueness1Title,
                uniqueness1Description: uniqueness1Description,
                uniqueness1Img_url: uniqueness1Img_url,
                uniqueness2Title: uniqueness2Title,
                uniqueness2Description: uniqueness2Description,
                uniqueness2Img_url: uniqueness2Img_url,
            },
        ];
        console.log(uniquenessList1);
        createEpkUniqueness(uniquenessList1);

        async function createEpkUniqueness(uniquenessList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkUniqueness`, {
                method: "POST",
                body: JSON.stringify({
                    uniquenessList: uniquenessList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const uniquenessList = await response.json();

            setUniquenessList(uniquenessList);
            window.location = "/epk";
        }
    };

    // const handleName = (event) => {
    //     setName(event.target.value);
    //     console.log(name);
    // };

    // const handleBiography = (event) => {
    //     setBiography(event.target.value);
    //     console.log(biography);
    // };


    return (
        <>
        <div style={{boxShadow: '1px 2px 9px #311465', marginLeft: "10%", width: "80%", height: "unknown", background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
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
          <div className="col-5">
            <br/>
            <p>Tell the world what makes your film and production special. 
              This is where you sell the world (and the media) your film. 
              Is your film inspired by a true story? 
              Is it based on a criminal court case?
              Does it feature a real haunted house or a celebrity cameo?</p>
          </div>
        </div>
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Uniqueness</h5>
            <Row
                justify="space-around" className="text-center "
            >
                <Col style={{width: "1400px", height: "600px"}}  className="m-2">
                    <div className="row">
                    <div className="col">
                    {/* <h3>Lead Actor</h3> */}

                    <input
                        name="name"
                        style={{ 
                            height: "30px", 
                            width: "350px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Title"
                    onChange={(event) => {
                      setUniqueness1Title(event.target.value);
                }}
                />

                <textarea
                        name="biography"
                        style={{ 
                            height: "200px", 
                            width: "350px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'}}
                        placeholder="Description"
                    onChange={(event) => {
                      setUniqueness1Description(event.target.value);
                    }}
                />

                <UploadFile setImage={setUniqueness1Img_url} />
                {uniqueness1Img_url && (
                    <img
                        src={uniqueness1Img_url}
                        alt="dir"
                        style={{ height: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Lead Actor</h3> */}

              <input
                    name="name"
                    style={{ 
                        height: "30px", 
                        width: "350px", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'
                    }}
                    placeholder="Title"
                    onChange={(event) => {
                    setUniqueness2Title(event.target.value);
                }}
              />

                <textarea
                    name="biography"
                    style={{ 
                        height: "200px", 
                        width: "350px", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'}}
                    placeholder="Description"
                    onChange={(event) => {
                  setUniqueness2Description(event.target.value);
                }}
              />
            <UploadFile setImage={setUniqueness2Img_url} />
                {uniqueness2Img_url && (
                    <img
                        src={uniqueness2Img_url}
                        alt="dir"
                        style={{ height: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
          
          </div>
                    {/* <UploadFile setImage={setImage} />
                    {image && (
                        <img
                            src={image}
                            alt="dir"
                            style={{ height: "350px", width: "300px" }}
                        />
                    )} */}
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
export default UniquenessForm;