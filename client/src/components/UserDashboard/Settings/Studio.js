import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Axios from "axios";

export default function Studio() {
  const [userStudioData, setUserStudioData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    country: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  useEffect(() => {
    try {
      Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${userId}`
      ).then((rs) => {
        if (rs.data) setUserStudioData(rs.data);
        console.log(userStudioData);
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUserStudioData({ ...userStudioData, [name]: value });
    setDisabled(false);
    //console.log(userStudioData);
  };

  function saveUserStudio() {
    //console.log(userStudioData);
    Axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/company/updateCompanyByUser/${userId}`,
      userStudioData
    )
      .then((res) => {
        setModalIsOpen(true);
        // alert("Updated profile successfully!");
        //console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

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
    <div className="tw-grid tw-h-full tw-grid-cols-4 tw-gap-2 tw-py-4">
      <div className="tw-col-start-2 tw-mt-8 tw-flex tw-flex-col tw-justify-self-center">
        <input
          type="text"
          name="name"
          placeholder="Studio Name"
          defaultValue={userStudioData.name}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <input
          type="text"
          name="website"
          placeholder="Studio Website"
          defaultValue={userStudioData.website}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <input
          type="text"
          name="email"
          placeholder="Studio Email"
          defaultValue={userStudioData.email}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          defaultValue={userStudioData.phone}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          defaultValue={userStudioData.city}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          defaultValue={userStudioData.province}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          defaultValue={userStudioData.country}
          onChange={handleProfileChange}
          className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
        />
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
            <h2>Updated studio successfully!</h2>
            <br />
            <button className="btn btn-secondary btn-sm" onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      </div>
      <div className="tw-col-start-4 tw-place-self-end tw-px-12">
        {disabled === true ? (
          <button
            disabled
            className="tw-rounded-full tw-py-2 tw-px-8 disabled:tw-border-slate-200 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-shadow-none"
          >
            Save
          </button>
        ) : (
          <button
            className="tw-rounded-full tw-py-2 tw-px-8 tw-text-[#1E0039] tw-shadow-md tw-shadow-[#1E0039]/50"
            onClick={() => saveUserStudio()}
          >
            Save
          </button>
        )}
      </div>
    </div>
    //</form>
  );
}
