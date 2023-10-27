import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

Modal.setAppElement(document.body);

export default function Account() {
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const userId = user ? user.id : "0";
  const userRole = user ? user.role : "noUser";

  function deleteAccount() {
    setModalIsOpen(false);

    Axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/users/deleteAccount/${userId}`
    )
      .then((res) => {
        setMessage(res.data.message);
        setConfirmed(true);
        setDeleted(true);
        setModalIsOpen(true);
      })
      .catch((err) => {
        setMessage(err.message);
        setModalIsOpen(true);
      });

    setConfirmed(false);
  }

  function openModal() {
    setMessage("Confirmed delete Account?");
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);

    if (deleted) {
      Cookies.set("user", null);
      dispatch({ type: "LOGOUT", payload: null });
      navigate("/");
    }
  }

  return (
    <div className="tw-grid tw-h-full tw-grid-cols-4 tw-gap-2 tw-py-4">
      <div className="tw-col-start-4 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center">
        <input
          readOnly
          placeholder="Account Type"
          defaultValue={userRole}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <button
          onClick={openModal}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        >
          Delete Account
        </button>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
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
            {confirmed ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={closeModal}
              >
                Ok
              </button>
            ) : (
              <>
                <button
                  className="btn btn-secondary btn-sm mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={deleteAccount}
                   style={{ marginLeft: "25px" }}
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}