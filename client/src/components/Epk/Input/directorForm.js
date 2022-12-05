import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";

const DirectorForm = () => {
    const [image, setImage] = useState(null);
    const [biography, setBiography] = useState(null);
    const [directorList, setDirectorList] = useState(null);
    const epkID = 3;
    const submit = () => {

        const directorList1 = [
            { epk: epkID, image: image, text: biography },
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
    const handleBiography = (event) => {
        setBiography(event.target.value);
        console.log(biography);
    };


    return (
        <>
            {" "}
            <h1 className="text-center text-primary">Director</h1>
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col span={6} className="m-2 bg-light">
                    <h4>Director</h4>
                    <textarea
                        name="biography"
                        style={{ height: "200px", width: "300px" }}
                        placeholder="Enter Director's Biography here."
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
export default DirectorForm;