/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../http-common";
import FepkEditCoverForm from "../components/Epk/Input/fepkEditCoverForm";
import LoglineForm from "../components/Epk/Input/loglineFepkForm";
import SynopsisForm from "../components/Epk/Input/fepkSynopsisForm";
import UniquenessForm from "../components/Epk/Input/fepkUniquenessForm";
import StillsForm from "../components/Epk/Input/fepkStills";
import TrailerForm from "../components/Epk/Input/fepkTrailerForm";
import ReviewsForm from "../components/Epk/Input/fepkReviewsForm";
import ResourcesForm from "../components/Epk/Input/fepkResourcesForm";
import FepkDetailsForm from "../components/Epk/Input/fepkDetailsForm";
import FepkDashboardNoAccess from "../components/Epk/Input/fepkDashboardNoAccess";
import { useSelector } from "react-redux";
import LoadingSpin from "../components/FilmMakerDashboard/LoadingSpin";
import { FepkContext } from "../context/FepkContext";

function FepkEditDashboard() {
  const [fepk, setFepk] = useState([]);
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fepkMaker, setFepkMaker] = React.useContext(FepkContext);

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  let filmmaker_id;
  if (!user) {
    filmmaker_id = "0";
  } else {
    filmmaker_id = user.id;
  }

  let { fepkId } = useParams();

  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setAccess(response.data.film_maker._id === filmmaker_id);
      setFepk(response.data);
      setFepkMaker("");
      setLoading(false);
    });
  }, [fepkId, filmmaker_id, setFepkMaker]);

  return loading ? (
    <div className="tw-h-screen">
      <LoadingSpin />
    </div>
  ) : (
    <>
      {access === true ? (
        <div>
          <br />
          <FepkEditCoverForm />
          <br />
          <FepkDetailsForm />
          <br />
          <LoglineForm />
          <br />
          <SynopsisForm />
          <br />
          <UniquenessForm />
          <br />
          <StillsForm />
          <br />
          <ResourcesForm />
          <br />
          <TrailerForm />
          <br />
          <ReviewsForm />
          <br />
        </div>
      ) : (
        <div>
          <FepkDashboardNoAccess />
        </div>
      )}
    </>
  );
}
export default FepkEditDashboard;
