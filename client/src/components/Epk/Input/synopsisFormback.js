import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import DragUpload from "../../dragUpload";
import UploadImage from "../../uploadImage";
import Upload1 from "../../Upload1";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";
import AllSynopsis from "../Present/allSynopsis";

const SynopsisForm = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [short, setshort] = useState(null);
  const [medium, setMedium] = useState(null);
  const [long, setslong] = useState(null);
  const [synopsisList, setSynopsisList] = useState(null);

  const submit = () => {
    const shortSynopsis = {
      epk: 1,
      image: image1,
      text: short,
      type: "short",
    };
    const mediumSynopsis = {
      epk: 1,
      image: image2,
      text: medium,
      type: "medium",
    };
    const longSynopsis = {
      epk: 1,
      image: image3,
      text: long,
      type: "long",
    };
    createEpkSynopsis(shortSynopsis, mediumSynopsis, longSynopsis);

    async function createEpkSynopsis(
      shortSynopsis,
      mediumSynopsis,
      longSynopsis
    ) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/epk/createEpkSynopsis`,
        {
          method: "POST",
          body: JSON.stringify({
            shortSynopsis: shortSynopsis,
            mediumSynopsis: mediumSynopsis,
            longSynopsis: longSynopsis,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const synopsisList = await response.json();

      console.log(synopsisList.shortSynopsis);
      setSynopsisList(synopsisList);
      localStorage.setItem("synopsisList", synopsisList);
      window.location = "/epk";

      /*  console.log(shortSynopsis);
      console.log(mediumSynopsis);
      console.log(longSynopsis);*/
    }
  };
  const handleShort = (event) => {
    setshort(event.target.value);
    console.log(short);
  };
  const handleMedium = (event) => {
    setMedium(event.target.value);
    console.log(medium);
  };
  const handleLong = (event) => {
    setslong(event.target.value);
    console.log(long);
  };

  return (
    <>
      {" "}
      <h1 className="text-center text-primary">synopsis</h1>
      <br />
      <Row
        justify="space-around"
        className="text-center "
        /*  style={{height: "70vh" }}*/
      >
        <Col span={6} className="m-2 bg-light">
          <h4>short synopsis</h4>
          <textarea
            name="short"
            style={{ height: "200px", width: "300px" }}
            placeholder="max 30 words"
            onChange={handleShort}
          />
          <UploadFile setImage={setImage1} />
          {image1 && (
            <img
              src={image1}
              alt="hey"
              style={{ height: "350px", width: "300px" }}
            />
          )}
        </Col>
        <Col span={6} className="m-2 bg-light">
          <h4>long synopsis</h4>
          <textarea
            name="medium"
            style={{ height: "200px", width: "300px" }}
            placeholder="max 70 words"
            onChange={handleMedium}
          ></textarea>
          <UploadFile setImage={setImage2} />
          {image2 && (
            <img
              src={image2}
              alt="hey"
              style={{ height: "350px", width: "300px" }}
            />
          )}
        </Col>
        <Col span={6} className="m-2 bg-light">
          <h4>medium synopsis</h4>
          <textarea
            name="long"
            style={{ height: "200px", width: "300px" }}
            placeholder="max 120 words"
            onChange={handleLong}
          ></textarea>
          <UploadFile setImage={setImage3} />
          {image3 && (
            <img
              src={image3}
              alt="hey"
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
export default SynopsisForm;
