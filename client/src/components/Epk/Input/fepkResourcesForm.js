/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row } from "antd";
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
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

function ResourcesForm() {
  const { t } = useTranslation();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const [resourcesList, setResourcesList] = useState([]);
  const [resource, setResource] = useState({
    title: "",
    time: "",
    description: "",
  });
  const [epkResourcesData, setEpkResourcesData] = useState({
    resources: fepk.resources,
  });
  const [characterLength, setCharacterLength] = useState({
    description: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState({ status: false, rowKey: null });

  let { fepkId } = useParams();

  //Picture prewiev
  const [picturePreviewUrl, setPicturerPreviewUrlPreviewUrl] = useState("");

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    //setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPicturerPreviewUrlPreviewUrl(url);
    setMessage("");
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      setResourcesList(response.data.resources);
    });
  }, [fepkId]);

  useEffect(() => {
    console.log(resourcesList);
  }, [resourcesList]);

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

  function addResourceToTable() {
    if (resource.title !== "") {
      resourcesList.push(resource);
      setEpkResourcesData({ ...epkResourcesData, resources: resourcesList });
      setDisabledAdd(true);
      setDisabled(false);
      setResource({
        title: "",
        time: "",
        description: "",
      });
    }
  }
  const handleResourceChange = (event) => {
    const { name, value } = event.target;
    setResource({ ...resource, [name]: value });
    setCharacterLength({ ...characterLength, [name]: value.length });
    setDisabledAdd(false);
    setMessage("");
  };

  function addResourceImage() {
    if (characterLength.description <= 160) {
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
                resource.image = key;
                addResourceToTable();
                setPicturerPreviewUrlPreviewUrl("");
                inputFileRef.current.value = "";
              }
            })
            .catch((err) => {
              console.log();
              console.log(err);
            });
        } else {
          addResourceToTable();
        }
      } else {
        setMessage(t("Oops! Please use JPEG, JPG, or PNG images."));
      }
    }
  }

  function deleteFromResourcesList(deletedResource) {
    const newResourcesList = resourcesList.filter(
      (resourceObject) => resourceObject !== deletedResource
    );
    setResourcesList(newResourcesList);
    setEpkResourcesData({ ...epkResourcesData, resources: newResourcesList });
    setDisabled(false);
  }

  function saveEpkResources() {
    console.log(epkResourcesData);
    http
      .put(`fepks/update/${fepkId}`, epkResourcesData)
      .then((res) => {
        setModalIsOpen(true);
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
    setDisabled(true);
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const enterEditMode = (key) => {
    setEditMode({ status: true, rowKey: key });
  };
  const exitEditMode = () => {
    setEditMode({ status: false, rowKey: null });
  };

  const handleEditChange = (event, index, field) => {
    const newResourcesList = [...resourcesList];
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
          const updatedResourcesList = [...resourcesList];
          updatedResourcesList[index].image = response.data.key;
          setResourcesList(updatedResourcesList);
          setEpkResourcesData({
            ...epkResourcesData,
            resources: updatedResourcesList,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Handle text inputs
      const newValue = event.target.value;
      newResourcesList[index] = {
        ...newResourcesList[index],
        [field]: newValue,
      };
      // Update character length
      if (field === "description") {
        setCharacterLength({ ...characterLength, [index]: newValue.length });
      }
      setResourcesList(newResourcesList);
    }
    setDisabled(false);
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
        <div className="tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-50% tw-to-100% tw-py-5">
          <div className="col-3 tw-m-3 tw-text-center">
            <h2
              className=""
              style={{
                color: "#FFFFFF",
                fontWeight: "normal",
                fontSize: "25px",
              }}
            >
              {t("EPK Dashboard")}
            </h2>
          </div>
          <div className="col-3 tw-m-3 tw-text-center">
            <BasicMenu color="#FFFFFF" />
          </div>
          <div className="col-3 tw-m-3 tw-text-center">
            <Link
              className="col align-items-end"
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
          <div className="card-body" style={{ height: "500px" }}>
            <h5
              className="card-title "
              style={{ color: "#311465", fontWeight: "normal" }}
            >
              {t("Resources")}
            </h5>
            <form>
              <div className="row">
                <div className="col-4 my-4">
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
                    placeholder={t("Title")}
                    onChange={handleResourceChange}
                    name="title"
                    value={resource.title}
                  />
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
                    placeholder={t("Duration Required")}
                    onChange={handleResourceChange}
                    name="time"
                    value={resource.time}
                  />
                  <textarea
                    style={{
                      height: "60px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "5px",
                      boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      resize: "none",
                    }}
                    className="form-control mt-10"
                    placeholder={t("Description(maximum 160 characters)")}
                    onChange={handleResourceChange}
                    name="description"
                    maxLength="160"
                    value={resource.description}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    {characterLength?.description}
                    {t("/160 characters")}
                  </span>

                  <label
                    htmlFor="fileAwardLogo"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4>{t("Upload Image")}</h4>
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className="form-control form-control-sm"
                    filename={file}
                    onChange={fileSelected}
                    ref={inputFileRef}
                    type="file"
                    id="fileImageResources"
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
                  {disabledAdd === true ? (
                    <Button
                      disabled
                      style={{
                        boxShadow: "1px 2px 9px #311465",
                        color: "grey",
                        backgroundColor: "#ffffff",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                      type="outline-primary"
                      block
                      onClick={addResourceImage}
                      value="save"
                    >
                      {t("Add to Table")}
                    </Button>
                  ) : (
                    <Button
                      className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                      style={{
                        boxShadow: "1px 2px 9px #311465",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                      type="outline-primary"
                      block
                      onClick={addResourceImage}
                      value="save"
                    >
                      {t("Add to Table")}
                    </Button>
                  )}
                  {message && (
                    <div
                      className="message"
                      style={{
                        color: "red",
                        fontSize: "0.9rem",
                        marginTop: "5%",
                      }}
                    >
                      {message}
                    </div>
                  )}
                </div>
                <div className="col-7 my-4">
                  <table
                    className="table table-striped table-bordered"
                    style={{
                      fontSize: "0.8rem",
                      textAlign: "center",
                      tableLayout: "auto",
                      // width: "100%",
                      marginLeft: "2%",
                    }}
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>{t("Title")}</th>
                        <th
                          style={{
                            width: "fit-content",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t("Duration Required")}
                        </th>
                        <th>{t("Description")}</th>
                        <th>{t("Image")}</th>
                        <th>{t("ACTIONS")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resourcesList.map((resource, index) => {
                        return (
                          <tr
                            key={index}
                            style={{
                              verticalAlign: "middle",
                            }}
                          >
                            {editMode.status && editMode.rowKey === index ? (
                              <>
                                <td>
                                  <input
                                    value={resource.title}
                                    onChange={(e) =>
                                      handleEditChange(e, index, "title")
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    value={resource.time}
                                    onChange={(e) =>
                                      handleEditChange(e, index, "time")
                                    }
                                  />
                                </td>
                                <td>
                                  <div>
                                    <textarea
                                      value={resource.description}
                                      onChange={(e) =>
                                        handleEditChange(
                                          e,
                                          index,
                                          "description"
                                        )
                                      }
                                      name="text"
                                      maxLength="160"
                                      style={{ maxWidth: "160px" }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "10px",
                                        display: "flex",
                                        justifyContent: "right",
                                      }}
                                    >
                                      {characterLength[index]}
                                      {t("/ 160 characters")}
                                    </span>
                                  </div>
                                </td>
                                <td style={{ minWidth: "160px" }}>
                                  <img
                                    src={
                                      resource?.image
                                        ? `${process.env.REACT_APP_AWS_URL}/${resource.image}`
                                        : null
                                    }
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
                                <td>{resource.title}</td>
                                <td>{resource.time}</td>
                                <td>{resource.description}</td>
                                <td>
                                  <img
                                    src={
                                      resource?.image
                                        ? `${process.env.REACT_APP_AWS_URL}/${resource.image}`
                                        : null
                                    }
                                    style={{ height: "50px", width: "auto" }}
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
                                onClick={() =>
                                  deleteFromResourcesList(resource)
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Example Modal"
                      appElement={document.getElementById("root")}
                      style={{
                        overlay: {
                          // position: "fixed",
                          // top: 0,
                          // left: 0,
                          // right: 0,
                          // bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                        content: {
                          position: "absolute",
                          border: "2px solid #000",
                          backgroundColor: "white",
                          boxShadow: "2px solid black",
                          height: 150,
                          width: 300,
                          margin: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <h2>
                          {t("Your content has been successfully saved!")}
                        </h2>
                        <br />
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={closeModal}
                        >
                          {t("Ok")}
                        </button>
                      </div>
                    </Modal>
                  </div>
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
                        onClick={saveEpkResources}
                        value="save"
                      >
                        {t("Save")}
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
                        onClick={saveEpkResources}
                        value="save"
                      >
                        {t("Save")}
                      </Button>
                    )}
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
export default ResourcesForm;
