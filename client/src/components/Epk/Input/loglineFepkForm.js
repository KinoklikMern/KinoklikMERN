/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";

function LoglineForm() {
  const { t } = useTranslation();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({
    logLine_long: 0,
  });
  const inputFileRef = useRef(null);
  const [blur, setBlur] = useState("");
  const [epkLoglineData, setEpkLoglineData] = useState([]);

  //Poster prewiev
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let { fepkId } = useParams();

  const fileSelected = (event) => {
    const file1 = event.target.files[0];
    if (file1) {
      setFile(file1);
      setDisabled(false);
      const url = URL.createObjectURL(file1);
      setPosterPreviewUrl(url);
    }
  };

  useEffect(() => {
    http
      .get(`/fepks/${fepkId}`)
      .then((response) => {
        if (response.data) {
          setFepk(response.data);
          //if (response.data.logLine_long) {
          setCharacterLength({
            logLine_long: response.data.logLine_long.length,
          });
          setEpkLoglineData({
            image_logline: response.data.image_logline,
            logLine_long: response.data.logLine_long,
            logLine_blur: response.data.logLine_blur,
          });
          // } else {
          //   // Handle the case when logLine_long is undefined or empty
          //   console.error("logLine_long is undefined or empty");
          // }
        } else {
          // Handle the case when response.data is undefined or empty
          console.error("response.data is undefined or empty");
        }
      })
      .catch((error) => {
        // Handle the error if the HTTP request fails
        console.error("HTTP request failed:", error);
      });
  }, [fepkId]);

  const handleLoglineChange = (event) => {
    const { name, value } = event.target;
    setEpkLoglineData({ ...epkLoglineData, [name]: value });
    setCharacterLength({ ...setCharacterLength, [name]: value.length });
    setDisabled(false);
  };

  const handleLoglineblurChange = (value) => {
    setEpkLoglineData({ ...epkLoglineData, logLine_blur: value });
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

  const saveEpkLogline = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(formData);
    if (checkFileMimeType(file)) {
      if (file) {
        http
          .post("fepks/uploadFile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data !== undefined) {
              epkLoglineData.image_logline = response.data.key;
            }
            http
              .put(`fepks/update/${fepkId}`, epkLoglineData)
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
      } else {
        console.log(epkLoglineData);
        http
          .put(`fepks/update/${fepkId}`, epkLoglineData)
          .then((res) => {
            setModalIsOpen(true);
            console.log("saved");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setMessage(t("File must be a image(jpeg or png)"));
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
          className='row'
          style={{
            background:
              "linear-gradient(to bottom, #1E0039 0%, #1E0039 35%, #1E0039 35%, #FFFFFF 100%)",
          }}
        >
          <div className='col-1'>
            <Link className='navbar-brand text-headers-style' to='/home'>
              <img
                style={{ width: "100%", height: "80px" }}
                src={require("../../../images/logo.png")}
                alt='Logo'
                className='navbar-logo'
              />
            </Link>
          </div>
          <div className='col-3  m-3'>
            <h2
              className='col align-items-start'
              style={{
                color: "#FFFFFF",
                fontWeight: "normal",
                fontSize: "25px",
              }}
            >
              {t("EPK Dashboard")}
            </h2>
          </div>
          <div className='col-3 m-3'>
            <BasicMenu color='#FFFFFF' />
          </div>
          <div className='col-1 m-3'></div>
          <div className='col-2 m-3'>
            <Link
              className='col align-items-end'
              to={`/epk/${fepk.title}`}
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "normal",
                fontSize: "20px",
              }}
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
          <div className='card-body' style={{ height: "500px" }}>
            <h5
              className='card-title '
              style={{ color: "#311465", fontWeight: "normal" }}
            >
              {t("Log Line")}
            </h5>
            <form className='row g-3'>
              <div className='col ms-'>
                <div className='col my-1'>
                  <textarea
                    style={{
                      height: "80px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      resize: "none",
                      // filter: epkLoglineData.logLine_blur
                      //   ? "blur(5px)"
                      //   : "none",
                    }}
                    className='form-control mt-10'
                    defaultValue={fepk.logLine_long}
                    placeholder={t("Log Line Long")}
                    onChange={handleLoglineChange}
                    name='logLine_long'
                    maxLength='160'
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    {characterLength?.logLine_long}
                    {t("/160 characters")}
                  </span>
                </div>

                <div className='col d-grid gap-2 d-md-flex justify-content-md-end'>
                  <Button
                    className='hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white'
                    style={{
                      height: "30px",
                      width: "120px",
                      boxShadow: "1px 2px 9px #311465",
                      fontWeight: "bold",
                    }}
                    type='outline-primary'
                    block
                    onClick={() =>
                      handleLoglineblurChange(!epkLoglineData.logLine_blur)
                    }
                    name='logLine_blur'
                  >
                    {epkLoglineData.logLine_blur ? "UnBlur" : "Blur"}
                  </Button>
                </div>
                <div className='col mt-5'>
                  <label
                    htmlFor='filePoster'
                    className='form-label text-dark'
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4>{t("Upload Poster")}</h4>
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className='form-control form-control-sm'
                    filename={file}
                    onChange={fileSelected}
                    ref={inputFileRef}
                    type='file'
                    id='filePoster'
                    name='files'
                    accept='image/*'
                  ></input>
                  {posterPreviewUrl ? (
                    <img
                      src={posterPreviewUrl}
                      style={{
                        height: "120px",
                        width: "auto",
                        margin: "inherit",
                        marginTop: "0",
                      }}
                      alt='Preview'
                    />
                  ) : fepk.image_logline && fepk.image_logline !== undefined ? (
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_logline}`}
                      style={{
                        height: "120px",
                        width: "auto",
                        margin: "inherit",
                        marginTop: "0",
                      }}
                      alt='no image'
                    />
                  ) : (
                    <h3>{t("No Image")}</h3>
                  )}
                </div>
              </div>
              <div
                style={{
                  height: "50px",
                  width: "120px",
                  marginLeft: "100%",
                  marginTop: "20px",
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
                    type='outline-primary'
                    block
                    onClick={saveEpkLogline}
                    value='save'
                  >
                    {t("Save")}
                  </Button>
                ) : (
                  <Button
                    className='hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white'
                    style={{
                      boxShadow: "1px 2px 9px #311465",
                      fontWeight: "bold",
                    }}
                    type='outline-primary'
                    block
                    onClick={saveEpkLogline}
                    value='save'
                  >
                    {t("Save")}
                  </Button>
                )}
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
                    (t{"Log Line Saved Successfully!"})
                    <br />
                    <button
                      className='btn btn-secondary btn-sm'
                      onClick={closeModal}
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
export default LoglineForm;
