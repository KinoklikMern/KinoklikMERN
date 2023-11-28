/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";

function UniquenessForm() {
  const { t } = useTranslation();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({
    description_uniqueness: 0,
  });
  const [epkUniquenessData, setEpkUniquenessData] = useState([]);
  const inputFileRef = useRef(null);

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Picture prewiev
  const [picturePreviewUrl, setPicturerPreviewUrlPreviewUrl] = useState("");

  let { fepkId } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPicturerPreviewUrlPreviewUrl(url);
    setMessage("");
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      if (response.data) {
        setFepk(response.data);
        const { description_uniqueness } = response.data;
        //Aleksejs commented out because it was giving an error, seems to be working fine without that part
        //if (description_uniqueness) {
        setCharacterLength({
          description_uniqueness: description_uniqueness.length,
        });
        setEpkUniquenessData({
          image_uniqueness: response.data.image_uniqueness,
          title_uniqueness: response.data.title_uniqueness,
          description_uniqueness,
          uniqueness_blur: response.data.uniqueness_blur,
        });
        // } else {
        //   // Handle the case when description_uniqueness is undefined or empty
        //   console.error("description_uniqueness is undefined or empty");
        // }
      } else {
        // Handle the case when response.data is undefined or empty
        console.error("response.data is undefined or empty");
      }
    });
  }, []);

  if (!epkUniquenessData) {
    epkUniquenessData.uniqueness_blur = fepk.uniqueness_blur;
  }

  const handleUniquenessChange = (event) => {
    const { name, value } = event.target;
    setEpkUniquenessData({ ...epkUniquenessData, [name]: value });
    setCharacterLength({ ...characterLength, [name]: value.length });
    setDisabled(false);
  };

  const handleUniquenessBlurChange = (value, name) => {
    setEpkUniquenessData({ ...epkUniquenessData, [name]: value });
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
                .put(`fepks/update/${fepkId}`, epkUniquenessData)
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
            .put(`fepks/update/${fepkId}`, epkUniquenessData)
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
              {t("Uniqueness")}
            </h5>
            <form className='row g-3'>
              <div className='col ms-'>
                <div className='col my-1'>
                  <input
                    style={{
                      height: "30px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                    }}
                    className='form-control m-10'
                    defaultValue={fepk.title_uniqueness}
                    placeholder={t("Title")}
                    onChange={handleUniquenessChange}
                    name='title_uniqueness'
                  />
                  {/* </div>
                   <div className="col my-3"></div> 
                </div>

                <div className="col ms-">
                  <div className="col my-1"> */}
                  <textarea
                    style={{
                      height: "120px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      resize: "none",
                    }}
                    className='form-control mt-10'
                    defaultValue={fepk.description_uniqueness}
                    placeholder={t("Description (maximum 500 characters)")}
                    onChange={handleUniquenessChange}
                    name='description_uniqueness'
                    maxLength='500'
                  />
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
                      handleUniquenessBlurChange(
                        !epkUniquenessData.uniqueness_blur,
                        "uniqueness_blur"
                      )
                    }
                    name='text_long_blur'
                  >
                    {epkUniquenessData.uniqueness_blur ? "UnBlur" : "Blur"}
                  </Button>
                </div>
                {/* <div className="col my-3"></div> */}

                <div className='col mt-1'>
                  <label
                    htmlFor='filePoster'
                    className='form-label text-dark'
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4>{t("Upload Picture")}</h4>
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
                  {picturePreviewUrl ? (
                    <img
                      src={picturePreviewUrl}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt='Picture Preview'
                    />
                  ) : fepk.image_uniqueness ? (
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_uniqueness}`}
                      style={{
                        height: "120px",
                        width: "auto",
                        marginTop: "5px",
                        marginLeft: "50px",
                      }}
                      alt='Picture'
                    />
                  ) : (
                    <h3>{t("No Image")}</h3>
                  )}
                  {message && (
                    <div
                      className='message'
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
              </div>
              <div
                style={{
                  height: "50px",
                  width: "120px",
                  marginLeft: "100%",
                  marginTop: "-5%",
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
                    onClick={saveEpkUniqueness}
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
                    onClick={saveEpkUniqueness}
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
                    {"Uniqueness Saved Successfully!"}
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
export default UniquenessForm;
