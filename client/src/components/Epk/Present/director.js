import React, { useState } from "react";
import { Button, Col, Row } from "antd";

import "./director.css";

function Director(directorFile) {
    console.log(directorFile);

    return (


        <>

            {/* <div className="container">
                <img
                    src={directorFile.directorFile.image}
                    alt="hey"
                    style={{ height: "50%" }}
                />
                <div className="centered">
                    <h3>{directorFile.directorFile.text}</h3>
                </div>
            </div> */}


            {" "}
            <br />
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col span={6} className="m-2 bg-light">
                    <h4>Director</h4>
                    <h3>{directorFile.directorFile.text}</h3>

                    <img
                        src={directorFile.directorFile.image}
                        alt="hey"
                        style={{ height: "50%" }}
                    />
                </Col>
            </Row>

        </>


    );
}
export default Director;
