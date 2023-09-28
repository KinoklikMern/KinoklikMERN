import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const CastForm = () => {
  const [leadActor1Name, setLeadActor1Name] = useState(null);
  const [leadActor1Biography, setLeadActor1Biography] = useState(null);
  const [leadActor1Img_url, setLeadActor1Img_url] = useState(null);
  const [leadActor2Name, setLeadActor2Name] = useState(null);
  const [leadActor2Biography, setLeadActor2Biography] = useState(null);
  const [leadActor2Img_url, setLeadActor2Img_url] = useState(null);
  const [supportingActor1Name, setSupportingActor1Name] = useState(null);
  const [supportingActor1Biography, setSupportingActor1Biography] = useState(null);
  const [supportingActor1Img_url, setSupportingActor1Img_url] = useState(null);
  const [supportingActor2Name, setSupportingActor2Name] = useState(null);
  const [supportingActor2Biography, setSupportingActor2Biography] = useState(null);
  const [supportingActor2Img_url, setSupportingActor2Img_url] = useState(null);

    const [castList, setCastList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const castList1 = [
            { 
                epk: epkID,
                leadActor1Name: leadActor1Name,
                leadActor1Biography: leadActor1Biography,
                leadActor1Img_url: leadActor1Img_url,
                leadActor2Name: leadActor2Name,
                leadActor2Biography: leadActor2Biography,
                leadActor2Img_url: leadActor2Img_url,
                supportingActor1Name: supportingActor1Name,
                supportingActor1Biography: supportingActor1Biography,
                supportingActor1Img_url: supportingActor1Img_url,
                supportingActor2Name: supportingActor2Name,
                supportingActor2Biography: supportingActor2Biography,
                supportingActor2Img_url: supportingActor2Img_url
            },
        ];
        console.log(castList1);
        createEpkCast(castList1);

        async function createEpkCast(castList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkCast`, {
                method: "POST",
                body: JSON.stringify({
                    castList: castList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const castList = await response.json();

            setCastList(castList);
            // window.location = "/epk";
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
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Starring / Cast</h5>
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
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Lead Actor Name"
                    onChange={(event) => {
                    setLeadActor1Name(event.target.value);
                }}
                />

                <textarea
                        name="biography"
                        style={{ 
                            height: "200px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465'}}
                        placeholder="Enter Lead Actor's Biography here."
                    onChange={(event) => {
                    setLeadActor1Biography(event.target.value);
                    }}
                />

                <UploadFile setImage={setLeadActor1Img_url} />
                {leadActor1Img_url && (
                    <img
                        src={leadActor1Img_url}
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
                        width: "300px", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'
                    }}
                    placeholder="Lead Actor Name"
                    onChange={(event) => {
                    setLeadActor2Name(event.target.value);
                }}
              />

                <textarea
                    name="biography"
                    style={{ 
                        height: "200px", 
                        width: "300px", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465'}}
                    placeholder="Enter Lead Actor's Biography here."
                    onChange={(event) => {
                  setLeadActor2Biography(event.target.value);
                }}
              />
            <UploadFile setImage={setLeadActor2Img_url} />
                {leadActor2Img_url && (
                    <img
                        src={leadActor2Img_url}
                        alt="dir"
                        style={{ height: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Supporting Actor</h3> */}

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
                    placeholder="Suporting Actor Name"
                onChange={(event) => {
                  setSupportingActor1Name(event.target.value);
                }}
              />

            <textarea
                name="biography"
                style={{ 
                    height: "200px", 
                    width: "300px", 
                    borderRadius: "5px", 
                    marginBottom: "5px",
                    boxShadow: '1px 2px 9px #311465'}}
                placeholder="Enter Suporting Actor Biography here."
                onChange={(event) => {
                  setSupportingActor1Biography(event.target.value);
                }}
              />
                <UploadFile setImage={setSupportingActor1Img_url} />
                {supportingActor1Img_url && (
                    <img
                        src={supportingActor1Img_url}
                        alt="dir"
                        style={{ height: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
              {/* <h3>Supporting Actor</h3> */}

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
                    placeholder="Suporting Actor Name"
                    onChange={(event) => {
                    setSupportingActor2Name(event.target.value);
                }}
              />

            <textarea
                name="biography"
                style={{ 
                    height: "200px", 
                    width: "300px", 
                    borderRadius: "5px", 
                    marginBottom: "5px",
                    boxShadow: '1px 2px 9px #311465'}}
                placeholder="Enter Suporting Actor's Biography here."
                onChange={(event) => {
                  setSupportingActor2Biography(event.target.value);
                }}
              />
                <UploadFile setImage={setSupportingActor2Img_url} />
                {supportingActor2Img_url && (
                    <img
                        src={supportingActor2Img_url}
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
export default CastForm;