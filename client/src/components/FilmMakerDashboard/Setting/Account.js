import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//Modal.setAppElement(document.body);
export default function Account() {
  const [message, setMessage] = useState([]);
  const [confirmed, setConfirmed] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleted, setDeleted] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let userId;
  let userRole;
  if (!user) {
    userId = "0";
    userRole = "noUser";
  } else {
    userId = user.id;
    userRole = user.role;
  }

  function deleteAccount() {
    setModalIsOpen(false);
    console.log(confirmed);

    Axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/users/deleteAccount/${userId}`
    )
      .then((res) => {
        console.log(res);
        // setConfirmed(true);
        // console.log(confirmed);
        setMessage(res.data.message);
        setConfirmed(true);
        console.log(confirmed);
        setDeleted(true);
        console.log(deleted);
        setModalIsOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        //alert(err.response.data.message);
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
    if (deleted === true) {
      Cookies.set("user", null);
      console.log(user);
      console.log("log out");
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      console.log(user);
      navigate("/");
    }
  }

  return (
    // <form className="tw-h-full">
    <div className="tw-grid tw-h-full tw-grid-cols-4 tw-gap-2 tw-py-4">
      <div className="tw-col-start-4 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center">
        <input
          placeholder="Account Type"
          defaultValue={user.role}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <button
          onClick={() => openModal()}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        >
          Delete Account
        </button>
        {/* <button className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 ">
          Confirm Delete Account
        </button> */}
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
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
            {confirmed ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => closeModal()}
              >
                Ok
              </button>
            ) : (
              <>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    // setConfirmed(true);
                    deleteAccount();
                  }}
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
    // </form>
  );
}
