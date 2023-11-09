/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";

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

  let { fepkId } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setShortBannerPreviewUrl(url);
  };

  const fileMediumSelected = (event) => {
    const fileNew = event.target.files[0];
    setFileMedium(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setMediumBannerPreviewUrl(url);
  };

  const fileLongSelected = (event) => {
    const fileNew = event.target.files[0];
    setFileLong(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setLongBannerPreviewUrl(url);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      if (response.data) {
        setFepk(response.data);
        const { text_short, text_medium, text_long } = response.data;
        //Aleksejs commented out because it was giving an error, seems to be working fine without that part
        //if (text_short) {
        setCharacterLength({
          ...characterLength,
          text_short: text_short ? text_short.length : 0,
          text_medium: text_medium ? text_medium.length : 0,
          text_long: text_long ? text_long.length : 0,
        });
        setEpkSynopsisData({
          image_synopsis: response.data.image_synopsis,
          image_synopsis_medium: response.data.image_synopsis_medium,
          image_synopsis_long: response.data.image_synopsis_long,
          text_short: response.data.text_short,
          text_medium: response.data.text_medium,
          text_long: response.data.text_long,
          text_medium_blur: response.data.text_medium_blur,
          text_long_blur: response.data.text_long_blur,
        });
        // } else {
        //   // Handle the case when text_short is undefined or empty
        //   console.error("text_short is undefined or empty");
        // }
      } else {
        // Handle the case when response.data is undefined or empty
        console.error("response.data is undefined or empty");
      }
    });
     }, [characterLength, fepkId]);
  //}, [fepkId]);

  const handleSynopsisChange = (event) => {
    const { name, value } = event.target;
    setCharacterLength({ ...characterLength, [name]: value.length });
    setEpkSynopsisData({ ...epkSynopsisData, [name]: value });
    setDisabled(false);
  };

  const handleSynopsisBlurChange = (value, name) => {
    setEpkSynopsisData({ ...epkSynopsisData, [name]: value });
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
            .put(`fepks/update/${fepkId}`, epkSynopsisData)
            .then((res) => {
              setFepk(res.data);
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
      setMessage("File must be a image(jpeg or png)");
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
            marginLeft: "10%",
            marginRight: "15%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div className="card-body" style={{ height: "500px" }}>
            <h5
              className="card-title "
              style={{ color: "#311465", fontWeight: "normal" }}
            >
              Synopsis
            </h5>
            <form>
              <div className="row g-3">
                <div className="col my-4" style={{ position: "relative" }}>
                  <textarea
                    style={{
                      height: "100px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      resize: "none",
                      // position: "absolute",
                      // bottom: "0",
                    }}
                    className="form-control mt-10"
                    defaultValue={fepk.text_short}
                    placeholder="Short Synopsis(maximum 160 characters)"
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
                    {characterLength?.text_short}/160 characters
                  </span>
                </div>
                <div className="col my-4" style={{ position: "relative" }}>
                  <textarea
                    style={{
                      height: "100px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      resize: "none",
                      // position: "absolute",
                      // bottom: "0",
                    }}
                    className="form-control mt-10"
                    defaultValue={fepk.text_medium}
                    placeholder="Medium Synopsis(maximum 350 characters)"
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
                    {characterLength?.text_medium}/350 characters
                  </span>
                  <div className="col d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button
                      className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                      style={{
                        height: "30px",
                        width: "100px",
                        boxShadow: "1px 2px 9px #311465",
                        fontWeight: "bold",
                        justifyContent: "right",
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
                </div>
                <div className="col my-4" style={{ position: "relative" }}>
                  <textarea
                    style={{
                      height: "100px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      resize: "none",
                      // position: "absolute",
                      // bottom: "0",
                    }}
                    className="form-control mt-10"
                    defaultValue={fepk.text_long}
                    placeholder="Long Synopsis(maximum 500 characters)"
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
                    {characterLength?.text_long}/500 characters
                  </span>

                  <div className="col d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button
                      className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                      style={{
                        height: "30px",
                        width: "120px",
                        boxShadow: "1px 2px 9px #311465",
                        fontWeight: "bold",
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
                </div>
              </div>
              <div className="row g-3">
                <div className="col my-4">
                  <label
                    htmlFor="filePoster"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4>Upload Poster</h4>
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className="form-control form-control-sm"
                    filename={file}
                    onChange={fileSelected}
                    ref={inputFileRef}
                    type="file"
                    id="filePoster"
                    name="files"
                    accept="image/*"
                  ></input>
                  {shortBannerPreviewUrl ? (
                    <img
                      src={shortBannerPreviewUrl}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt="Short Banner Preview"
                    />
                  ) : epkSynopsisData.image_synopsis ? (
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${epkSynopsisData.image_synopsis}`}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt="Short Banner"
                    />
                  ) : (
                    <h3>No Image</h3>
                  )}
                </div>
                <div className="col my-4">
                  <label
                    htmlFor="filePoster"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className="form-control form-control-sm"
                    filename={fileMedium}
                    onChange={fileMediumSelected}
                    ref={inputFileMediumRef}
                    type="file"
                    id="filePoster"
                    name="files"
                    accept="image/*"
                  ></input>
                  {mediumBannerPreviewUrl ? (
                    <img
                      src={mediumBannerPreviewUrl}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt="Medium Banner Preview"
                    />
                  ) : epkSynopsisData.image_synopsis_medium ? (
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${epkSynopsisData.image_synopsis_medium}`}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt="Medium Banner"
                    />
                  ) : (
                    <h3>No Image</h3>
                  )}
                </div>
                <div className="col my-4">
                  <label
                    htmlFor="filePoster"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className="form-control form-control-sm"
                    filename={fileLong}
                    onChange={fileLongSelected}
                    ref={inputFileLongRef}
                    type="file"
                    id="filePoster"
                    name="files"
                    accept="image/*"
                  ></input>
                  {longBannerPreviewUrl ? (
                    <img
                      src={longBannerPreviewUrl}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt="Long Banner Preview"
                    />
                  ) : epkSynopsisData.image_synopsis_long ? (
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${epkSynopsisData.image_synopsis_long}`}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt="Long Banner"
                    />
                  ) : (
                    <h3>No Image</h3>
                  )}
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "120px",
                    marginLeft: "100%",
                    marginTop: "-15px",
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
                      onClick={saveEpkSynopsis}
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
                      onClick={saveEpkSynopsis}
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
                      {"Synopsis is Saved Successfully!"}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default SynopsisForm;
