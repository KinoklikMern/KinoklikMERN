import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faPlus, faTrashCan, faUserPlus} from "@fortawesome/free-solid-svg-icons";

function FepkDetailsForm () {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const [allCrewList, setAllCrewList] = useState([]);
  const [crewList, setCrewList] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  
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

  const [crewFromCrew, setCrewFromCrew] = useState({
    _id: "",
    name: "",
    biography: "",
    image: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: ""
  });

  const [crewData, setCrewData] = useState({
    crewId: {
              _id: "",
              name:""
    },
    epkRole: "",
    biography: "",
    image: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: ""
  });

  function deleteFromCrewList(deletedCrew){
    const newCrewList = crewList.filter((crewObject) => crewObject !== deletedCrew);
    setCrewList(newCrewList);
    setEpkFilmDetailsData({ ...epkFilmDetailsData, crew: newCrewList });
    setDisabled(false);
  }

  function addCrewToTable(){
    if(
        crewData.crewId._id !== "" && 
        crewData.epkRole !== "" && 
        crewData.biography !== "" &&
        crewData.image !== "" &&
        crewData.facebook_url !== "" &&
        crewData.instagram_url !== "" &&
        crewData.twitter_url !== ""
    )
    {
      crewList.push(crewData);
      setEpkFilmDetailsData({ ...epkFilmDetailsData, crew: crewList });
      setDisabledAdd(true);
      setDisabled(false);
    }
  }

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    const newFilter = allCrewList.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const addToCrewFromCrew = (crew) => {
    if(crew._id && crew.name){
      setCrewFromCrew({ ...crewFromCrew, _id: crew._id});
      setCrewFromCrew({ ...crewFromCrew, name: crew.name});
      setCrewData({ ...crewData, crewId: {
                                           _id: crew._id,
                                          name: crew.name
                                         } 
      });
    }
    if(crew.biography){
      setCrewFromCrew({ ...crewFromCrew, biography: crew.biography});
      setCrewData({ ...crewData, biography: crew.biography});
    }
    if(crew.image){
      setCrewFromCrew({ ...crewFromCrew, image: crew.image});
      setCrewData({ ...crewData, image: crew.image});
    }
    if(crew.facebook_url){
      setCrewFromCrew({ ...crewFromCrew, facebook_url: crew.facebook_url});
      setCrewData({ ...crewData, facebook_url: crew.facebook_url});
    }
    if(crew.instagram_url){
      setCrewFromCrew({ ...crewFromCrew, instagram_url: crew.instagram_url});
      setCrewData({ ...crewData, instagram_url: crew.instagram_url});
    }
    if(crew.twitter_url){
      setCrewFromCrew({ ...crewFromCrew, twitter_url: crew.twitter_url});
      setCrewData({ ...crewData, twitter_url: crew.twitter_url});
    }
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setEpkFilmDetailsData({ ...epkFilmDetailsData, [name]: value });
    setDisabled(false);
  };

  const handleCrewIdChange = (event) => {
    let combined = event.target.value.split(':');
    setCrewData({ ...crewData, crewId: {
                                                _id: combined[0],
                                                name: combined[1]
                                             } 
    });
    setDisabledAdd(false);
  };

  const handleCrewChange = (event) => {
    const { name, value } = event.target;
    setCrewData({ ...crewData, [name]: value });
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
            <form>
              <div className="row g-3">
                <div className="col-2 mt-3">
                    <label for="filePoster" class="form-label text-dark">
                      {" "}
                      <h6>Upload Poster / Thumbnail</h6>
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
                    <img src={`https://kinomovie.s3.amazonaws.com/${fepk.image_details}`} style={{height:"60px", width:"auto", marginTop: "5px"}} alt="no image"/>
                </div>
                <div className="col-9 mt-2">
                  <table className="table table-striped table-bordered" style={{fontSize:"10px"}}>
                    <thead className="thead-dark">
                      <tr>
                          <th>CREW NAME</th>
                          <th>EPK ROLE</th>
                          <th>BIOGRAPHY</th>
                          <th>IMAGE</th>
                          <th>FACEBOOK</th>
                          <th>INSTAGRAM</th>
                          <th>TWITTER</th>
                          <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crewList.map((crew) => {
                        return (
                          <tr>
                            <td>{crew.crewId.name}</td>
                            <td>{crew.epkRole}</td>
                            <td>{crew.biography}</td>
                            <td>
                                <img src={`https://kinomovie.s3.amazonaws.com/${crew.image}`} style={{height:"30px", width:"auto"}}/>
                            </td>
                            <td>{crew.facebook_url}</td>
                            <td>{crew.instagram_url}</td>
                            <td>{crew.twitter_url}</td>
                            <td style={{textAlign: "center"}} onClick={() => deleteFromCrewList(crew)}><FontAwesomeIcon icon={faTrashCan} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-1 mt-2"></div>
              </div>
              <div className="row">
                <div className="col-2 mt-5">
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
                        defaultValue={""}
                        placeholder="Search..."
                        onChange={handleSearch}
                      />
                      {filteredData.map((crew) => {
                        return (
                            <p style={{fontSize:"12px"}} onClick={() => addToCrewFromCrew(crew)}><img src={crew.image} style={{height:"30px", width:"auto"}}/>{crew.name}</p>
                        );
                      })}
                </div>
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
                        defaultValue={crewFromCrew.name}
                        placeholder="Crew Name"
                        onChange={handleDetailsChange}
                        name="name"
                        readOnly
                    />
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
                        onChange={handleCrewChange}
                        >
                        <option value="">Epk role...</option>
                        {epkRoles.map(makeEpkRole)}
                    </select>
                    <textarea
                      style={{ 
                        height: "40px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left'
                        }}
                        className="form-control mt-10"
                        defaultValue={crewFromCrew.biography}
                        placeholder="Biography"
                        onChange={handleCrewChange}
                        name="biography"
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
                        defaultValue={crewFromCrew.facebook_url}
                        placeholder="Facebook"
                        onChange={handleCrewChange}
                        name="facebook_url"
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
                        defaultValue={crewFromCrew.instagram_url}
                        placeholder="Instagram"
                        onChange={handleCrewChange}
                        name="instagram_url"
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
                        defaultValue={crewFromCrew.twitter_url}
                        placeholder="Twitter"
                        onChange={handleCrewChange}
                        name="twitter_url"
                    />

                      {disabledAdd===true ? 
                      (
                      <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold", width: "115px"}} type="outline-primary" block onClick={addCrewToTable} value="save">
                          Add to Table
                      </Button>
                      ) :
                      (
                      <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold", width: "115px"}} type="outline-primary" block onClick={addCrewToTable} value="save">
                          Add to Table
                      </Button>
                      )}
                    
                </div>
                <div className="col-4 mt-5">
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
                    <input
                        style={{ 
                        height: "30px", 
                        width: "50%", 
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
                        width: "50%", 
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
                <div className="col-1">
                    <div
                      style={{
                      height: "50px",
                      width: "100px",
                      marginLeft: "100%",
                      marginTop: "250px"
                      }}
                      
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
export default FepkDetailsForm;