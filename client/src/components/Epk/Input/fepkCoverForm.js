import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../../http-common";
import { Button, Tooltip } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import paypalImage from "../../../images/paypal.png";
import stripImage from "../../../images/stripe.jpg";
import { useTranslation } from "react-i18next";

function FepkCoverForm() {
  const navigate = useNavigate();
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const inputFile3Ref = useRef(null);
  const [message, setMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageTitleNo, setMessageTitleNo] = useState("");
  const [messageTitleYes, setMessageTitleYes] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({ logLine_short: 0 });
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState("");
  const [trailerPreviewUrl, setTrailerPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [donatePayPalValidationMessage, setDonatePayPalValidationMessage] = useState("");
  const [donateStripeValidationMessage, setDonateStripeValidationMessage] = useState("");
  const { t } = useTranslation();

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  const filmmaker_id = user.id;

  //banner
  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
    const url = URL.createObjectURL(file);
    setBannerPreviewUrl(url);
    setMessage("");
    setDisabled(false);
  };
  // trailer
  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
    const url = URL.createObjectURL(file);
    setTrailerPreviewUrl(url);
  };
  // poster
  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile3(file);
    const url = URL.createObjectURL(file);
    setPosterPreviewUrl(url);
    setMessage("");
    setDisabled(false);
  };

  const [epkCoverData, setEpkCoverData] = useState({
    film_maker: filmmaker_id,
    title: "",
    logLine_short: "",
    genre: "",
    production_type: "",
    kickstarter_url: "",
    image_details: "",
    DonatePayPal_url: "",
    DonateStripe_url: "",
    banner_url: "",
    trailer_url: "",
    status: "",
    productionCo: "",
    distributionCo: "",
    durationMin: "",
    productionYear: "",
    budget: "",
  });
  const movieGenre = [
    t("action"),
    t("comedy"),
    t("documentary"),
    t("romance"),
    t("horror"),
    t("mystery"),
    t("drama"),
    t("western"),
    t("science fiction"),
    t("thriller"),
    t("crime"),
    t("animation"),
    t("musical"),
    t("war"),
    t("romantic comedy"),
    t("noir"),
    t("disaster"),
    t("dark comedy"),
    t("historical film"),
    t("slasher"),
    t("adventure"),
    t("gangster"),
    t("spy"),
    t("fantasy"),
    t("biographical"),
    t("found footage"),
    t("legal drama"),
    t("melodrama"),
    t("superhero"),
    t("slapstick"),
    t("monster"),
    t("historical fiction"),
    t("teen"),
    t("apocalyptic"),
    t("post-apocalyptic"),
    t("psychological thriller"),
    t("stop motion"),
    t("sports"),
    t("space opera"),
    t("mockumentary"),
  ];

  const movieStatus = [t("Preproduction"), "Production", t("Postproduction")];

  const movieType = [t("Movie"), t("Documentary"), t("TV Show"), t("Web Series")];

  const budgetRanges = [
    "0$ - 5,000$",
    "5,000$ - 10,000$",
    "10,000$ - 25,000$",
    "25,000$ - 50,000$",
    "50,000$ - 75,000$",
    "75,000$ - 100,000$",
    "100,000$ - 150,000$",
    "150,000$ - 200,000$",
    "200,000$ - 300,000$",
    "300,000$ - 500,000$",
    "500,000$ - 750,000$",
    "750,000$ - 1,000,000$",
    "1,000,000$ - 1,500,000$",
    "1,500,000$ - 2,000,000$",
    "2,000,000$ - 3,000,000$",
    "3,000,000$ - 5,000,000$",
    "5,000,000$ - 7,500,000$",
    "7,500,000$ - 10,000,000$",
  ];

  const validateDonate = (donate) => {
    const websiteRegex = /^https:\/\/([a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return donate === '' || websiteRegex.test(donate);
  };

  const messages = {
    invalidDonateUrlMessage: "Invalid donation URL format",
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterLength({ ...characterLength, [name]: value.length });

    if (name === "logLine_short") {
      if (value.length > 160) {
        // Truncate the value to 160 characters
        const truncatedValue = value.slice(0, 160);
        setCharacterLength({ logLine_short: truncatedValue.length });
        setEpkCoverData({ ...epkCoverData, [name]: truncatedValue });
      } else {
        setCharacterLength({ logLine_short: value.length });
        setEpkCoverData({ ...epkCoverData, [name]: value });
      }
    }
    // Handle other input fields
    setEpkCoverData({ ...epkCoverData, [name]: value });
    if (name === "title" && event.target.value.trim() !== "") {
      setDisabled(false);
      http.get(`fepks/byTitles/${event.target.value}`).then((response) => {
        if (response.data.length > 0) {
          setMessageTitleNo("This title exists! Choose another one!");
          setMessageTitleYes("");
          console.log(response.data);
        } else {
          setMessageTitleYes("This title is ok!");
          setMessageTitleNo("");
        }
      });
    }

    if (name === "title" && event.target.value.trim() === "") {
      setDisabled(true);
      setMessageTitleNo("");
      setMessageTitleYes("");
    }
      // Validate donation URLs dynamically
    if (name === "DonatePayPal_url") {
      setDonatePayPalValidationMessage(validateDonate(value) ? "" : t(messages.invalidDonateUrlMessage));
    }

    if (name === "DonateStripe_url") {
      setDonateStripeValidationMessage(validateDonate(value) ? "" : t(messages.invalidDonateUrlMessage));
    }
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
        file.type === "	video/x-msvideo" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.currentTarget.style.display = "flex";
    e.currentTarget.style.justifyContent = "center";
    e.currentTarget.style.alignItems = "center";
    setIsUploading(true);
    saveEpkCover(e);
  };

  const saveEpkCover = (e) => {
    console.log("Button clicked");
    e.preventDefault();
    let formData = new FormData();
    console.log(file1);
    console.log(file2);
    console.log(file3);
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    console.log(formData);
    console.log([...formData.entries()]);

    let titleLoglineMessage = "";
    let genreStatusMessage = "";
    if (!epkCoverData.title || !epkCoverData.logLine_short) {
      titleLoglineMessage = t(" Title and Log Line needed.");
    }
    if (
      !epkCoverData.production_type ||
      !epkCoverData.genre ||
      !epkCoverData.status
    ) {
      genreStatusMessage = t("Tell us the productiob type, genre and status.");
    }
    if (titleLoglineMessage || genreStatusMessage) {
      setSubmitMessage(titleLoglineMessage + " " + genreStatusMessage);
      return; // Exit the function early if any check fails
    }

     if (!validateDonate(epkCoverData.DonatePayPal_url)) {
      setDonatePayPalValidationMessage(t("pls input Valid URL"));
       return;
     }

     if (!validateDonate(epkCoverData.DonateStripe_url)) {
      setDonateStripeValidationMessage(t("pls input Valid URL"));
       return;
     }

    if (
      checkFileMimeType(file1) &&
      checkFileMimeType(file2) &&
      checkFileMimeType(file3)
    ) {
      http
        .post("fepks/uploadFiles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.file1 !== undefined) {
            epkCoverData.banner_url = response.data.file1;
          }
          if (response.data.file2 !== undefined) {
            epkCoverData.trailer_url = response.data.file2;
          }
          if (response.data.file3 !== undefined) {
            epkCoverData.image_details = response.data.file3;
          }
          http.post("fepks/", epkCoverData).then((res) => {
            if (res.data.error) {
              console.error("Error submitting data:", res.data.error);
              setSubmitMessage(
                t(
                  " An error occurred while saving your data. Please try again."
                )
              );
            } else {
              setIsUploading(false);
              console.log("saved");
              navigate(`/editFepk/${res.data._id}`);
            }
          });
        });
    } else {
      setMessage(t("File must be a image(jpeg, jpg or png)"));
    }
    setDisabled(true);
  };

  return (
    <>
      <div
        style={{
          boxShadow: "inset 1px 2px 9px #311465",
          marginLeft: "10%",
          marginBottom: "2%",
          width: "80%",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div className="tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-transparent tw-via-20% tw-to-transparent tw-py-5">
          <div className="col-3 tw-m-3">
            {/* <Link className='navbar-brand text-headers-style' to='/home'>
              <img
                style={{ width: "100%", height: "80px" }}
                src={require("../../../images/logo.png")}
                alt='Logo'
                className='navbar-logo'
              />
            </Link> */}
            <h5
              className="card-title"
              style={{
                color: "#1E0039",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              {t("Cover - Mandotory")}
            </h5>
          </div>
          <div className="col-3 tw-m-3">
            <h1
              style={{ color: "#1E0039", fontWeight: "bold", fontSize: "25px" }}
            >
              {t("EPK Page Upload")}
            </h1>
          </div>
          <div className="col-3 tw-m-3">
            <Link
              to="/filmMakerDashboard"
              style={{
                color: "#1E0039",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              {t("EPK Dashboard")}
            </Link>
          </div>
        </div>
        <div
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div
            className="card-body"
            style={{
              height: "auto",
              marginLeft: "-1em",
              marginRight: "-1rem",
              marginBottom: "1%",
              paddingBottom: "2%",
            }}
          >
            <form className="row g-5">
              <div className="col me-5">
                <div className="row align-items-stretch">
                  <div className="col">
                    <div className="col mt-1 mb-5">
                      <input
                        style={{
                          height: "30px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "5px",
                          boxShadow: "1px 2px 9px #311465",
                          textAlign: "left",
                        }}
                        className="form-control m-10"
                        placeholder={t("Title")}
                        onChange={handleInputChange}
                        value={epkCoverData.title}
                        name="title"
                      />
                      <h6 style={{ color: "red", fontSize: "1rem" }}>
                        {messageTitleNo}
                      </h6>
                      <h6 style={{ color: "green", fontSize: "1rem" }}>
                        {messageTitleYes}
                      </h6>
                    </div>
                    <div className="col my-1">
                      <textarea
                        style={{
                          height: "80px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "0px",
                          boxShadow: "1px 2px 9px #311465",
                          textAlign: "left",
                          resize: "none",
                        }}
                        maxLength="160"
                        className="form-control mt-10"
                        placeholder={t(
                          "Log Line short (maximum 160 characters)"
                        )}
                        onChange={handleInputChange}
                        value={epkCoverData.logLine_short}
                        name="logLine_short"
                      />
                      <span
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          justifyContent: "right",
                          marginBottom: "1rem",
                        }}
                      >
                        {characterLength?.logLine_short}
                        {t("/160 characters")}
                      </span>
                    </div>
                    <div className="row" style={{ marginBottom: "-1.4rem" }}>
                      <div className="col my-2">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10 mb-4"
                          placeholder={t("Production Company Name")}
                          onChange={handleInputChange}
                          value={epkCoverData.productionCo}
                          name="productionCo"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col my-2">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control m-10 "
                          placeholder={t("Distribution Company Name")}
                          onChange={handleInputChange}
                          value={epkCoverData.distributionCo}
                          name="distributionCo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col my-2">
                        <select
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                          }}
                          className="form-select form-select-sm "
                          name="budget"
                          onChange={handleInputChange}
                          value={epkCoverData.budget}
                        >
                          <option value="" disabled>
                            {t("Production Budget")}
                          </option>
                          {budgetRanges.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col my-2">
                        <select
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                          }}
                          className="form-select form-select-sm "
                          name={t("production_type")}
                          onChange={handleInputChange}
                          value={epkCoverData.production_type}
                        >
                          <option value="" disabled>
                            {t("Production Type")}
                          </option>
                          {movieType.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: "3rem" }}>
                      <div className="col my-2">
                        <select
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                          }}
                          className="form-select form-select-sm "
                          name="genre"
                          onChange={handleInputChange}
                          value={epkCoverData.genre}
                        >
                          <option value="" disabled>
                            {t("Genre")}
                          </option>
                          {movieGenre.map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col my-2">
                        <select
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                          }}
                          className="form-select form-select-sm "
                          name="status"
                          onChange={handleInputChange}
                          value={epkCoverData.status}
                        >
                          <option value="" disabled>
                            {t("Status")}
                          </option>
                          {movieStatus.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col my-2">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          className="form-control"
                          type="number"
                          min="1895"
                          placeholder={t("Production Year")}
                          onChange={handleInputChange}
                          name="productionYear"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col my-2">
                        <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            fontSize: "14px",
                          }}
                          type="number"
                          min="0"
                          className="form-control m-10"
                          placeholder={t("Duration Minutes")}
                          onChange={handleInputChange}
                          name="durationMin"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col"
                style={{
                  boxShadow: "1px 2px 9px #311465",
                  borderRadius: "5px",
                }}
              >
                <div className="row gx-6">
                  <div className="col">
                    <label
                      htmlFor="filePoster"
                      className="form-label text-dark"
                      style={{ fontSize: "25px" }}
                    >
                      <h4>{t("Upload Poster")}</h4>
                    </label>
                    <input
                      style={{ fontSize: "15px" }}
                      className="form-control form-control-sm"
                      filename={file3}
                      onChange={file3Selected}
                      ref={inputFile3Ref}
                      type="file"
                      id="filePoster"
                      name="files"
                      accept="image/*"
                    ></input>
                    {posterPreviewUrl ? (
                      <img
                        src={posterPreviewUrl}
                        style={{
                          height: "120px",
                          width: "auto",
                          marginTop: "5px",
                        }}
                        alt="Preview"
                      />
                    ) : (
                      <h3>{t("No Image")}</h3>
                    )}
                  </div>
                  <div className="col" style={{ height: "450px" }}>
                    <div className="row">
                      <div className="col">
                        <label
                          htmlFor="fileBanner"
                          className="form-label text-dark"
                          style={{ fontSize: "25px" }}
                        >
                          <h4>{t("Upload Banner")}</h4>
                        </label>
                        <input
                          style={{ fontSize: "15px" }}
                          className="form-control form-control-sm"
                          filename={file1}
                          onChange={file1Selected}
                          ref={inputFile1Ref}
                          type="file"
                          id="fileBanner"
                          name="files"
                          accept="image/*"
                        ></input>
                        {bannerPreviewUrl ? (
                          <img
                            src={bannerPreviewUrl}
                            style={{
                              height: "100px",
                              width: "auto",
                              marginTop: "5px",
                            }}
                            alt="Preview"
                          />
                        ) : (
                          <h3>{t("No Image")}</h3>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label
                          htmlFor="fileTrailer"
                          className="form-label text-dark"
                          style={{ fontSize: "25px" }}
                        >
                          <h4>{t("Upload Trailer")}</h4>
                        </label>
                        <input
                          style={{ fontSize: "15px" }}
                          className="form-control form-control-sm"
                          filename={file2}
                          ref={inputFile2Ref}
                          onChange={file2Selected}
                          type="file"
                          id="fileTrailer"
                          name="files"
                          accept="video/*"
                        ></input>
                        {trailerPreviewUrl ? (
                          <video
                            src={trailerPreviewUrl}
                            style={{ width: "100%", height: "150px" }}
                            controls
                          ></video>
                        ) : (
                          <h1>{t("NO VIDEO UPLOADED")}</h1>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h6
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  marginTop: "-10%",
                }}
              >
                {submitMessage}
              </h6>
              <h6
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  marginTop: "-10%",
                }}
              >
                {message}
              </h6>
              <div
                className="row"
                style={{
                  marginTop: "-2%",
                  paddingRight: "25%",
                  paddingLeft: "3%",
                }}
              >
                <div>
                  <Tooltip
                    title={t(
                      "In order to collect donations, for your film, please enter your PayPal or Stripe Button URL here. Your Donation icon will appear under the cover section in the EPK."
                    )}
                  >
                    <span>
                      {" "}
                      <InfoCircleFilled />
                    </span>
                  </Tooltip>
                </div>
                <div className="col">
                  <input
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      paddingLeft: "90px",
                      backgroundImage: `url(${paypalImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left",
                      backgroundSize: "80px 60px",
                    }}
                    className="form-control"
                    defaultValue={epkCoverData.DonatePayPal_url}
                    placeholder="https://www.paypal.com/mymovie"
                    onChange={handleInputChange}
                    name="DonatePayPal_url"
                  />
                  <h6 style={{ color: "red", fontSize: "1rem" }}>
                  {donatePayPalValidationMessage && (
                    <span
                      className="validation-message"
                      style={{ color: "red", fontSize: "1rem" }}
                    >
                      {donatePayPalValidationMessage}
                    </span>
                  )}
                 </h6>
                </div>
                <div className="col">
                  <input
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      paddingLeft: "90px",
                      backgroundImage: `url(${stripImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left",
                      backgroundSize: "80px 40px",
                    }}
                    className="form-control"
                    defaultValue={epkCoverData.DonateStripe_url}
                    placeholder="https://www.stripe.com/mymovie"
                    onChange={handleInputChange}
                    name="DonateStripe_url"
                  />
                  <h6 style={{ color: "red", fontSize: "1rem" }}>
                    {donateStripeValidationMessage && (
                      <span
                        className="validation-message"
                        style={{ color: "red", fontSize: "1rem" }}
                      >
                        {donateStripeValidationMessage}
                      </span>
                    )}
                  </h6>

                </div>
             
              </div>
              <div
                style={{
                  height: "50px",
                  width: "auto",
                  marginLeft: "90%",
                  marginTop: "-1%",
                }}
              >
                {disabled === true ? (
                  <Button
                    disabled
                    style={{
                      boxShadow: "1px 2px 9px #311465",
                      color: "grey",
                      backgroundColor: "#ffffff",
                      fontWeight: "bold",
                    }}
                    type="outline-primary"
                    block
                    onClick={handleSaveClick}
                    value="save"
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
                  </Button>
                ) : (
                  <Button
                    className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                    style={{
                      boxShadow: "1px 2px 9px #311465",
                      fontWeight: "bold",
                    }}
                    type="outline-primary"
                    block
                    onClick={saveEpkCover}
                    value="save"
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
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default FepkCoverForm;
