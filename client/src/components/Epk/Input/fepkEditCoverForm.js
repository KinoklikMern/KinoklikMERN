import React, { useState, useRef, useEffect } from "react";
import http from "../../../http-common";
import Modal from "react-modal";
import { Button, Col, Row } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import paypalImage from "../../../images/paypal.png";
import stripImage from "../../../images/stripe.jpg";

function FepkEditCoverForm() {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const inputFile3Ref = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [messageTitleNo, setMessageTitleNo] = useState("");
  const [messageTitleYes, setMessageTitleYes] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({ logLine_short: 0 });

  //Poster preview
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");

  //Banner prewiev
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState("");

  //Trailer preview
  const [trailerPreviewUrl, setTrailerPreviewUrl] = useState("");

  let { fepkId } = useParams();

  //banner
  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setBannerPreviewUrl(url);
  };

  //video
  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setTrailerPreviewUrl(url);
  };

  //poster
  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile3(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setPosterPreviewUrl(url);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      console.log(response.data);
      setCharacterLength({ logLine_short: response.data.logLine_short.length });
      // console.log(response.data);
    });
  }, [fepkId]);

  //To work with modal notifications
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [epkCoverData, setEpkCoverData] = useState({
    film_maker: fepk.film_maker,
    title: fepk.title,
    logLine_short: fepk.logLine_short,
    genre: fepk.genre,
    production_type: fepk.production_type,
    kickstarter_url: fepk.kickstarter_url,
    banner_url: fepk.banner_url,
    trailer_url: fepk.trailer_url,
    status: fepk.status,
    image_details: fepk.image_details,
    productionCo: fepk.productionCo,
    distributionCo: fepk.distributionCo,
    durationMin: fepk.durationMin,
    productionYear: fepk.productionYear,
    budget: fepk.budget,
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
  const makeGenreItem = (X) => {
    return (
      <option key={X} value={X}>
        {" "}
        {X}
      </option>
    );
  };
  const movieStatus = ["Preproduction", "Production", "Postproduction"];
  const makeStatusItem = (Y) => {
    return (
      <option key={Y} value={Y}>
        {" "}
        {Y}
      </option>
    );
  };

  const movieType = ["Movie", "Documentary", "TV Show", "Web Series"];
  const makeTypeItem = (Z) => {
    return (
      <option key={Z} value={Z}>
        {" "}
        {Z}
      </option>
    );
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
    setDisabled(false);
    if (name === "title") {
      http.get(`fepks/byTitle/${event.target.value}`).then((response) => {
        if (response.data !== null) {
          setMessageTitleNo(
            "This title exists! You are not allowed to use it again!"
          );
          setMessageTitleYes("");
        } else {
          setMessageTitleYes("Title is available!");
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
    if (characterLength.logLine_short <= 160) {
      let formData = new FormData();
      console.log(file1);
      console.log(file2);
      console.log(file3);

      formData.append("file1", file1);
      formData.append("file2", file2);
      formData.append("file3", file3);
      console.log(formData);
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
            console.log(epkCoverData);
            http
              .put(`fepks/update/${fepkId}`, epkCoverData)
              .then((res) => {
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
      }
    } else {
      setMessage("File must be an image(jpeg or png)");
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
            <h2
              className="col align-items-start"
              style={{
                color: "#FFFFFF",
                fontWeight: "normal",
                fontSize: "25px",
              }}
            >
              EPK Dashboard
            </h2>
          </div>
          <div className="col-3 m-3">
            <BasicMenu />
          </div>
          <div className="col-1 m-3"></div>
          <div className="col-2 m-3">
            <Link
              className="col align-items-end"
              to={`/epk/${fepk.title}`}
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "normal",
                fontSize: "20px",
              }}
            >
              View EPK Page
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
              marginLeft: "-1em",
              marginRight: "-1rem",
            }}
          >
            <h5
              className="card-title "
              style={{
                color: "#311465",
                fontWeight: "normal",
                marginBottom: "1%",
                fontSize: "1.5rem",
              }}
            >
              Cover - Mandotory
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
                        defaultValue={fepk.title}
                        placeholder="Title"
                        onChange={handleInputChange}
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
                        defaultValue={fepk.logLine_short}
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
                          defaultValue={fepk.productionCo}
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
                          defaultValue={fepk.distributionCo}
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
                          <option defaultValue={fepk.budget}>
                            {fepk.budget ? fepk.budget : "Production Budget"}
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
                          defaultValue={fepk.production_type || ""}
                        >
                          <option value="" disabled>
                            {fepk.production_type
                              ? fepk.production_type
                              : "Production Type"}
                          </option>
                          {movieType.map(makeTypeItem)}
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
                          defaultValue={fepk.genre || ""}
                        >
                          <option value="" disabled>
                            {fepk.genre ? fepk.genre : "Genre"}
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
                          defaultValue={fepk.status || ""}
                        >
                          <option value="" disabled>
                            {fepk.status ? fepk.status : "Status"}
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
                          defaultValue={fepk.productionYear}
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
                          defaultValue={fepk.durationMin}
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
                    ) : fepk.image_details &&
                      fepk.image_details !== undefined ? (
                      <img
                        src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
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
                        ) : fepk.banner_url && fepk.banner_url !== undefined ? (
                          <img
                            src={`${process.env.REACT_APP_AWS_URL}/${fepk.banner_url}`}
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
                        ) : fepk.trailer_url ? (
                          <video
                            src={`${process.env.REACT_APP_AWS_URL}/${fepk.trailer_url}`}
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
                style={{
                  marginTop: "4%",
                  paddingRight: "25%",                  
                }}
              >
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
                    defaultValue={fepk.DonatePayPal_url}
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
                    defaultValue={fepk.DonateStripe_url}
                    placeholder="URL: www.stripe.com/mymovie"
                    onChange={handleInputChange}
                    name="DonateStripe_url"
                  />
                </div>
              </div>
            </form>
          </div>
          <div
            style={{
              height: "50px",
              width: "80px",
              marginLeft: "90%",
              marginTop: "3%",
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
                onClick={saveEpkCover}
                value="save"
              >
                Save
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
                Save
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
              <div style={{ textAlign: "center" }}>
                {"EPK Cover Saved Successfully!"}
                <br />
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={closeModal}
                >
                  Ok
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default FepkEditCoverForm;
