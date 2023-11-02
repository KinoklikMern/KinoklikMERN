/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useSelector } from "react-redux";
import { React, useEffect, useState, useRef } from "react";
import Modal from "react-modal";

export default function Profile() {
  const [message, setMessage] = useState([]);
  const inputFileRef = useRef(null);
  const [filename, setFilename] = useState("");
  //const [userProfileData, setUserProfileData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [userProfileData, setUserProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    province: "",
    age: "",
    ethnicity: "",
    sex: "",
    country: "",
    facebook_url: "",
    facebook_followers: "",
    instagram_url: "",
    instagram_followers: "",
    twitter_url: "",
    twitter_followers: "",
    aboutMe: "",
    picture: "",
  });

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
        // console.log(userProfileData);
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [userId]);

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
    // console.log(userProfileData);
  };

  function saveUserProfile() {
    Axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${userId}`,
      userProfileData
    )
      .then((res) => {
        setModalIsOpen(true);
        // alert("Updated profile successfully!");
        // console.log(res.data);
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

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  return (
    //<form className="tw-h-full">
    <div className='tw-container'>
      <div className='tw-grid tw-h-full tw-grid-cols-1 tw-gap-2 tw-py-4 md:tw-grid-cols-2 lg:tw-grid-cols-4'>
        <div className='tw-mx-auto tw-my-8 tw-flex tw-flex-col'>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={userProfileData.firstName}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={userProfileData.lastName}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={userProfileData.email}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone'
            value={userProfileData.phone}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='website'
            placeholder='Website'
            value={userProfileData.website}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='city'
            placeholder='City'
            value={userProfileData.city}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='province'
            placeholder='Province'
            value={userProfileData.province}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
          <input
            type='text'
            name='country'
            placeholder='Country'
            defaultValue={userProfileData.country}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
        </div>

        <div className='tw-mx-4 tw-my-8 tw-flex tw-flex-col'>
          {user.role === "Actor" ? (
            <>
              <select
                type='text'
                name='sex'
                // placeholder="sexs"
                value={userProfileData.sex}
                onChange={handleProfileChange}
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
              >
                <option value=''>Playing Sexe</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
              <select
                type='text'
                name='ethnicity'
                // placeholder="ethnicity"
                value={userProfileData.ethnicity}
                onChange={handleProfileChange}
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
              >
                <option value=''>Ethnicity</option>
                <option value='Caucasion'>Caucasion</option>
                <option value='Hispanic'>Hispanic</option>
                <option value='African American'>African American</option>
                <option value='Asian'>Asian</option>
                <option value='Native'>Native</option>
              </select>
              <select
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
                type='text'
                name='age'
                // placeholder="age"
                value={userProfileData.age}
                onChange={handleProfileChange}
              >
                <option value=''>Age Range</option>
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
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
              >
                <option value=''>Height</option>
                <option value={"4'10"}>4'10" or below</option>
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
                <option value={"7'0"}>7'0" or above</option>
              </select>
              <select
                type='text'
                name='eyesColor'
                value={userProfileData.eyesColor}
                onChange={handleProfileChange}
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
              >
                <option value=''>Eyes Color</option>
                <option value='Black'>Black</option>
                <option value='Blue'>Blue</option>
                <option value='Brown'>Brown</option>
                <option value='Hazel'>Hazel</option>
                <option value='Grey'>Grey</option>
                <option value='Green'>Green</option>
                <option value='Amber'>Amber</option>
                <option value='Red'>Red</option>
                <option value='Violet'>Violet</option>
              </select>
              <select
                type='text'
                name='hairColor'
                value={userProfileData.hairColor}
                onChange={handleProfileChange}
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
              >
                <option value=''>Hair Color</option>
                <option value='Black'>Black</option>
                <option value='Blonde'>Blonde</option>
                <option value='Brown'>Brown</option>
                <option value='Red'>Red</option>
                <option value='Grey'>Grey</option>
                <option value='White'>White</option>
                <option value='Auburn'>Auburn</option>
                <option value='Salt & Pepper'>Salt & Pepper</option>
                <option value='Chestnut'>Chestnut</option>
                <option value='Bald'>Bald</option>
              </select>
              <select
                type='text'
                name='bodyBuild'
                value={userProfileData.bodyBuild}
                onChange={handleProfileChange}
                className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
              >
                <option value=''>Body Build</option>
                <option value='Slim'>Slim</option>
                <option value='Medium'>Medium</option>
                <option value='Muscular'>Muscular</option>
                <option value='Large'>Large</option>
                <option value='Very Large'>Very Large</option>
                <option value='Athletic'>Athletic/Toned</option>
                <option value='Curvy'>Curvy</option>
              </select>
            </>
          ) : null}
        </div>
        {/* Profile picture */}
        <div className='tw-mx-auto tw-my-8 tw-flex tw-flex-col md:tw-col-start-4'>
          <label htmlFor='profileImageUpload'>
            <div
              className='tw-h-[150px] tw-w-[150px] tw-cursor-pointer tw-rounded-full tw-bg-cover tw-bg-center'
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${userProfileData.picture})`,
              }}
              title='Click to change image'
            ></div>
          </label>
          <input
            id='profileImageUpload'
            type='file'
            onChange={fileSelected}
            ref={inputFileRef}
            accept='image/*'
            className='tw-hidden'
          />
        </div>

        {/* Save Button */}
        <div className='tw-col-start-4 tw-place-self-end tw-px-12'>
          {disabled === true ? (
            <button
              disabled
              className='tw-rounded-full tw-px-8 tw-py-2 disabled:tw-border-slate-200 disabled:tw-bg-slate-100 disabled:tw-text-slate-300 disabled:tw-shadow-none'
              style={{
                marginBottom: "20px",
              }}
            >
              Save
            </button>
          ) : (
            <button
              className='tw-rounded-full tw-px-8 tw-py-2 tw-text-[#1E0039] tw-shadow-md tw-shadow-[#1E0039]/50'
              onClick={() => saveUserProfile()}
            >
              Save
            </button>
          )}
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
            <h2>Updated profile successfully!</h2>
            <br />
            <button className='btn btn-secondary btn-sm' onClick={closeModal}>
              Ok
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
          <input
            type='text'
            name='facebook_followers'
            placeholder='Facebook Followers'
            value={userProfileData.facebook_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
        </div>

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
          <input
            type='text'
            name='instagram_followers'
            placeholder='Instagram Followers'
            value={userProfileData.instagram_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
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
          <input
            type='text'
            name='twitter_followers'
            placeholder='Twitter Followers'
            value={userProfileData.twitter_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
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
          <input
            type='text'
            name='youtube_subs'
            placeholder='Youtube Subs'
            value={userProfileData.youtube_subs}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
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
          <input
            type='text'
            name='linkedin_followers'
            placeholder='LinkedIn Followers'
            value={userProfileData.linkedin_followers}
            onChange={handleProfileChange}
            className='tw-m-2 tw-h-10 tw-w-full tw-rounded-lg tw-border-2 tw-px-8 tw-text-[#1E0039] tw-placeholder-slate-400 tw-drop-shadow-[3px_3px_10px_rgba(113,44,176,0.25)] placeholder:tw-text-slate-400 '
          />
        </div>
      </div>
    </div>
    //  </form>
  );
}
