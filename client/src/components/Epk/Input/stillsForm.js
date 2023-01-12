import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const StillsForm = () => {
  const [stills1Img_url, setStills1Img_url] = useState(null);
  const [stills2Img_url, setStills2Img_url] = useState(null);
  const [stills3Img_url, setStills3Img_url] = useState(null);
  const [stills4Img_url, setStills4Img_url] = useState(null);
  const [stills5Img_url, setStills5Img_url] = useState(null);
  const [stills6Img_url, setStills6Img_url] = useState(null);
  const [stills7Img_url, setStills7Img_url] = useState(null);
  const [stills8Img_url, setStills8Img_url] = useState(null);

    const [stillsList, setStillsList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const stillsList1 = [
            { 
                epk: epkID,
                stills1Img_url: stills1Img_url,
                stills2Img_url: stills2Img_url,
                stills3Img_url: stills3Img_url,
                stills4Img_url: stills4Img_url,
                stills5Img_url: stills5Img_url,
                stills6Img_url: stills6Img_url,
                stills7Img_url: stills7Img_url,
                stills8Img_url: stills8Img_url
            },
        ];
        console.log(stillsList1);
        createEpkStills(stillsList1);

        async function createEpkStills(stillsList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkStills`, {
                method: "POST",
                body: JSON.stringify({
                    stillsList: stillsList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const stillsList = await response.json();

            setStillsList(stillsList);
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
          <div className="col">            
          </div>
        </div>
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Stills</h5>
            <Row
                justify="space-around" className="text-center "
            >
                <Col style={{width: "1400px", height: "300px"}}  className="m-2">
                    <div className="row">
                    <div className="col">
                    {/* <h3>Image 1</h3> */}
                <UploadFile setImage={setStills1Img_url} />
                {stills1Img_url && (
                    <img
                        src={stills1Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Image 2</h3> */}

              
            <UploadFile setImage={setStills2Img_url} />
                {stills2Img_url && (
                    <img
                        src={stills2Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Image 3</h3> */}

              
                <UploadFile setImage={setStills3Img_url} />
                {stills3Img_url && (
                    <img
                        src={stills3Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Image 4</h3> */}

              
                <UploadFile setImage={setStills4Img_url} />
                {stills4Img_url && (
                    <img
                        src={stills4Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
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

            <Row
                justify="space-around" className="text-center "
            >
                <Col style={{width: "1400px", height: "300px"}}  className="m-2">
                    <div className="row">
                    <div className="col">
                    {/* <h3>Image 1</h3> */}
                <UploadFile setImage={setStills5Img_url} />
                {stills5Img_url && (
                    <img
                        src={stills5Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Image 2</h3> */}

              
            <UploadFile setImage={setStills6Img_url} />
                {stills6Img_url && (
                    <img
                        src={stills6Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Image 7</h3> */}

              
                <UploadFile setImage={setStills7Img_url} />
                {stills7Img_url && (
                    <img
                        src={stills7Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Image 8</h3> */}

              
                <UploadFile setImage={setStills8Img_url} />
                {stills8Img_url && (
                    <img
                        src={stills8Img_url}
                        alt="dir"
                        style={{ height: "160px", boxShadow: '1px 2px 9px #000000'}}
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
export default StillsForm;