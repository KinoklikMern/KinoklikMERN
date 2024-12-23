import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
// import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function ReviewsForm() {
  const { t } = useTranslation();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const [reviewsList, setReviewsList] = useState([]);
  const [review, setReview] = useState({ text: "", magazine: "" });
  const [epkReviewsData, setEpkReviewsData] = useState({
    reviews: fepk.reviews,
  });
  const [characterLength, setCharacterLength] = useState({
    text: 0,
  });
  const [editingReview, setEditingReview] = useState(null);

  //Picture prewiev
  const [picturePreviewUrl, setPicturePreviewUrl] = useState("");
  const [pictureEditPreviewUrl, setPictureEditPreviewUrl] = useState("");

  //let { title } = useParams();
  let { id } = useParams();

  const fileSelected = (event) => {
    const fileNew = event.target.files[0];
    setFile(fileNew);
    setDisabled(false);
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
  //       setReviewsList(response.data.reviews);
  //       // console.log(response.data.title);
  //     });
  // }, [title]);

  useEffect(() => {
    getFepksById(id).then((response) => {
      setFepk(response);
      setReviewsList(response.reviews);
      // console.log(response.data.title);
    });
  }, [id]);

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

  function addReviewToTable() {
    if (review.magazine !== "" && review.text !== "") {
      const newReviewsList = [...reviewsList, review];
      setReviewsList(newReviewsList);
      setEpkReviewsData({ ...epkReviewsData, reviews: newReviewsList });
      saveEpkReviews({ ...epkReviewsData, reviews: newReviewsList });
      setDisabled(false);
      setReview({ text: "", magazine: "" });
    }
  }

  const handleReviewsChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
    setCharacterLength({ ...characterLength, [name]: value.length });
    setDisabledAdd(false);
    setMessage("");
  };

  function addAwardLogo() {
    if (characterLength.text <= 160) {
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
                review.award_logo = key;
                addReviewToTable();
                setPicturePreviewUrl("");
                inputFileRef.current.value = "";
              }
            })
            .catch((err) => {
              console.log();
              console.log(err);
            });
        } else {
          addReviewToTable();
        }
      } else {
        setMessage(t("Oops! Please use JPEG, JPG, or PNG images."));
      }
    }
  }

  function deleteFromReviewsList(deletedReview) {
    const newReviewsList = reviewsList.filter(
      (reviewObject) => reviewObject !== deletedReview
    );
    setReviewsList(newReviewsList);
    setEpkReviewsData({ ...epkReviewsData, reviews: newReviewsList });
    saveEpkReviews({ ...epkReviewsData, reviews: newReviewsList });
    setDisabled(false);
  }

  function saveEpkReviews(epkToSave) {
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

  const handleEditChange = (e, index, type) => {
    const newText = e.target.value;
    const updatedReviewsList = [...reviewsList];
    updatedReviewsList[index][type] = e.target.value;
    setReviewsList(updatedReviewsList);
    setEpkReviewsData({ ...epkReviewsData, reviews: updatedReviewsList });
    // Update character length for text changes
    if (type === "text") {
      setCharacterLength({
        ...characterLength,
        [index]: newText.length,
      });
    }
    setDisabled(false);
  };

  const exitEditMode = (index) => {
    if (pictureEditPreviewUrl) {
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
          const updatedReviewsList = [...reviewsList];
          updatedReviewsList[index].award_logo = response.data.key;
          setReviewsList(updatedReviewsList);
          setEpkReviewsData({
            ...epkReviewsData,
            reviews: updatedReviewsList,
          });
          //setDisabled(false);
          saveEpkReviews({ ...epkReviewsData, reviews: updatedReviewsList });
          setEditingReview(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const updatedReviewsList = [...reviewsList];
      saveEpkReviews({ ...epkReviewsData, reviews: updatedReviewsList });
      setEditingReview(null);
    }
  };

  return (
    <>
      <div
        style={{
            width: window.innerWidth >= 768 ? "80%" : "100%",
            margin: window.innerWidth >= 768 ? "0 auto" : "0",
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
            // marginRight: "15%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div
            className="card-body"
            // style={{ margin: "0 auto" }}
          >
            <h5
              className="card-title "
              style={{
                color: "#311465",
                fontWeight: "bold",
                textAlign: "center",
                              }}
            >
              {t("Reviews & Awards")}
            </h5>
            <form>

              <div className="col my-3">
                <input
                    style={{
                      height: "30px",
                      width: "80%",
                      borderRadius: "5px",
                        boxShadow: "1px 2px 9px #311465",
                      textAlign: "left",
                      margin: "0 auto",
                    }}
                    className="form-control m-10"
                    placeholder={t("Magazine/Blog/Journalist Name")}
                    onChange={handleReviewsChange}
                    name="magazine"
                    value={review.magazine}
                />
                <textarea
                    style={{
                      height: "120px",
                      width: "100%",
                      borderRadius: "15px",
                      marginTop: "25px",
                      marginBottom: "5px",
                      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                      textAlign: "left",
                      resize: "none",
                    }}
                    className="form-control mt-10"
                    placeholder={t("Review text (maximum 160 characters)")}
                    onChange={handleReviewsChange}
                    name="text"
                    maxLength="160"
                    value={review.text}
                />
                <span
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                >
                    {characterLength?.text}
                  {t("/160 characters")}
                  </span>

                <div className="tw-mt-4 tw-text-center">


                  {/* Hidden File Input */}
                  <input
                      style={{display: "none"}}
                      className="form-control form-control-sm"
                      filename={file}
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="fileAwardLogo"
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

                  {/* Preview Section */}
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
                          onClick={addAwardLogo}
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
                          onClick={addAwardLogo}
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
                            marginBottom: "-25%",
                          }}
                      >
                        {message}
                      </div>
                  )}
                </div>

                {/*Table with results */}
                <div className="col my-5"
                     style={{
                         boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                     }}
                >
                  {/* Responsive table container */}
                  <div className="">
                    <table
                        className="table bg-transparent"
                        style={{
                            fontSize: "0.8rem",
                            textAlign: "center",
                            tableLayout: "auto",
                        }}
                    >
                      <thead className="thead-dark">
                      <tr class="bg-transparent">
                        <th class="bg-transparent">{t("IMAGE/LOGO")}</th>
                        <th class="bg-transparent">{t("TITLE")}</th>
                        <th class="bg-transparent">{t("TEXT")}</th>

                        <th class="bg-transparent">{t("EDIT")}</th>
                      </tr>
                      </thead>
                      <tbody class="bg-transparent">
                      {reviewsList.map((review, index) => {
                        return (
                            <tr class="bg-transparent"
                                key={index}
                                style={{
                                    verticalAlign: "middle",
                                }}
                            >

                                <td class="bg-transparent" >
                                    {editingReview === index ? (
                                        // Edit Mode
                                        <>
                                            {pictureEditPreviewUrl ? (
                                                <img
                                                    src={pictureEditPreviewUrl}
                                                    alt=""
                                                    style={{
                                                        height: "40px",
                                                        width: "auto",
                                                    }}
                                                />
                                            ) : (
                                                <img
                                                    src={
                                                        review.award_logo
                                                            ? `${process.env.REACT_APP_AWS_URL}/${review.award_logo}`
                                                            : null
                                                    }
                                                    alt=""
                                                    style={{
                                                        height: "40px",
                                                        width: "auto",
                                                    }}
                                                />
                                            )}
                                            <input
                                                className="form-control form-control-sm"
                                                filename={file}
                                                onChange={fileEditSelected}
                                                ref={inputFileRef}
                                                type="file"
                                                id="fileAwardLogo"
                                                name="files"
                                                accept="image/*"
                                            />
                                        </>
                                    ) : (
                                        // Non-Edit Mode
                                        <img
                                            src={
                                                review.award_logo
                                                    ? `${process.env.REACT_APP_AWS_URL}/${review.award_logo}`
                                                    : null
                                            }
                                            alt=""
                                            style={{height: "40px", width: "auto"}}
                                        />
                                    )}
                                </td>

                                <td class="bg-transparent">
                                    {editingReview === index ? (
                                        <input
                                            value={review.magazine}
                                            onChange={(e) =>
                                                handleEditChange(e, index, "magazine")
                                            }
                                        />
                                    ) : (
                                        review.magazine
                                    )}
                                </td>
                                <td class="bg-transparent"
                                    style={{
                                    fontSize: "6px",

                                }}>
                                    {editingReview === index ? (
                                        <div>
                                    <textarea

                                        value={review.text}
                                        onChange={(e) =>
                                            handleEditChange(e, index, "text")
                                        }
                                        name="text"
                                        maxLength="160"
                                    />
                                            <span
                                                style={{
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    justifyContent: "right",
                                                }}
                                            >
                                      {characterLength[index]}
                                                {"/ 160 characters"}
                                    </span>
                                        </div>
                                    ) : (
                                        review.text
                                    )}
                                </td>


                                <td class="bg-transparent"
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    {editingReview === index ? (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            onClick={() => exitEditMode(index)}
                                            style={{marginRight: "15px"}}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={() => setEditingReview(index)}
                                            style={{marginRight: "15px"}}
                                        />
                                    )}
                                    {"  "}
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        onClick={() => deleteFromReviewsList(review)}
                                    />
                                </td>
                            </tr>
                        );
                      })}
                      </tbody>
                    </table>
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

export default ReviewsForm;
