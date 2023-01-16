import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const DetailsForm = () => {
    const [image, setImage] = useState(null);
    const [director, setDirector] = useState(null);
    const [producer, setProducer] = useState(null);
    const [writer, setWriter] = useState(null);
    const [cinematographer, setCinematographer] = useState(null);
    const [editor, setEditor] = useState(null);
    const [sound, setSound] = useState(null);
    const [productionCo, setProductionCo] = useState(null);
    const [distributionCo, setDistributionCo] = useState(null);
    const [leadActor1, setLeadActor1] = useState(null);
    const [leadActor2, setLeadActor2] = useState(null);
    const [supportingActor1, setSupportingActor1] = useState(null);
    const [supportingActor2, setSupportingActor2] = useState(null);
    const [productionYear, setProductionYear] = useState(null);
    const [durationMin, setDurationMin] = useState(null);

    const [detailsList, setDetailsList] = useState(null);
    const epkID = 5;
    const submit = () => {

    const detailsList1 = [
        { 
        epk: epkID, 
        image: image,
        director: director,
        producer: producer,
        writer: writer,
        cinematographer: cinematographer,
        editor: editor,
        sound: sound,
        productionCo: productionCo,
        distributionCo: distributionCo,
        leadActor1: leadActor1,
        leadActor2: leadActor2,
        supportingActor1: supportingActor1,
        supportingActor2: supportingActor2,
        productionYear: productionYear,
        durationMin: durationMin
        },
        ];
        console.log(detailsList1);
        createEpkDetails(detailsList1);

        async function createEpkDetails(detailsList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkDetails`, {
                method: "POST",
                body: JSON.stringify({
                    detailsList: detailsList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const detailsList = await response.json();

            setDetailsList(detailsList);
            window.location = "/epk";
        }
    };

    // const handleHeader = (event) => {
    //     setHeader(event.target.value);
    //     console.log(header);
    // };

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
           <h2 className="col align-items-start" style={{color: "#311465", fontWeight: 'normal' }}>EPK Page Upload</h2>
          </div>
          <div className="col-2 m-3">
          <Link className="col align-items-end" to="/Epk"  style={{ color: "#311465", textDecoration: 'none', fontWeight: 'normal', fontSize: '20px' }}>
                View EPK Page
              </Link>
          </div>
          <div className="col">            
          </div>
        </div>
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Film Details</h5>
        <br/>
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col style={{width: "1200px", height: "400px"}} >
                <div className="row">
                    <div className="col">
                    <UploadFile setImage={setImage} />
                    {/* </div>
                    <div className="col"> */}
                        {image && (
                            <img
                                src={image}
                                alt="dir"
                                style={{ height: "350px", boxShadow: '1px 2px 9px #000000'}}
                            />
                        )}
                    </div>
                    <div className="col">
                    <h4 style={{color: "#ffffff", fontWeight: 'normal', marginBottom: "25px" }}>Key Crew</h4>
                    <input
                        name="director"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Directed By:"
                        onChange={(event) => {
                            setDirector(event.target.value);
                        }}
                    />
                    <input
                        name="producer"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Produced By:"
                        onChange={(event) => {
                            setProducer(event.target.value);
                        }}
                    />
                    <input
                        name="writer"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Writen By:"
                        onChange={(event) => {
                            setWriter(event.target.value);
                        }}
                    />
                    
                    <input
                        name="cinematographer"
                        style={{ 
                            marginTop: "20px",
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Cinematography By:"
                        onChange={(event) => {
                            setCinematographer(event.target.value);
                        }}
                    />
                     <input
                        name="Editor"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Edited By:"
                        onChange={(event) => {
                            setEditor(event.target.value);
                        }}
                    />
                     <input
                        name="sound"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Sound By:"
                        onChange={(event) => {
                            setSound(event.target.value);
                        }}
                    />
                    <input
                        name="productionCo"
                        style={{ 
                            marginTop: "20px",
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Production Company Name"
                        onChange={(event) => {
                            setProductionCo(event.target.value);
                        }}
                    />
                    <input
                        name="distributionCo"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Distribution Company Name"
                        onChange={(event) => {
                            setDistributionCo(event.target.value);
                        }}
                    />
                    </div>

                    <div className="col ">
                    <h4 style={{color: "#ffffff", fontWeight: 'normal', marginBottom: "25px"  }}>Starring</h4>
                    <input
                        name="leadActor1"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Lead Actor Name:"
                        onChange={(event) => {
                            setLeadActor1(event.target.value);
                        }}
                    />
                    <input
                        name="leadActor2"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Lead Actor Name:"
                        onChange={(event) => {
                            setLeadActor2(event.target.value);
                        }}
                    />
                    <br/>
                    <input
                        name="supportingActor1"
                        style={{ 
                            marginTop: "20px",
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Supporting Actor Name:"
                        onChange={(event) => {
                            setSupportingActor1(event.target.value);
                        }}
                    />
                    <input
                        name="supportingActor2"
                        style={{ 
                            height: "30px", 
                            width: "250px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Supporting Actor Name:"
                        onChange={(event) => {
                            setSupportingActor2(event.target.value);
                        }}
                    />
                    <br/>                     
                    <input
                        name="productionYear"
                        style={{ 
                            marginTop: "90px",
                            height: "30px", 
                            width: "200px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Production Year"
                        onChange={(event) => {
                            setProductionYear(event.target.value);
                        }}
                    />
                     <input
                        name="durationMin"
                        style={{ 
                            height: "30px", 
                            width: "200px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Duration Minutes"
                        onChange={(event) => {
                            setDurationMin(event.target.value);
                        }}
                    />
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
export default DetailsForm;