import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../../http-common";
import { Button, Tooltip } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import paypalImage from "../../../images/paypal.png";
import stripImage from "../../../images/stripe.jpg";
import { useTranslation } from 'react-i18next';

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
    "action",
    "comedy",
    "documentary",
    "romance",
    "horror",
    "mystery",
    "drama",
    "western",
    "science fiction",
    "thriller",
    "crime",
    "animation",
    "musical",
    "war",
    "romantic comedy",
    "noir",
    "disaster",
    "dark comedy",
    "historical film",
    "slasher",
    "adventure",
    "gangster",
    "spy",
    "fantasy",
    "biographical",
    "found footage",
    "legal drama",
    "melodrama",
    "superhero",
    "slapstick",
    "monster",
    "historical fiction",
    "teen",
    "apocalyptic",
    "post-apocalyptic",
    "psychological thriller",
    "stop motion",
    "sports",
    "space opera",
    "mockumentary",
  ];

  const movieStatus = ["Preproduction", "Production", "Postproduction"];

  const movieType = ["Movie", "Documentary", "TV Show", "Web Series"];

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
    e.currentTarget.innerHTML =
      '<div class="spinner" style="border: 4px solid rgba(0, 0, 0, 0.1); border-top: 4px solid blue; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite;"></div>';
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
      titleLoglineMessage = " Title and Log Line needed.";
    }
    if (
      !epkCoverData.production_type ||
      !epkCoverData.genre ||
      !epkCoverData.status
    ) {
      genreStatusMessage = "Tell us the productiob type, genre and status.";
    }
    if (titleLoglineMessage || genreStatusMessage) {
      setSubmitMessage(titleLoglineMessage + " " + genreStatusMessage);
      return; // Exit the function early if any check fails
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
                "An error occurred while saving your data. Please try again."
              );
            } else {
              console.log("saved");
              navigate(`/editFepk/${res.data._id}`);
            }
          });
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
    setDisabled(true);
  };

  return (
    <>
      <div
        style={{
          boxShadow: "inset 1px 2px 9px #311465",
          padding: "0px 10px",
          marginLeft: "10%",
          marginBottom: "2%",
          width: "80%",
          borderRadius: "10px",
          // background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
          backgroundColor: "white",
        }}
      >
        <div
          className="row"
          style={{
            background:
              "linear-gradient(to bottom, #1E0039 0%, #1E0039 35%, #1E0039 35%, #FFFFFF 100%)",
            height: "auto",
          }}
        >
          <div className="col-1">
            <Link className="navbar-brand text-headers-style" to="/home">
              <img
                style={{ width: "100%", height: "80px" }}
                src={require("../../../images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          </div>
          <div className="col-3  m-3">
            <h1
              className="col align-items-start"
              style={{ color: "#FFFFFF", fontWeight: "normal" }}
            >
              {t('EPK Page Upload')}
            </h1>
          </div>
          <div className="col-3 m-3"></div>
          <div className="col-3 m-3">
            <Link
              className="col align-items-end"
              to="/filmMakerDashboard"
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "normal",
                fontSize: "25px",
              }}
            >
              {t('EPK Dashboard')}
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
            <h5
              className="card-title "
              style={{
                color: "#311465",
                fontWeight: "normal",
                marginBottom: "1%",
                fontSize: "1.2rem",
              }}
            >
              {t('Cover - Mandotory')}
            </h5>
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
                        placeholder="Title"
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
                        placeholder="Log Line short (maximum 160 characters)"
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
                        {characterLength?.logLine_short}/160 characters
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
                          placeholder="Production Company Name"
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
                          placeholder="Distribution Company Name"
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
                            {t('Production Budget')}
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
                          name="production_type"
                          onChange={handleInputChange}
                          value={epkCoverData.production_type}
                        >
                          <option value="" disabled>
                            {t('Production Type')}
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
                            {t('Genre')}
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
                            {t('Status')}
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
                          placeholder="Production Year"
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
                          placeholder="Duration Minutes"
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
                      <h4>{t('Upload Poster')}</h4>
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
                      <h3>{t('No Image')}</h3>
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
                          <h4>{t('Upload Banner')}</h4>
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
                          <h3>{t('No Image')}</h3>
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
                          <h4>{t('Upload Trailer')}</h4>
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
                          <h1>{t('NO VIDEO UPLOADED')}</h1>
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
                  <Tooltip title= {t("In order to collect donations, for your film, please enter your PayPal or Stripe Button URL here. Your Donation icon will appear under the cover section in the EPK.")}>
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
                    placeholder="URL: www.paypal.com/mymovie"
                    onChange={handleInputChange}
                    name="DonatePayPal_url"
                  />
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
                    placeholder="URL: www.stripe.com/mymovie"
                    onChange={handleInputChange}
                    name="DonateStripe_url"
                  />
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
                    {t('Save')}
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
                    {t('Save')}
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
