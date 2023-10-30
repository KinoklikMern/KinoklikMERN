import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../../../api/user";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const handleChange = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);

    if (e.target.id === "password") setPassword(e.target.value);
  };
  const handleSubmit = () => {
    if (email && password) {
      login(email, password).then((res) => {
        if (res.status === 200) {
          dispatch({ type: "LOGIN", payload: res.data });
          Cookies.set("user", JSON.stringify(res.data));
          props.close();
          props.setRefresh(true);
        } else {
          setErrorMsg(res);
        }
      });
    }
  };
  return (
    <>
      <Modal
        show={props.open}
        onHide={props.close}
        centered
        className="p-3 tw-text-[#1E0039]"
      >
        <Modal.Header className="border-0">
          <Modal.Title className="text-center">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="text-danger">{errorMsg}</span>
          <Form>
            <Form.Group
              controlId="email"
              className="my-3"
              value={email}
              onChange={handleChange}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control as="input" type="email" rows={4} placeholder="" />
            </Form.Group>
            <Form.Group
              className="my-3"
              controlId="password"
              value={password}
              onChange={handleChange}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                as="input"
                type="password"
                rows={4}
                placeholder=""
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ border: "none", display: "flex", justifyContent: "center" }}
        >
          <div className="tw-text-center">
            <Button
              style={{
                backgroundColor: "#fff",
                border: "none",
                color: "#1E0039",
                boxShadow: "3px 3px 10px #712CB0",
                width: "25%",
                padding: "0",
              }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <p className="tw-mt-3">
              Don't have an account yet?{" "}
              <a href="/signup" className="tw-text-[#581396]">
                Create Account
              </a>
            </p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
