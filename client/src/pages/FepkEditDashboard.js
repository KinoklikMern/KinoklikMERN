/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../http-common";
import SectionButton from "../components/Epk/Buttons/SectionButton";
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
  const [sectionChosen, setSectionChosen] = useState("cover");

  const handleSectionClick = (section) => {
    setSectionChosen(section);
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1% 10%",
              marginBottom: "0"
            }}
          >
            <SectionButton
              text="1. Cover"
              onClick={() => handleSectionClick("cover")}
              sectionChosen={sectionChosen}
              value="cover"
            />
            <SectionButton
              text="2. Log Line"
              onClick={() => handleSectionClick("logLine")}
              sectionChosen={sectionChosen}
              value="logLine"
            />
            <SectionButton
              text="3. Synopsis"
              onClick={() => handleSectionClick("synopsis")}
              sectionChosen={sectionChosen}
              value="synopsis"
            />
            <SectionButton
              text="4. Cast & Crew"
              onClick={() => handleSectionClick("details")}
              sectionChosen={sectionChosen}
              value="details"
            />
            <SectionButton
              text="5. Uniqueness"
              onClick={() => handleSectionClick("uniqueness")}
              sectionChosen={sectionChosen}
              value="uniqueness"
            />
            <SectionButton
              text="6. Film Stills"
              onClick={() => handleSectionClick("stills")}
              sectionChosen={sectionChosen}
              value="stills"
            />
            <SectionButton
              text="7. Film Trailer"
              onClick={() => handleSectionClick("trailer")}
              sectionChosen={sectionChosen}
              value="trailer"
            />
            <SectionButton
              text="8. Film Buzz"
              onClick={() => handleSectionClick("reviews")}
              sectionChosen={sectionChosen}
              value="reviews"
            />
            <SectionButton
              text="9. Resources"
              onClick={() => handleSectionClick("resources")}
              sectionChosen={sectionChosen}
              value="resources"
            />
            <SectionButton
              text="10.Treatment"
              onClick={() => handleSectionClick("treatment")}
              sectionChosen={sectionChosen}
              value="treatment"
              disabled={true}
            />
          </div>
          <div
            style={{
              margin: "0 5px",
            }}
          >
            <br />
            {sectionChosen === "cover" && <FepkEditCoverForm />}
            {sectionChosen === "details" && <FepkDetailsForm />}
            {sectionChosen === "logLine" && <LoglineForm />}
            {sectionChosen === "synopsis" && <SynopsisForm />}
            {sectionChosen === "uniqueness" && <UniquenessForm />}
            {sectionChosen === "stills" && <StillsForm />}
            {sectionChosen === "resources" && <ResourcesForm />}
            {sectionChosen === "trailer" && <TrailerForm />}
            {sectionChosen === "reviews" && <ReviewsForm />}
            {/* add a "Treatment" component here */}
          </div>
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
