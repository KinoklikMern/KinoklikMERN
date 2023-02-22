import React, { useState, useEffect } from "react";
import { Button, Col, Row} from "antd";
import { Link, useParams } from "react-router-dom";
import http from "../../../http-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RequestApproval () {
  const [fepk, setFepk] = useState([]);
  const [mediumSynopsis, setMediumSynopsis] = useState([]);
  const [longSynopsis, setLongSynopsis] = useState([]);
  const [uniqueness, setUniqueness] = useState([]);
  const [stillsApproval, setStillsApproval] = useState([]);

  let { fepkId } = useParams();

  const [approvalData, setApprovalData] = useState({
    mediumSynopsis: fepk.mediumSynopsis,
    longSynopsis: fepk.longSynopsis,
    uniqueness: fepk.uniqueness,
    stillsApproval: fepk.stillsApproval
  });
  
  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        setMediumSynopsis(response.data.mediumSynopsis);
        setLongSynopsis(response.data.longSynopsis);
        setUniqueness(response.data.uniqueness);
        setStillsApproval(response.data.stillsApproval);
    });
  }, []);

  // medium synopsis approval requests
  function mediumSynopsisApproval(userId, status){
    mediumSynopsis.map((medium) => {
        if(medium.user._id === userId){
            medium.status = status;
        }
    });
    setApprovalData({ ...approvalData, mediumSynopsis: mediumSynopsis });
    http.put(`fepks/update/${fepkId}`, {mediumSynopsis: mediumSynopsis}).then((res) => {
        console.log("saved");
    }).catch((err) => {
        console.log(err);
    });
  }

  // long synopsis approval requests
  function longSynopsisApproval(userId, status){
    longSynopsis.map((long) => {
        if(long.user._id === userId){
            long.status = status;
        }
    });
    setApprovalData({ ...approvalData, longSynopsis: longSynopsis });
    http.put(`fepks/update/${fepkId}`, {longSynopsis: longSynopsis}).then((res) => {
        console.log("saved");
    }).catch((err) => {
        console.log(err);
    });
  }

  // uniqueness approval requests
  function uniquenessApproval(userId, status){
    uniqueness.map((unique) => {
        if(unique.user._id === userId){
            unique.status = status;
        }
    });
    setApprovalData({ ...approvalData, uniqueness: uniqueness });
    http.put(`fepks/update/${fepkId}`, {uniqueness: uniqueness}).then((res) => {
        console.log("saved");
    }).catch((err) => {
        console.log(err);
    });
  }

  // stills approval requests
  async function stillApproval(userId, status){
    stillsApproval.map((still) => {
        if(still.user._id === userId){
            still.status = status;
        }
    });
    setApprovalData({ ...approvalData, stillsApproval: stillsApproval });
    http.put(`fepks/update/${fepkId}`, {stillsApproval: stillsApproval}).then((res) => {
        console.log("saved");
    }).catch((err) => {
        console.log(err);
    });
  }

  return (
    <>
        {/* Medium Synopsis requests */}
        <div>
            <h4><b>Medium Synopsis Requests:</b></h4>
            {mediumSynopsis.map((medium) => {
            return (
                medium.status === "pending" && 
                    <div style={{margin:"20px 0 5px 0px"}}>
                        <h5>User Name: <b>{medium.user.firstName} {medium.user.lastName}</b></h5>
                        <p>
                            <img src={`${medium.user.picture}`} style={{width:"40px", height:"auto"}}/>
                            Hi! I need your approval to see the medium synopsis section!
                        </p>
                        <button onClick={() => mediumSynopsisApproval(medium.user._id, "approved")}>approve</button>&nbsp; &nbsp; 
                        <button onClick={() => mediumSynopsisApproval(medium.user._id, "refused")}>refuse</button>
                    </div>
                );
            })}      
        </div>
        <hr></hr><br></br>

        {/* Long Synopsis requests */}
        <div>
            <h4><b>Long Synopsis Requests:</b></h4>
            {longSynopsis.map((long) => {
            return (
                long.status === "pending" && 
                    <div style={{margin:"20px 0 5px 0px"}}>
                        <h5>User Name: <b>{long.user.firstName} {long.user.lastName}</b></h5>
                        <p>
                            <img src={`${long.user.picture}`} style={{width:"40px", height:"auto"}}/>
                            Hi! I need your approval to see the long synopsis section!
                        </p>
                        <button onClick={() => longSynopsisApproval(long.user._id, "approved")}>approve</button>
                            &nbsp; &nbsp; 
                        <button onClick={() => longSynopsisApproval(long.user._id, "refused")}>refuse</button>
                    </div>
                );
            })}      
        </div>
        <hr></hr><br></br>

        {/* Uniqueness requests */}
        <div>
            <h4><b>Uniqueness Requests:</b></h4>
            {uniqueness.map((unique) => {
            return (
                unique.status === "pending" && 
                    <div style={{margin:"20px 0 5px 0px"}}>
                        <h5>User Name: <b>{unique.user.firstName} {unique.user.lastName}</b></h5>
                        <p>
                            <img src={`${unique.user.picture}`} style={{width:"40px", height:"auto"}}/>
                            Hi! I need your approval to see the uniqueness section!
                        </p>
                        <button onClick={() => uniquenessApproval(unique.user._id, "approved")}>approve</button>
                            &nbsp; &nbsp; 
                        <button onClick={() => uniquenessApproval(unique.user._id, "refused")}>refuse</button>
                    </div>
                );
            })}      
        </div>
        <hr></hr><br></br>

        {/* Stills requests */}
        <div>
            <h4><b>Stills Requests:</b></h4>
            {stillsApproval.map((still) => {
            return (
                still.status === "pending" && 
                    <div style={{margin:"20px 0 5px 0px"}}>
                        <h5>User Name: <b>{still.user.firstName} {still.user.lastName}</b></h5>
                        <p>
                            <img src={`${still.user.picture}`} style={{width:"40px", height:"auto"}}/>
                            Hi! I need your approval to see the stills section!
                        </p>
                        <button onClick={() => stillApproval(still.user._id, "approved")}>approve</button>
                            &nbsp; &nbsp; 
                        <button onClick={() => stillApproval(still.user._id, "refused")}>refuse</button>
                    </div>
                );
            })}      
        </div>
    </>
  );
}
export default RequestApproval;