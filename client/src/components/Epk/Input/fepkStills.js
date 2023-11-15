/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faTrashCan,
  faUserPlus,
  faCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function StillsForm() {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const inputFileRef = useRef(null);
  const [stillsList, setStillsList] = useState([]);
  const [epkStillsData, setEpkStillsData] = useState([]);
  const [editMode, setEditMode] = useState({ status: false, rowKey: null });
  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //Picture prewiev
  const [picturePreviewUrl, setPicturerPreviewUrlPreviewUrl] = useState("");

  let { fepkId } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    //setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPicturerPreviewUrlPreviewUrl(url);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      setStillsList(response.data.stills);

      setEpkStillsData(response.data.stills);
      //      console.log(response.data.title);
    });
  }, []);

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

  function addImage() {
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
              const key = response.data.key;
              console.log(key);

              stillsList.push({ image: key, blur: false });

              setEpkStillsData({ ...epkStillsData, stills: stillsList });
              console.log(epkStillsData);
              setDisabled(false);
              setPicturerPreviewUrlPreviewUrl("");
              inputFileRef.current.value = "";
            }
          })
          .catch((err) => {
            console.log();
            console.log(err);
          });
      }
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  }

  function deleteFromStillsList(deletedImage) {
    const newStillsList = stillsList.filter(
      (imageObject) => imageObject !== deletedImage
    );
    setStillsList(newStillsList);
    setEpkStillsData({ ...epkStillsData, stills: newStillsList });
    setDisabled(false);
  }

  const handleStillsBlurChange = (value, still) => {
    // Use filter to find the element with the specified `_id` in the `stills` array
    const updatedStills = stillsList.filter(
      (stillsElement) => stillsElement === still
    );
    // Update the `blur` field of the first element in the filtered array
    updatedStills[0].blur = value;
    // Update the corresponding field of the `epkStillsData` object
    const newStillsList = [
      ...stillsList.filter((stillsElement) => stillsElement !== still),
      ...updatedStills,
    ];
    // console.log(newStillsList);
    // Update the state with the updated object
    setStillsList(newStillsList);
    setEpkStillsData({ ...epkStillsData, stills: newStillsList });
    // console.log(epkStillsData);
    setDisabled(false);
  };

  function saveEpkStills() {
    console.log(epkStillsData);

    http
      .put(`fepks/update/${fepkId}`, epkStillsData)
      .then((res) => {
        setModalIsOpen(true);
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
    setDisabled(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const enterEditMode = (key) => {
    setEditMode({ status: true, rowKey: key });
  };
  const exitEditMode = () => {
    setEditMode({ status: false, rowKey: null });
  };

  const handleEditChange = (event, index, field) => {
    // Check if the field is 'image' and handle file input
    if (field === "image") {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      let formData = new FormData();
      formData.append("file", selectedFile);

      http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedStillsList = [...stillsList];
          updatedStillsList[index].image = response.data.key;
          setStillsList(updatedStillsList);
          setEpkStillsData({
            ...epkStillsData,
            resources: updatedStillsList,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setDisabled(false);
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
              Film Stills
            </h5>
            <form className="row">
              <div className="col-4 mt-5">
                <label
                  htmlFor="filePoster"
                  className="form-label text-dark"
                  style={{ fontSize: "25px" }}
                >
                  {" "}
                  <h4>Upload Picture</h4>
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
                />
                {picturePreviewUrl && picturePreviewUrl !== undefined ? (
                  <img
                    src={picturePreviewUrl}
                    style={{
                      height: "120px",
                      width: "auto",
                      marginTop: "5px",
                    }}
                    alt="no img"
                  />
                ) : // <h3>No Image</h3>
                null}
              </div>
              <div className="col-1 mt-5">
                <br />

                <div className="tw-cursor-pointer hover:tw-scale-110">
                  <FontAwesomeIcon icon={faPlus} onClick={addImage} />
                </div>
              </div>
              <div className="col-6 mt-3">
                <table
                  className="table table-striped table-bordered"
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    tableLayout: "auto",
                  }}
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>IMAGE</th>
                      <th>EDIT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stillsList.map((still, index) => {
                      return (
                        <tr key={index}>
                          {/* <td>
                            <img
                              src={`${process.env.REACT_APP_AWS_URL}/${still.image}`}
                              style={{ height: "80px", width: "auto" }}
                            />
                          </td> */}
                          {editMode.status && editMode.rowKey === index ? (
                            <>
                              <td style={{ maxWidth: "115px" }}>
                                <img
                                  src={`${process.env.REACT_APP_AWS_URL}/${still.image}`}
                                  alt=""
                                  style={{ height: "50px", width: "auto" }}
                                />
                                {editMode && (
                                  <>
                                    <input
                                      className="form-control form-control-sm"
                                      filename={file}
                                      onChange={(e) =>
                                        handleEditChange(e, index, "image")
                                      }
                                      ref={inputFileRef}
                                      type="file"
                                      id="fileImageResources"
                                      name="files"
                                      accept="image/*"
                                    />
                                  </>
                                )}
                              </td>
                            </>
                          ) : (
                            <>
                              <td>
                                <img
                                  src={`${process.env.REACT_APP_AWS_URL}/${still.image}`}
                                  style={{ height: "80px", width: "auto" }}
                                />
                              </td>
                            </>
                          )}
                          <td
                            style={{
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            {editMode.status && editMode.rowKey === index ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                onClick={() => exitEditMode()}
                                style={{ marginRight: "15px" }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faPen}
                                onClick={() => enterEditMode(index)}
                                style={{ marginRight: "15px" }}
                              />
                            )}
                            {"  "}
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              onClick={() => deleteFromStillsList(still)}
                            />
                          </td>
                          <td>
                            <Button
                              className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                              style={{
                                height: "30px",
                                width: "80px",
                                boxShadow: "1px 2px 9px #311465",
                                fontWeight: "bold",
                              }}
                              type="outline-primary"
                              block
                              onClick={() =>
                                handleStillsBlurChange(!still.blur, still)
                              }
                              name="blur"
                            >
                              {still.blur ? "UnBlur" : "Blur"}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-1 mt-5">
                <div
                  style={{
                    height: "50px",
                    width: "100px",
                    marginLeft: "100%",
                    marginTop: "350px",
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
                      onClick={saveEpkStills}
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
                      onClick={saveEpkStills}
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
                      {"Film Stills Saved Successfully!"}
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
export default StillsForm;
