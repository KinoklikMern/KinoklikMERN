import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import http from "../http-common";
import { Button, Col, Row } from "antd";
import FepkEditCoverForm from "../components/Epk/Input/fepkEditCoverForm";
import LoglineForm from "../components/Epk/Input/loglineFepkForm";
import DetailsForm from "../components/Epk/Input/detailsFepkForm";
import SynopsisForm from "../components/Epk/Input/fepkSynopsisForm";
import UniquenessForm from "../components/Epk/Input/fepkUniquenessForm";
import StillsForm from "../components/Epk/Input/fepkStills";
import TrailerForm from "../components/Epk/Input/fepkTrailerForm"; 
import ReviewsForm from "../components/Epk/Input/fepkReviewsForm";
import ResourcesForm from "../components/Epk/Input/fepkResourcesForm";
import FepkDetailsForm from "../components/Epk/Input/fepkDetailsForm";
import FepkDashboardNoAccess from "../components/Epk/Input/fepkDashboardNoAccess";

function FepkEditDashboard() {
  const [fepk, setFepk] = useState([]);
  const [access, setAccess] = useState(false);
  const filmmaker_id = "63c0e3bb40253f49b94edd11";
  let { fepkId } = useParams();
  //const [email, setEmail] = useState();

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
      setAccess(response.data.film_maker._id === filmmaker_id);
      setFepk(response.data);
    });
  }, []);
/*
  useEffect(() => {
    http.get("/users/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          name: response.data.name,
          role: response.data.role,
          status: true,
        });
      }
    });
  }, []);
  */
    return (
    <>
    {access === true ?
    (
      <div>
      <br/>
      <FepkEditCoverForm />
      <br/>
      <FepkDetailsForm />
      <br/>
      <LoglineForm />
      <br/>
      <SynopsisForm />
      <br/>
      <UniquenessForm />
      <br/>
      <StillsForm />
      <br/>
      <ResourcesForm />
      <br/>
      <TrailerForm />
      <br/>
      <ReviewsForm />
      <br/>
    </div>
    ):
    (
      <div>
        <FepkDashboardNoAccess />
      </div> 
    )
    }
    </>
  );
}
export default FepkEditDashboard;
