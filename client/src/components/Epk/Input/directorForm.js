import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";

const DirectorForm = () => {
    const [image, setImage] = useState(null);
    const [biography, setBiography] = useState(null);
    const [header, setHeader] = useState(null);
    const [name, setName] = useState(null);
    const [directorList, setDirectorList] = useState(null);
    const epkID = 4;
    const submit = () => {

        const directorList1 = [
            { epk: epkID, image: image, header: header, name: name, biography: biography },
        ];
        console.log(directorList1);
        createEpkDirector(directorList1);

        async function createEpkDirector(directorList1) {
            const response = await fetch("http://localhost:8000/epk/EpkDirector", {
                method: "POST",
                body: JSON.stringify({
                    directorList: directorList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const directorList = await response.json();

            setDirectorList(directorList);
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
            {" "}
            <br />
            <h1 className="text-center" style={{ color: "#311465" }}>Director</h1>
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col style={{width: "1000px"}} className="m-2">
                    <div className="row">
                    <div className="col">
                    {/* <h4>Director</h4> */}
                    <input
                        name="name"
                        style={{ 
                            height: "20px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Director's Name"
                        onChange={handleName}
                    />
                    <input
                        name="header"
                        style={{ 
                            height: "20px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}                        placeholder="Header"
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
,
                        }}
                        placeholder="Enter Director's Biography here."
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
            marginLeft: "1200px"
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
export default DirectorForm;