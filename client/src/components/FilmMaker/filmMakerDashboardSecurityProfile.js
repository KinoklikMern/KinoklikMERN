import { useSelector } from "react-redux";
import { React, useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";

export default function FilmMakerDashboardSecurityProfile() {
  const [message, setMessage] = useState([]);
  const inputFileRef = useRef(null);
  const [filename, setFilename] = useState("");
  const [userProfileData, setUserProfileData] = useState([]);
  const [disabled, setDisabled] = useState(true);

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
  }, []);

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
      setMessage("File must be a image(jpeg or png)");
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
        alert("Updated profile successfully!");
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
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/filmMakerDashboardSecurityCompany"
                          className="security-links"
                        >
                          Studio
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/filmMakerDashboardSecurityPassword"
                          className="security-links"
                        >
                          Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/filmMakerDashboardSecurityAccount"
                          className="security-links"
                        >
                          Account
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-inputs profile-inputs-margin">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      defaultValue={userProfileData.firstName}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      defaultValue={userProfileData.lastName}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      defaultValue={userProfileData.email}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      defaultValue={userProfileData.phone}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      defaultValue={userProfileData.website}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      defaultValue={userProfileData.city}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="province"
                      placeholder="Province"
                      defaultValue={userProfileData.province}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
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
                      <h6 style={{ fontSize: "20px" }}>Upload Avatar</h6>
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
                  <div className="d-flex justify-content-end settingsSaveBtn">
                    {disabled === true ? (
                      <button
                        disabled
                        className="btn btn-secondary"
                        onClick={() => saveUserProfile()}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => saveUserProfile()}
                      >
                        Save
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
