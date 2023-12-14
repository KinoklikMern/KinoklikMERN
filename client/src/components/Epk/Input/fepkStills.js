/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function StillsForm() {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(true);
  const inputFileRef = useRef(null);
  const [stillsList, setStillsList] = useState([]);
  const [epkStillsData, setEpkStillsData] = useState([]);
  const [editMode, setEditMode] = useState({ status: false, rowKey: null });
  //Picture prewiev
  const [picturePreviewUrl, setPicturePreviewUrl] = useState("");
  const [pictureEditPreviewUrl, setPictureEditPreviewUrl] = useState("");
  const [fileChosen, setFileChosen] = useState(false);

  const { t } = useTranslation();

  let { fepkId } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    //setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPicturePreviewUrl(url);
    setMessage("");
    setFileChosen(true);
  };

  const fileEditSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    //setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPictureEditPreviewUrl(url);
    setMessage("");
    setFileChosen(true);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      setStillsList(response.data.stills);

      setEpkStillsData(response.data.stills);
      //      console.log(response.data.title);
    });
  }, [fepkId]);

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
              const updatedStillsList = [
                ...stillsList,
                { image: key, blur: false },
              ];
              const updatedEpkStillsData = {
                ...epkStillsData,
                stills: updatedStillsList,
              };
              console.log(key);

              stillsList.push({ image: key, blur: false });

              setEpkStillsData({ ...epkStillsData, stills: stillsList });
              console.log(epkStillsData);
              //setDisabled(false);
              saveEpkStills(updatedEpkStillsData);
              setPicturePreviewUrl("");
              inputFileRef.current.value = "";
              setFileChosen(false);
            }
          })
          .catch((err) => {
            console.log();
            console.log(err);
          });
      }
    } else {
      setMessage(t("Oops! Please use JPEG, JPG, or PNG images."));
    }
  }

  function deleteFromStillsList(deletedImage) {
    const newStillsList = stillsList.filter(
      (imageObject) => imageObject !== deletedImage
    );
    setStillsList(newStillsList);
    setEpkStillsData({ ...epkStillsData, stills: newStillsList });
    saveEpkStills({ ...epkStillsData, stills: newStillsList });
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

  function saveEpkStills(epkToSave) {
    //console.log(epkStillsData);

    http
      .put(`fepks/update/${fepkId}`, epkToSave)
      .then((res) => {
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
    setDisabled(true);
  }

  const enterEditMode = (key) => {
    setEditMode({ status: true, rowKey: key });
  };

  const exitEditMode = (event, index, field) => {
    if (field === "image") {
      const selectedFile = file;
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
            stills: updatedStillsList,
          });
          saveEpkStills({ ...epkStillsData, stills: updatedStillsList });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setDisabled(false);
    setEditMode({ status: false, rowKey: null });
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
              className="lg:tw-text-2xld tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl"
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
            marginRight: "10%",
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
              {t("Film Stills")}
            </h5>
            <form className="row">
              <div className="col-12 col-md-4 mt-5">
                <label
                  htmlFor="filePoster"
                  className="form-label text-dark"
                  style={{ fontSize: "25px" }}
                >
                  {" "}
                  <h4>{t("Upload Picture")}</h4>
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
                      marginTop: "10px",
                    }}
                    alt="no img"
                  />
                ) : // <h3>No Image</h3>
                null}
                <div className="tw-cursor-pointer hover:tw-scale-110">
                  {/* <FontAwesomeIcon icon={faPlus} onClick={addImage} /> */}
                  {fileChosen ? (
                    <Button
                      className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                      style={{
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "center",
                      }}
                      type="outline-primary"
                      onClick={addImage}
                    >
                      {t("Save to EPK")}
                    </Button>
                  ) : (
                    <Button
                      disabled
                      style={{
                        boxShadow: "1px 2px 9px #311465",
                        color: "grey",
                        backgroundColor: "#ffffff",
                        fontWeight: "bold",
                        width: "auto",
                      }}
                      type="outline-primary"
                      onClick={addImage}
                    >
                      {t("Save to EPK")}
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
              </div>
              <div className="col-12 col-md-6 mt-3">
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
                      <th>{t("IMAGE")}</th>
                      <th>{t("EDIT")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stillsList.map((still, index) => {
                      return (
                        <tr key={index}>
                          {editMode.status && editMode.rowKey === index ? (
                            <>
                              <td>
                                {pictureEditPreviewUrl &&
                                pictureEditPreviewUrl !== undefined ? (
                                  <img
                                    src={pictureEditPreviewUrl}
                                    alt=""
                                    style={{ height: "50px", width: "auto" }}
                                  />
                                ) : (
                                  <img
                                    src={`${process.env.REACT_APP_AWS_URL}/${still.image}`}
                                    alt=""
                                    style={{ height: "50px", width: "auto" }}
                                  />
                                )}
                                {editMode && (
                                  <>
                                    <input
                                      className="form-control form-control-sm"
                                      filename={file}
                                      onChange={fileEditSelected}
                                      ref={inputFileRef}
                                      type="file"
                                      id="filePoster"
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
                                onClick={(e) => exitEditMode(e, index, "image")}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default StillsForm;
