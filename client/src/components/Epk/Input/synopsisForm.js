import React, { useState, useEffect } from "react";
//import UploadImage from "../../upload";
import DragUpload from "../../dragUpload";
import UploadImage from "../../uploadImage";
import Upload1 from "../../Upload1";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";
const SynopsisForm = () => {
  const [image, setImage] = useState(
    "image/c6035e3c5cf7f181b80e8270b2479540.png"
  );
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
            style={{ height: "200px", width: "300px" }}
            placeholder="max 30 words"
          ></textarea>
          <UploadFile />
        </Col>
        <Col span={6} className="m-2 bg-light">
          <h4>long synopsis</h4>
          <textarea
            style={{ height: "200px", width: "300px" }}
            placeholder="max 70 words"
          ></textarea>
          <UploadFile />
        </Col>
        <Col span={6} className="m-2 bg-light">
          <h4>medium synopsis</h4>
          <textarea
            style={{ height: "200px", width: "300px" }}
            placeholder="max 120 words"
          ></textarea>
          <UploadFile />
        </Col>
      </Row>
    </>
  );
};
export default SynopsisForm;
