import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

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

  let { title } = useParams();

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

  useEffect(() => {
    http
      .get(`/fepks/byTitle/${title.replace(/ /g, "-").trim()}`)
      .then((response) => {
        setFepk(response.data);
        setReviewsList(response.data.reviews);
        // console.log(response.data.title);
      });
  }, [title]);

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
              className="tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl"
              to={
                fepk.title ? `epk/${fepk.title.replace(/ /g, "-").trim()}` : "/"
              }
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
            marginRight: "15%",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          <div
            className="card-body"
            // style={{ minHeight: "500px" }}
          >
            <h5
              className="card-title "
              style={{
                color: "#311465",
                fontWeight: "normal",
                marginBottom: "-3%",
              }}
            >
              {t("Film Buzz (Reviews & Awards)")}
            </h5>
            <form>
              <div className="row" style={{ marginRight: "-5%" }}>
                <div className="col my-5">
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
                    placeholder={t("Magazine/Blog/Journalist Name")}
                    onChange={handleReviewsChange}
                    name="magazine"
                    value={review.magazine}
                  />
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
                  <label
                    htmlFor="fileAwardLogo"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4 style={{ fontSize: "20px" }}>{t("Upload Logo")}</h4>
                  </label>
                  <input
                    style={{ fontSize: "15px" }}
                    className="form-control form-control-sm"
                    filename={file}
                    onChange={fileSelected}
                    ref={inputFileRef}
                    type="file"
                    id="fileAwardLogo"
                    name="files"
                    accept="image/*"
                  />
                  {picturePreviewUrl ? (
                    <img
                      src={picturePreviewUrl}
                      style={{
                        height: "80px",
                        width: "auto",
                        marginTop: "5px",
                      }}
                      alt="Preview"
                    />
                  ) : null}
                  {disabledAdd === true ? (
                    <Button
                      disabled
                      style={{
                        width: "120px",
                        boxShadow: "1px 2px 9px #311465",
                        color: "grey",
                        backgroundColor: "#ffffff",
                        fontWeight: "bold",
                      }}
                      type="outline-primary"
                      block
                      onClick={addAwardLogo}
                      value="save"
                    >
                      {t("Save to EPK")}
                    </Button>
                  ) : (
                    <Button
                      className="hover:tw-scale-110 hover:tw-bg-[#712CB0] hover:tw-text-white"
                      style={{
                        boxShadow: "1px 2px 9px #311465",
                        fontWeight: "bold",
                        width: "120px",
                      }}
                      type="outline-primary"
                      block
                      onClick={addAwardLogo}
                      value="save"
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
                        marginBottom: "-25%",
                      }}
                    >
                      {message}
                    </div>
                  )}
                </div>
                {/*Table with results */}
                <div className="col my-2">
                  {/* Responsive table container */}
                  <div className="overflow-x-auto">
                    <table
                      className="table table-striped table-bordered "
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      <thead className="thead-dark">
                        <tr>
                          <th>{t("Magazine")}</th>
                          <th>{t("Text")}</th>
                          <th>{t("Award Logo")}</th>
                          <th>{t("ACTIONS")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviewsList.map((review, index) => {
                          return (
                            <tr
                              key={index}
                              style={{
                                verticalAlign: "middle",
                              }}
                            >
                              <td>
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
                              <td>
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
                              <td>
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
                                    style={{ height: "40px", width: "auto" }}
                                  />
                                )}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                {editingReview === index ? (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    onClick={() => exitEditMode(index)}
                                    style={{ marginRight: "15px" }}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    onClick={() => setEditingReview(index)}
                                    style={{ marginRight: "15px" }}
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
