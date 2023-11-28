import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";

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

  let { fepkId } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setTrailerPreviewUrl(url);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      console.log(response.data.title);
      //console.log("trailer url:", response.data.trailer_url);
    });
  }, []);

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
            .put(`fepks/update/${fepkId}`, epkTrailerData)
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
          boxShadow: "inset 1px 2px 9px #311465",
          marginLeft: "10%",
          marginBottom: "2%",
          width: "80%",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <div className='tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-50% tw-to-100% tw-py-5'>
          <div className='col-3 tw-m-3 tw-text-center'>
            <h2
              className=''
              style={{
                color: "#FFFFFF",
                fontWeight: "normal",
                fontSize: "25px",
              }}
            >
              {t("EPK Dashboard")}
            </h2>
          </div>
          <div className='col-3 tw-m-3 tw-text-center'>
            <BasicMenu color='#FFFFFF' />
          </div>
          <div className='col-3 tw-m-3 tw-text-center'>
            <Link
              className='col align-items-end'
              to={`/epk/${fepk.title}`}
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "normal",
                fontSize: "25px",
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
              {t("Film Trailer")}
            </h5>
            <form>
              <div className='row'>
                <div className='col-2 mt-3'>
                  <label
                    htmlFor='fileTrailer'
                    className='form-label text-dark'
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h6 style={{ fontSize: "20px" }}>{t("Upload Video")}</h6>
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className='form-control form-control-sm'
                    filename={file}
                    onChange={fileSelected}
                    ref={inputFileRef}
                    type='file'
                    id='fileTrailer'
                    name='files'
                    accept='video/*'
                  />
                </div>
                <div className='col-9 mt-3' style={{ textAlign: "center" }}>
                  {trailerPreviewUrl ? (
                    <video
                      src={trailerPreviewUrl}
                      style={{ width: "100%", height: "400px" }}
                      controls
                    ></video>
                  ) : fepk.trailer_url ? (
                    <video
                      src={`${process.env.REACT_APP_AWS_URL}/${fepk.trailer_url}`}
                      style={{ width: "100%", height: "400px" }}
                      controls
                    ></video>
                  ) : (
                    <h1>{t("NO VIDEO UPLOADED")}</h1>
                  )}
                </div>
                <div className='col-1'>
                  <div
                    style={{
                      height: "50px",
                      width: "100px",
                      marginLeft: "100%",
                      marginTop: "400px",
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
                        onClick={handleSaveClick}
                        value='save'
                      >
                        {isUploading ? (
                          <div
                            className='spinner'
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
                        className='hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white'
                        style={{
                          boxShadow: "1px 2px 9px #311465",
                          fontWeight: "bold",
                        }}
                        type='outline-primary'
                        block
                        onClick={handleSaveClick}
                        value='save'
                      >
                        {isUploading ? (
                          <div
                            className='spinner'
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
                        {"Trailer Saved Successfully!"}
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default TrailerForm;
