import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";

function UniquenessForm () {
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

  const [epkUniquenessData, setEpkUniquenessData] = useState({
    image_uniqueness: fepk.image_uniqueness,
    title_uniqueness: fepk.title_uniqueness,
    description_uniqueness: fepk.description_uniqueness
  });
  
  const handleUniquenessChange = (event) => {
    const { name, value } = event.target;
    setEpkUniquenessData({ ...epkUniquenessData, [name]: value });
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

  const saveEpkUniqueness = (e) => {
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
            epkUniquenessData.image_uniqueness = response.data.key;
          }
          http
            .put(`fepks/update/${fepkId}`, epkUniquenessData)
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
            .put(`fepks/update/${fepkId}`, epkUniquenessData)
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
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Uniqueness</h5>
            <form>
              <div className="row g-3">
                <div className="col my-3"></div>
                <div className="col my-6">
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
                        defaultValue={fepk.title_uniqueness}
                        placeholder="Title"
                        onChange={handleUniquenessChange}
                        name="title_uniqueness"
                    />
                </div>
                <div className="col my-3"></div>
              </div>
              <div className="row g-3">
                <div className="col my-3"></div>
                <div className="col my-6">
                  <textarea
                      style={{ 
                        height: "120px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left'
                    }}
                    className="form-control mt-10"
                    defaultValue={fepk.description_uniqueness}
                    placeholder="Description"
                    onChange={handleUniquenessChange}
                    name="description_uniqueness"
                  />
                </div>
                <div className="col my-3"></div>
              </div>
              <div className="row g-3">
                <div className="col my-3"></div>
                <div className="col my-6">
                        <label for="filePoster" class="form-label text-dark" style={{fontSize:"25px"}}>
                        {" "}
                        <h4>Upload Picture</h4>
                        </label>
                        <input
                        style={{fontSize:"15px"}}
                        className="form-control form-control-sm"
                        filename={file}
                        onChange={fileSelected}
                        ref={inputFileRef}
                        type="file"
                        id="filePoster"
                        name="files"
                        accept="image/*"
                        ></input>
                        <img src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_uniqueness}`} style={{height:"70px", width:"auto", marginTop: "5px"}} alt="no image"/>
                </div>
                <div className="col my-3"></div>
                <div
                    style={{
                    height: "50px",
                    width: "120px",
                    marginLeft: "100%",
                    marginTop: "85px"
                    }}
                >
                    {disabled===true ? 
                    (
                    <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkUniqueness} value="save">
                        Save
                    </Button>
                    ) :
                    (
                    <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkUniqueness} value="save">
                        Save
                    </Button>
                    )}
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
export default UniquenessForm;