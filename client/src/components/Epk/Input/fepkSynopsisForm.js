/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
// import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function SynopsisForm() {
  const [file, setFile] = useState("");
  const [fileMedium, setFileMedium] = useState("");
  const [fileLong, setFileLong] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const inputFileRef = useRef(null);
  const inputFileMediumRef = useRef(null);
  const inputFileLongRef = useRef(null);
  const [characterLength, setCharacterLength] = useState({
    text_short: 0,
    text_medium: 0,
    text_long: 0,
  });
  const [epkSynopsisData, setEpkSynopsisData] = useState([]);

  //Preview images
  const [shortBannerPreviewUrl, setShortBannerPreviewUrl] = useState("");
  const [mediumBannerPreviewUrl, setMediumBannerPreviewUrl] = useState("");
  const [longBannerPreviewUrl, setLongBannerPreviewUrl] = useState("");

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Translation
  const { t } = useTranslation();

  //let { title } = useParams();
  let { id } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setShortBannerPreviewUrl(url);
    setMessage("");
  };

  const fileMediumSelected = (event) => {
    const fileNew = event.target.files[0];
    setFileMedium(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setMediumBannerPreviewUrl(url);
    setMessage("");
  };

  const fileLongSelected = (event) => {
    const fileNew = event.target.files[0];
    setFileLong(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setLongBannerPreviewUrl(url);
    setMessage("");
  };

  // useEffect(() => {
  //   http
  //     .get(`/fepks/byTitle/${title.replace(/ /g, "-").trim()}`)
  //     .then((response) => {
  //       if (response.data) {
  //         setFepk(response.data);
  //         const { text_short, text_medium, text_long } = response.data;
  //         setCharacterLength((prevCharacterLength) => ({
  //           ...prevCharacterLength,
  //           text_short: text_short ? text_short.length : 0,
  //           text_medium: text_medium ? text_medium.length : 0,
  //           text_long: text_long ? text_long.length : 0,
  //         }));
  //         setEpkSynopsisData({
  //           image_synopsis: response.data.image_synopsis,
  //           image_synopsis_medium: response.data.image_synopsis_medium,
  //           image_synopsis_long: response.data.image_synopsis_long,
  //           text_short: response.data.text_short,
  //           text_medium: response.data.text_medium,
  //           text_long: response.data.text_long,
  //           text_medium_blur: response.data.text_medium_blur,
  //           text_long_blur: response.data.text_long_blur,
  //         });
  //       } else {
  //         // Handle the case when response.data is undefined or empty
  //         console.error("response.data is undefined or empty");
  //       }
  //     });
  // }, [title]);

  useEffect(() => {
    getFepksById(id).then((response) => {
      if (response) {
        setFepk(response);
        const { text_short, text_medium, text_long } = response;
        setCharacterLength((prevCharacterLength) => ({
          ...prevCharacterLength,
          text_short: text_short ? text_short.length : 0,
          text_medium: text_medium ? text_medium.length : 0,
          text_long: text_long ? text_long.length : 0,
        }));
        setEpkSynopsisData({
          image_synopsis: response.image_synopsis,
          image_synopsis_medium: response.image_synopsis_medium,
          image_synopsis_long: response.image_synopsis_long,
          text_short: response.text_short,
          text_medium: response.text_medium,
          text_long: response.text_long,
          text_medium_blur: response.text_medium_blur,
          text_long_blur: response.text_long_blur,
        });
      } else {
        // Handle the case when response.data is undefined or empty
        console.error("response.data is undefined or empty");
      }
    });
  }, [id]);

  const handleSynopsisChange = (event) => {
    const { name, value } = event.target;
    setCharacterLength({ ...characterLength, [name]: value.length });
    setEpkSynopsisData({ ...epkSynopsisData, [name]: value });
    setDisabled(false);
  };

  const handleSynopsisBlurChange = (value, name) => {
    setEpkSynopsisData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setDisabled(false);
  };

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

  const saveEpkSynopsis = (e) => {
    // debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file);
    formData.append("file1", file);
    formData.append("file2", fileMedium);
    formData.append("file3", fileLong);
    console.log(formData);
    // debugger;
    if (
      checkFileMimeType(file) &&
      checkFileMimeType(fileMedium) &&
      checkFileMimeType(fileLong)
    ) {
      console.log("1");
      // if (file) {
      console.log("2");
      http
        .post("fepks/uploadFiles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.file1 !== undefined) {
            epkSynopsisData.image_synopsis = response.data.file1;
          }
          if (response.data.file2 !== undefined) {
            epkSynopsisData.image_synopsis_medium = response.data.file2;
          }
          if (response.data.file3 !== undefined) {
            epkSynopsisData.image_synopsis_long = response.data.file3;
          }
          http
            .put(`fepks/update/${fepk._id}`, epkSynopsisData)
            .then((res) => {
              setFepk(res.data);
              console.log(epkSynopsisData);
              setModalIsOpen(true);
              console.log("saved");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log();
          console.log(err);
        });
      // } else {
      //   http
      //     .put(`fepks/update/${fepkId}`, epkSynopsisData)
      //     .then((res) => {
      //       console.log("saved");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    } else {
      setMessage(t("Oops! Please use JPEG, JPG, or PNG images."));
    }
    setDisabled(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        style={{
            width: window.innerWidth >= 768 ? "80%" : "100%",
            margin: window.innerWidth >= 768 ? "0 auto" : "0",
        }}
      >
        {/*<div className="tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-transparent tw-via-20% tw-to-transparent tw-py-5">*/}
        {/*  <div className="col-3 tw-m-3 tw-text-center">*/}
        {/*    <h2*/}
        {/*      className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"*/}
        {/*      // style={{*/}
        {/*      //   color: "#1E0039",*/}
        {/*      //   fontWeight: "bold",*/}
        {/*      //   fontSize: "25px",*/}
        {/*      // }}*/}
        {/*    >*/}
        {/*      {t("EPK Dashboard")}*/}
        {/*    </h2>*/}
        {/*  </div>*/}
        {/*  <div className="col-3 tw-m-3 tw-text-center">*/}
        {/*    <BasicMenu color="#1E0039" />*/}
        {/*  </div>*/}
        {/*  <div className="col-3 tw-m-3 tw-text-center">*/}
        {/*    <Link*/}
        {/*      className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"*/}
        {/*      to={`/epk/${fepk._id}`}*/}
        {/*      // style={{*/}
        {/*      //   color: "#1E0039",*/}
        {/*      //   textDecoration: "none",*/}
        {/*      //   fontWeight: "bold",*/}
        {/*      //   fontSize: "25px",*/}
        {/*      // }}*/}
        {/*    >*/}
        {/*      {t("View EPK Page")}*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div
          style={{
            // marginLeft: "5%",
            // marginRight: "5%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div
            className="card-body"
            // style={{ height: "500px" }}
          >
            {/*<h5*/}
            {/*  className="card-title "*/}
            {/*  style={{ color: "#311465", fontWeight: "normal" }}*/}
            {/*>*/}
            {/*  {t("Synopsis")}*/}
            {/*</h5>*/}
              <form>
                  {/* First Row: Short synopsis + image */}
                  <div
                      className="container-fluid row g-1 d-flex align-items-center mt-2"
                      style={{
                          borderRadius: "15px",
                          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                          padding: "0 10px",
                      }}
                  >
                      {/* Short Synopsis */}
                      <div
                          className="col-sm-12 col-md-8 my-2"
                          style={{position: "relative"}}
                      >
                          <label
                              style={{
                                  fontSize: "14px", // Smaller font size
                                  display: "block", // Ensures it's on its own line
                                  marginBottom: "10px", // Adds spacing below the label
                              }}
                          >Short Synopsis</label>
                          <textarea
                              style={{
                                  height: "100px",
                                  width: "100%",
                                  borderRadius: "15px",
                                  marginBottom: "5px",
                                  textAlign: "left",
                                  resize: "none",
                              }}
                              className="form-control mt-10"
                              defaultValue={fepk.text_short}
                              placeholder={t("Short Synopsis(maximum 160 characters)")}
                              onChange={handleSynopsisChange}
                              name="text_short"
                          />
                          <span
                              style={{
                                  fontSize: "15px",
                                  display: "flex",
                                  justifyContent: "right",
                              }}
                          >
            {characterLength?.text_short}
                              {t("/160 characters")}
        </span>
                      </div>

                      {/* Picture Upload section */}
                      <div className="col-sm-12 col-md-4 my-1 text-center">
                          {/* Picture Upload Text */}
                          <div className="tw-flex tw-justify-center tw-items-center tw-my-1">
                              {/* Picture Upload Button */}
                              <div
                                  className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                                  style={{
                                      width: "200px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  }}
                              >
                                  <label
                                      htmlFor="filePosterShort"
                                      className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"
                                  >
        <span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">
          {t("Picture Upload")}
        </span>
                                      {/* Upload Icon */}
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="tw-h-5"
                                      >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                          />
                                      </svg>
                                  </label>
                              </div>
                          </div>

                          {/* Hidden file input */}
                          <input
                              style={{display: "none"}}
                              className="form-control form-control-sm"
                              filename={file}
                              onChange={fileSelected}
                              ref={inputFileRef}
                              type="file"
                              id="filePosterShort"
                              name="files"
                              accept="image/*"
                          />

                          {/* Clickable image for file upload */}
                          {shortBannerPreviewUrl || (epkSynopsisData.image_synopsis && epkSynopsisData.image_synopsis !== undefined) ? (
                              <img
                                  src={shortBannerPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${epkSynopsisData.image_synopsis}`}
                                  style={{
                                      height: "120px",
                                      width: "auto",
                                      margin: "0 auto",
                                      display: "block",
                                      cursor: "pointer", // Makes the image look clickable
                                  }}
                                  alt="Short Banner Preview"
                                  onClick={() => inputFileRef.current.click()} // Triggers file input click
                              />
                          ) : (
                              <h3 onClick={() => inputFileRef.current.click()} style={{cursor: "pointer"}}>
                                  {t("No Image")}
                              </h3>
                          )}
                      </div>
                  </div>


                  {/* Second Row: Medium synopsis + image */}
                  <div
                      className="container-fluid row g-1 d-flex align-items-center mt-4"
                      style={{
                          borderRadius: "15px",
                          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                          padding: "0 10px",
                      }}
                  >
                      {/* Medium Synopsis + Button */}

                      <div
                          className="col-sm-12 col-md-8 my-2"
                          style={{position: "relative"}}
                      >
                          <div className="d-flex align-items-center justify-content-between ">

                              <label
                                  style={{
                                      fontSize: "14px", // Smaller font size
                                      display: "block", // Ensures it's on its own line
                                      marginBottom: "10px", // Adds spacing below the label
                                  }}
                              >Medium Synopsis</label>
                              <Button
                                  className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                                  style={{
                                      height: "30px",
                                      width: "120px",
                                      borderRadius: "15px",
                                      marginBottom: "5px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  }}
                                  type="outline-primary"
                                  block
                                  onClick={() =>
                                      handleSynopsisBlurChange(
                                          !epkSynopsisData.text_medium_blur,
                                          "text_medium_blur"
                                      )
                                  }
                                  name="text_medium_blur"
                              >
                                  {epkSynopsisData.text_medium_blur ? "UnBlur" : "Blur"}
                              </Button>
                          </div>
                          <textarea
                              style={{
                                  height: "100px",
                                  width: "100%",
                                  borderRadius: "25px",
                                  marginBottom: "5px",
                                  textAlign: "left",
                                  resize: "none",
                              }}
                              className="form-control mt-10"
                              defaultValue={fepk.text_medium}
                              placeholder={t("Medium Synopsis(maximum 350 characters)")}
                              onChange={handleSynopsisChange}
                              name="text_medium"
                          />
                          <span
                              style={{
                                  fontSize: "15px",
                                  display: "flex",
                                  justifyContent: "right",
                              }}
                          >
            {characterLength?.text_medium}
                              {t("/350 characters")}
        </span>

                      </div>

                      {/* Picture Upload Section */}
                      <div className="col-sm-12 col-md-4 my-1 text-center">
                          {/* Picture Upload Text */}
                          <div className="tw-flex tw-justify-center tw-items-center tw-mt-1">
                              {/* Picture Upload Button */}
                              <div
                                  className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                                  style={{
                                      width: "200px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  }}
                              >
                                  <label
                                      htmlFor="filePosterMedium"
                                      className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"
                                  >
        <span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">
          {t("Picture Upload")}
        </span>
                                      {/* Upload Icon */}
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="tw-h-5"
                                      >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                          />
                                      </svg>
                                  </label>
                              </div>
                          </div>

                          {/* Hidden file input */}
                          <input
                              style={{display: "none"}}
                              className="form-control form-control-sm"
                              filename={fileMedium}
                              onChange={fileMediumSelected}
                              ref={inputFileMediumRef}
                              type="file"
                              id="filePosterMedium"
                              name="files"
                              accept="image/*"
                          />

                          {/* Clickable image for file upload */}
                          {mediumBannerPreviewUrl || (epkSynopsisData.image_synopsis_medium && epkSynopsisData.image_synopsis_medium !== undefined) ? (
                              <img
                                  src={mediumBannerPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${epkSynopsisData.image_synopsis_medium}`}
                                  style={{
                                      height: "120px",
                                      width: "auto",
                                      margin: "0 auto",
                                      display: "block",
                                      cursor: "pointer", // Makes the image look clickable
                                  }}
                                  alt="Medium Banner Preview"
                                  onClick={() => inputFileMediumRef.current.click()} // Triggers file input click
                              />
                          ) : (
                              <h3 onClick={() => inputFileMediumRef.current.click()} style={{cursor: "pointer"}}>
                                  {t("No Image")}
                              </h3>
                          )}
                      </div>
                  </div>


                  {/* Third Row: Long synopsis + image */}
                  <div
                      className="container-fluid row g-1 d-flex align-items-center mt-4"
                      style={{
                          borderRadius: "15px",
                          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                          padding: "0 10px",
                      }}
                  >
                      {/* Long Synopsis + Button */}

                      <div
                          className="col-sm-12 col-md-8 my-2"
                          style={{position: "relative"}}
                      >
                          <div className="d-flex align-items-center justify-content-between ">

                              <label
                                  style={{
                                      fontSize: "14px",
                                      display: "block",
                                      marginBottom: "10px",
                                  }}
                              >Long Synopsis</label>

                              <Button
                                  className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                                  style={{
                                      height: "30px",
                                      width: "120px",
                                      borderRadius: "15px",
                                      marginBottom: "5px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  }}
                                  type="outline-primary"
                                  block
                                  onClick={() =>
                                      handleSynopsisBlurChange(
                                          !epkSynopsisData.text_long_blur,
                                          "text_long_blur"
                                      )
                                  }
                                  name="text_long_blur"
                              >
                                  {epkSynopsisData.text_long_blur ? "UnBlur" : "Blur"}
                              </Button>
                          </div>

                          <textarea
                              style={{
                                  height: "100px",
                                  width: "100%",
                                  borderRadius: "25px",
                                  marginBottom: "5px",
                                  textAlign: "left",
                                  resize: "none",
                              }}
                              className="form-control mt-10"
                              defaultValue={fepk.text_long}
                              placeholder={t("Long Synopsis(maximum 500 characters)")}
                              onChange={handleSynopsisChange}
                              name="text_long"
                          />
                          <span
                              style={{
                                  fontSize: "15px",
                                  display: "flex",
                                  justifyContent: "right",
                              }}
                          >
            {characterLength?.text_long}
                              {t("/500 characters")}
        </span>

                      </div>

                      {/* Picture Upload Section */}
                      <div className="col-sm-12 col-md-4 my-1 text-center">
                          {/* Picture Upload Text */}
                          <div className="tw-flex tw-justify-center tw-items-center tw-mt-1">
                              {/* Picture Upload Button */}
                              <div
                                  className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                                  style={{
                                      width: "200px",
                                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  }}
                              >
                                  <label
                                      htmlFor="filePosterLong"
                                      className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"
                                  >
        <span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">
          {t("Picture Upload")}
        </span>
                                      {/* Upload Icon */}
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="tw-h-5"
                                      >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                          />
                                      </svg>
                                  </label>
                              </div>
                          </div>

                          {/* Hidden file input */}
                          <input
                              style={{display: "none"}}
                              className="form-control form-control-sm"
                              filename={fileLong}
                              onChange={fileLongSelected}
                              ref={inputFileLongRef}
                              type="file"
                              id="filePosterLong"
                              name="files"
                              accept="image/*"
                          />

                          {/* Clickable image for file upload */}
                          {longBannerPreviewUrl || (epkSynopsisData.image_synopsis_long && epkSynopsisData.image_synopsis_long !== undefined) ? (
                              <img
                                  src={longBannerPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${epkSynopsisData.image_synopsis_long}`}
                                  style={{
                                      height: "120px",
                                      width: "auto",
                                      margin: "0 auto",
                                      display: "block",
                                      cursor: "pointer",
                                  }}
                                  alt="Long Banner Preview"
                                  onClick={() => inputFileLongRef.current.click()}
                              />
                          ) : (
                              <h3 onClick={() => inputFileLongRef.current.click()} style={{cursor: "pointer"}}>
                                  {t("No Image")}
                              </h3>
                          )}
                      </div>
                  </div>


                  {message && (
                      <div
                          className="message"
                          style={{
                              color: "red",
                              fontSize: "1rem",
                              marginBottom: "-5%",
                              marginLeft: "28%",
                          }}
                      >
                          {message}
                      </div>
                  )}
                  {/* Save Button */}
                  <div
                      className="tw-md-block tw-mt-4 tw-flex tw-flex tw-grid tw-flex-1 tw-justify-end tw-gap-2"
                      style={{
                          // height: "50px",
                          // width: "120px",
                          // marginLeft: "100%",
                          marginTop: "20px",
                          marginBottom: "15px",
                      }}
                  >
                      {disabled === true ? (
                          <Button
                              disabled
                              style={{
                                  width: "120px",
                                  boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  color: "grey",
                                  // fontWeight: "bold",
                              }}
                              type="outline-primary"
                              block
                              onClick={saveEpkSynopsis}
                              value="save"
                          >
                              {t("Save")}
                          </Button>
                      ) : (
                          <Button
                              className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                              style={{
                                  width: "120px",
                                  boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                  fontWeight: "bold",
                              }}
                              type="outline-primary"
                              block
                              onClick={saveEpkSynopsis}
                              value="save"
                          >
                              {t("Save")}
                          </Button>
                      )}
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
                          <div style={{textAlign: "center"}}>
                              <div style={{color: "green"}}>
                                  {t("Synopsis is Saved Successfully!")}
                              </div>
                              <br/>
                              <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={closeModal}
                                  style={{backgroundColor: "#712CB0", color: "white"}}
                              >
                                  {t("Ok")}
                              </button>
                          </div>
                      </Modal>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SynopsisForm;
