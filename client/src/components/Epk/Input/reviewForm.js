import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const ReviewForm = () => {
  const [review1Magazine, setReview1Magazine] = useState(null);
  const [review1Review, setReview1Review] = useState(null);
  const [review1Award, setReview1Award] = useState(null);
  const [review2Magazine, setReview2Magazine] = useState(null);
  const [review2Review, setReview2Review] = useState(null);
  const [review2Award, setReview2Award] = useState(null);
  const [review3Magazine, setReview3Magazine] = useState(null);
  const [review3Review, setReview3Review] = useState(null);
  const [review3Award, setReview3Award] = useState(null);
  const [review4Magazine, setReview4Magazine] = useState(null);
  const [review4Review, setReview4Review] = useState(null);
  const [review4Award, setReview4Award] = useState(null);

    const [reviewList, setReviewList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const reviewList1 = [
            { 
                epk: epkID,
                review1Magazine: review1Magazine,
                review1Review: review1Review,
                review1Award: review1Award,
                review2Magazine: review2Magazine,
                review2Review: review2Review,
                review2Award: review2Award,
                review3Magazine: review3Magazine,
                review3Review: review3Review,
                review3Award: review3Award,
                review4Magazine: review4Magazine,
                review4Review: review4Review,
                review4Award: review4Award
            },
        ];
        console.log(reviewList1);
        createEpkReview(reviewList1);

        async function createEpkReview(reviewList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkReview`, {
                method: "POST",
                body: JSON.stringify({
                    reviewList: reviewList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const reviewList = await response.json();

            setReviewList(reviewList);
            // window.location = "/epk";
        }
    };

    // const handleName = (event) => {
    //     setName(event.target.value);
    //     console.log(name);
    // };

    // const handleBiography = (event) => {
    //     setBiography(event.target.value);
    //     console.log(biography);
    // };


    return (
        <>
        <div style={{boxShadow: '1px 2px 9px #311465', marginLeft: "10%", width: "80%", height: "unknown", background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
                backgroundColor:"white"}}>
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
          <div className="col-2 m-3">
          <Link className="col align-items-end" to="/Epk"  style={{ color: "#311465", textDecoration: 'none', fontWeight: 'normal', fontSize: '20px' }}>
                View EPK Page
              </Link>
          </div>
          <div className="col">            
          </div>
        </div>
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Reviews</h5>
            <Row
                justify="space-around" className="text-center "
            >
                <Col style={{width: "1400px", height: "300px"}}  className="m-2">
                    <div className="row">
                    <div className="col">
                    {/* <h3>Review/Magazine/Award</h3> */}
                  <textarea
                        name="biographyfilmReview"
                        style={{ 
                            height: "200px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465'}}
                        placeholder="Film Review Text Here."
                    onChange={(event) => {
                    setReview1Review(event.target.value);
                    }}
                />
                  <input
                        name="magazine"
                        style={{ 
                            height: "30px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Magazine/Blog/Journalist Name"
                    onChange={(event) => {
                    setReview1Magazine(event.target.value);
                }}
                />
            </div>
            <div className="col">
                     {/* <h3>Review/Magazine/Award</h3> */}
                     <textarea
                        name="biographyfilmReview"
                        style={{ 
                            height: "200px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465'}}
                        placeholder="Film Review Text Here."
                    onChange={(event) => {
                    setReview2Review(event.target.value);
                    }}
                />
                  <input
                        name="magazine"
                        style={{ 
                            height: "30px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Magazine/Blog/Journalist Name"
                    onChange={(event) => {
                    setReview2Magazine(event.target.value);
                }}
                />
            </div>
            <div className="col">
                    {/* <h3>Review/Magazine/Award</h3> */}
                    <textarea
                        name="biographyfilmReview"
                        style={{ 
                            height: "200px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465'}}
                        placeholder="Film Review Text Here."
                    onChange={(event) => {
                    setReview3Review(event.target.value);
                    }}
                />
                  <input
                        name="magazine"
                        style={{ 
                            height: "30px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Magazine/Blog/Journalist Name"
                    onChange={(event) => {
                    setReview3Magazine(event.target.value);
                }}
                />
            </div>
            <div className="col">
                    {/* <h3>Review/Magazine/Award</h3> */}
                    <textarea
                        name="biographyfilmReview"
                        style={{ 
                            height: "200px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465'}}
                        placeholder="Film Review Text Here."
                    onChange={(event) => {
                    setReview4Review(event.target.value);
                    }}
                />
                  <input
                        name="magazine"
                        style={{ 
                            height: "30px", 
                            width: "300px", 
                            borderRadius: "5px", 
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Magazine/Blog/Journalist Name"
                    onChange={(event) => {
                    setReview4Magazine(event.target.value);
                }}
                />
            </div>
          </div>
                    {/* <UploadFile setImage={setImage} />
                    {image && (
                        <img
                            src={image}
                            alt="dir"
                            style={{ height: "350px", width: "300px" }}
                        />
                    )} */}
                </Col>
            </Row>

            <Row
                justify="space-around" className="text-center "
            >
                <Col style={{width: "1400px", height: "300px"}}  className="m-2">
                    <div className="row">
                    <div className="col">
                    {/* <h3>Review/Magazine/Award</h3> */}
                <UploadFile setImage={setReview1Award} />
                {review1Award && (
                    <img
                        src={review1Award}
                        alt="dir"
                        style={{ width: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
                     {/* <h3>Review/Magazine/Award</h3> */}

                <UploadFile setImage={setReview2Award} />
                {review2Award && (
                    <img
                        src={review2Award}
                        alt="dir"
                        style={{ width: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
                    {/* <h3>Review/Magazine/Award</h3> */}

                <UploadFile setImage={setReview3Award} />
                {review3Award && (
                    <img
                        src={review3Award}
                        alt="dir"
                        style={{ width: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
            <div className="col">
                    {/* <h3>Review/Magazine/Award</h3> */}
                <UploadFile setImage={setReview4Award} />
                {review4Award && (
                    <img
                        src={review4Award}
                        alt="dir"
                        style={{ width: "300px", boxShadow: '1px 2px 9px #000000'}}
                    />
                )}
            </div>
          </div>
                </Col>
            </Row>

            <Row justify="space-around" className="text-center ">
        <div
          style={{
            height: "50px",
            width: "120px",
            marginLeft: "80%"
          }}
        >
          <Button style={{boxShadow: '1px 2px 9px #311465', backgroundColor: "#ffffff", fontWeight: "bold"}} type="outline-primary" block onClick={submit} value="save">
            Save
          </Button>
        </div>
      </Row>
      </div>
        </>
    );
};
export default ReviewForm;