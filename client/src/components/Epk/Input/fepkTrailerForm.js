/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
// import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function TrailerForm() {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const inputFileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { t } = useTranslation();

  //Trailer preview
  const [trailerPreviewUrl, setTrailerPreviewUrl] = useState("");

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //let { title } = useParams();
  let { id } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setTrailerPreviewUrl(url);
  };

  // useEffect(() => {
  //   http
  //     .get(`/fepks/byTitle/${title.replace(/ /g, "-").trim()}`)
  //     .then((response) => {
  //       setFepk(response.data);
  //       // console.log(response.data.title);
  //       //console.log("trailer url:", response.data.trailer_url);
  //     });
  // }, [title]);

  useEffect(() => {
    getFepksById(id).then((response) => {
      setFepk(response);
    });
  }, [id]);

  const [epkTrailerData, setEpkTrailerData] = useState({
    trailer_url: fepk.trailer_url,
  });

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

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.currentTarget.style.display = "flex";
    e.currentTarget.style.justifyContent = "center";
    e.currentTarget.style.alignItems = "center";
    setIsUploading(true);
    saveEpkTrailer(e);
  };

  const saveEpkTrailer = (e) => {
    //debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(formData);
    //debugger;
    if (checkFileMimeType(file)) {
      http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            epkTrailerData.trailer_url = response.data.key;
          }
          http
            .put(`fepks/update/${fepk._id}`, epkTrailerData)
            .then((res) => {
              setModalIsOpen(true);
              inputFileRef.current.value = "";
              setIsUploading(false);
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
      setMessage(t("File must be a image(jpeg or png)"));
    }
    setDisabled(true);
  };

  return (
    <>
      <div
        style={{
          // boxShadow: "inset 1px 2px 9px #311465",
          marginLeft: "10%",
          marginBottom: "2%",
          width: "80%",
          borderRadius: "10px",
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
        {/*Purple Frame*/}
        <div
          style={{
            // marginLeft: "10%",
            // marginRight: "15%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div
            className="card-body"
            // style={{ height: "500px" }}
          >
            {/*Title*/}
            {/*<h5*/}
            {/*  className="card-title "*/}
            {/*  style={{ color: "#311465", fontWeight: "normal" }}*/}
            {/*>*/}
            {/*  {t("Film Trailer")}*/}
            {/*</h5>*/}
            <form className="tw-flex tw-flex-col lg:tw-flex-col xl:tw-flex-row">
              {/* <div className='row'> */}
              {/*Upload video*/}
                <div className="col mt-1 text-center">
                    {/* Trailer Upload Text */}
                    <div className="tw-flex tw-justify-center tw-items-center tw-mt-1">
                        <div
                            className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                            style={{
                                width: "200px",
                                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                        >
                            <label
                                htmlFor="fileTrailer"
                                className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"
                            >
                <span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">
                    {t("Upload Trailer")}
                </span>
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

                    {/* Hidden File Input */}
                    <input
                        style={{display: "none"}}
                        className="form-control form-control-sm"
                        filename={file}
                        onChange={fileSelected}
                        ref={inputFileRef}
                        type="file"
                        id="fileTrailer"
                        name="files"
                        accept="video/*"
                    />

                    <div
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: "0px",
                            margin: "0 auto",

                        }}
                    >
                        {trailerPreviewUrl ? (
                            <video
                                src={trailerPreviewUrl}
                                style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: "0px",
                                    padding: "0",
                                    margin: "0",
                                }}
                                controls
                            ></video>
                        ) : fepk.trailer_url ? (
                            <video
                                src={`${process.env.REACT_APP_AWS_URL}/${fepk.trailer_url}`}
                                style={{
                                    width: "100%",

                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: "0px",
                                }}
                                controls
                            ></video>
                        ) : (
                            <h1>{t("NO VIDEO UPLOADED")}</h1>
                        )}
                    </div>


                    {/* Save Button */}
                    <div
                        className="tw-md-block tw-mt-4 tw-flex tw-grid tw-flex-1 tw-justify-end tw-gap-2"
                        style={{
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
                                            margin: "0 auto",
                                        }}
                                    ></div>
                                ) : (
                                    t("Save")
                                )}
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
                                            margin: "0 auto",
                                        }}
                                    ></div>
                                ) : (
                                    t("Save")
                                )}
                            </Button>
                        )}
                    </div>


                    {/* Error Message */}
                    {message && (
                        <div
                            className="message"
                            style={{
                                color: "red",
                                fontSize: "0.9rem",
                                marginTop: "10px",
                            }}
                        >
                            {message}
                        </div>
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
                            {"Trailer Saved Successfully!"}
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

              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrailerForm;
