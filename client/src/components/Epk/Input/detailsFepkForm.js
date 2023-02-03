import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faPlus, faTrashCan, faUserPlus} from "@fortawesome/free-solid-svg-icons";

function DetailsForm () {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const [allCrewList, setAllCrewList] = useState([]);
  const [crewList, setCrewList] = useState([]); 
  
  let { fepkId } = useParams();
  const filmmaker_id = "63c0e3bb40253f49b94edd11";
  
  const fileSelected = (event) => {
    setFile(event.target.files[0]);
    setDisabled(false);
  };

  const epkRoles = [
    "lead_actor", 
    "supporting_actor", 
    "director", 
    "producer", 
    "cinematographer", 
    "editor", 
    "writer", 
    "sound"
  ];

  const makeEpkRole = (Y) => {
    return <option value={Y}> {Y}</option>;
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        setCrewList(response.data.crew);
        console.log(response.data.title);
    });
    http.get("/crews/").then((res) =>{
      setAllCrewList(res.data);
    });
  }, []);

  const [epkFilmDetailsData, setEpkFilmDetailsData] = useState({
    image_details: fepk.image_details,
    productionCo: fepk.productionCo,
    distributionCo: fepk.distributionCo,
    productionYear: fepk.productionYear,
    durationMin: fepk.durationMin,
    crew: fepk.crew
  });

  const [crewAndRole, setCrewAndRole] = useState({
    crewId: {
              _id: "",
              name:""
    },
    epkRole: ""
  });

  function deleteFromCrewList(deletedCrew){
    const newCrewList = crewList.filter((crewObject) => crewObject !== deletedCrew);
    setCrewList(newCrewList);
    setEpkFilmDetailsData({ ...epkFilmDetailsData, crew: newCrewList });
    setDisabled(false);
  }

  function addCrewAndRoleToTable(){
    if(crewAndRole.crewId._id !== "" && crewAndRole.epkRole !== "")
    {
      crewList.push(crewAndRole);
      console.log(crewList);
      setEpkFilmDetailsData({ ...epkFilmDetailsData, crew: crewList });
      setDisabledAdd(true);
      setDisabled(false);
    }
  }

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setEpkFilmDetailsData({ ...epkFilmDetailsData, [name]: value });
    setDisabled(false);
  };

  const handleCrewChange = (event) => {
    let combined = event.target.value.split(':');
    setCrewAndRole({ ...crewAndRole, crewId: {
                                                _id: combined[0],
                                                name: combined[1]
                                             } 
    });
    setDisabledAdd(false);
  };

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setCrewAndRole({ ...crewAndRole, [name]: value });
    setDisabledAdd(false);
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

  const saveEpkDetails = (e) => {
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
            epkFilmDetailsData.image_details = response.data.key;
          }
          http
            .put(`fepks/update/${fepkId}`, epkFilmDetailsData)
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
            .put(`fepks/update/${fepkId}`, epkFilmDetailsData)
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
            <BasicMenu />   
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
                      id="fileDetails"
                      name="files"
                      accept="image/*"
                    ></input>
                    <img src={`https://kinomovie.s3.amazonaws.com/${fepk.image_details}`} style={{height:"180px", width:"auto", marginTop: "5px"}} alt="no image"/>
                </div>
                <div className="col-3 mt-5">
                  <table className="table table-striped table-bordered" style={{fontSize:"10px"}}>
                    <thead className="thead-dark">
                      <tr>
                          <th>CREW NAME</th>
                          <th>EPK ROLE</th>
                          <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crewList.map((crew) => {
                        return (
                          <tr>
                            <td>{crew.crewId.name}</td>
                            <td>{crew.epkRole}</td>
                            <td style={{textAlign: "center"}} onClick={() => deleteFromCrewList(crew)}><FontAwesomeIcon icon={faTrashCan} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-2" style={{textAlign: "right"}}>
                      <FontAwesomeIcon icon={faUserPlus} style={{height: "20px", marginTop: "50px"}}/>
                    </div>
                    <div className="col-4 mt-5">
                      <select
                        style={{ 
                            height: "30px", 
                            width: "100%", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                        }}
                        className="form-select form-select-sm "
                        name="crewId"
                        onChange={handleCrewChange}
                        >
                        <option value="">Crew name...</option>
                        {allCrewList.map((crewObject) => {
                          return (
                            <option value={(crewObject._id.concat(':')).concat(crewObject.name)}>{crewObject.name}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-4 mt-5">
                      <select
                        style={{ 
                            height: "30px", 
                            width: "100%", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                        }}
                        className="form-select form-select-sm "
                        name="epkRole"
                        onChange={handleRoleChange}
                        >
                        <option value="">Epk role...</option>
                        {epkRoles.map(makeEpkRole)}
                      </select>
                    </div>
                    <div className="col-2" style={{marginTop:"30px"}}>
                      {disabledAdd===true ? 
                      (
                      <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold", width: "115px"}} type="outline-primary" block onClick={addCrewAndRoleToTable} value="save">
                          Add to Table
                      </Button>
                      ) :
                      (
                      <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold", width: "115px"}} type="outline-primary" block onClick={addCrewAndRoleToTable} value="save">
                          Add to Table
                      </Button>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 mt-5"></div>
                    <div className="col-5 mt-5">
                      <input
                        style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                        fontSize: "14px"
                        }}
                        className="form-control m-10"
                        defaultValue={fepk.productionCo}
                        placeholder="Production Company Name"
                        onChange={handleDetailsChange}
                        name="productionCo"
                      />
                      <input
                        style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                        fontSize: "14px"
                        }}
                        className="form-control m-10"
                        defaultValue={fepk.distributionCo}
                        placeholder="Distribution Company Name"
                        onChange={handleDetailsChange}
                        name="distributionCo"
                      />
                    </div>
                    <div className="col-3 mt-5">
                    <input
                        style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                        fontSize: "14px"
                        }}
                        type="number" min="1895"
                        className="form-control m-10"
                        defaultValue={fepk.productionYear}
                        placeholder="Year"
                        onChange={handleDetailsChange}
                        name="productionYear"
                      />
                      <input
                        style={{ 
                        height: "30px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                        fontSize: "14px"
                        }}
                        type="number" min="0"
                        className="form-control m-10"
                        defaultValue={fepk.durationMin}
                        placeholder="Min."
                        onChange={handleDetailsChange}
                        name="durationMin"
                      />
                    </div>
                    <div className="col-1 mt-5"></div>
                  </div>
                  <div className="row">
                    <div
                      style={{
                      height: "50px",
                      width: "120px",
                      marginLeft: "100%",
                      marginTop: "190px"
                      }}
                      className="col-12"
                      >
                      {disabled===true ? 
                      (
                      <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkDetails} value="save">
                          Save
                      </Button>
                      ) :
                      (
                      <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={saveEpkDetails} value="save">
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
export default DetailsForm;