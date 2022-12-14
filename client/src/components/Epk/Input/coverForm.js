import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import http from "../../../http-common";
import { Button, Col, Row } from "antd";

function CoverForm() {
  //const [movieId, setMovieId] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const inputFile1Ref = useRef(null);
  const inputFile2Ref = useRef(null);
  const [message, setMessage] = useState("");

  const file1Selected = (event) => {
    const file = event.target.files[0];
    setFile1(file);
  };

  const file2Selected = (event) => {
    const file = event.target.files[0];
    setFile2(file);
  };

  const [epkCoverData, setEpkCoverData] = useState({
    epkId: "5",
    title: "",
    logLine: "",
    genre: "",
    minutes: "",
    banner_url: "",
    trailer_url: "",
    kickstarter_url: "",
  });
  const movieGenre = [
    "Genre...",
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEpkCoverData({ ...epkCoverData, [name]: value });
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
    debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file1);
    console.log(file2);

    formData.append("file1", file1);

    formData.append("file2", file2);
    console.log(formData);
    debugger;
    if (checkFileMimeType(file1) && checkFileMimeType(file2)) {
      http
        .post("epks/uploadFiles", formData, {
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
          http
            .post("epks/epkcover", epkCoverData)
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
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  return (
    <>
      <div style={{
        boxShadow: '1px 2px 9px #311465', 
        marginLeft: "10%", 
        width: "80%", 
        background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
        backgroundColor:"white"}}>
      <form>
        <div className="row">
          <div className="col-1">
            <Link className="navbar-brand text-headers-style" to="/home">
              <img
                src={require("../../../images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          </div>
          <div className="col-3  m-3">
           <h2 className="col align-items-start" style={{color: "#311465", fontWeight: 'normal' }}>EPK Page Upload</h2>
          </div>
          <div className="col-2 m-3">
          <Link className="col align-items-end" to="/Epk"  style={{ color: "#311465", textDecoration: 'none', fontWeight: 'normal', fontSize: '20px' }}>
                View EPK Page
              </Link>
          </div>
          <div className="col">            
          </div>
        </div>
        <div style={{marginLeft: '10%', marginRight: '15%', color: "#311465", fontWeight: 'normal' }}>
          <div className="card-body" style={{height: "500px"}}>
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Cover</h5>
            <form className="row g-3">
              <div className="col ms-">
                <div className="col my-1">
                  <input
                      style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'
                    }}
                    className="form-control m-10"
                    defaultValue={epkCoverData.title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    name="title"
                  />
                </div>
                <div className="col my-1">
                  <input
                      style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'center'
                    }}
                    className="form-control mt-10"
                    defaultValue={epkCoverData.LogLine}
                    placeholder="Log Line"
                    onChange={handleInputChange}
                    name="logLine"
                  />
                </div>
                <div className="row mt-2">
                  <div className="col my-2">
                    <select
                        style={{ 
                          height: "30px", 
                          width: "100%", 
                          borderRadius: "5px", 
                          marginBottom: "5px",
                          boxShadow: '1px 2px 9px #311465',
                      }}
                      className="form-select form-select-sm "
                      name="genre"
                      onChange={handleInputChange}
                    >
                      {movieGenre.map(makeGenreItem)}
                    </select>
                  </div>
                  <div className="col my-1">
                    <input
                        style={{ 
                          height: "30px", 
                          width: "100%", 
                          borderRadius: "5px", 
                          marginBottom: "5px",
                          boxShadow: '1px 2px 9px #311465',
                      }}
                      className="form-control"
                      defaultValue={epkCoverData.minutes}
                      placeholder="Minutes"
                      onChange={handleInputChange}
                      name="minutes"
                    />
                  </div>
                </div>
                <div>
                  <input
                      style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                    }}
                    className="form-control"
                    defaultValue={epkCoverData.kickstarter_url}
                    placeholder="KickStarter URL"
                    onChange={handleInputChange}
                    name="kickstarter_url"
                  />
                </div>
              </div>
              <div className="col border border-2">
                <div className="row gx-5">
                  <div className="col mt-5">
                    <label for="fileBanner" class="form-label text-dark">
                      {" "}
                      Upload Banner
                    </label>
                    <input
                      className="form-control form-control-sm"
                      filename={file1}
                      onChange={file1Selected}
                      ref={inputFile1Ref}
                      type="file"
                      id="fileBanner"
                      name="files"
                      accept="image/*"
                    ></input>
                  </div>
                  <div className="col mt-5">
                    <label for="fileTrailer" class="form-label text-dark">
                      {" "}
                      Upload Trailer
                    </label>
                    <input
                      className="form-control form-control-sm"
                      filename={file2}
                      ref={inputFile2Ref}
                      onChange={file2Selected}
                      type="file"
                      id="fileTrailer"
                      name="files"
                      accept="video/*"
                    ></input>
                  </div>
                </div>
              </div>
          <div
          style={{
            height: "50px",
            width: "120px",
            marginLeft: "100%",
            marginTop: "200px"
          }}
        >
          <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkCover} value="save">
            Save
          </Button>
            </div>
            </form>
          </div>
        </div>
      </form>
    </div>
  </>
  );
}

export default CoverForm;