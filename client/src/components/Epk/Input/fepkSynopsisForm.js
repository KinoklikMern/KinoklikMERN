/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";

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

  let { fepkId } = useParams();

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

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      if (response.data) {
        setFepk(response.data);
        const { text_short, text_medium, text_long } = response.data;
        setCharacterLength((prevCharacterLength) => ({
          ...prevCharacterLength,
          text_short: text_short ? text_short.length : 0,
          text_medium: text_medium ? text_medium.length : 0,
          text_long: text_long ? text_long.length : 0,
        }));
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
      } else {
        // Handle the case when response.data is undefined or empty
        console.error("response.data is undefined or empty");
      }
    });
  }, [fepkId]);

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
          boxShadow: "inset 1px 2px 9px #311465",
          marginLeft: "10%",
          marginBottom: "2%",
          width: "80%",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div className="tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-transparent tw-via-20% tw-to-transparent tw-py-5">
          <div className="col-3 tw-m-3 tw-text-center">
            <h2
              className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"
              // style={{
              //   color: "#1E0039",
              //   fontWeight: "bold",
              //   fontSize: "25px",
              // }}
            >
              {t("EPK Dashboard")}
            </h2>
          </div>
          <div className="col-3 tw-m-3 tw-text-center">
            <BasicMenu color="#1E0039" />
          </div>
          <div className="col-3 tw-m-3 tw-text-center">
            <Link
              className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"
              to={`/epk/${fepk._id}`}
              // style={{
              //   color: "#1E0039",
              //   textDecoration: "none",
              //   fontWeight: "bold",
              //   fontSize: "25px",
              // }}
            >
              {t("View EPK Page")}
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
          <div
            className="card-body"
            // style={{ height: "500px" }}
          >
            <h5
              className="card-title "
              style={{ color: "#311465", fontWeight: "normal" }}
            >
              {t("Synopsis")}
            </h5>
            <form>
              {/* First Row: Small, Medium, Long Synopsis + buttons/*/}
              <div className="row g-3">
                {/* Short Synopsis */}
                <div
                  className="col-sm-12 col-md-6 col-lg-4  my-4"
                  style={{ position: "relative" }}
                >
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
                {/* Medium Synopsis + Button*/}
                <div
                  className="col-sm-12 col-md-6 col-lg-4 my-4"
                  style={{ position: "relative" }}
                >
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
                {/* Long Synopsis + Button*/}
                <div
                  className="col-sm-12 col-md-6 col-lg-4  my-4"
                  style={{ position: "relative" }}
                >
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

              {/* The second row with Upload Poster and images */}
              <div className="row g-3">
                {/* Upload Poster section #1*/}
                <div className="col-sm-12 col-md-6 col-lg-4 my-4">
                  <label
                    htmlFor="filePoster"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4>{t("Upload Poster")}</h4>
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
                    <h3>{t("No Image")}</h3>
                  )}
                </div>
                {/* Upload Poster section #2*/}
                <div className="col-sm-12 col-md-6 col-lg-4 my-4">
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
                    <h3>{t("No Image")}</h3>
                  )}
                </div>
                {/* Upload Poster section #3*/}
                <div className="col-sm-12 col-md-6 col-lg-4 my-4">
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
                    <h3>{t("No Image")}</h3>
                  )}
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
                      {t("Save")}
                    </Button>
                  ) : (
                    <Button
                      className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                      style={{
                        width: "120px",
                        boxShadow: "1px 2px 9px #311465",
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
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "green" }}>
                        {t("Synopsis is Saved Successfully!")}
                      </div>
                      <br />
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={closeModal}
                        style={{ backgroundColor: "#712CB0", color: "white" }}
                      >
                        {t("Ok")}
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
