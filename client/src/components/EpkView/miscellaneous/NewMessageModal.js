import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ChatState } from "../../../context/ChatProvider";
import { addToChat } from "../../../api/epks";
import { io } from "socket.io-client";
import { NotificationContext } from "../../../context/NotificationContext";

let socket;
export default function NewMessageModal(props) {
  const { notification, setNotification } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [msg, setMsg] = useState("");

  const { incrementMessage, messageCount, setMessageCount, setFilmmakerInfo } =
    useContext(NotificationContext);
  const handleChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmit = () => {
    if (msg.length > 0) {
      try {
        addToChat(msg, props.user, props.filmmakerId).then((res) => {
          if (res.status === 200) {
            // Yeming added
            incrementMessage();
            setFilmmakerInfo(props.filmmakerId);

            socket.emit("new message", res.data);
            props.close("message");
            // props.setRefresh(true);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    console.log("messageCount updated: ", messageCount);
  }, [messageCount]);

  useEffect(() => {
    socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.emit("setup", props.user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    // console.log("selectchat", selectedChatCompare);
    socket.on("message recieved", (newMessageRecieved) => {
      // notification
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
      }
    });
  }, [notification]);
  return (
    <>
      <Modal
        show={() => props.open("message")}
        onHide={() => props.close("message")}
        centered
        className="p-3"
      >
        <Modal.Header className="border-0">
          <Modal.Title className="text-center px-3">
            Please type your message to the Filmmaker EPK Owner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="my-3"
              controlId="exampleForm.ControlTextarea1"
              value={msg}
              onChange={handleChange}
            >
              <Form.Control
                style={{ height: "200px", resize: "none" }}
                as="textarea"
                rows={4}
                placeholder="eg. Hello Filmmaker, I’m interested to see your film EPK and possibly purchase the rights. Let’s connect and talk! "
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ border: "none", display: "flex", justifyContent: "center" }}
        >
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
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
