/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
// import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function UniquenessForm() {
  const { t } = useTranslation();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({
    description_uniqueness: 0,
  });
  const [epkUniquenessData, setEpkUniquenessData] = useState({
    uniqueness_blur: false, // Initialize the blur state
  });
  const inputFileRef = useRef(null);

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Picture prewiev
  const [picturePreviewUrl, setPicturerPreviewUrlPreviewUrl] = useState("");

  //let { title } = useParams();
  let { id } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPicturerPreviewUrlPreviewUrl(url);
    setMessage("");
  };

  // useEffect(() => {
  //   http
  //     .get(`/fepks/byTitle/${title.replace(/ /g, "-").trim()}`)
  //     .then((response) => {
  //       if (response.data) {
  //         setFepk(response.data);
  //         const { description_uniqueness } = response.data;
  //         //Aleksejs commented out because it was giving an error, seems to be working fine without that part
  //         //if (description_uniqueness) {
  //         setCharacterLength({
  //           description_uniqueness: description_uniqueness.length,
  //         });
  //         setEpkUniquenessData({
  //           image_uniqueness: response.data.image_uniqueness,
  //           title_uniqueness: response.data.title_uniqueness,
  //           description_uniqueness,
  //           uniqueness_blur: response.data.uniqueness_blur,
  //         });
  //         // } else {
  //         //   // Handle the case when description_uniqueness is undefined or empty
  //         //   console.error("description_uniqueness is undefined or empty");
  //         // }
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
        const { description_uniqueness } = response;
        setCharacterLength({
          description_uniqueness: description_uniqueness.length,
        });
        setEpkUniquenessData({
          image_uniqueness: response.image_uniqueness,
          title_uniqueness: response.title_uniqueness,
          description_uniqueness,
          uniqueness_blur: response.uniqueness_blur,
        });
      } else {
        console.error("response.data is undefined or empty");
      }
    });
  }, [id]);

  const handleUniquenessChange = (event) => {
    const { name, value } = event.target;
    setEpkUniquenessData({ ...epkUniquenessData, [name]: value });
    setCharacterLength({ ...characterLength, [name]: value.length });
    setDisabled(false);
  };

  const handleUniquenessBlurChange = () => {
    setEpkUniquenessData((prevState) => ({
      ...prevState,
      uniqueness_blur: !prevState.uniqueness_blur,
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

  const saveEpkUniqueness = (e) => {
    if (characterLength.description_uniqueness <= 500) {
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
                epkUniquenessData.image_uniqueness = response.data.key;
              }
              http
                .put(`fepks/update/${fepk._id}`, epkUniquenessData)
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
          http
            .put(`fepks/update/${fepk._id}`, epkUniquenessData)
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
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        style={{
          // boxShadow: "inset 1px 2px 9px #311465",
          // marginLeft: "10%",
          // marginBottom: "2%",
          // width: "80%",
          // borderRadius: "10px",
          // backgroundColor: "white",
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
              style={{
                color: "#311465",
                fontWeight: "normal",
                marginBottom: "10px",
              }}
            >
              {/*{t("Uniqueness")}*/}
            </h5>
            <form className="col g-3">
              {/* Title and Description Fields */}
              <div className="col ">
                {/* <div className='col my-1'> */}
                {/* Title Input */}
                <input
                  style={{
                    height: "30px",
                    width: "100%",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    boxShadow: "1px 2px 9px #311465",
                    textAlign: "left",
                  }}
                  className="form-control m-10"
                  defaultValue={fepk.title_uniqueness}
                  placeholder={t("Title")}
                  onChange={handleUniquenessChange}
                  name="title_uniqueness"
                />
                {/* </div>
                   <div className="col my-3"></div> 
                </div>

                <div className="col ms-">
                  <div className="col my-1"> */}
                {/* Description Textarea */}
                <textarea
                  style={{
                    height: "120px",
                    width: "100%",
                    borderRadius: "15px",
                    marginBottom: "15px",
                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                    textAlign: "left",
                    resize: "none",
                  }}
                  className="form-control mt-10"
                  defaultValue={fepk.description_uniqueness}
                  placeholder={t("Description (maximum 500 characters)")}
                  onChange={handleUniquenessChange}
                  name="description_uniqueness"
                  maxLength="500"
                />
                {/* Character Counter */}
                <span
                  style={{
                    fontSize: "15px",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  {characterLength.description_uniqueness}
                  {t("/500 characters")}
                </span>
              </div>

              {/* Blur Button */}
              <div className="col tw-md-block tw-flex tw-flex tw-grid tw-flex-1 tw-justify-end tw-gap-2">
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
                  onClick={handleUniquenessBlurChange}
                  name="text_long_blur"
                >
                  {epkUniquenessData.uniqueness_blur ? "UnBlur" : "Blur"}
                </Button>
              </div>
              {/* <div className="col my-3"></div> */}
                {/* Upload Picture Section */}
                <div className="col mt-5 text-center">
                    {/* Picture Upload Text */}
                    <div className="tw-flex tw-justify-center tw-items-center tw-mt-5">
                        {/* Picture Upload Button */}
                        <div
                            className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                            style={{
                                width: "200px",
                                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                        >
                            <label
                                htmlFor="filePoster"
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
                        style={{ display: "none" }}
                        className="form-control form-control-sm"
                        filename={file}
                        onChange={fileSelected}
                        ref={inputFileRef}
                        type="file"
                        id="filePoster"
                        name="files"
                        accept="image/*"
                    />

                    {/* Picture Preview */}
                    {picturePreviewUrl || (fepk.image_uniqueness && fepk.image_uniqueness !== undefined) ? (
                        <img
                            src={picturePreviewUrl || `${process.env.REACT_APP_AWS_URL}/${fepk.image_uniqueness}`}
                            style={{
                                height: "120px",
                                width: "auto",
                                margin: "0 auto",
                                display: "block",
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                            alt="Picture Preview"
                            onClick={() => inputFileRef.current.click()} // Triggers file input click
                        />
                    ) : (
                        <h3
                            onClick={() => inputFileRef.current.click()}
                            style={{ cursor: "pointer", marginTop: "10px" }}
                        >
                            {t("No Image")}
                        </h3>
                    )}

                    {message && (
                        <div
                            className="message"
                            style={{
                                color: "red",
                                fontSize: "1rem",
                                marginTop: "10px",
                            }}
                        >
                            {message}
                        </div>
                    )}
                </div>

                {/* </div> */}
              {/* Save Button */}
              <div
                className="col tw-md-block tw-mt-4 tw-flex tw-flex tw-grid tw-flex-1 tw-justify-end tw-gap-2"
                style={{
                  // height: "50px",
                  // width: "120px",
                  // marginLeft: "100%",
                  // marginTop: "-5%",
                  marginTop: "",
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
                    onClick={saveEpkUniqueness}
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
                    onClick={saveEpkUniqueness}
                    value="save"
                  >
                    {t("Save")}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
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
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "green" }}>Uniqueness Saved Successfully!</div>
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
    </>
  );
}
export default UniquenessForm;
