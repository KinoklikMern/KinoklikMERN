/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import Axios from "axios";
import {
  validatename,
  validateWebsite,
  validateEmail,
  validatePhone,
  validatelocation,
} from "./validation";
import { useTranslation } from "react-i18next";

export default function Studio() {
  const { t } = useTranslation();
  const [userStudioData, setUserStudioData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    country: "",
  });

  const [validationStudioErrors, setValidationStudioErrors] = useState({
    name: "",
    email: "",
    website: "",
    city: "",
    province: "",
    country: "",
    phone: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hasAgent, setHasAgent] = useState(true);

  const handlePermission = (decision) => {
    setHasAgent(decision);
    setDisabled(false);
  };

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

  // useEffect(() => {
  //   try {
  //     Axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${userId}`
  //     ).then((rs) => {
  //       if (rs.data) setUserStudioData(rs.data);
  //       console.log(userStudioData);
  //     });
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // }, [userId, userStudioData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/company/getCompanyByUser/${userId}`
        );
        if (response.data) {
          setUserStudioData(response.data);
          console.log(response.data); // Log the response data directly
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [userId]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setValidationStudioErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validatename(value)
          ? ""
          : t("Please fill out the required field"),
      }));
    } else if (name === "city" || name === "province" || name === "country") {
      setValidationStudioErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validatelocation(value)
          ? ""
          : t("Please enter a valid location"),
      }));
    } else if (name === "website") {
      setValidationStudioErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateWebsite(value) ? "" : t("Please enter a valid URL"),
      }));
    } else if (name === "email") {
      setValidationStudioErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value)
          ? ""
          : t("Please enter a valid email address"),
      }));
    } else if (name === "phone") {
      setValidationStudioErrors((prevErrors) => ({
        ...prevErrors,
        phone: validatePhone(value)
          ? ""
          : t("Please enter a valid phone number (10 to 15 digits)"),
      }));
    }

    setUserStudioData({ ...userStudioData, [name]: value });

    // Check for validation errors
    const hasErrors = Object.values(validationStudioErrors).some(
      (error) => error
    );

    // Set the "Save" button state based on validation errors and hasAgent value
    setDisabled(!hasAgent || hasErrors);
  };

  function saveUserStudio() {
    //console.log(userStudioData);
    const dataToUpdate = {
      ...userStudioData,
      hasAgent,
    };
    Axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/company/updateCompanyByUser/${userId}`,
      // userStudioData
      dataToUpdate
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
    <div className='tw-h-full tw-py-4 lg:tw-px-24'>
      <div className='tw-mt-8 tw-flex tw-flex-col'>
        {userRole === "Actor" && (
          <div className='tw-mb-3 tw-flex tw-items-center'>
            <p className='tw-mb-0 tw-ml-9 tw-text-[#1E0039]'>
              {t("Representation")}
            </p>
            <button
              onClick={() => handlePermission(true)}
              className={`tw-ml-5 tw-rounded-lg tw-px-2 tw-py-1 ${
                hasAgent
                  ? "tw-bg-[#1E0039] tw-text-white tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)]"
                  : "tw-bg-[#fff] tw-text-[#1E0039] tw-drop-shadow-[3px_3pprofilhandleProfileChangex_10px_rgba(113,44,176,0.25)]"
              }`}
            >
              {t("Yes")}
            </button>
            <button
              onClick={() => handlePermission(false)}
              className={`tw-ml-4 tw-rounded-lg tw-px-2 tw-py-1 ${
                !hasAgent
                  ? "tw-bg-[#1E0039] tw-text-white tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)]"
                  : "tw-bg-[#fff] tw-text-[#1E0039] tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)]"
              }`}
            >
              {t("No")}
            </button>
          </div>
        )}
        {hasAgent && (
          <>
            <input
              type='text'
              name='name'
              placeholder={
                userRole === t("Actor") ? t("Agent Name") : t("Studio Name")
              }
              defaultValue={userStudioData.name}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.name && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.name}
              </div>
            )}
            <input
              type='text'
              name='website'
              placeholder={
                userRole === t("Actor")
                  ? t("Agent Website")
                  : t("Studio Website")
              }
              defaultValue={userStudioData.website}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.website && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.website}
              </div>
            )}

            <input
              type='text'
              name='email'
              placeholder={
                userRole === t("Actor") ? t("Agent Email") : t("Studio Email")
              }
              defaultValue={userStudioData.email}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.email && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.email}
              </div>
            )}
            <input
              type='text'
              name='phone'
              placeholder={t("Phone")}
              defaultValue={userStudioData.phone}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.phone && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.phone}
              </div>
            )}
            <input
              type='text'
              name='city'
              placeholder={t("City")}
              defaultValue={userStudioData.city}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.city && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.city}
              </div>
            )}
            <input
              type='text'
              name='province'
              placeholder={t("Province")}
              defaultValue={userStudioData.province}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.province && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.province}
              </div>
            )}
            <input
              type='text'
              name='country'
              placeholder={t("Country")}
              defaultValue={userStudioData.country}
              onChange={handleProfileChange}
              disabled={!hasAgent}
              className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
            />
            {validationStudioErrors.country && (
              <div className='tw-text-red-500'>
                {validationStudioErrors.country}
              </div>
            )}
          </>
        )}
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Example Modal'
          appElement={document.getElementById("root")}
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
            <h2>{t("Updated successfully!")}</h2>
            <br />
            <button className='btn btn-secondary btn-sm' onClick={closeModal}>
              {t("Ok")}
            </button>
          </div>
        </Modal>
      </div>
      <div className='tw-text-end'>
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
            onClick={() => saveUserStudio()}
          >
            {t("Save")}
          </button>
        )}
      </div>
    </div>
  );
}
