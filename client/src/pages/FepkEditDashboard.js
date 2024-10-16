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
import SalesCalculatorForm from "../components/Epk/Input/fepkSalesCalculatorForm";
import FepkDetailsForm from "../components/Epk/Input/fepkDetailsForm";
import FepkDashboardNoAccess from "../components/Epk/Input/fepkDashboardNoAccess";
import { useSelector } from "react-redux";
import LoadingSpin from "../components/FilmMakerDashboard/LoadingSpin";
import { FepkContext } from "../context/FepkContext";
import EPKSideMenu from "../components/Epk/EpkSideMenu";
import { useTranslation } from "react-i18next";
import { getFepksById } from "../api/epks";
import Modal from "react-modal";

function FepkEditDashboard() {
  const { t } = useTranslation();
  const [fepk, setFepk] = useState([]);
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fepkMaker, setFepkMaker] = React.useContext(FepkContext);
  const [sectionChosen, setSectionChosen] = useState("cover");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSectionClick = (section) => {
    setSectionChosen(section);
  };

  // fetching user
  const user = useSelector((state) => state.user);
  let filmmaker_id;
  if (!user) {
    filmmaker_id = "0";
  } else {
    filmmaker_id = user.id;
  }

  //let { title } = useParams();
  let { id } = useParams();

  // useEffect(() => {
  //   http.get(`/fepks/byTitle/${title}`).then((response) => {
  //     setAccess(response.data.film_maker._id === filmmaker_id);
  //     setFepk(response.data);
  //     setFepkMaker("");
  //     setLoading(false);
  //   });
  // }, [title, filmmaker_id, setFepkMaker]);

  useEffect(() => {
    console.log(id);

    // Check if the modal should be shown
    const showModal = localStorage.getItem("showModal");
    if (showModal === "true") {
      setModalIsOpen(true);
      // Clear the flag after displaying the modal
      localStorage.removeItem("showModal");
    }

    getFepksById(id).then((response) => {
      console.log(response);
      setAccess(response.film_maker._id === filmmaker_id);
      setFepk(response);
      setFepkMaker("");
      setLoading(false);
    });
  }, [id, filmmaker_id, setFepkMaker]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return loading ? (
    <div className="tw-h-screen">
      <LoadingSpin />
    </div>
  ) : (
    <div className="tw-flex tw-min-h-screen">
      <EPKSideMenu epk={fepk} filmmakerId={user.id} />
      <div className="tw-flex-grow">
        {access === true ? (
          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              appElement={document.getElementById("root")}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  position: "absolute",
                  border: "2px solid #000",
                  backgroundColor: "white",
                  boxShadow: "2px solid black",
                  height: 180,
                  width: 380,
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "green" }}>
                  {" "}
                  <div>{t("EPK was created successfully!")}</div>
                  <div>
                    {t(
                      "the EPK Dashboard is now open and you can create your film EPK."
                    )}
                  </div>
                </div>
                <br />
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={closeModal}
                  style={{ backgroundColor: "#712CB0", color: "white" }}
                >
                  {t("Ok")}
                </button>
              </div>
            </Modal>
            <div className="tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-justify-center md:tw-gap-7">
              <SectionButton
                text={t("1. Cover")}
                onClick={() => handleSectionClick("cover")}
                sectionChosen={sectionChosen}
                value="cover"
              />
              <SectionButton
                text={t("2. Log Line")}
                onClick={() => handleSectionClick("logLine")}
                sectionChosen={sectionChosen}
                value="logLine"
              />
              <SectionButton
                text={t("3. Synopsis")}
                onClick={() => handleSectionClick("synopsis")}
                sectionChosen={sectionChosen}
                value="synopsis"
              />
              <SectionButton
                text={t("4. Cast & Crew")}
                onClick={() => handleSectionClick("details")}
                sectionChosen={sectionChosen}
                value="details"
              />
              <SectionButton
                text={t("5. Uniqueness")}
                onClick={() => handleSectionClick("uniqueness")}
                sectionChosen={sectionChosen}
                value="uniqueness"
              />
              <SectionButton
                text={t("6. Film Stills")}
                onClick={() => handleSectionClick("stills")}
                sectionChosen={sectionChosen}
                value="stills"
              />
              <SectionButton
                text={t("7. Film Trailer")}
                onClick={() => handleSectionClick("trailer")}
                sectionChosen={sectionChosen}
                value="trailer"
              />
              <SectionButton
                text={t("8. Film Buzz")}
                onClick={() => handleSectionClick("reviews")}
                sectionChosen={sectionChosen}
                value="reviews"
              />
              <SectionButton
                text={t("9. Resources")}
                onClick={() => handleSectionClick("resources")}
                sectionChosen={sectionChosen}
                value="resources"
              />
              <SectionButton
                text={t("10.Treatment")}
                onClick={() => handleSectionClick("treatment")}
                sectionChosen={sectionChosen}
                value="treatment"
                disabled={true}
              />
              <SectionButton
                text={t("11.Sales Calculator")}
                onClick={() => handleSectionClick("sales_calculator")}
                sectionChosen={sectionChosen}
                value="sales_calculator"
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
              {sectionChosen === "sales_calculator" && <SalesCalculatorForm />}
              {/* add a "Treatment" component here */}
            </div>
          </div>
        ) : (
          <div>
            <FepkDashboardNoAccess />
          </div>
        )}
      </div>
    </div>
  );
}
export default FepkEditDashboard;
