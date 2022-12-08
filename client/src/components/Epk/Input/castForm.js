import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";

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
    const epkID = 4;
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
            const response = await fetch("http://localhost:8000/epk/EpkCast", {
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
            {" "}
            <h1 className="text-center text-primary">Cast</h1>
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col span={16} className="m-2 bg-light">
                    <div className="row">
                    <div className="col">
                    <h3> Lead Actor</h3>

                    <input
                        name="name"
                        style={{ height: "20px", width: "300px" }}
                        placeholder="Enter Lead Actor's Name here."
                    onChange={(event) => {
                    setLeadActor1Name(event.target.value);
                }}
                />

                <textarea
                        name="biography"
                        style={{ height: "200px", width: "300px" }}
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
                        style={{ height: "350px", width: "300px" }}
                    />
                )}
            </div>
            <div className="col">
              <h3> Lead Actor</h3>

              <input
                    name="name"
                    style={{ height: "20px", width: "300px" }}
                    placeholder="Enter Lead Actor's Name here."
                    onChange={(event) => {
                    setLeadActor2Name(event.target.value);
                }}
              />
                <textarea
                        name="biography"
                        style={{ height: "200px", width: "300px" }}
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
                        style={{ height: "350px", width: "300px" }}
                    />
                )}
            </div>
            <div className="col">
              <h3> Supporting Actor</h3>

              <input
                    name="name"
                    style={{ height: "20px", width: "300px" }}
                    placeholder="Enter Suporting Actor's Name here."
                onChange={(event) => {
                  setSupportingActor1Name(event.target.value);
                }}
              />

            <textarea
                name="biography"
                style={{ height: "200px", width: "300px" }}
                placeholder="Enter Suporting Actor's Biography here."
                onChange={(event) => {
                  setSupportingActor1Biography(event.target.value);
                }}
              />
                <UploadFile setImage={setSupportingActor1Img_url} />
                {supportingActor1Img_url && (
                    <img
                        src={supportingActor1Img_url}
                        alt="dir"
                        style={{ height: "350px", width: "300px" }}
                    />
                )}
            </div>
            <div className="col">
              <h3> Supporting Actor</h3>

              <input
                    name="name"
                    style={{ height: "20px", width: "300px" }}
                    placeholder="Enter Suporting Actor's Name here."
                    onChange={(event) => {
                    setSupportingActor2Name(event.target.value);
                }}
              />

            <textarea
                name="biography"
                style={{ height: "200px", width: "300px" }}
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
                        style={{ height: "350px", width: "300px" }}
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
            <Row>
                    <button className="btn btn-primary" style={{marginLeft: "75%"}} onClick={submit} value="save">Save</button>
            </Row>

        </>
    );
};
export default CastForm;