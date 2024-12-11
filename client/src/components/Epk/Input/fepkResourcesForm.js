/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
// import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function ResourcesForm() {
  const { t } = useTranslation();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
  const [editMode, setEditMode] = useState({ status: false, rowKey: null });

  //let { title } = useParams();
  let { id } = useParams();

  //Picture prewiev
  const [picturePreviewUrl, setPicturePreviewUrl] = useState("");
  const [pictureEditPreviewUrl, setPictureEditPreviewUrl] = useState("");

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    //setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPicturePreviewUrl(url);
    setMessage("");
  };

  const fileEditSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    //setDisabled(false);
    const url = URL.createObjectURL(fileNew);
    setPictureEditPreviewUrl(url);
    setMessage("");
  };

  // useEffect(() => {
  //   http
  //     .get(`/fepks/byTitle/${title.replace(/ /g, "-").trim()}`)
  //     .then((response) => {
  //       setFepk(response.data);
  //       setResourcesList(response.data.resources);
  //     });
  // }, [title]);

  useEffect(() => {
    getFepksById(id).then((response) => {
      setFepk(response);
      setResourcesList(response.resources);
    });
  }, [id]);

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
      const newResourcesList = [...resourcesList, resource];
      setResourcesList(newResourcesList);
      setEpkResourcesData({ ...epkResourcesData, resources: newResourcesList });
      saveEpkResources({ ...epkResourcesData, resources: newResourcesList });
      setDisabledAdd(true);
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
                setPicturePreviewUrl("");
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
    saveEpkResources({ ...epkResourcesData, resources: newResourcesList });
    setDisabled(false);
  }

  function saveEpkResources(epkToSave) {
    console.log(epkResourcesData);
    http
      .put(`fepks/update/${fepk._id}`, epkToSave)
      .then((res) => {
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
    setDisabled(true);
    setPicturePreviewUrl("");
    setPictureEditPreviewUrl("");
    setFile("");
  }

  const enterEditMode = (key) => {
    setEditMode({ status: true, rowKey: key });
  };

  const handleEditChange = (event, index, field) => {
    const newValue = event.target.value;
    const newResourcesList = [...resourcesList];
    newResourcesList[index][field] = event.target.value;
    setResourcesList(newResourcesList);
    setEpkResourcesData({ ...epkResourcesData, reviews: newResourcesList });
    // Update character length for text changes
    if (field === "description") {
      setCharacterLength({
        ...characterLength,
        [index]: newValue.length,
      });
    }
    setDisabled(false);
  };

  const exitEditMode = (index) => {
    if (pictureEditPreviewUrl) {
      const selectedFile = file;
      setFile(selectedFile);

      // Perform the MIME type check here
      if (checkFileMimeType(selectedFile)) {
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
              saveEpkResources({
                ...epkResourcesData,
                resources: updatedResourcesList,
              });
              setEditMode({ status: false, rowKey: null });
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        // Set the message for invalid file format
        setMessage(t("Oops! Please use JPEG, JPG, or PNG images."));
      }
    } else {
      const updatedResourcesList = [...resourcesList];
      saveEpkResources({
        ...epkResourcesData,
        resources: updatedResourcesList,
      });
      setEditMode({ status: false, rowKey: null });
    }
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
            // marginLeft: "10%",
            // color: "#311465",
            // fontWeight: "normal",
          }}
        >
            <div
                className=""
                style={
                    {
                        // height: "500px"
                    }
                }
            >
                <h5
                    className="card-title "
                    style={{color: "#311465", fontWeight: "bold", textAlign: "center",}}
                >
                    {t("Resources Cards")}
                </h5>

                <p
                    className="tw-text-xxs"
                    style={{
                        color: "gray",
                        lineHeight: "1.2",
                    }}
                >
                    {t(
                        "Tell the world what unique resources you need to make your film, i.e. a red Ferrari, an outdoor boxing gym, a Penthouse pool, a cottage, a Golden Retriever puppy, etc). Use the Resources Cards to ask people for help, as it doubles as free ads for your film!"
                    )}
                </p>
                <form>
                    <div className="tw-flex tw-flex-col lg:tw-flex-row">
                        <div className="my-1 lg:tw-w-1/3 ">
                            <div className="tw-flex tw-gap-4 my-4">
                                <input
                                    style={{
                                        height: "30px",
                                        width: "100%",
                                        maxWidth: "calc(50% - 8px)",
                                        borderRadius: "5px",
                                        boxShadow: "1px 2px 9px #311465",
                                        textAlign: "center",
                                    }}
                                    className="form-control"
                                    placeholder={t("Resource Title")}
                                    onChange={handleResourceChange}
                                    name="title"
                                    value={resource.title}
                                    maxLength="25"
                                />
                                {/* Duration Dropdown */}
                                <div className="tw-flex tw-items-center tw-gap-2"
                                     style={{width: "100%", maxWidth: "50%"}}>
                                    <label htmlFor="duration-select" className="tw-text-sm">
                                        {t("Duration")}:
                                    </label>
                                    <select
                                        id="duration-select"
                                        name="time"
                                        value={resource.time || ""}
                                        onChange={handleResourceChange}
                                        className="tw-block"
                                        style={{
                                            height: "30px",
                                            width: "100%",
                                            borderRadius: "5px",
                                            boxShadow: "1px 2px 9px #311465",
                                            textAlign: "center",
                                        }}
                                    >
                                        <option value="" disabled>
                                            {t("Days")}
                                        </option>
                                        {Array.from({length: 30}, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1} {t("days")}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <textarea
                                style={{
                                    height: "60px",
                                    width: "100%",
                                    borderRadius: "15px",
                                    marginBottom: "5px",
                                    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
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

                            {/* Picture Upload Section */}
                            <div className="tw-mt-4 tw-text-center">
                                {/* Hidden File Input */}
                                <input
                                    style={{display: "none"}}
                                    className="form-control form-control-sm"
                                    filename={file}
                                    onChange={fileSelected}
                                    ref={inputFileRef}
                                    type="file"
                                    id="fileImageResources"
                                    name="files"
                                    accept="image/*"
                                />

                                {/* Upload Button */}
                                <div
                                    className="tw-mb-2 tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md tw-cursor-pointer hover:tw-scale-110"
                                    style={{
                                        width: "200px",
                                        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                        margin: "0 auto",
                                        marginTop: "15px",
                                        marginBottom: "120px",
                                    }}
                                    onClick={() => inputFileRef.current.click()} // Trigger file input click
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
                                        className="tw-h-5 tw-ml-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                        />
                                    </svg>
                                </div>

                                {/* Picture Preview */}
                                {picturePreviewUrl ? (
                                    <div className="tw-flex tw-justify-center tw-mt-3">
                                        <img
                                            src={picturePreviewUrl}
                                            alt="Preview"
                                            style={{
                                                height: "120px",
                                                width: "auto",
                                                borderRadius: "5px",
                                                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                                marginTop: "-110px",
                                            }}
                                        />
                                    </div>
                                ) : null}

                                {/* Save Button */}
                                {disabledAdd === true ? (
                                    <Button
                                        disabled
                                        style={{
                                            width: "160px",
                                            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                            color: "gray",
                                            margin: "0 auto",
                                            display: "block",
                                            marginTop: "15px",
                                            borderRadius: "15px",
                                        }}
                                        type="outline-primary"
                                        onClick={addResourceImage}
                                    >
                                        {t("Save to Film Page")}
                                    </Button>
                                ) : (
                                    <Button
                                        className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                                        style={{
                                            width: "160px",
                                            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                                            fontWeight: "bold",
                                            margin: "0 auto",
                                            display: "block",
                                            marginTop: "15px",
                                            borderRadius: "15px",
                                        }}
                                        type="outline-primary"
                                        onClick={addResourceImage}
                                    >
                                        {t("Save to Film Page")}
                                    </Button>
                                )}

                                {/* Message */}
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

                        {/*Table with results */}
                        <div
                            className="lg:tw-mx-8 my-4 tw-overflow-x-auto lg:tw-w-3/5"
                            style={{
                                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                        >
                            <table
                                className="table bg-transparent"
                                style={{
                                    fontSize: "0.75rem", // Smaller text
                                    tableLayout: "auto",
                                    textAlign: "center",
                                }}
                            >
                                <thead className="thead-dark">
                                <tr>
                                    <th className="tw-text-center bg-transparent">{t("IMAGE")}</th>
                                    <th className="tw-text-center bg-transparent">{t("TITLE")}</th>
                                    <th className="tw-text-center bg-transparent">{t("DURATION")}</th>
                                    <th className="tw-text-center bg-transparent">{t("TEXT")}</th>
                                    <th className="tw-text-center bg-transparent">{t("EDIT")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {resourcesList.map((resource, index) => (
                                    <tr
                                        key={index}
                                        className="bg-transparent"
                                        style={{
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        {editMode.status && editMode.rowKey === index ? (
                                            <>
                                                <td className="bg-transparent" style={{minWidth: "160px"}}>
                                                    {pictureEditPreviewUrl ? (
                                                        <img
                                                            src={pictureEditPreviewUrl}
                                                            alt="Preview"
                                                            style={{
                                                                height: "50px",
                                                                width: "auto",
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={
                                                                resource?.image
                                                                    ? `${process.env.REACT_APP_AWS_URL}/${resource.image}`
                                                                    : null
                                                            }
                                                            alt="Current img"
                                                            style={{
                                                                height: "50px",
                                                                width: "auto",
                                                            }}
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
                                                                id="fileImageResources"
                                                                name="files"
                                                                accept="image/*"
                                                            />
                                                        </>
                                                    )}
                                                </td>
                                                <td className="bg-transparent">
                                                    <input
                                                        value={resource.title}
                                                        onChange={(e) => handleEditChange(e, index, "title")}

                                                    />
                                                </td>
                                                <td className="bg-transparent">
                                                    <input
                                                        value={resource.time}
                                                        onChange={(e) => handleEditChange(e, index, "time")}

                                                    />
                                                </td>
                                                <td className="bg-transparent">
                                                    <div>
                  <textarea
                      value={resource.description}
                      onChange={(e) =>
                          handleEditChange(e, index, "description")
                      }
                      name="text"
                      maxLength="160"
                      style={{maxWidth: "160px"}}
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
                                            </>
                                        ) : (
                                            <>
                                                <td className="bg-transparent">
                                                    <img
                                                        src={
                                                            resource?.image
                                                                ? `${process.env.REACT_APP_AWS_URL}/${resource.image}`
                                                                : null
                                                        }
                                                        style={{height: "50px", width: "auto"}}
                                                    />
                                                </td>
                                                <td className="bg-transparent tw-text-left tw-leading-tight">
                                                    {resource.title}
                                                </td>
                                                <td className="bg-transparent tw-text-left tw-leading-tight">
                                                    {resource.time} {t("days")}
                                                </td>
                                                <td className="bg-transparent tw-text-left tw-leading-tight">
                                                    {resource.description}
                                                </td>
                                            </>
                                        )}
                                        <td
                                            className="bg-transparent"
                                            style={{
                                                textAlign: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {editMode.status && editMode.rowKey === index ? (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    onClick={() => exitEditMode(index)}
                                                    style={{marginRight: "15px"}}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    onClick={() => enterEditMode(index)}
                                                    style={{marginRight: "15px"}}
                                                />
                                            )}
                                            {"  "}
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                onClick={() => deleteFromResourcesList(resource)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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
