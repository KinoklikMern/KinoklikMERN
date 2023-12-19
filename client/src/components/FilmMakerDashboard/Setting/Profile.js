import Axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { React, useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import {
  validatename,
  validatePhone,
  validateWebsite,
  validateFollowers,
  cityInfo,
} from "./validation.js";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  const [message, setMessage] = useState([]);
  const inputFileRef = useRef(null);
  const [filename, setFilename] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const [userProfileData, setUserProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    province: "",
    country: "",
    sex: "",
    ethnicity: "",
    age: "",
    height: "",
    eyesColor: "",
    hairColor: "",
    bodyBuild: "",
    facebook_url: "",
    facebook_followers: "",
    instagram_url: "",
    instagram_followers: "",
    twitter_url: "",
    twitter_followers: "",
    youtube_subs: "",
    youtube_url: "",
    linkedin_followers: "",
    linkedin_url: "",
    aboutMe: "",
    picture: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    city: "",
    province: "",
    country: "",
    phone: "",
    website: "",
  });

  // fetching user
  const selectUser = (state) => state.user;
  const user = useSelector(selectUser, shallowEqual);
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
        //useng reduce to not set the parameters that are undefined from rs.data
        setUserProfileData((prevUserProfileData) => {
          return Object.keys(prevUserProfileData).reduce((acc, key) => {
            acc[key] =
              rs.data[key] !== undefined
                ? rs.data[key]
                : prevUserProfileData[key];
            return acc;
          }, {});
        });
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [userId]);

  if (filename !== "") {
    userProfileData.picture = filename;
  }

  async function fileSelected(event) {
    setMessage("");
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
      setMessage(t("File must be an image(jpeg, jpg or png)"));
    }
  }

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    if (name === "firstName" || name === "lastName") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validatename(value)
          ? ""
          : t("Please fill out the required field(more than 3 char)"),
      }));
    }

    if (name === "phone") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        phone: validatePhone(value)
          ? ""
          : t("Please enter a valid phone number (10 to 15 digits)"),
      }));
    }

    if (
      name === "website" ||
      name === "facebook_url" ||
      name === "twitter_url" ||
      name === "instagram_url" ||
      name === "youtube_url" ||
      name === "linkedin_url"
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateWebsite(value) ? "" : t("Please enter a valid URL"),
      }));
    }

    if (
      name === "facebook_followers" ||
      name === "linkedin_followers" ||
      name === "twitter_followers" ||
      name === "instagram_followers" ||
      name === "youtube_subs"
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateFollowers(value)
          ? ""
          : t("Please enter a valid number of followers"),
      }));
    }

    if (name === "city" && value in cityInfo) {
      const { province, country } = cityInfo[value];
      setUserProfileData((prevState) => ({
        ...prevState,
        [name]: value,
        province,
        country,
      }));
    } else if (name === "city" && value === "Other") {
      setUserProfileData((prevState) => ({
        ...prevState,
        [name]: value,
        province: "Other",
        country: "Other",
      }));
    } else if (name === "city" && value === "") {
      setUserProfileData((prevState) => ({
        ...prevState,
        [name]: value,
        country: "",
        province: "",
      }));
    } else {
      setUserProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    setDisabled(false);
  };

  function saveUserProfile() {
    // Check if there are any validation errors
    const hasErrors = Object.values(validationErrors).some((error) => error);

    if (!hasErrors) {
      Axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`,
        userProfileData
      )
        .then((res) => {
          setModalIsOpen(true);
          setDisabled(true);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      // Display a message or handle the errors appropriately
      alert(t("Please fix the validation errors before saving."));
    }
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

  useEffect(() => {
    if (userProfileData.picture) {
      const imageUrl = userProfileData.picture.startsWith("https")
        ? userProfileData.picture
        : `${process.env.REACT_APP_AWS_URL}/${userProfileData.picture}`;
      setBackgroundImageUrl(imageUrl);
    }
  }, [userProfileData.picture]);

  const closeModal = () => {
    setModalIsOpen(false);
    //added to see updated picture, may be removed
    //window.location.reload();
  };

  return (
    <div className='tw-container'>
      <div className='tw-flex tw-h-full tw-flex-col lg:tw-flex-row'>
        <div className='tw-mx-4 tw-my-8 tw-flex tw-flex-col lg:tw-w-1/3'>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={userProfileData.firstName}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          />
          {validationErrors.firstName && (
            <div className='tw-text-red-500'>{validationErrors.firstName}</div>
          )}

          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={userProfileData.lastName}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          />
          {validationErrors.lastName && (
            <div className='tw-text-red-500'>{validationErrors.lastName}</div>
          )}

          <input
            type='text'
            name='email'
            placeholder='Email'
            value={userProfileData.email}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
            disabled={disabled || userRole !== "noUser"}
          />

          {/* Phone input with validation error */}
          <input
            type='text'
            name='phone'
            placeholder={t("Phone")}
            value={userProfileData.phone}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          />
          {validationErrors.phone && (
            <div className='tw-text-red-500'>{validationErrors.phone}</div>
          )}

          <input
            type='text'
            name='website'
            placeholder={t("Website")}
            value={userProfileData.website}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          />
          {validationErrors.website && (
            <div className='tw-text-red-500'>{validationErrors.website}</div>
          )}
          <select
            type='text'
            name='city'
            value={userProfileData.city}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          >
            <option value=''>{t("Select City")}</option>
            <option value='Montreal'>{t("Montreal")}</option>
            <option value='Toronto'>Toronto</option>
            <option value='New York'>New York</option>
            <option value='Other'>{t("Other")}</option>
          </select>
          <select
            type='text'
            name='province'
            // placeholder="Province or State"
            value={userProfileData.province}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          >
            <option value=''>{t("Select Province")}</option>
            <option value='Quebec'>Quebec</option>
            <option value='Ontario'>Ontario</option>
            <option value='New York'>New York</option>
            <option value='Other'>{t("Other")}</option>
          </select>
          {validationErrors.province && (
            <div className='tw-text-red-500'>{validationErrors.province}</div>
          )}
          <select
            type='text'
            name='country'
            value={userProfileData.country}
            onChange={handleProfileChange}
            className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
          >
            <option value=''>{t("Select Country")}</option>
            <option value='Canada'>Canada</option>
            <option value='USA'>{t("USA")}</option>
            <option value='Other'>{t("Other")}</option>
          </select>
        </div>

        <div className='tw-mx-4 tw-my-8 tw-flex tw-flex-col lg:tw-w-1/3'>
          {user.role === "Actor" ? (
            <>
              <select
                type='text'
                name='sex'
                value={userProfileData.sex}
                onChange={handleProfileChange}
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
              >
                <option value='' hidden>
                  {t("Gender")}
                </option>
                <option value='Male'>{t("Male")}</option>
                <option value='Female'>{t("Female")}</option>
              </select>
              <select
                type='text'
                name='ethnicity'
                // placeholder="ethnicity"
                value={userProfileData.ethnicity}
                onChange={handleProfileChange}
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
              >
                <option value=''>{t("Ethnicity")}</option>
                <option value='Caucasion'>{t("Caucasion")}</option>
                <option value='Hispanic'>{t("Hispanic")}</option>
                <option value='African American'>
                  {t("African American")}
                </option>
                <option value='Asian'>{t("Asian")}</option>
                <option value='Native'>{t("Native")}</option>
              </select>
              <select
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
                type='text'
                name='age'
                // placeholder="age"
                value={userProfileData.age}
                onChange={handleProfileChange}
              >
                <option value=''>{t("Age Range")}</option>
                <option value={"4"}>3-5</option>
                <option value={"7"}>6-9</option>
                <option value={"11"}>10-12</option>
                <option value={"14"}>13-15</option>
                <option value={"18"}>16-20</option>
                <option value={"22"}>21-25</option>
                <option value={"28"}>26-29</option>
                <option value={"32"}>30-34</option>
                <option value={"37"}>35-44</option>
                <option value={"50"}>45-55</option>
                <option value={"60"}>56-66</option>
                <option value={"70"}>67-77</option>
                <option value={"80"}>78-89+</option>
              </select>
              <select
                type='text'
                name='height'
                value={userProfileData.height}
                onChange={handleProfileChange}
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
              >
                <option value=''>{t("Height")}</option>
                <option value={"4'10"}>4'10" {t("or below")}</option>
                <option value={"5'0"}>5'0"</option>
                <option value={"5'2"}>5'2"</option>
                <option value={"5'4"}>5'4"</option>
                <option value={"5'6"}>5'6"</option>
                <option value={"5'8"}>5'8"</option>
                <option value={"5'10"}>5'10"</option>
                <option value={"6'0"}>6'0"</option>
                <option value={"6'2"}>6'2"</option>
                <option value={"6'4"}>6'4"</option>
                <option value={"6'6"}>6'6"</option>
                <option value={"6'8"}>6'8"</option>
                <option value={"6'10"}>6'10"</option>
                <option value={"7'0"}>7'0" {t("or above")}</option>
              </select>
              <select
                type='text'
                name='eyesColor'
                value={userProfileData.eyesColor}
                onChange={handleProfileChange}
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
              >
                <option value=''>{t("Eyes Color")}</option>
                <option value='Black'>{t("Black")}</option>
                <option value='Blue'>{t("Blue")}</option>
                <option value='Brown'>{t("Brown")}</option>
                <option value='Hazel'>{t("Hazel")}</option>
                <option value='Grey'>{t("Grey")}</option>
                <option value='Green'>{t("Green")}</option>
                <option value='Amber'>{t("Amber")}</option>
                <option value='Red'>{t("Red")}</option>
                <option value='Violet'>{t("Violet")}</option>
              </select>
              <select
                type='text'
                name='hairColor'
                value={userProfileData.hairColor}
                onChange={handleProfileChange}
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
              >
                <option value=''>{t("Hair Color")}</option>
                <option value='Black'>{t("Black")}</option>
                <option value='Blonde'>{t("Blonde")}</option>
                <option value='Brown'>{t("Brown")}</option>
                <option value='Red'>{t("Red")}</option>
                <option value='Grey'>{t("Grey")}</option>
                <option value='White'>{t("White")}</option>
                <option value='Auburn'>{t("Auburn")}</option>
                <option value='Salt & Pepper'>{t("Salt & Pepper")}</option>
                <option value='Chestnut'>{t("Chestnut")}</option>
                <option value='Bald'>{t("Bald")}</option>
              </select>
              <select
                type='text'
                name='bodyBuild'
                value={userProfileData.bodyBuild}
                onChange={handleProfileChange}
                className='tw-my-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 lg:tw-w-3/4'
              >
                <option value=''>{t("Body Build")}</option>
                <option value='Slim'>{t("Slim")}</option>
                <option value='Medium'>{t("Medium")}</option>
                <option value='Muscular'>{t("Muscular")}</option>
                <option value='Large'>{t("Large")}</option>
                <option value='Very Large'>{t("Very Large")}</option>
                <option value='Athletic'>
                  {t("Athletic")}/{t("Toned")}
                </option>
                <option value='Curvy'>{t("Curvy")}</option>
              </select>
            </>
          ) : null}
        </div>

        {/* Profile picture */}
        <div className='tw-mx-auto tw-my-8 tw-flex tw-w-full tw-items-center tw-justify-around lg:tw-w-1/3 lg:tw-flex-col lg:tw-justify-between'>
          <label htmlFor='profileImageUpload'>
            <div
              className='tw-flex tw-h-[150px] tw-w-[150px] tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-cover tw-bg-center tw-text-2xl tw-font-semibold tw-text-black'
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
              }}
              title={t("Click to change image")}
            >
              {backgroundImageUrl.startsWith("https:") ? "Upload" : null}
            </div>
          </label>
          <input
            id='profileImageUpload'
            type='file'
            onChange={fileSelected}
            ref={inputFileRef}
            accept='image/*'
            className='tw-hidden'
          />
          {message && (
            <div className='message' style={{ color: "red" }}>
              {message}
            </div>
          )}

          {/* Save Button */}
          <div className=''>
            {disabled === true ? (
              <button
                disabled
                className='tw-rounded-full tw-px-8 tw-py-2 disabled:tw-border-slate-200 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-shadow-none'
                style={{
                  marginBottom: "20px",
                }}
              >
                {t("Save")}
              </button>
            ) : (
              <button
                className='tw-rounded-full tw-px-8 tw-py-2 tw-text-[#1E0039] tw-shadow-md tw-shadow-[#1E0039]/50'
                onClick={() => saveUserProfile()}
              >
                {t("Save")}
              </button>
            )}
          </div>
        </div>

        {/* Modal */}
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
            <h2>{t("Updated profile successfully!")}</h2>
            <br />
            <button
              className='btn btn-secondary btn-sm tw-border-none tw-bg-midnight tw-px-3'
              onClick={closeModal}
            >
              {t("Ok")}
            </button>
          </div>
        </Modal>
      </div>
      {/* Divider */}
      <hr className='tw-my-4 tw-border-gray-400' />
      <div className='tw-mx-auto tw-my-8 tw-grid tw-grid-cols-1 tw-gap-4 lg:tw-grid-cols-2'>
        <div className='tw-mx-auto tw-flex tw-items-center'>
          <i className='fa-brands fa-facebook tw-text-4xl'></i>
          <input
            type='text'
            name='facebook_url'
            placeholder='Facebook URL'
            value={userProfileData.facebook_url}
            onChange={handleProfileChange}
            className='tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.facebook_url && (
            <div className='tw-text-red-500'>
              {validationErrors.facebook_url}
            </div>
          )}
          <input
            type='text'
            name='facebook_followers'
            placeholder={t("Facebook Followers")}
            value={userProfileData.facebook_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
        </div>
        {validationErrors.facebook_followers && (
          <div className='tw-text-red-500'>
            {validationErrors.facebook_followers}
          </div>
        )}
        <div className='tw-mx-auto tw-flex tw-items-center'>
          <i className='fa-brands fa-instagram tw-text-4xl'></i>
          <input
            type='text'
            name='instagram_url'
            placeholder='Instagram URL'
            value={userProfileData.instagram_url}
            onChange={handleProfileChange}
            className='tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.instagram_url && (
            <div className='tw-text-red-500'>
              {validationErrors.instagram_url}
            </div>
          )}
          <input
            type='text'
            name='instagram_followers'
            placeholder={t("Instagram Followers")}
            value={userProfileData.instagram_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.instagram_followers && (
            <div className='tw-text-red-500'>
              {validationErrors.instagram_followers}
            </div>
          )}
        </div>
        <div className='tw-mx-auto tw-flex tw-items-center'>
          <i className='fa-brands fa-twitter tw-text-4xl'></i>
          <input
            type='text'
            name='twitter_url'
            placeholder='Twitter URL'
            value={userProfileData.twitter_url}
            onChange={handleProfileChange}
            className='tw-ml-3 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.twitter_url && (
            <div className='tw-text-red-500'>
              {validationErrors.twitter_url}
            </div>
          )}
          <input
            type='text'
            name='twitter_followers'
            placeholder={t("Twitter Followers")}
            value={userProfileData.twitter_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.twitter_followers && (
            <div className='tw-text-red-500'>
              {validationErrors.twitter_followers}
            </div>
          )}
        </div>
        <div className='tw-mx-auto tw-flex tw-items-center'>
          <i className='fa-brands fa-youtube tw-text-4xl'></i>
          <input
            type='text'
            name='youtube_url'
            placeholder='Youtube URL'
            value={userProfileData.youtube_url}
            onChange={handleProfileChange}
            className='tw-ml-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.youtube_url && (
            <div className='tw-text-red-500'>
              {validationErrors.youtube_url}
            </div>
          )}
          <input
            type='text'
            name='youtube_subs'
            placeholder={t("Youtube Subs")}
            value={userProfileData.youtube_subs}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.youtube_subs && (
            <div className='tw-text-red-500'>
              {validationErrors.youtube_subs}
            </div>
          )}
        </div>
        <div className='tw-mx-auto tw-flex tw-items-center'>
          <i className='fa-brands fa-linkedin tw-text-4xl'></i>
          <input
            type='text'
            name='linkedin_url'
            placeholder='LinkedIn URL'
            value={userProfileData.linkedin_url}
            onChange={handleProfileChange}
            className='tw-ml-4 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.linkedin_url && (
            <div className='tw-text-red-500'>
              {validationErrors.linkedin_url}
            </div>
          )}
          <input
            type='text'
            name='linkedin_followers'
            placeholder={t("LinkedIn Followers")}
            value={userProfileData.linkedin_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          {validationErrors.linkedin_followers && (
            <div className='tw-text-red-500'>
              {validationErrors.linkedin_followers}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
