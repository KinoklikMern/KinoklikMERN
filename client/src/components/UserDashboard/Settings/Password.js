/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

export default function Password() {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const [pwdShow, setPwdShow] = useState(false);
  const [rePwdShow, setRePwdShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState([]);

  // fetching user
  const user = useSelector((state) => state.user);
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }

  const [userPasswordData, setUserPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
    userId: userId,
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUserPasswordData({ ...userPasswordData, [name]: value });
    setDisabled(false);
    //console.log(userStudioData);
  };

  function saveUserPassword() {
    //console.log(userStudioData);
    if (userPasswordData.newPassword !== userPasswordData.confirmPassword) {
      setMessage(t("Passwords don't match!"));
      setModalIsOpen(true);
    } else {
      Axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/changePassword`,
        userPasswordData
      )
        .then((res) => {
          console.log(res);
          setMessage(res.data.message);
          setModalIsOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.response.data.message);
          //alert(err.response.data.message);
          setModalIsOpen(true);
        });
    }
    setDisabled(true);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    //<form className="tw-h-full">
    <div className='tw-grid tw-h-full tw-grid-cols-4 tw-gap-2 tw-py-4'>
      <div className='tw-col-start-3 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center '>
        <div className='tw-flex tw-gap-2'>
          <input
            name='newPassword'
            placeholder={t("New Password")}
            type={pwdShow ? "text" : "password"}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-gray-300 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-sm placeholder:tw-text-slate-400'
          />

          <span
            className='tw-w-1/6 tw-self-center'
            onClick={() => {
              setPwdShow(!pwdShow);
            }}
          >
            <FontAwesomeIcon icon={pwdShow ? faEye : faEyeSlash} />
          </span>
        </div>
        <div className='tw-flex tw-gap-2'>
          <input
            name='confirmPassword'
            placeholder={t("Confirm New Password")}
            type={rePwdShow ? "text" : "password"}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-gray-300 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-sm placeholder:tw-text-slate-400 '
          />

          <span
            className='tw-w-1/6 tw-self-center'
            onClick={() => {
              setRePwdShow(!rePwdShow);
            }}
          >
            <FontAwesomeIcon icon={rePwdShow ? faEye : faEyeSlash} />
          </span>
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Example Modal'
          appElement={document.getElementById("root")}
          style={{
            overlay: {
              // position: "fixed",
              // top: 0,
              // left: 0,
              // right: 0,
              // bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "absolute",
              border: "2px solid #000",
              backgroundColor: "white",
              boxShadow: "2px solid black",
              height: 120,
              width: 300,
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>{message}</h2>
            <br />
            <button className='btn btn-secondary btn-sm' onClick={closeModal}>
              {t("OK")}
            </button>
          </div>
        </Modal>
      </div>
      <div className='tw-col-start-4 tw-place-self-end tw-px-12'>
        {disabled === true ? (
          <button
            disabled
            className='tw-rounded-full tw-px-8 tw-py-2 disabled:tw-border-slate-200 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-shadow-none'
          >
            {t("Save")}
          </button>
        ) : (
          <button
            className='tw-rounded-full tw-px-8 tw-py-2 tw-text-[#1E0039] tw-shadow-md tw-shadow-[#1E0039]/50'
            onClick={() => saveUserPassword()}
          >
            {t("Save")}
          </button>
        )}
      </div>
    </div>
    //  </form>
  );
}
