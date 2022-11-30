import React from "react";
//import UploadImage from "../../upload";
import DragUpload from "../../dragUpload";
import UploadImage from "../../uploadImage";
import Upload1 from "../../Upload1";
import UploadFile from "../../FileUpload";
import { Button, Form, Input, Col, Upload, Row } from "antd";
const synopsisForm = () => {
  return (
    <>
      <h1>synopsis</h1>
      <Row justify="space-around" className="text-center ">
        <Col span={6} className="m-2 bg-primary">
          col-4
          <UploadImage />
        </Col>
        <Col span={6} className="m-2 bg-primary">
          col-4
          <UploadFile />
        </Col>
        <Col span={6} className="m-2 bg-primary">
          col-4
          <Upload1 />
        </Col>
      </Row>
    </>
  );
};
export default synopsisForm;
