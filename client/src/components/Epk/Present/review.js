import React, { useState } from "react";
import { Button, Col, Row } from "antd";

import style from"./review.module.css";

function Review(reviewFile) {
    console.log(reviewFile);


    return (
      <div className={style.container}>
    
          <div className={style.reviewcontainer}>
          <div >
            <p className={style.el1}>
                {reviewFile.reviewFile.review1Review}
            </p>
            </div>
            {/* <div className={style.el1}>
                  <p>
                    {reviewFile.reviewFile.review1Magazine}
                  </p>
            </div>
              <div className={style.el1}>
                  <p className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review2Review}
                  </p>
                  </div>
                  <div>
                  <p className= "text-center" style={{color:'#000000', fontWeight: 'normal'}}>
                    {reviewFile.reviewFile.review2Magazine}
                  </p>
                  </div> */}
                  {/* <Col md="auto">
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
             */}

              {/* <Row>
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
          </Col> */}
        </div>
      </div>
   );
  }
export default Review;
