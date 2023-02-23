import React, { useState, useRef, useEffect } from "react";
import http from "../../../http-common";
import { Button, Col, Row } from "antd";
import { useNavigate, Link, useParams } from 'react-router-dom';
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
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        console.log(response.data.title);
    });
  }, []);

  const [epkCoverData, setEpkCoverData] = useState({
    film_maker: fepk.film_maker,
    title: fepk.title,
    logLine_short: fepk.logLine_short,
    genre: fepk.genre,
    kickstarter_url: fepk.kickstarter_url,
    banner_url: fepk.banner_url,
    trailer_url: fepk.trailer_url,
    status: fepk.status
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
  const movieStatus = [
    "Preproduction",
    "Production",
    "Postproduction"
  ];
  const makeStatusItem = (Y) => {
    return <option value={Y}> {Y}</option>;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEpkCoverData({ ...epkCoverData, [name]: value });
    setDisabled(false);
    if(name === "title"){
        http
        .get(`fepks/byTitle/${event.target.value}`)
        .then((response) => {
          if (response.data.length>0) {
            setMessageTitleNo("This title exists! You are not allowed to use it again!");
            setMessageTitleYes("");
            console.log(response.data);
          }
          else{
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
    } else {
      setMessage("File must be an image(jpeg or png)");
    }
    setDisabled(true);
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
              <img style={{width:"100%", height:"80px"}}
                src={require("../../../images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          </div>
          <div className="col-3  m-3">
           <h2 className="col align-items-start" style={{color: "#311465", fontWeight: 'normal', fontSize:"25px" }}>EPK Dashboard</h2>
          </div>
          <div className="col-3 m-3">
            < BasicMenu/>   
          </div>
          <div className="col-1 m-3">        
          </div>
          <div className="col-2 m-3">
            <Link className="col align-items-end" to={`/epkview/${fepk.title}`}  style={{ color: "#311465", textDecoration: 'none', fontWeight: 'normal', fontSize: '20px' }}>
                View EPK Page
            </Link>
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
                        textAlign: 'left'
                    }}
                    className="form-control m-10"
                    defaultValue={fepk.title}
                    placeholder="Title"
                    onChange={handleInputChange}
                    name="title"
                  /><h6 style={{ color: "red" }}>{messageTitleNo}</h6>
                    <h6 style={{ color: "green" }}>{messageTitleYes}</h6>
                </div>
                <div className="col my-1">
                  <textarea
                      style={{ 
                        height: "60px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left'
                    }}
                    className="form-control mt-10"
                    defaultValue={fepk.logLine_short}
                    placeholder="Log Line short"
                    onChange={handleInputChange}
                    name="logLine_short"
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
                          boxShadow: '1px 2px 9px #311465',
                      }}
                      className="form-select form-select-sm "
                      name="status"
                      onChange={handleInputChange}
                    >
                      <option defaultValue={fepk.status}>{fepk.status}</option>
                      {movieStatus.map(makeStatusItem)}
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
                        boxShadow: '1px 2px 9px #311465',
                    }}
                    className="form-control"
                    defaultValue={fepk.kickstarter_url}
                    placeholder="KickStarter URL"
                    onChange={handleInputChange}
                    name="kickstarter_url"
                  />
                </div>
              </div>
              <div className="col border border-2">
                <div className="row gx-6">
                  <div className="col">
                    <label for="fileBanner" class="form-label text-dark" style={{fontSize:"25px"}}>
                      {" "}
                      <h4>Upload Banner</h4>
                    </label>
                    <input
                      style={{fontSize:"15px"}}
                      className="form-control form-control-sm"
                      filename={file1}
                      onChange={file1Selected}
                      ref={inputFile1Ref}
                      type="file"
                      id="fileBanner"
                      name="files"
                      accept="image/*"
                    ></input>
                      <img src={`${process.env.REACT_APP_AWS_URL}/${fepk.banner_url}`} style={{height:"70px", width:"auto", marginTop: "5px"}} alt="no image"/>
                  </div>
                  <div className="col">
                    <label for="fileTrailer" class="form-label text-dark" style={{fontSize:"25px"}}>
                      {" "}
                      <h4>Upload Trailer</h4>
                    </label>
                    <input
                      style={{fontSize:"15px"}}
                      className="form-control form-control-sm"
                      filename={file2}
                      ref={inputFile2Ref}
                      onChange={file2Selected}
                      type="file"
                      id="fileTrailer"
                      name="files"
                      accept="video/*"
                    ></input>
                    <video src={`${process.env.REACT_APP_AWS_URL}/${fepk.trailer_url}`} style={{marginTop: "5px", width:"110px", height:"auto"}} controls>
                    </video>
                  </div>
                </div>
              </div>
          <div
          style={{
            height: "50px",
            width: "120px",
            marginLeft: "100%",
            marginTop: "180px"
          }}
        >
          {disabled===true ? 
          (
            <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkCover} value="save">
              Save
            </Button>
          ) :
          (
            <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkCover} value="save">
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