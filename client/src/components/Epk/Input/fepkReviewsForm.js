import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faPlus, faTrashCan, faUserPlus} from "@fortawesome/free-solid-svg-icons";

function ReviewsForm () {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [fepk, setFepk] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [disabledAdd, setDisabledAdd] = useState(true);
  const inputFileRef = useRef(null);
  const [reviewsList, setReviewsList] = useState([]); 
  const [review, setReview] = useState({text: "", magazine: ""});
  const [epkReviewsData, setEpkReviewsData] = useState({
    reviews: fepk.reviews
  });

  let { fepkId } = useParams();
  
  const fileSelected = (event) => {
    setFile(event.target.files[0]);
    //setDisabled(false);
  };

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        setReviewsList(response.data.reviews);
        console.log(response.data.title);
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

  function addReviewToTable(){
    if(review.magazine !== "" && review.text !== "")
    {
        reviewsList.push(review);
        setEpkReviewsData({ ...epkReviewsData, reviews: reviewsList });
        setDisabledAdd(true);
        setDisabled(false);
    }
  }
  const handleReviewsChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
    setDisabledAdd(false);
  };

  function addAwardLogo(){
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
            review.award_logo = key;
            addReviewToTable();
         }
        })
        .catch((err) => {
          console.log();
          console.log(err);
        }); 
      }else{
            addReviewToTable();
      }
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  }

  function deleteFromReviewsList(deletedReview){
    const newReviewsList = reviewsList.filter((reviewObject) => reviewObject !== deletedReview);
    setReviewsList(newReviewsList);
    setEpkReviewsData({ ...epkReviewsData, reviews: newReviewsList });
    setDisabled(false);
  }

  function saveEpkReviews(){
    http
        .put(`fepks/update/${fepkId}`, epkReviewsData)
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
              <img
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
            <h5 className="card-title " style={{color: "#ffffff", fontWeight: 'normal' }}>Film Reviews & Awards</h5>
            <form>
                <div className="row">
                    <div className="col my-5">
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
                            placeholder="Magazine/Blog/Journalist Name"
                            onChange={handleReviewsChange}
                            name="magazine"
                        />
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
                            placeholder="Review text"
                            onChange={handleReviewsChange}
                            name="text"
                        />
                        <label for="fileAwardLogo" class="form-label text-dark" style={{fontSize:"25px"}}>
                            {" "}
                            <h4 style={{fontSize:"20px"}}>Upload Film Festival Awards Logo</h4>
                        </label>
                        <input
                            style={{fontSize:"15px"}}
                            className="form-control form-control-sm"
                            filename={file}
                            onChange={fileSelected}
                            ref={inputFileRef}
                            type="file"
                            id="fileAwardLogo"
                            name="files"
                            accept="image/*"
                        />
                        {disabledAdd===true ? 
                        (
                        <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold", width: "235px", padding:"0 110px 0 0"}} type="outline-primary" block onClick={addAwardLogo} value="save">
                            Add to Table
                        </Button>
                        ) :
                        (
                        <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold", width: "235px", padding:"0 110px 0 0"}} type="outline-primary" block onClick={addAwardLogo} value="save">
                            Add to Table
                        </Button>
                        )}
                    </div>
                    <div className="col my-5">
                        <table className="table table-striped table-bordered" style={{fontSize:"12px", textAlign:"center"}}>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Magazine</th>
                                    <th>Text</th>
                                    <th>Award Logo</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                            {reviewsList.map((review) => {
                                return (
                                <tr>
                                    <td>{review.magazine}</td>
                                    <td>{review.text}</td>
                                    <td>
                                        <img src={`${process.env.REACT_APP_AWS_URL}/${review.award_logo}`} style={{height:"60px", width:"auto"}}/>
                                    </td>
                                    <td style={{textAlign: "center"}} onClick={() => deleteFromReviewsList(review)}><FontAwesomeIcon icon={faTrashCan} /></td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1"
                            style={{
                            height: "50px",
                            width: "120px",
                            marginLeft: "100%",
                            marginTop: "20px"
                            }}
                        >
                        {disabled===true ? 
                        (
                        <Button disabled style={{boxShadow: '1px 2px 9px #311465', filter: 'blur(1px)', color: "grey", backgroundColor: "#ffffff", fontWeight: "bold", padding:"0 40px 0 0"}} type="outline-primary" block onClick={saveEpkReviews} value="save">
                            Save
                        </Button>
                        ) :
                        (
                        <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold", padding:"0 40px 0 0"}} type="outline-primary" block onClick={saveEpkReviews} value="save">
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
export default ReviewsForm;