import React, { useState, useRef, useEffect } from "react";
import "./UploadActorPic.css";
import http from "../../../http-common";
import instagramIcon from "../../../images/icons/002-instagram.svg";
import twiiterIcon from "../../../images/icons/005-twitter.svg";
import facebookIcon from "../../../images/icons/004-facebook-app-logo.svg";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function UploadActorPic({ user }) {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [fileBanner, setFileBanner] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const inputFile3Ref = useRef(null);
  const inputFile4Ref = useRef(null);
  const inputFileBannerRef = useRef(null);
  const videoRef = useRef(null);
  const [actor, setActor] = useState([]);
  const [profs, setProfs] = useState([]);
  const [message, setMessage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [duration, setDuration] = useState(0);
  const [textareaValue, setTextareaValue] = useState(user.aboutMe);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState("");

  let i1 = "";
  let i2 = "";
  let i3 = "";

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };
  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile3(file);
  };
  const file4Selected = (event) => {
    const file = event.target.files[0];
    setFile4(file);
  };
  // const fileBannerSelected = (event) => {
  //   const file = event.target.files[0];
  //   setFileBanner(file);

  //   if (file) {
  //     const videoUrl = URL.createObjectURL(file);
  //     videoRef.current.src = videoUrl;
  //     setDuration(videoRef.current.duration);
  //   }
  // };
  // ----- CHIHYIN -------
  const fileBannerSelected = (event) => {
    const file = event.target.files[0];
    setFileBanner(file);

    if (file) {
      const videoUrl = URL.createObjectURL(file);
      videoRef.current.srcObject = null; // Clear the current source object
      videoRef.current.src = videoUrl; // Set the new source
      videoRef.current.load(); // Load the new source

      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };
    }
  };

  const captureThumbnail = () => {
    // Get the canvas context
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // Set the canvas dimensions same as video
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    // Draw the video frame to canvas
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    // Convert canvas to data URL (base64 encoded image)
    const imageUrl = canvas.toDataURL("image/png");
    // Set the image URL to state
    setThumbnailImage(imageUrl);
  };
  // ----- CHIHYIN -------

  useEffect(() => {
    http.get(`users/getactor/${user.id}`).then((response) => {
      console.log("Fetched bannerImg:", response.data.bannerImg);
      setActor(response.data);
      setProfs(response.data.profiles);
      setTextareaValue(response.data.aboutMe);
      // ----- CHIHYIN -------
      setActorData({
        bannerImg: response.data.bannerImg,
        picture: response.data.picture,
        profiles: response.data.profiles,
      });
    });
  }, []);

  const navigate = useNavigate();
  const navigateToActor = () => {
    navigate(`/actor/${user.id}`, { state: { thumbnail: thumbnailImage } });
    console.log("Navigating...");
  };
  // ----- CHIHYIN -------

  const [actorData, setActorData] = useState({
    bannerImg: actor.bannerImg,
    picture: actor.picture,
    profiles: actor.profiles,
  });

  const checkFileMimeType = (file) => {
    if (file !== "") {
      if (
        file.type === "video/mp4" ||
        file.type === "video/mpeg" ||
        file.type === "video/quicktime" ||
        file.type === "video/x-ms-wmv" ||
        file.type === "video/ogg" ||
        file.type === "video/3gpp" ||
        file.type === "video/x-msvideo" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

  const editAbout = async (e) => {
    await http
      .put(`users/updateProfile/${user.id}`, {
        aboutMe: textareaValue,
      })
      .then((res) => {
        setModalIsOpen(true);
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEpkCover = async (e) => {
    e.preventDefault();
    let formDataBanner = new FormData();
    formDataBanner.append("file", fileBanner);
    let formTest = new FormData();
    formTest.append("file", file1);
    let formData2 = new FormData();
    let formData3 = new FormData();
    let formData4 = new FormData();

    formData2.append("file", file2);

    formData3.append("file", file3);
    formData4.append("file", file4);

    if (
      (!file1 || checkFileMimeType(file1)) &&
      (!file2 || checkFileMimeType(file2)) &&
      (!file3 || checkFileMimeType(file3)) &&
      (!file4 || checkFileMimeType(file4)) &&
      (!fileBanner || checkFileMimeType(fileBanner))
    ) {
      if (fileBanner) {
        console.log("video size: " + fileBanner.size);
        if (fileBanner.size <= 350000000) {
          await http
            .post("users/actorbanner", formDataBanner, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              setModalIsOpen(true);
              if (response.data.key !== undefined) {
                actorData.bannerImg = response.data.key;
              }
            })
            .catch((err) => console.log("error: " + err.message));
        } else {
          setMessage("video Time Must Be Less Than 5 Min");
        }
      }
      if (file1) {
        await http
          .post("users/actorbanner", formTest, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.key !== undefined) {
              actorData.picture = response.data.key;
            }
          });
      }
      if (file2) {
        await http
          .post("users/actorbanner", formData2, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.key !== undefined) {
              setImage1(response.data.key);
              i1 = response.data.key;
            }
          });
      }
      if (file3) {
        await http
          .post("users/actorbanner", formData3, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.key !== undefined) {
              setImage2(response.data.key);
              i2 = response.data.key;
            }
          });
      }
      if (file4) {
        await http
          .post("users/actorbanner", formData4, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.key !== undefined) {
              setImage3(response.data.key);
              i3 = response.data.key;
            }
          });
      }
      await http
        .put(`users/actor/files/${user.id}`, {
          picture: actorData.picture,
          bannerImg: actorData.bannerImg,
          profiles: [
            i1 != "" ? i1 : profs[0],
            i2 != "" ? i2 : profs[1],
            i3 != "" ? i3 : profs[2],
          ],
        })
        .then((res) => {
          console.log("saved");
          // navigateToActor();
        })
        .catch((err) => {
          console.log(err);
        });
      setMessage("upload success");
    } else {
      setMessage("error in Mime");
    }
    if (true) {
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div className="actor-upload-pic-container">
        <div
          className="actor-upload-profile-pic"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${actor.picture})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="actor-prof-file1">
            <input
              className="actor-upload-profile-pic-btn"
              filename={file1}
              ref={inputFile1Ref}
              onChange={file1Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file1"
            />
            <label
              for="actor-file1"
              className="actor-prof-file"
              style={{
                fontSize: "20px",
              }}
            >
              Upload Headshot
            </label>
          </div>
          <div className="actor-prof-file2">
            <input
              className="actor-upload-profile-pic-btn"
              filename={file2}
              ref={inputFile2Ref}
              onChange={file2Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file2"
            />
            <label
              htmlFor="actor-file2"
              className="actor-prof-file"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${profs[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              +
            </label>
          </div>
          <div className="actor-prof-file3">
            <input
              className="actor-upload-profile-pic-btn"
              filename={file3}
              ref={inputFile3Ref}
              onChange={file3Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file3"
            />
            <label
              for="actor-file3"
              className="actor-prof-file"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${profs[1]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              +
            </label>
          </div>
          <div className="actor-prof-file4">
            <input
              className="actor-upload-profile-pic-btn"
              filename={file4}
              ref={inputFile4Ref}
              onChange={file4Selected}
              type="file"
              name="files"
              accept="image/*"
              id="actor-file4"
            />
            <label
              for="actor-file4"
              className="actor-prof-file"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_AWS_URL}/${profs[2]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              +
            </label>
          </div>
        </div>
        {/* <div className="actor-upload-back-pic">
          <input
            className="actor-upload-back-pic-btn upload-actor-prof-btn"
            filename={fileBanner}
            onChange={fileBannerSelected}
            ref={inputFileBannerRef}
            type="file"
            name="files"
            accept="video/*"
            id="fileBanner"
          />
          <label for="fileBanner" className="upload-banner-actor">
            Upload Demo reel Video
          </label>
        </div> */}
        {/* ----- CHIHYIN ------- */}
        <div className="col mt-5">
          <label
            htmlFor="fileBanner"
            className="form-label text-dark"
            style={{ fontSize: "25px" }}
          >
            Upload Demo reel Video
          </label>
          <input
            className="form-control form-control-sm"
            ref={inputFileBannerRef}
            onChange={fileBannerSelected}
            type="file"
            id="fileBanner"
            name="files"
            accept="video/*"
          ></input>
          {actorData.bannerImg && (
            <video
              width="320"
              height="240"
              controls
              ref={videoRef}
              poster={thumbnailImage}
            >
              <source
                src={`${process.env.REACT_APP_AWS_URL}/${actorData.bannerImg}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
          <br></br>
          <button onClick={captureThumbnail}>Capture Thumbnail</button>
        </div>
        {thumbnailImage && (
          <img
            src={thumbnailImage}
            alt="Thumbnail Preview"
            style={{ width: "200px", height: "150px" }}
          />
        )}{" "}
        {/* <p>{message}</p> */}
        {/* ----- CHIHYIN ------- */}
        <button
          className="upload-actor-prof-btn1 upload-actor-prof-btn-save1"
          onClick={saveEpkCover}
        >
          save
        </button>
      </div>
      <div className="actor-dashbaord-about">
        <textarea
          className="actor-dash-textarea"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        >
          {user.aboutMe
            ? user.aboutMe
            : "Biography text here example Biography text here example Biography text here example  Biography text here example Biography text here exampleBiography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example  Biography text here example  Biography text here exampleBiography text here example Biography text here example Biography text here example"}
        </textarea>
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
            <h2>Updated successfully!</h2>
            <br />
            <button className="btn btn-secondary btn-sm" onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      </div>
      <div className="actor-save-about">
        <button className="upload-actor-prof-btn1" onClick={editAbout}>
          save
        </button>
      </div>
      <div className="actor-dashbaord-com">
        <div className="actor-dashbaord-com-detail">
          <img src={instagramIcon} className="actor-dash-com-icon" />
          <input value="URL Here" className="actor-dash-com-detail" />
        </div>
        <div className="actor-dashbaord-com-detail">
          <img src={facebookIcon} className="actor-dash-com-icon" />
          <input value="URL Here" className="actor-dash-com-detail" />
        </div>
        <div className="actor-dashbaord-com-detail">
          <img src={twiiterIcon} className="actor-dash-com-icon" />
          <input value="URL Here" className="actor-dash-com-detail" />
        </div>
        <div className="actor-dashbaord-com-detail">
          <input
            value="Enter Your Follower Number"
            className="actor-dash-com-detail2"
          />
        </div>
        <div className="actor-dashbaord-com-detail">
          <input
            value="Enter Your Follower Number"
            className="actor-dash-com-detail2"
          />
        </div>
        <div className="actor-dashbaord-com-detail">
          <input
            value="Enter Your Follower Number"
            className="actor-dash-com-detail2"
          />
        </div>
      </div>
      <div className="actor-btn-save-upload-container">
        <p className="actor-text-upload">
          There are currently no EPKs attached to your Actor Page. Once
          filmmakers will assign you an EPK, it will appear here.
        </p>
      </div>
    </>
  );
}
