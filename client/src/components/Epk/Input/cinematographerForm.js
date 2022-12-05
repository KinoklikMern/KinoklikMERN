import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";

const CinematographerForm = () => {
    const [image, setImage] = useState(null);
    const [biography, setBiography] = useState(null);
    const [cinematographerList, setCinematographerList] = useState(null);
    const epkID = 3;
    const submit = () => {

        const cinematographerList1 = [
            { epk: epkID, image: image, text: biography },
        ];
        console.log(cinematographerList1);
        createEpkCinematographer(cinematographerList1);

        async function createEpkCinematographer(cinematographerList1) {
            const response = await fetch("http://localhost:8000/epk/EpkCinematographer", {
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
    const handleBiography = (event) => {
        setBiography(event.target.value);
        console.log(biography);
    };


    return (
        <>
            {" "}
            <h1 className="text-center text-primary">Cinematographer</h1>
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col span={6} className="m-2 bg-light">
                    <h4>Cinematographer</h4>
                    <textarea
                        name="biography"
                        style={{ height: "200px", width: "300px" }}
                        placeholder="Enter Cinematographer's Biography here."
                        onChange={handleBiography}
                    />
                    <UploadFile setImage={setImage} />
                    {image && (
                        <img
                            src={image}
                            alt="dir"
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
export default CinematographerForm;