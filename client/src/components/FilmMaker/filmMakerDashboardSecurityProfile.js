import { useSelector } from "react-redux";
import { React, useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./filmMakerDashboard.scss";
import FilmmakerSideBar from "./filmMakerSideBar";

export default function FilmMakerDashboardSecurityProfile() {
  const [profile, setProfile] = useState([]);
  const [file1, setFile1] = useState("");
  const inputFile1Ref = useRef(null);

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
        console.log(rs);
        setProfile(rs.data);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);

  // let newUser = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   website: "",
  // };

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const [userProfileData, setUserProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    website: user.website,
    //picture: user.picture
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setUserProfileData({ ...userProfileData, [name]: value });
    console.log(userProfileData);
    //setDisabled(false);
  };

  function saveUserProfile() {
    try {
      Axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`,
        userProfileData
      ).then((res) => {
        alert("Updated profile successfully!");
        console.log(res);
      });
    } catch (error) {
      alert(error.response.data.message);
    }

    //setDisabled(true);
    //window.location.reload();
  }
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
                      <li>
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
                      defaultValue={profile.firstName}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      defaultValue={profile.lastName}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      defaultValue={profile.email}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      defaultValue={profile.phone}
                      onChange={handleProfileChange}
                    ></input>
                    <input
                      type="text"
                      name="website"
                      placeholder="Website"
                      defaultValue={profile.website}
                      onChange={handleProfileChange}
                    ></input>
                    {/* <input
                    type="text"
                    id=""
                    name=""
                    placeholder="City"
                    value={profile.city}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="Province"
                    value={profile.province}
                  ></input>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="Country"
                    value={profile.country}
                  ></input> */}
                  </div>
                  <div className="side-id-2">
                    <img
                      src={user.picture}
                      alt="User Avatar"
                      className="flex tw-max-h-14"
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
                      filename={file1}
                      onChange={file1Selected}
                      ref={inputFile1Ref}
                      type="file"
                      id="userAvatar"
                      name="files"
                      accept="image/*"
                    ></input>
                  </div>

                  {/* <div class="side-id">
                  <FontAwesomeIcon icon={faUser} />
                </div> */}
                  <div className="d-flex justify-content-end settingsSaveBtn">
                    <button
                      // type="submit"
                      className="btn btn-secondary"
                      onClick={() => saveUserProfile()}
                    >
                      Save
                    </button>
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
