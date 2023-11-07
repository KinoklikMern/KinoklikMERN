import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../../http-common";
import { Button, Tooltip } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import paypalImage from "../../../images/paypal.png";
import stripImage from "../../../images/stripe.jpg";

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
  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  const filmmaker_id = user.id;
  //banner
  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setBannerPreviewUrl(url);
  };
  // trailer
  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setTrailerPreviewUrl(url);
  };
  // poster
  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile3(file);
    setDisabled(false);
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
    "Genre...",
    "action",
    "comedy",
    "documentary",
    "romance",
    "action",
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
  const makeGenreItem = (X) => {
    return <option value={X}> {X}</option>;
  };
  const movieStatus = [
    "Status...",
    "Preproduction",
    "Production",
    "Postproduction",
  ];
  const makeStatusItem = (Y) => {
    return <option value={Y}> {Y}</option>;
  };
  const movieType = [
    "Type...",
    "Movie",
    "Documentary",
    "TV Show",
    "Web Series",
  ];
  const makeTypeItem = (Z) => {
    return <option value={Z}> {Z}</option>;
  };

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

  const makeBudgetRangeItem = (B) => {
    return (
      <option key={B} value={B}>
        {" "}
        {B}
      </option>
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterLength({ ...characterLength, [name]: value.length });
    setEpkCoverData({ ...epkCoverData, [name]: value });
    if (name === "title") {
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
  };

  return (
    <>
      <div
        style={{
          boxShadow: "1px 2px 9px #311465",
          marginLeft: "10%",
          width: "80%",
          borderRadius: "10px",
          // background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
          backgroundColor: "white",
        }}
      >
        <form>
          <div
            className="row"
            style={{
              background:
                "linear-gradient(to bottom, #1E0039 0%, #1E0039 35%, #1E0039 35%, #FFFFFF 100%)",
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
                EPK Page Upload
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
                EPK Dashboard
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
                height: "500px",
                marginTop: "2rem",
                marginLeft: "-1em",
              }}
            >
              <form className="row g-5">
                <div className="col me-5">
                  <div className="row">
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
                          defaultValue={epkCoverData.title}
                          placeholder="Title"
                          onChange={handleInputChange}
                          name="title"
                        />
                        <h6 style={{ color: "red", fontSize: "15px" }}>
                          {messageTitleNo}
                        </h6>
                        <h6 style={{ color: "green", fontSize: "15px" }}>
                          {messageTitleYes}
                        </h6>
                      </div>
                      <div className="col my-1">
                        <textarea
                          style={{
                            height: "60px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                          }}
                          className="form-control mt-10"
                          defaultValue={epkCoverData.logLine_short}
                          placeholder="Log Line short (maximum 160 characters)"
                          onChange={handleInputChange}
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
                            defaultValue={epkCoverData.productionCo}
                            placeholder="Production Company Name"
                            onChange={handleInputChange}
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
                            //value={fepk.distributionCo}
                            defaultValue={epkCoverData.distributionCo}
                            placeholder="Distribution Company Name"
                            onChange={handleInputChange}
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
                          >
                            <option defaultValue={epkCoverData.budget}>
                              {epkCoverData.budget
                                ? epkCoverData.budget
                                : "Production Budget"}
                            </option>
                            {budgetRanges.map(makeBudgetRangeItem)}
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
                            defaultValue={epkCoverData.production_type || ""}
                          >
                            <option value="" disabled>
                              {epkCoverData.production_type
                                ? epkCoverData.production_type
                                : "Production Type"}
                            </option>
                            {movieType.map(makeTypeItem)}
                          </select>
                        </div>
                      </div>
                      <div className="row" style={{ marginBottom: "2rem" }}>
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
                            defaultValue={epkCoverData.genre || ""}
                          >
                            <option value="" disabled>
                              {epkCoverData.genre
                                ? epkCoverData.genre
                                : "Genre"}
                            </option>
                            {movieGenre.map(makeGenreItem)}
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
                            defaultValue={epkCoverData.status || ""}
                          >
                            <option value="" disabled>
                              {epkCoverData.status
                                ? epkCoverData.status
                                : "Status"}
                            </option>
                            {movieStatus.map(makeStatusItem)}
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
                            //value={fepk.productionYear}
                            defaultValue={epkCoverData.productionYear}
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
                            //value={fepk.durationMin}
                            defaultValue={epkCoverData.durationMin}
                            placeholder="Duration Minutes"
                            onChange={handleInputChange}
                            name="durationMin"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="col my-2">
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
                      >
                        {movieType.map(makeTypeItem)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Tooltip title="In order to collect donations, for your film, please enter your PayPal or Stripe Button URL here. Your Donation icon will appear under the cover section in the EPK.">
                      <span>
                        {" "}
                        <InfoCircleFilled />
                      </span>
                    </Tooltip>
                  </div>
                  <div>
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
                  <div>
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
                    /> */}
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
                        <h4>Upload Poster</h4>
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
                      ) : epkCoverData.image_details &&
                        epkCoverData.image_details !== undefined ? (
                        <img
                          src={`${process.env.REACT_APP_AWS_URL}/${epkCoverData.image_details}`}
                          style={{
                            height: "240px",
                            width: "auto",
                            marginTop: "5px",
                          }}
                          alt="no img"
                        />
                      ) : (
                        <h3>No Image</h3>
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
                            {" "}
                            <h4>Upload Banner</h4>
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
                          ) : epkCoverData.banner_url &&
                            epkCoverData.banner_url !== undefined ? (
                            <img
                              src={`${process.env.REACT_APP_AWS_URL}/${epkCoverData.banner_url}`}
                              style={{
                                height: "100px",
                                width: "auto",
                                marginTop: "5px",
                              }}
                              alt="no image"
                            />
                          ) : (
                            <h3>No Image</h3>
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
                            {" "}
                            <h4>Upload Trailer</h4>
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
                          ) : epkCoverData.trailer_url ? (
                            <video
                              src={`${process.env.REACT_APP_AWS_URL}/${epkCoverData.trailer_url}`}
                              style={{ width: "100%", height: "150px" }}
                              controls
                            ></video>
                          ) : (
                            <h1>NO VIDEO UPLOADED</h1>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginTop: "4%", paddingRight: "25%" }}
                >
                  <h6
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    {submitMessage}
                  </h6>
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
              </form>
            </div>
          </div>
        </form>
        <div
          style={{
            height: "50px",
            width: "80px",
            marginLeft: "80%",
            marginTop: "2%",
            textAlign: "center",
          }}
        >
          <Button
            style={{
              boxShadow: "1px 2px 9px #311465",
              backgroundColor: "#ffffff",
              fontWeight: "bold",
            }}
            type="outline-primary"
            block
            onClick={saveEpkCover}
            value="save"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
export default FepkCoverForm;
