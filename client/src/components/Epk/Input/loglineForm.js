import React, { useState, useEffect } from "react";
import UploadFile from "../../FileUpload";
import { Button, Col, Row} from "antd";
import { Link } from "react-router-dom";

const LoglineForm = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState(null);
    const [loglineList, setLoglineList] = useState(null);
    const epkID = 5;
    const submit = () => {

        const loglineList1 = [
            { epk: epkID, image: image, message: message },
        ];
        console.log(loglineList1);
        createEpkLogline(loglineList1);

        async function createEpkLogline(loglineList1) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/epk/EpkLogline`, {
                method: "POST",
                body: JSON.stringify({
                    loglineList: loglineList1,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const loglineList = await response.json();

            setLoglineList(loglineList);
            window.location = "/epk";
        }
    };

    const handleMessage = (event) => {
        setMessage(event.target.value);
        console.log(message);
    };

    return (
        <>
        <div style={{boxShadow: '1px 2px 9px #311465', marginLeft: "10%", width: "80%", background: "linear-gradient(rgba(128,128,128,0.65),transparent)",
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
        <h5 className="card-title " style={{marginLeft: '10%', color: "#ffffff", fontWeight: 'normal' }}>Logline</h5>
            <Row
                justify="space-around"
                className="text-center "
            >
                <Col style={{width: "1000px"}} className="m-2 ">
                <div className="row" style={{height: "500px"}}>
                    <div>
                    <div className="col">
                        {/* <h4>Logline</h4> */}
                    <input
                        name="name"
                        style={{
                            height: "30px", 
                            width: "800px", 
                            borderRadius: "5px",
                            marginLeft: "40px",
                            marginBottom: "5px",
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'center'
                        }}
                        placeholder="Logline..."
                        onChange={handleMessage}
                    />                    
                    </div>
                    <div>
                    <UploadFile setImage={setImage} />
                    </div>
                    </div>
                    <div className="col">
                    {image && (
                        <img
                            src={image}
                            alt="dir"
                            style={{ height: "400px", boxShadow: '1px 2px 9px #000000'}}
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
export default LoglineForm;