/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { React, useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";
import Modal from "react-modal";
//import Modal from "@material-ui/core/Modal";
//import "react-modal/styles.css";
import { useTranslation } from 'react-i18next';

export default function FilmMakerDashboardSecurityProfile() {
  
  const [message, setMessage] = useState([]);
  const inputFileRef = useRef(null);
  const [filename, setFilename] = useState("");
  const [userProfileData, setUserProfileData] = useState([]);
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
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/getUser`, {
        id: userId,
      }).then((rs) => {
        setUserProfileData(rs.data);
        console.log(userProfileData);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [userId, userProfileData]);

  if (filename !== "") {
    userProfileData.picture = filename;
  }

  async function fileSelected(event) {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", event.target.files[0]);

    if (checkFileMimeType(file)) {
      
      try {
        const response = await Axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/uploadUserAvatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data !== undefined) {
          
          setFilename(response.data.key);
          setDisabled(false);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("error");
      setMessage(t("File must be a image(jpeg or png)"));
    }
  }

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUserProfileData({ ...userProfileData, [name]: value });
    setDisabled(false);
    console.log(userProfileData);
  };

  function saveUserProfile() {
    Axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`,
      userProfileData
    )
      .then((res) => {
        setModalIsOpen(true);
        // alert("Updated profile successfully!");
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    setDisabled(true);
  }

  const checkFileMimeType = (file) => {
    if (file !== "") {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }


  const { t } = useTranslation();

  return (
    <div className="filmmakerdash-container container-fluid">
      <div className="sidebar-container">
        <FilmmakerSideBar />

        <div className="sidebar-right sidebar-right-setting-container">
          <article
            className="tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="llanfairpwllgwyngyll-left-tab"
            id="dashboard"
          >
            <form>
              <div className=" sidebar-rightcontainer">
                <div className="item Dashboard">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    <ul id="settingsbar">
                      <li style={{ backgroundColor: "#391083" }}>
                        <Link
                          to="/filmMakerDashboardSecurityProfile"
                          className="security-links"
                        >
                          {t('Profile')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/filmMakerDashboardSecurityCompany"
                          className="security-links"
                        >
                          {t('Studio')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/filmMakerDashboardSecurityPassword"
                          className="security-links"
                        >
                          {t('Password')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/filmMakerDashboardSecurityAccount"
                          className="security-links"
                        >
                          {t('Account')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-inputs profile-inputs-margin">
                    <input
                      type="text"
                      name="firstName"
                      placeholder= {t("First Name")}
                      defaultValue={userProfileData.firstName}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="lastName"
                      placeholder= {t("Last Name")}
                      defaultValue={userProfileData.lastName}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="email"
                      placeholder= {t("Email")}
                      defaultValue={userProfileData.email}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="phone"
                      placeholder= {t("Phone")}
                      defaultValue={userProfileData.phone}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="website"
                      placeholder= {t("Website")}
                      defaultValue={userProfileData.website}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="city"
                      placeholder= {t("City")}
                      defaultValue={userProfileData.city}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="province"
                      placeholder= {t("Province")}
                      defaultValue={userProfileData.province}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="country"
                      placeholder= {t("Country")}
                      defaultValue={userProfileData.country}
                      onChange={handleProfileChange}
                    ></input>
                  </div>
                  <div className="side-id-2">
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${userProfileData.picture}`}
                      alt="User Avatar"
                      className="flex tw-max-h-18"
                    />
                    <label
                      htmlFor="userAvatar"
                      className="form-label text-dark"
                      style={{ fontSize: "25px" }}
                    >
                      {" "}
                      <h6 style={{ fontSize: "20px" }}>{t('Upload Avatar')}</h6>
                    </label>
                    <input
                      style={{ fontSize: "15px" }}
                      className="form-control form-control-sm"
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="userAvatar"
                      name="files"
                      accept="image/*"
                    ></input>
                  </div>
                  {/* <div style={{ display: "block", padding: 30 }}> */}
                  {/* <button onClick={openModal}>Show Modal</button> */}
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
                        <h2>{t('Updated profile successfully!')}</h2>
                        <br />
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={closeModal}
                        >
                          {t('Ok')}
                        </button>
                      </div>
                    </Modal>
                  </div>
                  <div className="d-flex justify-content-end settingsSaveBtn">
                    {disabled === true ? (
                      <button
                        disabled
                        className="btn btn-secondary"
                        onClick={() => saveUserProfile()}
                      >
                        {t('Save')}
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => saveUserProfile()}
                      >
                        {t('Save')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}
