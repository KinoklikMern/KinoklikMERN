import React, { useState } from "react";
import { Button, Col, Row } from "antd";

import "./review.css";

function Review(reviewFile) {
    console.log(reviewFile);


    return (
      <div className="App" style={{position: "relative"}}>
        {/* <div style={{backgroundColor: "#7F00FF", height: 15}}/>   */}

          <div style={{background: "#ffffff"}}>
            <Col>
            <Row className="justify-content">
              <Col md="auto">
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review1Review}
                  </h4>
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review1Magazine}
                  </h4>
                </Col>
                <Col md="auto" >
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review2Review}
                  </h4>
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review2Magazine}
                  </h4>
                  </Col>
                  <Col md="auto">
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review3Review}
                  </h4>
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review3Magazine}
                  </h4>
                  </Col>
                <Col md="auto">
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review4Review}
                  </h4>
                  <h4 className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review4Magazine}
                  </h4>
                  </Col>
              </Row>

              <Row>
              <Col md="auto">
                  <img 
                    src={reviewFile.reviewFile.review1Award}  alt="Image"
                    style={{height: "200px", borderRadius: "20px"}}
                    ></img>
          </Col>
                <Col md="auto">
                  <img 
                    src={reviewFile.reviewFile.review2Award}  alt="Image"
                    style={{height: "200px", borderRadius: "20px"}}
                    ></img>
          </Col>
                
                <Col md="auto">
                  <img 
                    src={reviewFile.reviewFile.review3Award}  alt="Image"
                    style={{height: "200px", borderRadius: "20px"}}
                    ></img>
          </Col>
       
                <Col md="">
                  <img 
                    src={reviewFile.reviewFile.review4Award4}  alt="Image"
                    style={{width: "50%", borderRadius: "20px"}}
                    ></img>
          </Col>
              </Row>
          </Col>
        </div>
      </div>
   );
  }
export default Review;
