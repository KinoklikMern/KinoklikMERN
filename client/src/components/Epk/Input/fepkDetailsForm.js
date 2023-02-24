import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faPlus, faTrashCan, faUserPlus, faUserCheck} from "@fortawesome/free-solid-svg-icons";

function FepkDetailsForm () {
  const [file, setFile] = useState("");
  const [fileCrew, setFileCrew] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [fepk, setFepk] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const inputFileCrewRef = useRef(null);
  const [allCrewList, setAllCrewList] = useState([]);
  const [crewList, setCrewList] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [newCrewName, setNewCrewName] = useState("");

  let { fepkId } = useParams();

  let newCrew = {  
    name: "",
    biography: "",
    image: "",
    facebook_url: "",
    facebook_followers: "",
    instagram_url: "",
    instagram_followers: "",
    twitter_url: "",
    twitter_followers: "",
    film_maker: fepk.film_maker
  };

  const fileSelected = (event) => {
    let formData = new FormData();
    console.log(event.target.files[0]);
    formData.append("file", event.target.files[0]);
    console.log(formData);
    if (checkFileMimeType(event.target.files[0])) {
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
        setDisabled(false);
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  const fileCrewSelected = (event) => {
    let formData = new FormData();
    console.log(event.target.files[0]);
    formData.append("file", event.target.files[0]);
    console.log(formData);
    if (checkFileMimeType(event.target.files[0])) {
      if(event.target.files[0]){
        http
        .post("fepks/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            setCrewData({ ...crewData, image: response.data.key});
            console.log(crewData);
          }
        })
        .catch((err) => {
          console.log();
          console.log(err);
        });
      }
    }
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

  const [crewData, setCrewData] = useState({
    crewId: {
              _id: "",
              name:""
    },
    epkRole: "",
    biography: "",
    image: "",
    facebook_url: "",
    facebook_followers: "",
    instagram_url: "",
    instagram_followers: "",
    twitter_url: "",
    twitter_followers: ""
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
        crewData.crewId.name !== "" &&
        crewData.epkRole !== "" && 
        crewData.biography !== "" &&
        crewData.image !== "" &&
        crewData.facebook_url !== "" &&
        crewData.facebook_followers !== "" &&
        crewData.instagram_url !== "" &&
        crewData.instagram_followers !== "" &&
        crewData.twitter_url !== "" &&
        crewData.twitter_followers !== ""
    )
    {
      crewList.push(crewData);
      setEpkFilmDetailsData({ ...epkFilmDetailsData, crew: crewList });
      setDisabledAdd(true);
      setDisabled(false);
      epkFilmDetailsData.crew = crewList;
      http
          .put(`fepks/update/${fepkId}`, epkFilmDetailsData)
          .then((res) => {
              console.log("saved");
          })
            .catch((err) => {
              console.log(err);
            });
      window.location.reload();
    }
  }

  const createNewCrew = () => {
      http.get(`/crews/byName/${newCrewName}`).then((response) =>{
        if(response.data){
          setStatus(false);
        }
        else{
          newCrew.name = newCrewName;
          http.post("/crews/", newCrew).then((response) =>{
            if(response.data.name === newCrewName){
              setStatus(true);
              http.get("/crews/").then((res) =>{
                setAllCrewList(res.data);
              });
              setCrewData({ ...crewData,
                crewId: {
                  _id: response.data._id,
                  name: response.data.name
                },
                biography: "",
                image: "",
                facebook_url: "",
                facebook_followers: "",
                instagram_url: "",
                instagram_followers: "",
                twitter_url: "",
                twitter_followers: ""
              });
              console.log(crewData);
            }
            else{
              setStatus(false);
            }    
          });
        }
      });
  }

  const handleSearch = (event) => {
    setStatus(false);
    setNewCrewName(event.target.value);
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

  const addToCrewData = (crew) => {
    setCrewData({ ...crewData,
      crewId: {
        _id: crew._id,
        name: crew.name
      },
      biography: crew.biography,
      image: crew.image,
      facebook_url: crew.facebook_url,
      facebook_followers: crew.facebook_followers,
      instagram_url: crew.instagram_url,
      instagram_followers: crew.instagram_followers,
      twitter_url: crew.twitter_url,
      twitter_followers: crew.twitter_followers
    });
    setFilteredData([]);
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setEpkFilmDetailsData({ ...epkFilmDetailsData, [name]: value });
    setDisabled(false);
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

  function saveEpkDetails(){
    http
        .put(`fepks/update/${fepkId}`, epkFilmDetailsData)
        .then((res) => {
              console.log("saved");
        })
          .catch((err) => {
            console.log(err);
          });
        
    setDisabled(true);
    window.location.reload();
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
            <BasicMenu />   
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
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Film Details</h5>
            <form>
              <div className="row">
                <div className="col-3 mt-4">
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
                    <div className="row">
                      <div className="col-6 mt-3">
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
                      </div>
                      <div className="col-6 mt-3">
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
                    </div>
                        <label for="filePoster" class="form-label text-dark" style={{fontSize:"25px"}}>
                         {" "}
                          <h6 style={{fontSize:"20px"}}>Upload Poster</h6>
                        </label>
                        <input
                          style={{fontSize:"15px"}}
                          className="form-control form-control-sm"
                          filename={file}
                          onChange={fileSelected}
                          ref={inputFileRef}
                          type="file"
                          id="fileDetails"
                          name="files"
                          accept="image/*"
                        ></input>
                        <img src={`${process.env.REACT_APP_AWS_URL}/${fepk.image_details}`} style={{height:"40px", width:"auto", marginTop: "5px"}} alt="no image"/>
                        <br/>
                        <hr/>
                        <label for="filePoster" class="form-label text-dark" style={{fontSize:"25px"}}>
                         {" "}
                          <h6 style={{fontSize:"20px"}}>Upload Crew Image</h6>
                        </label>
                        <input
                          style={{fontSize:"15px"}}
                          className="form-control form-control-sm"
                          filename={fileCrew}
                          onChange={fileCrewSelected}
                          ref={inputFileCrewRef}
                          type="file"
                          id="fileDetails"
                          name="files"
                          accept="image/*"
                        ></input>
                        {crewData.image === "" ?
                        (
                            <FontAwesomeIcon icon={faUser} style={{height: "30px", marginRight: "10px"}}/>
                        ) :
                        (
                          <img src={`${process.env.REACT_APP_AWS_URL}/${crewData.image}`} style={{height:"40px", width:"auto", marginTop: "5px"}}/>
                        )
                        } 
                        
                </div>
                <div className="col-3 mt-3">
                    <div className="row">
                      <div className="col-9 mt-2">
                        <input
                            style={{ 
                            height: "30px", 
                            width: "100%", 
                            borderRadius: "5px", 
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'left',
                            fontSize: "14px"
                            }}
                            className="form-control"
                            defaultValue={""}
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                        {filteredData.length !== 0 ? 
                        (
                          <div style={{
                            height: "100px", 
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: "5px",
                            marginBottom: "5px",
                            overflow:"auto"
                            }}
                          >
                            {filteredData.map((crewObj) => {
                              return ( 
                                  <p style={{fontSize:"10px", padding: "5px", margin:"0px"}} onClick={() => addToCrewData(crewObj)}>
                                    {crewObj.image === "" ?
                                    (
                                      <FontAwesomeIcon icon={faUser} style={{height: "27px", marginRight: "10px"}}/>
                                    ) :
                                    (
                                      <img src={`${process.env.REACT_APP_AWS_URL}/${crewObj.image}`} style={{width:"20px", height:"auto", marginRight: "10px"}}/>
                                    )
                                    }
                                    {crewObj.name}
                                  </p>
                              );
                            })}
                          </div>   
                        ) :
                        (
                          <div style={{
                            height: "100px", 
                            width: "100%",
                            marginBottom: "5px"
                            }}
                          >
                          </div>   
                        )}
                      </div>
                      <div className="col-3" style={{textAlign:"left"}}>
                          {status===false ? 
                          (
                            <FontAwesomeIcon icon={faUserPlus} style={{height: "20px", paddingBottom:"8px"}} onClick={() => createNewCrew()}/>
                          ) :
                          (
                            <FontAwesomeIcon icon={faUserCheck} style={{height: "20px", paddingBottom:"8px", color:"green"}}/>
                          )}
                      </div>
                    </div>
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
                        defaultValue={crewData.crewId.name}
                        placeholder="Crew Name"
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
                        height: "60px", 
                        width: "100%", 
                        borderRadius: "5px", 
                        marginBottom: "5px",
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left'
                        }}
                        className="form-control mt-10"
                        defaultValue={crewData.biography}
                        placeholder="Biography"
                        onChange={handleCrewChange}
                        name="biography"
                    />
                    <div className="row">
                      <div className="col-7">
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
                          defaultValue={crewData.facebook_url}
                          placeholder="Facebook"
                          onChange={handleCrewChange}
                          name="facebook_url"
                        />
                      </div>
                      <div className="col-5">
                        <input
                          style={{ 
                          height: "30px", 
                          width: "100%", 
                          borderRadius: "5px", 
                          marginBottom: "5px",
                          boxShadow: '1px 2px 9px #311465',
                          textAlign: 'left',
                          fontSize: "9px"
                          }}
                          type="number" min="0"
                          className="form-control m-10"
                          defaultValue={crewData.facebook_followers}
                          placeholder=""
                          onChange={handleCrewChange}
                          name="facebook_followers"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-7">
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
                          defaultValue={crewData.instagram_url}
                          placeholder="Instagram"
                          onChange={handleCrewChange}
                          name="instagram_url"
                        />
                      </div>
                      <div className="col-5">
                        <input
                            style={{ 
                            height: "30px", 
                            width: "100%", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'left',
                            fontSize: "9px"
                            }}
                            type="number" min="0"
                            className="form-control m-10"
                            defaultValue={crewData.instagram_followers}
                            placeholder=""
                            onChange={handleCrewChange}
                            name="instagram_followers"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-7">
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
                          defaultValue={crewData.twitter_url}
                          placeholder="Twitter"
                          onChange={handleCrewChange}
                          name="twitter_url"
                        />
                      </div>
                      <div className="col-5">
                        <input
                              style={{ 
                              height: "30px", 
                              width: "100%", 
                              borderRadius: "5px", 
                              marginBottom: "5px",
                              boxShadow: '1px 2px 9px #311465',
                              textAlign: 'left',
                              fontSize: "9px"
                              }}
                              type="number" min="0"
                              className="form-control m-10"
                              defaultValue={crewData.twitter_followers}
                              placeholder=""
                              onChange={handleCrewChange}
                              name="twitter_followers"
                          />
                      </div>
                    </div>
                      {disabledAdd===true ? 
                      (
                      <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold", width: "100%"}} type="outline-primary" block onClick={addCrewToTable} value="save">
                          Add to Table
                      </Button>
                      ) :
                      (
                      <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold", width: "100%"}} type="outline-primary" block onClick={addCrewToTable} value="save">
                          Add to Table
                      </Button>
                      )}
                </div>
                <div className="col-5 mt-2" style={{overflow: "auto", height:"440px", scrollbarWidth:"none"}}>
                  <table className="table table-striped table-bordered"  style={{fontSize:"9px"}}>
                    <thead className="thead-dark">
                      <tr>
                          <th>NAME</th>
                          <th>EPK ROLE</th>
                          <th>IMAGE</th>
                          <th>FACE</th>
                          <th>INSTA</th>
                          <th>TWIT</th>
                          <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {crewList.map((crew) => {
                        return (
                          <tr>
                            <td>{crew.crewId.name}</td>
                            <td>{crew.epkRole}</td>
                            <td>
                                <img src={`${process.env.REACT_APP_AWS_URL}/${crew.image}`} style={{height:"15px", width:"auto"}}/>
                            </td>
                            <td><a href={crew.facebook_url} target="_blank">{crew.facebook_followers}</a></td>
                            <td><a href={crew.instagram_url} target="_blank">{crew.instagram_followers}</a></td>
                            <td><a href={crew.twitter_url} target="_blank">{crew.twitter_followers}</a></td>
                            <td style={{textAlign: "center"}} onClick={() => deleteFromCrewList(crew)}><FontAwesomeIcon icon={faTrashCan} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
