import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";

const ProducerForm = () => {
    const [image, setImage] = useState(null);
    const [biography, setBiography] = useState(null);
    const [header, setHeader] = useState(null);
    const [name, setName] = useState(null);
    const [producerList, setProducerList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const producerList1 = [
            { epk: epkID, image: image, header: header, name: name, biography: biography },
        ];
        console.log(producerList1);
        createEpkProducer(producerList1);

        async function createEpkProducer(producerList1) {
            const response = await fetch("http://localhost:8000/epk/EpkProducer", {
                method: "POST",
                body: JSON.stringify({
                    producerList: producerList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const producerList = await response.json();

            setProducerList(producerList);
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
            {" "}
            <h1 className="text-center text-primary">Producer</h1>
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col style={{width: "1000px"}} className="m-2 bg-light">
                <div className="row">
                    <div className="col">
                    {/* <h4>Producer</h4> */}
                    <input
                        name="name"
                        style={{ height: "20px", width: "300px" }}
                        placeholder="Enter Cinematographer's Name here."
                        onChange={handleName}
                    />
                    <input
                        name="header"
                        style={{ height: "20px", width: "300px" }}
                        placeholder="Enter Cinematographer's Header here."
                        onChange={handleHeader}
                    />
                    <textarea
                        name="biography"
                        style={{ height: "200px", width: "300px" }}
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
                            style={{ height: "300px"}}
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
          <Button type="primary" block onClick={submit} value="save">
            Save
          </Button>
        </div>
      </Row>
        </>
    );
};
export default ProducerForm;