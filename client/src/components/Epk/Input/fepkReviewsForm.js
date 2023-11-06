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
  faPen,
  faCheck,
  faUpload,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function ReviewsForm() {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
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

  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Picture prewiev
  const [picturePreviewUrl, setPicturerPreviewUrlPreviewUrl] = useState("");

  let { fepkId } = useParams();

  // const fileSelected = (event) => {
  //   setFile(event.target.files[0]);
  //   //setDisabled(false);
  // };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // -- CHIHYIN --
  const fileSelected = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Generate URL for preview
    const url = URL.createObjectURL(selectedFile);
    setPicturerPreviewUrlPreviewUrl(url);

    if (editingReview !== null) {
      let formData = new FormData();
      formData.append("file", selectedFile);

      // Upload the file
      http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedReviewsList = [...reviewsList];
          updatedReviewsList[editingReview].award_logo = response.data.key;
          setReviewsList(updatedReviewsList);
          setEpkReviewsData({ ...epkReviewsData, reviews: updatedReviewsList });
          setEditingReview(null);
          saveEpkReviews();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      setReviewsList(response.data.reviews);
      console.log(response.data.title);
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

  function addReviewToTable() {
    if (review.magazine !== "" && review.text !== "") {
      reviewsList.push(review);
      setEpkReviewsData({ ...epkReviewsData, reviews: reviewsList });
      setDisabledAdd(true);
      setDisabled(false);
    }
  }
  const handleReviewsChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
    setCharacterLength({ ...characterLength, [name]: value.length });
    setDisabledAdd(false);
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
                setPicturerPreviewUrlPreviewUrl("");
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
        setMessage("File must be a image(jpeg or png)");
      }
    }
  }

  function deleteFromReviewsList(deletedReview) {
    const newReviewsList = reviewsList.filter(
      (reviewObject) => reviewObject !== deletedReview
    );
    setReviewsList(newReviewsList);
    setEpkReviewsData({ ...epkReviewsData, reviews: newReviewsList });
    setDisabled(false);
  }

  function saveEpkReviews() {
    http
      .put(`fepks/update/${fepkId}`, epkReviewsData)
      .then((res) => {
        setModalIsOpen(true);
        console.log("saved");
      })
      .catch((err) => {
        console.log(err);
      });
    setDisabled(true);
  }

  // -- CHIHYIN --
  const saveEpkReviewChanges = async (updatedReviewsList) => {
    try {
      const res = await http.put(`fepks/update/${fepkId}`, {
        reviews: updatedReviewsList,
      });

      // Optionally: Update UI to reflect that changes were saved.
      console.log("Changes saved:", res.data);
    } catch (err) {
      // Handle errors, perhaps revert the change in the UI with a message.
      console.error("Error saving changes:", err);
    }
  };

  const handleEditChange = (e, index, type) => {
    const updatedReviewsList = [...reviewsList];
    updatedReviewsList[index][type] = e.target.value;
    setReviewsList(updatedReviewsList);
    setEpkReviewsData({ ...epkReviewsData, reviews: updatedReviewsList });
    // Save immediately after editing.
    saveEpkReviewChanges(updatedReviewsList);
  };

  const triggerFileInput = (index) => {
    setEditingReview(index); // Set the currently editing review's index
    inputFileRef.current.click(); // Trigger the file input
  };

  return (
    <>
      <div
        style={{
          boxShadow: "inset 1px 2px 9px #311465",
          padding: "0px 10px",
          marginLeft: "10%",
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
              BUZZ
            </h5>
            <form>
              <div className="row">
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
                    placeholder="Magazine/Blog/Journalist Name"
                    onChange={handleReviewsChange}
                    name="magazine"
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
                    placeholder="Review text (maximum 160 characters)"
                    onChange={handleReviewsChange}
                    name="text"
                    maxLength="160"
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    {characterLength?.text}/160 characters
                  </span>
                  <label
                    htmlFor="fileAwardLogo"
                    className="form-label text-dark"
                    style={{ fontSize: "25px" }}
                  >
                    {" "}
                    <h4 style={{ fontSize: "20px" }}>Upload Logo</h4>
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
                        height: "120px",
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
                        boxShadow: "1px 2px 9px #311465",
                        color: "grey",
                        backgroundColor: "#ffffff",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                      type="outline-primary"
                      block
                      onClick={addAwardLogo}
                      value="save"
                    >
                      Add to Table
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
                      onClick={addAwardLogo}
                      value="save"
                    >
                      Add to Table
                    </Button>
                  )}
                </div>
                <div className="col my-5">
                  <table
                    className="table table-striped table-bordered"
                    style={{ fontSize: "12px", textAlign: "center" }}
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>Magazine</th>
                        <th>Text</th>
                        <th>Award Logo</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviewsList.map((review, index) => {
                        return (
                          <tr key={index}>
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
                                <input
                                  value={review.text}
                                  onChange={(e) =>
                                    handleEditChange(e, index, "text")
                                  }
                                />
                              ) : (
                                review.text
                              )}
                            </td>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_AWS_URL}/${review.award_logo}`}
                                alt=""
                                style={{ height: "50px", width: "auto" }}
                              />
                              {editingReview === index && (
                                <>
                                  <FontAwesomeIcon
                                    icon={faUpload}
                                    onClick={() => triggerFileInput(index)}
                                    style={{ marginRight: "10px" }}
                                  />
                                  <input
                                    style={{ display: "none" }}
                                    className="form-control form-control-sm"
                                    filename={file}
                                    onChange={fileSelected}
                                    ref={inputFileRef}
                                    type="file"
                                    id="fileAwardLogo"
                                    name="files"
                                    accept="image/*"
                                  />
                                </>
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
                                  onClick={() => {
                                    setEditingReview(null);
                                  }}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faPen}
                                  onClick={() => setEditingReview(index)}
                                  style={{ marginRight: "10px" }}
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
                <div
                  className="col-1"
                  style={{
                    height: "50px",
                    width: "120px",
                    marginLeft: "100%",
                    marginTop: "-10px",
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
                      onClick={saveEpkReviews}
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
                      onClick={saveEpkReviews}
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
                      {"Review(s) is Saved Successfully!"}
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
export default ReviewsForm;
