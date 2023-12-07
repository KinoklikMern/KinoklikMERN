import React, { useState } from "react";
import UploadIcon from "../images/icons/UploadIcon.svg";
import "../styles/HomeBottom.css";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeBottom = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
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
              {t(
                "Only Filmmaker account can upload film EPK. Please register a"
              )}
              {t(" Filmmaker account to complete this action.")}
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
              {t("OK")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div className='upload'>
      <p className='uploadtext'>
        {t("Promote your film for free, with KinoKlik EPK !")}
      </p>
      <div onClick={clickHandler} className='uploadFilm'>
        <img src={UploadIcon} className='uploadIcon' alt='' />
      </div>
      <PopupModal />
    </div>
  );
};
export default HomeBottom;
