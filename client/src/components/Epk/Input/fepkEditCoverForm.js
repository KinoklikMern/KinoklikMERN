import React, { useState, useRef, useEffect } from "react";
import http from "../../../http-common";
import { Button, Col, Row } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";

function FepkEditCoverForm() {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const [message, setMessage] = useState("");
  const [messageTitleNo, setMessageTitleNo] = useState("");
  const [messageTitleYes, setMessageTitleYes] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [characterLength, setCharacterLength] = useState({ logLine_short: 0 });
  let { fepkId } = useParams();

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
    setDisabled(false);
  };

  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
    setDisabled(false);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      setCharacterLength({ logLine_short: response.data.logLine_short.length });
      // console.log(response.data);
    });
  }, []);

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
  });
  const movieGenre = [
    "action",
    "comedy",
    "documentary",
    "romance",
    "action",
    "horror",
    "mystery",
    "drama",
    "western",
    "science fiction",
    "thriller",
    "crime",
    "animation",
    "musical",
    "war",
    "romantic comedy",
    "noir",
    "disaster",
    "dark comedy",
    "historical film",
    "slasher",
    "adventure",
    "gangster",
    "spy",
    "fantasy",
    "biographical",
    "found footage",
    "legal drama",
    "melodrama",
    "superhero",
    "slapstick",
    "monster",
    "historical fiction",
    "teen",
    "apocalyptic",
    "post-apocalyptic",
    "psychological thriller",
    "stop motion",
    "sports",
    "space opera",
    "mockumentary",
  ];
  const makeGenreItem = (X) => {
    return <option value={X}> {X}</option>;
  };
  const movieStatus = ["Preproduction", "Production", "Postproduction"];
  const makeStatusItem = (Y) => {
    return <option value={Y}> {Y}</option>;
  };

  const movieType = ["Movie", "Documentary", "TV Show", "Web Series"];
  const makeTypeItem = (Z) => {
    return <option value={Z}> {Z}</option>;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCharacterLength({ ...characterLength, [name]: value.length });
    setEpkCoverData({ ...epkCoverData, [name]: value });
    console.log(epkCoverData);
    setDisabled(false);
    if (name === "title") {
      http.get(`fepks/byTitle/${event.target.value}`).then((response) => {
        if (response.data.length > 0) {
          setMessageTitleNo(
            "This title exists! You are not allowed to use it again!"
          );
          setMessageTitleYes("");
          console.log(response.data);
        } else {
          setMessageTitleYes("Title is available!");
          setMessageTitleNo("");
        }
      });
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

  const saveEpkCover = (e) => {
    e.preventDefault();
    if (characterLength.logLine_short <= 160) {
      let formData = new FormData();
      console.log(file1);
      console.log(file2);

      formData.append("file1", file1);

      formData.append("file2", file2);
      console.log(formData);
      if (checkFileMimeType(file1) && checkFileMimeType(file2)) {
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
            console.log(epkCoverData);
            http
              .put(`fepks/update/${fepkId}`, epkCoverData)
              .then((res) => {
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
      }
    } else {
      setMessage("File must be an image(jpeg or png)");
    }
    setDisabled(true);
  };

  return (
    <>
      <div
        style={{
          boxShadow: "inset 1px 2px 9px #311465",
          padding : "0px 10px",
          marginLeft: "10%",
          width: "80%",
          borderRadius: "10px",
          // background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
          backgroundColor: "white",
        }}
      >
        <form>
          <div className="row" style={{ 
            background: "linear-gradient(to bottom, #1E0039 0%, #1E0039 35%, #1E0039 35%, #FFFFFF 100%)"
          }}>
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
                Cover
              </h5>
              <form className="row g-5">
                <div className="col me-5">
                  <div className="col mt-1 mb-5">
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                      }}
                      className="form-control m-10"
                      defaultValue={fepk.title}
                      placeholder="Title"
                      onChange={handleInputChange}
                      name="title"
                    />
                    <h6 style={{ color: "red" }}>{messageTitleNo}</h6>
                    <h6 style={{ color: "green" }}>{messageTitleYes}</h6>
                  </div>
                  <div className="col my-3">
                    <textarea
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "0px",
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                        resize: "none",
                      }}
                      maxLength="160"
                      className="form-control mt-10"
                      defaultValue={fepk.logLine_short}
                      placeholder="Log Line short (maximum 160 characters)"
                      onChange={handleInputChange}
                      name="logLine_short"
                    />
                    <span
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      {characterLength?.logLine_short}/160 characters
                    </span>
                  </div>
                  <div className="row my-4">
                    <div className="col my-2">
                      <select
                        style={{
                          height: "30px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "5px",
                          boxShadow: "1px 2px 9px #311465",
                        }}
                        className="form-select form-select-sm "
                        name="genre"
                        onChange={handleInputChange}
                      >
                        <option defaultValue={fepk.genre}>{fepk.genre}</option>
                        {movieGenre.map(makeGenreItem)}
                      </select>
                    </div>
                    <div className="col my-2">
                      <select
                        style={{
                          height: "30px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "5px",
                          boxShadow: "1px 2px 9px #311465",
                        }}
                        className="form-select form-select-sm "
                        name="status"
                        onChange={handleInputChange}
                      >
                        <option defaultValue={fepk.status}>
                          {fepk.status}
                        </option>
                        {movieStatus.map(makeStatusItem)}
                      </select>
                    </div>
                    <div className="col my-2">
                      <select
                        style={{
                          height: "30px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "5px",
                          boxShadow: "1px 2px 9px #311465",
                        }}
                        className="form-select form-select-sm "
                        name="production_type"
                        onChange={handleInputChange}
                      >
                        <option defaultValue={fepk.production_type}>
                          {fepk.production_type}
                        </option>
                        {movieType.map(makeTypeItem)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        boxShadow: "1px 2px 9px #311465",
                      }}
                      className="form-control"
                      defaultValue={fepk.kickstarter_url}
                      placeholder="KickStarter URL"
                      onChange={handleInputChange}
                      name="kickstarter_url"
                    />
                  </div>
                </div>
                <div
                  className="col"
                  style={{
                    boxShadow: "1px 2px 9px #311465",
                    borderRadius: "5px",
                  }}
                >
                  <div className="row gx-6">
                    <div className="col">
                      <label
                        for="fileBanner"
                        class="form-label text-dark"
                        style={{ fontSize: "25px" }}
                      >
                        {" "}
                        <h4>Upload Banner</h4>
                      </label>
                      <input
                        style={{ fontSize: "15px" }}
                        className="form-control form-control-sm"
                        filename={file1}
                        onChange={file1Selected}
                        ref={inputFile1Ref}
                        type="file"
                        id="fileBanner"
                        name="files"
                        accept="image/*"
                      ></input>
                      <img
                        src={`${process.env.REACT_APP_AWS_URL}/${fepk.banner_url}`}
                        style={{
                          height: "120px",
                          width: "auto",
                          marginTop: "5px",
                        }}
                        alt="no image"
                      />
                    </div>
                    <div className="col">
                      <label
                        for="fileTrailer"
                        class="form-label text-dark"
                        style={{ fontSize: "25px" }}
                      >
                        {" "}
                        <h4>Upload Trailer</h4>
                      </label>
                      <input
                        style={{ fontSize: "15px" }}
                        className="form-control form-control-sm"
                        filename={file2}
                        ref={inputFile2Ref}
                        onChange={file2Selected}
                        type="file"
                        id="fileTrailer"
                        name="files"
                        accept="video/*"
                      ></input>
                      <video
                        src={`${process.env.REACT_APP_AWS_URL}/${fepk.trailer_url}`}
                        style={{
                          marginTop: "5px",
                          width: "220px",
                          height: "auto",
                          paddingTop:"0",
                        }}
                        controls
                      ></video>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "120px",
                    marginLeft: "100%",
                    marginTop: "5%",
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
                      onClick={saveEpkCover}
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
                      onClick={saveEpkCover}
                      value="save"
                    >
                      Save
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FepkEditCoverForm;
