/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

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
  const [epkLoglineData, setEpkLoglineData] = useState([]);

  //Poster prewiev
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //let { title } = useParams();
  let { id } = useParams();

  const fileSelected = (event) => {
    const file1 = event.target.files[0];
    if (file1) {
      setFile(file1);
      setDisabled(false);
      const url = URL.createObjectURL(file1);
      setPosterPreviewUrl(url);
      setMessage("");
    }
  };

  // useEffect(() => {
  //   http
  //     .get(`/fepks/byTitle/${title.replace(/-/g, " ").trim()}`)
  //     .then((response) => {
  //       if (response.data) {
  //         setFepk(response.data);
  //         //if (response.data.logLine_long) {
  //         setCharacterLength({
  //           logLine_long: response.data.logLine_long.length,
  //         });
  //         setEpkLoglineData({
  //           image_logline: response.data.image_logline,
  //           logLine_long: response.data.logLine_long,
  //           logLine_blur: response.data.logLine_blur,
  //         });
  //         // } else {
  //         //   // Handle the case when logLine_long is undefined or empty
  //         //   console.error("logLine_long is undefined or empty");
  //         // }
  //       } else {
  //         // Handle the case when response.data is undefined or empty
  //         console.error("response.data is undefined or empty");
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle the error if the HTTP request fails
  //       console.error("HTTP request failed:", error);
  //     });
  // }, [title]);

  useEffect(() => {
    getFepksById(id)
      .then((response) => {
        if (response) {
          console.log("LogLone response:", response)
          setFepk(response);
          //if (response.data.logLine_long) {
          setCharacterLength({
            logLine_long: response.logLine_long.length,
          });
          setEpkLoglineData({
            image_logline: response.image_logline,
            logLine_long: response.logLine_long,
            logLine_blur: response.logLine_blur,
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
  }, [id]);

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
              .put(`fepks/update/${fepk._id}`, epkLoglineData)
              .then((res) => {
                setModalIsOpen(true);
                console.log("saved");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(epkLoglineData);
        http
          .put(`fepks/update/${fepk._id}`, epkLoglineData)
          .then((res) => {
            setModalIsOpen(true);
            console.log("saved");
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

        }}
      >

        <div
          style={{
            marginLeft: "10%",
            marginRight: "15%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div className="card-body" style={{ height: "500px" }}>
            <form className="row g-3">
              <div className="col ms-">
                <div className="col my-1">
                  <textarea
                      style={{
                        height: "80px",
                        width: "100%",
                        borderRadius: "15px",
                        // marginBottom: "5px",
                        // boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                        // resize: "none",
                        // filter: epkLoglineData.logLine_blur
                        //   ? "blur(5px)"
                        //   : "none",
                      }}
                      className="form-control mt-10"
                      defaultValue={fepk.logLine_long}
                      placeholder={t("Log Line Long")}
                      onChange={handleLoglineChange}
                      name="logLine_long"
                      maxLength="160"
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

                <div className="col d-grid gap-2 d-md-flex justify-content-md-end">
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
                          handleLoglineblurChange(!epkLoglineData.logLine_blur)
                      }
                      name="logLine_blur"
                  >
                    {epkLoglineData.logLine_blur ? "UnBlur" : "Blur"}
                  </Button>
                </div>
                <div className="col mt-5 text-center">
                  {/* Picture Upload Text */}
                  <div className="mb-2">
                    <label
                        htmlFor="filePoster"
                        className="form-label text-dark text-2xl cursor-pointer"
                    >
                      <h4>{t("Picture Upload")}</h4>
                    </label>
                  </div>

                  {/* Hidden file input */}
                  <input
                      style={{display: "none"}}
                      className="form-control form-control-sm"
                      filename={file}
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="filePoster"
                      name="files"
                      accept="image/*"
                  />

                  {/* Clickable image for file upload */}
                  {posterPreviewUrl || (fepk.image_logline && fepk.image_logline !== undefined) ? (
                      <img
                          src={posterPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${fepk.image_logline}`}
                          style={{
                            height: "120px",
                            width: "auto",
                            margin: "0 auto",
                            display: "block",
                            cursor: "pointer", // Makes the image look clickable
                          }}
                          alt="Preview"
                          onClick={() => inputFileRef.current.click()} // Triggers file input click
                      />
                  ) : (
                      <h3 onClick={() => inputFileRef.current.click()} style={{cursor: "pointer"}}>
                        {t("No Image")}
                      </h3>
                  )}

                  {message && (
                      <div
                          className="message"
                          style={{
                            color: "red",
                            fontSize: "1rem",
                            marginBottom: "-3%",
                          }}
                      >
                        {message}
                      </div>
                  )}
                </div>

                {/* Save Button */}
                <div
                    className="tw-md-block tw-flex tw-flex tw-grid tw-flex-1 tw-justify-end tw-gap-2 "
                    style={{
                      // height: "50px",
                      // width: "120px",
                      // marginLeft: "80%",
                      marginTop: "20px",
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
                          onClick={saveEpkLogline}
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
                          onClick={saveEpkLogline}
                      >
                        {t("Save")}
                      </Button>
                  )}
                </div>

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
                      {" "}
                      {t("Log Line Saved Successfully!")}
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

export default LoglineForm;
