/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import "./UploadActorPic.css";
import http from "../../../http-common";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

export default function UploadActorPic({ user }) {
  const { t } = useTranslation();
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
  const [characterLength, setCharacterLength] = useState(0);
  // States for each image preview before saving
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [previewImage3, setPreviewImage3] = useState(null);
  const [previewImage4, setPreviewImage4] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [trailerPreview, setTrailerPreview] = useState("");

  let i1 = "";
  let i2 = "";
  let i3 = "";

  // // Helper function to handle file reading
  // const handleFileRead = (file, setPreview) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result); // Update the respective preview image state
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile3(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage3(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const file4Selected = (event) => {
    const file = event.target.files[0];
    setFile4(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage4(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileBannerSelected = (event) => {
    const file = event.target.files[0];
    setFileBanner(file);
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setTrailerPreview(videoUrl);
      videoRef.current.srcObject = null; // Clear the current source object
      videoRef.current.src = videoUrl; // Set the new source
      videoRef.current.load(); // Load the new source
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };
    }
  };

  const captureThumbnail = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // Set the canvas dimensions same as video
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    // Draw the video frame to canvas
    const image = ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvas.width,
      canvas.height
    );
    // Convert canvas to data URL (base64 encoded image)
    const imageUrl = canvas.toDataURL("image/png");
    setThumbnailImage(imageUrl);
  };

  function dataURLtoBlob(dataurl) {
    // Check if 'dataurl' is valid
    if (typeof dataurl !== "string" || !dataurl.includes(",")) {
      console.error("Invalid data URL passed to dataURLtoBlob.");
      return null;
    }
    var arr = dataurl.split(","),
      mimeParts = arr[0].match(/:(.*?);/);
    // Check if the MIME type is present in the data URL
    if (!mimeParts || mimeParts.length <= 1) {
      console.error("No MIME type found in data URL.");
      return null;
    }
    var mime = mimeParts[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  useEffect(() => {
    http.get(`users/getactor/${user.id}`).then((response) => {
      console.log("Fetched bannerImg:", response.data.bannerImg);
      setActor(response.data);
      setProfs(response.data.profiles);
      setTextareaValue(response.data.aboutMe);
      // ----- CHIHYIN -------
      if (response.data.aboutMe) {
        setTextareaValue(response.data.aboutMe);
        setCharacterLength(response.data.aboutMe.length);
      }
      setActorData({
        bannerImg: response.data.bannerImg,
        thumbnail: response.data.thumbnail,
        picture: response.data.picture,
        profiles: response.data.profiles,
      });
    });
  }, [user.id]);

  const [actorData, setActorData] = useState({
    bannerImg: actor.bannerImg,
    thumbnail: actor.thumbnail,
    picture: actor.picture,
    profiles: actor.profiles,
    aboutMe: actor.aboutMe,
  });

  const handleCount = (event) => {
    const value = event.target.value;
    setCharacterLength(value.length);
  };

  const checkFileMimeType = (file) => {
    const allowedMIMETypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-ms-wmv",
      "video/ogg",
      "video/3gpp",
      "video/x-msvideo",
      "image/png",
      "image/jpg",
      "image/jpeg",
    ];
    // Check if 'file' is a string assuming it's a data URL.
    if (typeof file === "string") {
      // Check if it's a data URL
      if (file.startsWith("data:")) {
        const mime = file.split(",")[0].split(":")[1].split(";")[0];
        return allowedMIMETypes.includes(mime);
      } else {
        console.error(
          "Unexpected string format received. Expected a data URL."
        );
        return false;
      }
    }
    // If 'file' seems to be a File object (or similar).
    if (file && file.type) {
      return allowedMIMETypes.includes(file.type);
    }
    console.error("No file provided or unexpected format.");
    return false;
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

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.currentTarget.style.display = "flex";
    e.currentTarget.style.justifyContent = "center";
    e.currentTarget.style.alignItems = "center";
    setIsUploading(true);
    saveEpkCover(e);
  };

  const saveEpkCover = async (e) => {
    e.preventDefault();
    let formDataBanner = new FormData();
    formDataBanner.append("file", fileBanner);

    let formDataThumbnail;
    if (thumbnailImage && thumbnailImage.startsWith("data:image")) {
      const thumbnailBlob = dataURLtoBlob(thumbnailImage);
      if (!thumbnailBlob) {
        console.error("Failed to create blob from data URL.");
        setMessage("An error occurred while processing the thumbnail image.");
        return; // Stop the execution of the function here
      }
      formDataThumbnail = new FormData();
      formDataThumbnail.append("file", thumbnailBlob, "thumbnail.png");
    } else {
      console.log(
        "No thumbnail image provided or not a valid data URL, skipping thumbnail upload."
      );
      //return;
    }

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
      (!fileBanner || checkFileMimeType(fileBanner)) &&
      (!thumbnailImage || checkFileMimeType(thumbnailImage))
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
      if (formDataThumbnail) {
        await http
          .post("users/actorthumbnail", formDataThumbnail, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.key !== undefined) {
              actorData.thumbnail = response.data.key;
              console.log("thumbnail:", actorData.thumbnail);
            }
          })
          .catch((err) =>
            console.log("Error uploading thumbnail:", err.message)
          );
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
          thumbnail: actorData.thumbnail,
          profiles: [
            i1 !== "" ? i1 : profs[0],
            i2 !== "" ? i2 : profs[1],
            i3 !== "" ? i3 : profs[2],
          ],
        })
        .then((res) => {
          setModalIsOpen(true);
          console.log("saved");
          setIsUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setMessage("An unexpected error occurred.");
        });
      setMessage("upload success");
    } else {
      setMessage("error in Mime");
    }
    if (true) {
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="actor-upload-pic-container">
        <div
          className="actor-upload-profile-pic"
          style={{
            backgroundImage: previewImage1
              ? `url(${previewImage1})`
              : actor.picture && !actor.picture.startsWith("https")
              ? `url(${process.env.REACT_APP_AWS_URL}/${actor.picture})`
              : null,
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
              htmlFor="actor-file1"
              className="actor-prof-file"
              style={{
                fontSize: "20px",
              }}
            >
              {t("Upload Headshot")}
            </label>
            <div className="uploaded-image-preview-container"></div>
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
                backgroundImage: previewImage2
                  ? `url(${previewImage2})`
                  : profs[0]
                  ? `url(${process.env.REACT_APP_AWS_URL}/${profs[0]})`
                  : null,
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
              htmlFor="actor-file3"
              className="actor-prof-file"
              style={{
                backgroundImage: previewImage3
                  ? `url(${previewImage3})`
                  : profs[1]
                  ? `url(${process.env.REACT_APP_AWS_URL}/${profs[1]})`
                  : null,
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
              htmlFor="actor-file4"
              className="actor-prof-file"
              style={{
                backgroundImage: previewImage4
                  ? `url(${previewImage4})`
                  : profs[2]
                  ? `url(${process.env.REACT_APP_AWS_URL}/${profs[2]})`
                  : null,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              +
            </label>
          </div>
        </div>
        <div className="col mt-5">
          <label
            htmlFor="fileBanner"
            className="form-label text-dark"
            style={{ fontSize: "25px" }}
          >
            {t("Upload Demo reel Video")}
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
          {trailerPreview !== "" ? (
            // Display the selected file's video preview
            <video
              width="320"
              height="240"
              controls
              ref={videoRef}
              poster={thumbnailImage}
            >
              <source src={trailerPreview} type="video/mp4" />
              {t("Your browser does not support the video tag.")}
            </video>
          ) : (
            // Display the existing video if trailerPreview is empty
            actorData.bannerImg && (
              <video
                width="320"
                height="240"
                controls
                ref={videoRef}
                poster={thumbnailImage}
                style={{
                  display:
                    actorData.bannerImg &&
                    !actorData.bannerImg.startsWith("https")
                      ? "block"
                      : "none",
                }}
                crossOrigin="anonymous"
              >
                <source
                  src={
                    actorData.bannerImg.startsWith("https")
                      ? actorData.bannerImg
                      : `http://localhost:8000/video-proxy?url=${process.env.REACT_APP_AWS_URL}/${actorData.bannerImg}`
                  }
                  type="video/mp4"
                />
                {t("Your browser does not support the video tag.")}
              </video>
            )
          )}
          <br></br>
          {trailerPreview ? (
            <button onClick={captureThumbnail}>{t("Capture Thumbnail")}</button>
          ) : actorData.bannerImg && !actorData.bannerImg.startsWith("http") ? (
            <button onClick={captureThumbnail}>{t("Capture Thumbnail")}</button>
          ) : null}
        </div>
        {thumbnailImage && (
          <img
            src={thumbnailImage}
            alt="Thumbnail Preview"
            style={{ width: "200px", height: "150px" }}
          />
        )}{" "}
        {/* <p>{message}</p> */}
        <button
          className="upload-actor-prof-btn1 upload-actor-prof-btn-save1"
          onClick={handleSaveClick}
        >
          {isUploading ? (
            <div
              className="spinner"
              style={{
                border: "4px solid rgba(0, 0, 0, 0.1)",
                borderTop: "4px solid blue",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          ) : (
            t("save")
          )}
        </button>
      </div>
      <div className="actor-dashbaord-about">
        <textarea
          className="actor-dash-textarea"
          maxLength="500"
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
            handleCount(e);
          }}
        ></textarea>
        <span
          style={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "right",
            marginTop: "20px",
          }}
        >
          {characterLength}
          {t("/500 characters")}
        </span>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
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
            {/* {isUploading ? (
              <div>
                <div className="spinner"></div>
                <p>Uploading...</p>
              </div>
            ) : (
              <> */}
            <h2>Updated successfully!</h2>
            <br />
            <button className="btn btn-secondary btn-sm" onClick={closeModal}>
              Ok
            </button>
            {/* </>
            )} */}
          </div>
        </Modal>
      </div>
      <div className="actor-save-about">
        <button className="upload-actor-prof-btn1" onClick={editAbout}>
          {t("save")}
        </button>
      </div>
    </>
  );
}
