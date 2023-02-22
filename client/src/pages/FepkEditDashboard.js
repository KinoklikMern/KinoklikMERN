import React, { useState, useEffect, useRef } from "react";
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
import User from "../components/navbar/NavbarButtons";
import { useDispatch, useSelector } from "react-redux";

function FepkEditDashboard() {
  const [fepk, setFepk] = useState([]);
  const [access, setAccess] = useState(false);

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  console.log(user);
  let filmmaker_id;
  if(!user){
    filmmaker_id = "0";
  }
  else{
    filmmaker_id = user.id;
  }

  let { fepkId } = useParams();

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) =>{
      setAccess(response.data.film_maker._id === filmmaker_id);
      setFepk(response.data);
    });
  }, []);

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
