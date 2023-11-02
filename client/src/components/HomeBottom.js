import React, { useState } from "react";
import UploadIcon from "../images/icons/UploadIcon.svg";
import "../styles/HomeBottom.css";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const HomeBottom = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [isShowMessage, setIsShowMessage] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  const clickHandler = () => {
    if (user?.role !== "Filmmaker") {
      setIsShowMessage(true);
    } else {
      navigate("/uploadFepk");
    }
  };

  const PopupModal = () => {
    return (
      <>
        <Modal
          show={isShowMessage}
          onHide={() => setIsShowMessage(false)}
          centered
          className='p-3'
        >
          <Modal.Header className='border-0'>
            <Modal.Title className='text-center'>
              Only Filmmaker account can upload film EPK. Please register a
              Filmmaker account to complete this action.
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer
            style={{
              border: "none",
              display: "flex",
              justifyContent: "center",
            }}
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
              onClick={() => setIsShowMessage(false)}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div className='upload'>
      <p className='uploadtext'>
        Promote your film for free, with KinoKlik EPK !
      </p>
      <div onClick={clickHandler} className='uploadFilm'>
        <img src={UploadIcon} className='uploadIcon' alt='' />
      </div>
      <PopupModal />
    </div>
  );
};
export default HomeBottom;
