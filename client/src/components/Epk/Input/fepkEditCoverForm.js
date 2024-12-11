import React, { useState, useRef, useEffect } from "react";
import http from "../../../http-common";
import Modal from "react-modal";
import { Button, Tooltip } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
// import BasicMenu from "./fepkMenu";
import paypalImage from "../../../images/paypal.png";
// import stripImage from "../../../images/stripe.jpg";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

function FepkEditCoverForm() {
  const { t } = useTranslation();

  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const inputFile1Ref = useRef(null);
  // const inputFile2Ref = useRef(null);
  const inputFile3Ref = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [messageImg, setMessageImg] = useState("");
  const [messageTitleNo, setMessageTitleNo] = useState("");
  const [messageTitleYes, setMessageTitleYes] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({ logLine_short: 0 });
  const [isUploading, setIsUploading] = useState(false);
  //Poster preview
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");
  //Banner prewiev
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState("");
  //Trailer preview
  // const [trailerPreviewUrl, setTrailerPreviewUrl] = useState("");

  //To work with modal notifications
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //let { title } = useParams();
  let { id } = useParams();

  //banner
  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setBannerPreviewUrl(url);
    setMessage("");
  };

  //video
  // const file2Selected = (event) => {
  //   const file = event.target.files[0];
  //   setFile2(file);
  //   setDisabled(false);
  //   const url = URL.createObjectURL(file);
  //   setTrailerPreviewUrl(url);
  // };

  //poster
  const file3Selected = (event) => {
    const file = event.target.files[0];
    setFile3(file);
    setDisabled(false);
    const url = URL.createObjectURL(file);
    setPosterPreviewUrl(url);
    setMessage("");
  };

  // useEffect(() => {
  //   http.get(`/fepks/byTitle/${title}`).then((response) => {
  //     setFepk(response.data);
  //     //console.log(response.data);
  //     setCharacterLength({
  //       logLine_short: response.data.logLine_short.length,
  //     });

  //     // console.log(response.data);
  //   });
  // }, [title]);

  useEffect(() => {
    getFepksById(id).then((response) => {
      console.log("Response na cover", response);
      setFepk(response);
      //console.log(response.data);
      setCharacterLength({
        logLine_short: response.logLine_short.length,
      });

      // console.log(response.data);
    });
  }, [id]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [epkCoverData, setEpkCoverData] = useState({
    film_maker: fepk.film_maker,
    title: fepk.title,
    logLine_short: fepk.logLine_short,
    genre: fepk.genre,
    production_type: fepk.production_type,
    kickstarter_url: fepk.kickstarter_url,
    banner_url: fepk.banner_url,
    trailer_url: fepk.trailer_url,
    status: fepk.status,
    image_details: fepk.image_details,
    productionCo: fepk.productionCo,
    distributionCo: fepk.distributionCo,
    durationMin: fepk.durationMin,
    productionYear: fepk.productionYear,
    budget: fepk.budget,
    language: fepk.language,
  });
  const movieGenre = [
    t("action"),
    t("comedy"),
    t("documentary"),
    t("romance"),
    t("horror"),
    t("mystery"),
    t("drama"),
    t("western"),
    t("science fiction"),
    t("thriller"),
    t("crime"),
    t("animation"),
    t("musical"),
    t("war"),
    t("romantic comedy"),
    t("noir"),
    t("disaster"),
    t("dark comedy"),
    t("historical film"),
    t("slasher"),
    t("adventure"),
    t("gangster"),
    t("spy"),
    t("fantasy"),
    t("biographical"),
    t("found footage"),
    t("legal drama"),
    t("melodrama"),
    t("superhero"),
    t("slapstick"),
    t("monster"),
    t("historical fiction"),
    t("teen"),
    t("apocalyptic"),
    t("post-apocalyptic"),
    t("psychological thriller"),
    t("stop motion"),
    t("sports"),
    t("space opera"),
    t("mockumentary"),
  ];

  const languageType = [t("English"), t("French"), t("Spanish")];
  const makeGenreItem = (X) => {
    return (
      <option key={X} value={X}>
        {" "}
        {X}
      </option>
    );
  };
  const movieStatus = [t("Preproduction"), "Production", t("Postproduction")];
  const makeStatusItem = (Y) => {
    return (
      <option key={Y} value={Y}>
        {" "}
        {Y}
      </option>
    );
  };

  const movieType = [
    t("Movie"),
    t("Documentary"),
    t("TV Show"),
    t("Web Series"),
  ];
  const makeTypeItem = (Z) => {
    return (
      <option key={Z} value={Z}>
        {" "}
        {Z}
      </option>
    );
  };

  const budgetRanges = [
    "0$ - 5,000$",
    "5,000$ - 10,000$",
    "10,000$ - 25,000$",
    "25,000$ - 50,000$",
    "50,000$ - 75,000$",
    "75,000$ - 100,000$",
    "100,000$ - 150,000$",
    "150,000$ - 200,000$",
    "200,000$ - 300,000$",
    "300,000$ - 500,000$",
    "500,000$ - 750,000$",
    "750,000$ - 1,000,000$",
    "1,000,000$ - 1,500,000$",
    "1,500,000$ - 2,000,000$",
    "2,000,000$ - 3,000,000$",
    "3,000,000$ - 5,000,000$",
    "5,000,000$ - 7,500,000$",
    "7,500,000$ - 10,000,000$",
  ];

  const makeBudgetRangeItem = (B) => {
    return (
      <option key={B} value={B}>
        {" "}
        {B}
      </option>
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterLength({ ...characterLength, [name]: value.length });
    setEpkCoverData({ ...epkCoverData, [name]: value });
    setDisabled(false);

    // if (name === "title") {
    //   if (value.trim() !== "") {
    //     http
    //       .get(`fepks/byTitle/${value}`)
    //       .then((response) => {
    //         if (response.data !== null) {
    //           setMessageTitleNo(
    //             t("This title exists! You are not allowed to use it again!")
    //           );
    //           setMessageTitleYes("");
    //         } else {
    //           setMessageTitleYes(t("Title is available!"));
    //           setMessageTitleNo("");
    //         }
    //       })
    //       .catch((error) => {
    //         // Handle errors, such as if the endpoint isn't found (404)
    //         console.error("Error fetching title:", error);
    //       });
    //   } else {
    //     // Reset messages if the title field is empty
    //     setMessageTitleNo("");
    //     setMessageTitleYes("");
    //   }
    // }

    if (name === "title" && event.target.value.trim() !== "") {
      setDisabled(false);
      let encodedTitle = encodeURI(event.target.value.trim());
      encodedTitle = encodedTitle.replace(/\(/g, "%28").replace(/\)/g, "%29");
      //http.get(`fepks/byTitles/${event.target.value}`).then((response) => {
      console.log(encodedTitle);
      http.get(`fepks/byTitles/${encodedTitle}`).then((response) => {
        if (event.target.value.trim() !== "") {
          if (response.data.length > 0) {
            setMessageTitleNo(t("This title exists! Choose another one!"));
            setMessageTitleYes("");
            setDisabled(true);
            console.log(response.data);
          } else {
            setMessageTitleYes(t("This title is ok!"));
            setMessageTitleNo("");
            setDisabled(false);
          }
        }
      });
    }

    if (name === "title" && event.target.value.trim() === "") {
      setDisabled(true);
      setMessageTitleNo("");
      setMessageTitleYes("");
    }
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
        file.type === "	video/x-msvideo" ||
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
    saveEpkCover(e);
  };

  const saveEpkCover = (e) => {
    e.preventDefault();
    console.log("Button clicked");

    if (characterLength.logLine_short <= 160) {
      let formData = new FormData();
      formData.append("file1", file1);
      formData.append("file2", file2);
      formData.append("file3", file3);

      if (
        checkFileMimeType(file1) &&
        checkFileMimeType(file2) &&
        checkFileMimeType(file3)
      ) {
        console.log(formData);

        http
          .post("fepks/uploadFiles", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.file1 !== undefined) {
              epkCoverData.banner_url = response.data.file1;
            }
            if (response.data.file2 !== undefined) {
              epkCoverData.trailer_url = response.data.file2;
            }
            if (response.data.file3 !== undefined) {
              epkCoverData.image_details = response.data.file3;
            }
            console.log(epkCoverData);
            http
              .put(`fepks/update/${fepk._id}`, epkCoverData)
              .then((res) => {
                setModalIsOpen(true);
                setIsUploading(false);
                console.log("saved");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setMessageImg(t("Oops! Please use JPEG, JPG, or PNG images."));
        setIsUploading(false);
      }
    } else {
      setMessage(t("Logline must be 160 characters or less"));
    }

    setDisabled(true);
  };

  return (
    <>
      {/* main div */}
      <div
        style={{
          // boxShadow: "inset 1px 2px 9px #311465",
          // marginLeft: "10%",
          // marginBottom: "2%",
          // width: "80%",
          // borderRadius: "10px",
          backgroundColor: "transparent",
          margin: "0 auto",
        }}
      >
        {/* form div */}
        <div
          style={{
            // marginLeft: "7%",
            // marginRight: "5%",
            margin: "0 auto",
            color: "#311465",
            fontWeight: "normal",
          }}
        >
          {/* <div
            className='card-body'
            style={{
              height: "500px",
              marginLeft: "-1em",
              marginRight: "-1rem",
              marginBottom: "5%",
            }}
          > */}

          <div className="tw-card-body tw-h-auto ">
            {/* Format of all the inputs from Title to Upload Trailer  */}
            <form className="row d-flex flex-column flex-md-row">

                {/* First 2 columns*/}
                <div className="row ">
                  {/* The 1st column*/}
                  <div className="col-lg-4">
                    {/*Title*/}
                    <div className="col mb-3">
                      <input
                          style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "15px",
                            // marginBottom: "5px",
                            // boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                          }}
                          className="form-control m-10"
                          defaultValue={fepk.title}
                          placeholder={t("Title")}
                          onChange={handleInputChange}
                          name="title"
                      />
                      <h6 style={{color: "red", fontSize: "1rem"}}>
                        {messageTitleNo}
                      </h6>
                      <h6 style={{color: "green", fontSize: "1rem"}}>
                        {messageTitleYes}
                      </h6>
                      <h6 style={{color: "green", fontSize: "1rem"}}>
                        {message}
                      </h6>
                    </div>
                    {/* Log line */}
                    <div className="col my-1">
                      <textarea
                          style={{
                            height: "80px",
                            width: "100%",
                            borderRadius: "25px",
                            marginBottom: "0px",
                            // boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                            resize: "none",
                          }}
                          maxLength="160"
                          className="form-control mt-10"
                          defaultValue={fepk.logLine_short}
                          placeholder={t(
                              "Log Line short (maximum 160 characters)"
                          )}
                          onChange={handleInputChange}
                          name="logLine_short"
                      />
                      <span
                          style={{
                            fontSize: "15px",
                            display: "flex",
                            justifyContent: "right",
                            marginBottom: "1rem",
                          }}
                      >
                        {characterLength?.logLine_short}
                        {t("/160 characters")}
                      </span>
                    </div>
                    {/* Production (div inside the div)*/}
                    <div className="row" style={{marginBottom: "-1.4rem"}}>
                      <div className="col my-2">
                        <input
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              // boxShadow: "1px 2px 9px #311465",
                              textAlign: "left",
                              fontSize: "14px",
                            }}
                            className="form-control m-10 mb-4"
                            defaultValue={fepk.productionCo}
                            placeholder={t("Production Company Name")}
                            onChange={handleInputChange}
                            name="productionCo"
                        />
                      </div>
                    </div>
                    {/* Distribution (div inside the div)*/}
                    <div className="row">
                      <div className="col">
                        <input
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              // boxShadow: "1px 2px 9px #311465",
                              textAlign: "left",
                              fontSize: "14px",
                            }}
                            className="form-control m-10 "
                            //value={fepk.distributionCo}
                            defaultValue={fepk.distributionCo}
                            placeholder={t("Distribution Company Name")}
                            onChange={handleInputChange}
                            name="distributionCo"
                        />
                      </div>
                    </div>
                  </div>
                  {/* The 2nd column*/}
                  <div className="col-lg-4">
                    <div className="row">
                      {/* Budget*/}
                      <div className="col my-2">
                        <select
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              marginBottom: "5px",
                              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                            className="form-select form-select-sm tw-bg-backgroundGray "
                            name="budget"
                            onChange={handleInputChange}
                        >
                          <option defaultValue={fepk.budget}>
                            {fepk.budget ? fepk.budget : "Production Budget"}
                          </option>
                          {budgetRanges.map(makeBudgetRangeItem)}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      {/* Production type*/}
                      <div className="col my-2">
                        <select
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              marginBottom: "5px",
                              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                            className="form-select form-select-sm tw-bg-backgroundGray "
                            name="production_type"
                            onChange={handleInputChange}
                            defaultValue={fepk.production_type || ""}
                        >
                          <option value="" disabled>
                            {fepk.production_type
                                ? fepk.production_type
                                : "Production Type"}
                          </option>
                          {movieType.map(makeTypeItem)}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      {/* Genre*/}
                      <div className="col my-2">
                        <select
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              marginBottom: "5px",
                              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                            className="form-select form-select-sm tw-bg-backgroundGray"
                            name="genre"
                            onChange={handleInputChange}
                            defaultValue={fepk.genre || ""}
                        >
                          <option value="" disabled>
                            {fepk.genre ? fepk.genre : "Genre"}
                          </option>
                          {movieGenre
                              .sort((a, b) =>
                                  a.toLowerCase().localeCompare(b.toLowerCase())
                              )
                              .map(makeGenreItem)}
                        </select>
                      </div>
                      {/* Status*/}
                      <div className="col my-2">
                        <select
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              marginBottom: "5px",
                              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                            className="form-select form-select-sm tw-bg-backgroundGray"
                            name="status"
                            onChange={handleInputChange}
                            defaultValue={fepk.status || ""}
                        >
                          <option value="" disabled>
                            {fepk.status ? fepk.status : "Status"}
                          </option>
                          {movieStatus.map(makeStatusItem)}
                        </select>
                      </div>
                    </div>
                    <div className="row" style={{marginBottom: "-0.2rem"}}>
                      {/* Language type*/}
                      <div className="col my-2">
                        <select
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              marginBottom: "5px",
                              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                            }}
                            className="form-select form-select-sm tw-bg-backgroundGray"
                            name="language"
                            onChange={handleInputChange}
                            defaultValue={fepk.language || ""}
                        >
                          <option value="" disabled>
                            {fepk.language ? fepk.language : "Language"}
                          </option>
                          {languageType.map(makeTypeItem)}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      {/* Production Year*/}
                      <div className="col my-2">
                        <input
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              // boxShadow: "1px 2px 9px #311465",
                              textAlign: "left",
                              fontSize: "14px",
                            }}
                            className="form-control"
                            type="number"
                            min="1895"
                            //value={fepk.productionYear}
                            defaultValue={fepk.productionYear}
                            placeholder={t("Production Year")}
                            onChange={handleInputChange}
                            name="productionYear"
                        />
                      </div>
                    </div>
                    <div className="row">
                      {/* Duration Minutes*/}
                      <div className="col my-2">
                        <input
                            style={{
                              height: "30px",
                              width: "100%",
                              borderRadius: "15px",
                              // boxShadow: "1px 2px 9px #311465",
                              textAlign: "left",
                              fontSize: "14px",
                            }}
                            type="number"
                            min="0"
                            className="form-control m-10"
                            //value={fepk.durationMin}
                            defaultValue={fepk.durationMin}
                            placeholder={t("Duration Minutes")}
                            onChange={handleInputChange}
                            name="durationMin"
                        />
                      </div>
                    </div>

                  {/* The end of the 2nd column)*/}

              </div>
              {/* The 3rd column)*/}
              <div className="col-lg-4">
                <div className=" text-center">
                  {/* Picture Upload Text */}
                  <div className="tw-flex tw-justify-center tw-items-center tw-mt-5">
                    {/* Picture Upload Button */}
                    <div
                        className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                        style={{
                          width: "200px",
                          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                        }}
                    >
                      <label
                          htmlFor="filePoster"
                          className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"
                      >
        <span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">
          {t("Poster Upload")}
        </span>
                        {/* Upload Icon */}
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

                  {/* Hidden file input */}
                  <input
                      style={{display: "none"}}
                      className="form-control form-control-sm"
                      filename={file3}
                      onChange={file3Selected}
                      ref={inputFile3Ref}
                      type="file"
                      id="filePoster"
                      name="files"
                      accept="image/*"
                  />

                  {/* Clickable image for file upload */}
                  {posterPreviewUrl || (fepk.image_details && fepk.image_details !== undefined) ? (
                      <img
                          src={posterPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`}
                          style={{
                            height: "120px",
                            width: "auto",
                            margin: "0 auto",
                            display: "block",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                          alt="Preview"
                          onClick={() => inputFile3Ref.current.click()}
                      />
                  ) : (
                      <h3
                          onClick={() => inputFile3Ref.current.click()}
                          style={{cursor: "pointer", marginTop: "10px"}}
                      >
                        {t("No Image")}
                      </h3>
                  )}

                  {messageImg && (
                      <div
                          className="message"
                          style={{
                            color: "red",
                            fontSize: "1rem",
                            marginTop: "10px",
                          }}
                      >
                        {messageImg}
                      </div>
                  )}
                </div>

                {/* Banner and Trailer */}
                <div className=" text-center">
                  {/* Banner Upload Text */}
                  <div className="tw-flex tw-justify-center tw-items-center tw-mt-5">
                    {/* Banner Upload Button */}
                    <div
                        className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"
                        style={{
                          width: "200px",
                          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                        }}
                    >
                      <label
                          htmlFor="fileBanner"
                          className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"
                      >
        <span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">
          {t("Cover Upload")}
        </span>
                        {/* Upload Icon */}
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

                  {/* Hidden file input */}
                  <input
                      style={{display: "none"}}
                      className="form-control form-control-sm"
                      filename={file1}
                      onChange={file1Selected}
                      ref={inputFile1Ref}
                      type="file"
                      id="fileBanner"
                      name="files"
                      accept="image/*"
                  />

                  {/* Clickable image for file upload */}
                  {bannerPreviewUrl || (fepk.banner_url && fepk.banner_url !== undefined) ? (
                      <img
                          src={bannerPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${fepk.banner_url}`}
                          style={{
                            height: "120px",
                            width: "auto",
                            margin: "0 auto",
                            display: "block",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                          alt="Preview"
                          onClick={() => inputFile1Ref.current.click()}
                      />
                  ) : (
                      <h3
                          onClick={() => inputFile1Ref.current.click()}
                          style={{cursor: "pointer", marginTop: "10px"}}
                      >
                        {t("No Image")}
                      </h3>
                  )}
                </div>


                {/*          <div className="col mt-5 text-center">*/}
                {/*            /!* Trailer Upload Text *!/*/}
                {/*            <div className="tw-flex tw-justify-center tw-items-center tw-mt-5">*/}
                {/*              /!* Trailer Upload Button *!/*/}
                {/*              <div*/}
                {/*                  className="tw-mb-2 tw-flex tw-items-center tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md"*/}
                {/*                  style={{*/}
                {/*                    width: "200px",*/}
                {/*                    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(255, 255, 255, 0.6)",*/}
                {/*                  }}*/}
                {/*              >*/}
                {/*                <label*/}
                {/*                    htmlFor="fileTrailer"*/}
                {/*                    className="tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-w-full"*/}
                {/*                >*/}
                {/*<span className="tw-text-[1rem] tw-font-medium tw-text-gray-800">*/}
                {/*  {t("Teaser Trailer Upload")}*/}
                {/*</span>*/}
                {/*                  /!* Upload Icon *!/*/}
                {/*                  <svg*/}
                {/*                      xmlns="http://www.w3.org/2000/svg"*/}
                {/*                      fill="none"*/}
                {/*                      viewBox="0 0 24 24"*/}
                {/*                      strokeWidth="1.5"*/}
                {/*                      stroke="currentColor"*/}
                {/*                      className="tw-h-5"*/}
                {/*                  >*/}
                {/*                    <path*/}
                {/*                        strokeLinecap="round"*/}
                {/*                        strokeLinejoin="round"*/}
                {/*                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"*/}
                {/*                    />*/}
                {/*                  </svg>*/}
                {/*                </label>*/}
                {/*              </div>*/}
                {/*            </div>*/}

                {/*            /!* Hidden file input *!/*/}
                {/*            <input*/}
                {/*                style={{display: "none"}}*/}
                {/*                className="form-control form-control-sm"*/}
                {/*                filename={file2}*/}
                {/*                ref={inputFile2Ref}*/}
                {/*                onChange={file2Selected}*/}
                {/*                type="file"*/}
                {/*                id="fileTrailer"*/}
                {/*                name="files"*/}
                {/*                accept="video/*"*/}
                {/*            />*/}

                {/*            /!* Clickable video preview for upload *!/*/}
                {/*            {trailerPreviewUrl || (fepk.trailer_url && fepk.trailer_url !== undefined) ? (*/}
                {/*                <video*/}
                {/*                    src={trailerPreviewUrl || `${process.env.REACT_APP_AWS_URL}/${fepk.trailer_url}`}*/}
                {/*                    controls*/}
                {/*                    style={{*/}
                {/*                      width: "100%",*/}
                {/*                      height: "auto",*/}
                {/*                      borderRadius: "8px",*/}
                {/*                      marginTop: "10px",*/}
                {/*                      cursor: "pointer",*/}
                {/*                    }}*/}
                {/*                    onClick={() => inputFile2Ref.current.click()} // Triggers file input click*/}
                {/*                ></video>*/}
                {/*            ) : (*/}
                {/*                <h6*/}
                {/*                    onClick={() => inputFile2Ref.current.click()}*/}
                {/*                    style={{cursor: "pointer", marginTop: "10px", color: "gray"}}*/}
                {/*                >*/}
                {/*                  {t("No Video Uploaded")}*/}
                {/*                </h6>*/}
                {/*            )}*/}
                {/*          </div>*/}

              </div>


              <div
                  className="row"
                  style={{
                    // paddingRight: "20%",
                    // paddingLeft: "5%",
                    maxWidth: "600px",
                    margin: "0 auto"
                  }}
              >
                <div>
                  <Tooltip
                      title={t(
                          "In order to collect donations, for your film, please enter your PayPal or Stripe Button URL here. Your Donation icon will appear under the cover section in the EPK."
                      )}
                  >
                    <span>
                      {" "}
                      <InfoCircleFilled style={{ color: "gray",}}/>
                    </span>
                  </Tooltip>
                </div>

                <div className="row"
                     style={{
                       marginLeft: "-20px",
                       width: "120%",
                     }}
                >
                  <div className="">
                    <input
                        style={{
                          height: "30px",
                          width: "100%",
                          marginBottom: "5px",
                          borderRadius: "15px",
                          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                          paddingLeft: "90px",
                          backgroundImage: `url(${paypalImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "left",
                          backgroundSize: "80px 60px",
                        }}
                        className="form-control"
                        defaultValue={fepk.DonatePayPal_url}
                        placeholder="URL: www.paypal.com/mymovie"
                        onChange={handleInputChange}
                        name="DonatePayPal_url"
                    />
                  </div>
                </div>

                {/*<div className="col">*/}
                {/*  <input*/}
                {/*    style={{*/}
                {/*      height: "30px",*/}
                {/*      width: "100%",*/}
                {/*      borderRadius: "5px",*/}
                {/*      boxShadow: "1px 2px 9px #311465",*/}
                {/*      paddingLeft: "90px",*/}
                {/*      backgroundImage: `url(${stripImage})`,*/}
                {/*      backgroundRepeat: "no-repeat",*/}
                {/*      backgroundPosition: "left",*/}
                {/*      backgroundSize: "80px 40px",*/}
                {/*    }}*/}
                {/*    className="form-control"*/}
                {/*    defaultValue={fepk.DonateStripe_url}*/}
                {/*    placeholder="URL: www.stripe.com/mymovie"*/}
                {/*    onChange={handleInputChange}*/}
                {/*    name="DonateStripe_url"*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
                </div>
            </form>
          </div>

        </div>
        <div
            className="mt-4 tw-relative tw-ml-[70%] tw-flex tw-h-12 tw-w-24 "
            // style={{
            //   height: "50px",
            //   width: "80px",
            //   marginLeft: "90%",
            //   marginTop: "3%",
            // }}
        >
          {disabled === true ? (
              <Button
                  disabled
                  style={{
                    width: "120px",
                    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(255, 255, 255, 0.6)",
                    color: "grey",
                    // fontWeight: "bold",
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
                {t("EPK Cover Saved Successfully!")}
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
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default FepkEditCoverForm;
