import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
import { Button, Col, Row } from "antd";
import RequestApproval from "../components/Epk/Input/requestApproval";

function TestApproval() {
    return (
    <div>
      <RequestApproval />
    </div>
  );
}
export default TestApproval;
