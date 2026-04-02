import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addToRequests, addToChat } from "../../../api/epks";
import { io } from "socket.io-client";
import { ChatState } from "../../../context/ChatProvider";
import { NotificationContext } from "../../../context/NotificationContext";
import { useTranslation } from 'react-i18next';

let socket;
export default function RequestModal(props) {
  // eslint-disable-next-line no-unused-vars
  const [socketConnected, setSocketConnected] = useState(false);
  const [requestMsg, setRequestMsg] = useState("");
  const { notification, setNotification } = ChatState();

  const { incrementMessage, setUserInfo } = useContext(NotificationContext);

  const handleChange = (e) => {
    setRequestMsg(e.target.value);
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.emit("setup", props.user);
    socket.on("connection", () => setSocketConnected(true));
  }, [props.user]);

  useEffect(() => {
    // console.log("selectchat", selectedChatCompare);
    socket.on("message recieved", (newMessageRecieved) => {
      // notification
      if (!notification.includes(newMessageRecieved)) {
        setNotification([newMessageRecieved, ...notification]);
      }
    });
  });

  const handleSubmit = () => {
    if (requestMsg) {
      addToRequests(requestMsg, props.epkId, props.user.id).then((res) => {
        if (res) {
          addToChat(requestMsg, props.user, props.filmmakerId).then((res) => {
            if (res.status === 200) {
              incrementMessage();
              console.log(props.filmmakerId);
              setUserInfo(props.filmmakerId);

              socket.emit("new message", res.data);
              props.close("request");
              props.setRefresh(true);
            }
          });
        }
      });
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal
        show={() => props.open("request")}
        onHide={() => props.close("request")}
        centered
        className="p-3"
      >
        <Modal.Header className="border-0">
          <Modal.Title className="text-center">
            {t('Please type your message to the Filmmaker EPK Owner')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="my-3"
              controlId="exampleForm.ControlTextarea1"
              value={requestMsg}
              onChange={handleChange}
            >
              <Form.Control
                style={{ height: "200px", resize: "none" }}
                as="textarea"
                rows={4}
                placeholder={t("eg. Hello Filmmaker, I’m interested to see your film EPK and possibly purchase the rights. Let’s connect and talk! ")}
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
            {t('Submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
