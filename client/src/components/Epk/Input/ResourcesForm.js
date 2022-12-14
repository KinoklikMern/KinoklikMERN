import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import DragUpload from "../../dragUpload";
import UploadImage from "../../uploadImage";
import Upload1 from "../../Upload1";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";

const ResourcesForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState(null);
  const [resourcesList, setResourcesList] = useState(null);
  const epkID = 4;
  const submit = () => {
    const resourcesList1 = [
      {
        epk: epkID,
        image: image,
        title: title,
        time: time,
        description: description,
      },
    ];
    console.log(resourcesList1);
    createEpkResources(resourcesList1);

    async function createEpkResources(resourcesList1) {
      const response = await fetch("http://localhost:8000/epk/epkResources", {
        method: "POST",
        body: JSON.stringify({
          resourcesList: resourcesList1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const resourcesList = await response.json();

      setResourcesList(resourcesList);
      // localStorage.setItem("epk", 1);
      //window.location = "/epk";

      /*  console.log(shortResources);
      console.log(mediumResources);
      console.log(longResources);*/
    }
  };

  const handleImage = (event) => {
    setImage(event.target.value);
    console.log(image);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };
  const handleTime = (event) => {
    setTime(event.target.value);
    console.log(time);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
    console.log(description);
  };

  return (
    <>
      {" "}
      <h1 className="text-center text-primary">resources</h1>
      <br />
      <Row
        justify="space-around"
        className="text-center "
        /*  style={{height: "70vh" }}*/
      >
        <UploadFile setImage={setImage} />
        <div
          style={{
            height: "320px",
            width: "300px",
            border: "solid 1px",
            borderColor: "blue",
          }}
        >
          {image && (
            <img
              src={image}
              alt="hey"
              style={{ height: "320px", width: "300px" }}
            />
          )}
        </div>

        <Col span={6} className="m-2 bg-light">
          <h4>Name</h4>
          <textarea
            name="short"
            style={{ height: "200px", width: "300px" }}
            placeholder="max 30 words"
            onChange={handleTitle}
          />
        </Col>
        <Col span={6} className="m-2 bg-light">
          <h4>Time needed</h4>
          <textarea
            name="medium"
            style={{ height: "200px", width: "300px" }}
            placeholder="max 70 words"
            onChange={handleTime}
          ></textarea>
        </Col>
        <Col span={6} className="m-2 bg-light">
          <h4>Description</h4>
          <textarea
            name="long"
            style={{ height: "200px", width: "300px" }}
            placeholder="max 120 words"
            onChange={handleDescription}
          ></textarea>
        </Col>
      </Row>
      <Row justify="space-around" className="text-center ">
        <div
          style={{
            height: "50px",
            width: "120px",
          }}
        >
          <Button type="primary" block onClick={submit} value="save">
            save
          </Button>
        </div>
      </Row>
    </>
  );
};
export default ResourcesForm;
