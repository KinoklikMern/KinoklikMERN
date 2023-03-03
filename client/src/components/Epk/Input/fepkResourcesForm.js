import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faPlus, faTrashCan, faUserPlus} from "@fortawesome/free-solid-svg-icons";

function ResourcesForm () {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const [resourcesList, setResourcesList] = useState([]); 
  const [resource, setResource] = useState({
    title: "", 
    time: "", 
    description: ""
    });
  const [epkResourcesData, setEpkResourcesData] = useState({
    resources: fepk.resources
  });

  let { fepkId } = useParams();
  
  const fileSelected = (event) => {
    setFile(event.target.files[0]);
    //setDisabled(false);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        setResourcesList(response.data.resources);
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

  function addResourceToTable(){
    if(resource.title !== "")
    {
        resourcesList.push(resource);
        setEpkResourcesData({ ...epkResourcesData, resources: resourcesList });
        setDisabledAdd(true);
        setDisabled(false);
    }
  }
  const handleResourceChange = (event) => {
    const { name, value } = event.target;
    setResource({ ...resource, [name]: value });
    setDisabledAdd(false);
  };

  function addResourceImage(){
    let formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(formData);
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
            const key = response.data.key;
            console.log(key);
            resource.image = key;
            addResourceToTable();
         }
        })
        .catch((err) => {
          console.log();
          console.log(err);
        }); 
      }else{
            addResourceToTable();
      }
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  }

  function deleteFromResourcesList(deletedResource){
    const newResourcesList = resourcesList.filter((resourceObject) => resourceObject !== deletedResource);
    setResourcesList(newResourcesList);
    setEpkResourcesData({ ...epkResourcesData, resources: newResourcesList });
    setDisabled(false);
  }

  function saveEpkResources(){
    http
        .put(`fepks/update/${fepkId}`, epkResourcesData)
        .then((res) => {
            console.log("saved");
        })
        .catch((err) => {
            console.log(err);
        });
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
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Resources</h5>
            <form>
                <div className="row">
                    <div className="col-4 my-4">
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
                            placeholder="Title"
                            onChange={handleResourceChange}
                            name="title"
                        />
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
                            placeholder="Time"
                            onChange={handleResourceChange}
                            name="time"
                        />
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
                            placeholder="Description"
                            onChange={handleResourceChange}
                            name="description"
                        />
                        
                        <label for="fileAwardLogo" class="form-label text-dark" style={{fontSize:"25px"}}>
                            {" "}
                            <h4>Upload Image</h4>
                        </label>
                        <input
                            style={{fontSize:"15px"}}
                            className="form-control form-control-sm"
                            filename={file}
                            onChange={fileSelected}
                            ref={inputFileRef}
                            type="file"
                            id="fileImageResources"
                            name="files"
                            accept="image/*"
                        />
                        {disabledAdd===true ? 
                        (
                        <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold", width: "100%"}} type="outline-primary" block onClick={addResourceImage} value="save">
                            Add to Table
                        </Button>
                        ) :
                        (
                        <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold", width: "100%"}} type="outline-primary" block onClick={addResourceImage} value="save">
                            Add to Table
                        </Button>
                        )}
                    </div>
                    <div className="col-7 my-4">
                        <table className="table table-striped table-bordered" style={{fontSize:"8px", textAlign:"center"}}>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Time</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                            {resourcesList.map((resource) => {
                                return (
                                <tr>
                                    <td>{resource.title}</td>
                                    <td>{resource.time}</td>
                                    <td>{resource.description}</td>
                                    <td>
                                        <img src={`${process.env.REACT_APP_AWS_URL}/${resource.image}`} style={{height:"60px", width:"auto"}}/>
                                    </td>
                                    <td style={{textAlign: "center"}} onClick={() => deleteFromResourcesList(resource)}><FontAwesomeIcon icon={faTrashCan} /></td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1 mt-5">
                        <div
                            style={{
                            height: "50px",
                            width: "100px",
                            marginLeft: "100%",
                            marginTop: "350px"
                            }}
                        >
                            {disabled===true ? 
                            (
                            <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkResources} value="save">
                                Save
                            </Button>
                            ) :
                            (
                            <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkResources} value="save">
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
export default ResourcesForm;