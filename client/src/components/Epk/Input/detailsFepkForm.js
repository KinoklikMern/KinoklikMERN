import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";

function DetailsForm () {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const inputFileRef = useRef(null);
  const [crewList, setCrewList] = useState([]);

  let { fepkId } = useParams();
  const filmmaker_id = "63c0e3bb40253f49b94edd11";
  
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

  const [epkLoglineData, setEpkLoglineData] = useState({
    image_logline: fepk.image_logline,
    logLine_long: fepk.logLine_long
  });

  const deleteFromCrewList = (value) => {

  };
  
  const handleLoglineChange = (event) => {
    const { name, value } = event.target;
    setEpkLoglineData({ ...epkLoglineData, [name]: value });
    setDisabled(false);
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
        file.type === "video/x-msvideo" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        return true;
      else return false;
    } else return true;
  };

  const saveEpkLogline = (e) => {
    debugger;
    e.preventDefault();
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(formData);
    debugger;
    if (checkFileMimeType(file)) {
      if(file){
        http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            epkLoglineData.image_logline = response.data.key;
          }
          http
            .put(`fepks/update/${fepkId}`, epkLoglineData)
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
      else{
        http
            .put(`fepks/update/${fepkId}`, epkLoglineData)
            .then((res) => {
              console.log("saved");
            })
            .catch((err) => {
              console.log(err);
            });
      }
      
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
              <img
                src={require("../../../images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
            </Link>
          </div>
          <div className="col-3  m-3">
           <h2 className="col align-items-start" style={{color: "#311465", fontWeight: 'normal' }}>EPK Dashboard</h2>
          </div>
          <div className="col-3 m-3">
            < BasicMenu/>   
          </div>
          <div className="col-1 m-3">        
          </div>
          <div className="col-2 m-3">
            <Link className="col align-items-end" to={`/Epk/${fepk.title}`}  style={{ color: "#311465", textDecoration: 'none', fontWeight: 'normal', fontSize: '20px' }}>
                View EPK Page
            </Link>
          </div>
        </div>
        <div style={{marginLeft: '10%', marginRight: '15%', color: "#311465", fontWeight: 'normal' }}>
          <div className="card-body" style={{height: "500px"}}>
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Film Details</h5>
            <form className="row g-3">
                <div className="col-3 mt-5">
                    <label for="filePoster" class="form-label text-dark">
                      {" "}
                      <h4>Upload Poster / Thumbnail</h4>
                    </label>
                    <input
                      className="form-control form-control-sm"
                      filename={file}
                      onChange={fileSelected}
                      ref={inputFileRef}
                      type="file"
                      id="filePoster"
                      name="files"
                      accept="image/*"
                    ></input>
                    <img src={`https://kinomovie.s3.amazonaws.com/${fepk.image_logline}`} style={{height:"180px", width:"auto", marginTop: "5px"}} alt="no image"/>
                </div>
                <div className="col-5 mt-5">
                    <table className="table table-striped table-bordered" style={{fontSize:"10px"}}>
				        <thead className="thead-dark">
					        <tr>
                                <th>CREW NAME</th>
                                <th>EPK ROLE</th>
						        <th>ACTION</th>
					        </tr>
				        </thead>
				        <tbody>
                            {crewList.map((val) => {
                                return (
                                    <tr>
                                        <td>{val.name}</td>
                                        <td>{val.role}</td>
                                        <td><button className="btn btn-dark" onClick={deleteFromCrewList(val.name)}>Delete</button></td>
                                    </tr>
                                );
                            })}
				        </tbody>
			        </table>
                </div>
                <div className="col-4 mt-5">Crew Name-EPK Role-button</div>
                <div
                    style={{
                    height: "50px",
                    width: "120px",
                    marginLeft: "100%",
                    marginTop: "70px"
                    }}
                >
                    {disabled===true ? 
                    (
                    <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkLogline} value="save">
                        Save
                    </Button>
                    ) :
                    (
                    <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkLogline} value="save">
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
export default DetailsForm;