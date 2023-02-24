import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";

function TrailerForm () {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const inputFileRef = useRef(null);

  let { fepkId } = useParams();
  
  const fileSelected = (event) => {
    setFile(event.target.files[0]);
    setDisabled(false);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        console.log(response.data.title);
    });
  }, []);

  const [epkTrailerData, setEpkTrailerData] = useState({
    trailer: fepk.trailer
  });

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

  const saveEpkTrailer = (e) => {
    debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(formData);
    debugger;
    if (checkFileMimeType(file)) {
        http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            epkTrailerData.trailer = response.data.key;
          }
          http
            .put(`fepks/update/${fepkId}`, epkTrailerData)
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
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Film Trailer</h5>
            <form>
                <div  className="row">
                    <div className="col-2 mt-3">
                      <label for="fileTrailer" class="form-label text-dark" style={{fontSize:"25px"}}>
                        {" "}
                        <h6 style={{fontSize:"20px"}}>Upload Video</h6>
                        </label>
                        <input
                        style={{fontSize:"15px"}}
                        className="form-control form-control-sm"
                        filename={file}
                        onChange={fileSelected}
                        ref={inputFileRef}
                        type="file"
                        id="fileTrailer"
                        name="files"
                        accept="video/*"
                        />
                    </div>
                    <div className="col-9 mt-3" style={{textAlign: "center"}}>
                        <video src={`${process.env.REACT_APP_AWS_URL}/${fepk.trailer}`} style={{width:"100%", height:"400px"}} controls>
                        </video>
                    </div>
                    <div className="col-1">
                      <div
                        style={{
                        height: "50px",
                        width: "100px",
                        marginLeft: "100%",
                        marginTop: "400px"
                        }}
                      >
                        {disabled===true ? 
                        (
                        <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkTrailer} value="save">
                            Save
                        </Button>
                        ) :
                        (
                        <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkTrailer} value="save">
                            Save
                        </Button>
                        )}
                      </div>
                    </div>
                </div>
            </form>
          </div>
        </div>
      </form>
    </div>
  </>
  );
}
export default TrailerForm;