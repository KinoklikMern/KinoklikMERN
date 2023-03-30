import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import avatarDefault from "../../../images/avatar1.jpeg";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((user) => ({ ...user }));
  const [userProfileData, setUserProfileData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState([]);
  const inputFileRef = useRef(null);
  const [filename, setFilename] = useState("");

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
        // alert("Updated profile successfully!");
        console.log(res);
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
    <form className="tw-h-full">
      <div className="tw-grid tw-h-full tw-grid-cols-4 tw-gap-2 tw-py-4">
        <div className="tw-mx-4 tw-my-8 tw-flex tw-flex-col tw-justify-self-center">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            defaultValue={userProfileData.firstName}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            defaultValue={userProfileData.lastName}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={userProfileData.email}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            defaultValue={userProfileData.phone}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            defaultValue={userProfileData.website}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            defaultValue={userProfileData.city}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            defaultValue={userProfileData.province}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            defaultValue={userProfileData.country}
            onChange={handleProfileChange}
            className="tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 "
          />
        </div>
        <div className="tw-mx-4 tw-my-8 tw-self-center tw-justify-self-center">
          <img
            className="tw-rounded-full"
            src={user.picture}
            alt="profile image"
          />
          <input
            type="file"
            onChange={fileSelected}
            ref={inputFileRef}
            accept="image/*"
            className="hover:tw-file:bg-violet-100 tw-block tw-w-full tw-text-sm tw-text-slate-500 file:tw-mr-4 file:tw-rounded-full file:tw-border-0 file:tw-bg-violet-50 file:tw-py-2 file:tw-px-4 file:tw-text-sm file:tw-font-semibold file:tw-text-violet-700"
          />
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
              onClick={() => saveUserProfile()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
