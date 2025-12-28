/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
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
import EPKSideMenu from "../components/Epk/EpkSideMenu";
import LoadingSpin from "../components/FilmMakerDashboard/LoadingSpin";
import { FepkContext } from "../context/FepkContext";
import { getFepksById } from "../api/epks";

function FepkEditDashboard() {
    const { t } = useTranslation();
    const [fepk, setFepk] = useState([]);
    const [access, setAccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [setFepkMaker] = React.useContext(FepkContext);
    const [sectionChosen, setSectionChosen] = useState("cover");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const carouselRef = useRef(null);
    const sectionRefs = useRef({});

    const user = useSelector((state) => state.user);
    const { id } = useParams();

    useEffect(() => {
        const showModal = localStorage.getItem("showModal");
        if (showModal === "true") {
            setModalIsOpen(true);
            localStorage.removeItem("showModal");
        }

        getFepksById(id).then((response) => {
            setAccess(response.film_maker._id === user.id);
            setFepk(response);
            // setFepkMaker("");
            setLoading(false);
        });
    }, [id, user.id, setFepkMaker]);

    const closeModal = () => setModalIsOpen(false);

    const handleSectionClick = (section) => {
        if (section === "backToStart") {
            setSectionChosen("cover");
            sectionRefs.current["cover"]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        } else {
            setSectionChosen(section);
            if (window.innerWidth <= 768) {
                sectionRefs.current[section]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            } else {
                sectionRefs.current[section]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    };


    const sections = [
        { name: "cover", label: t("1. Cover") },
        { name: "logLine", label: t("2. Log Line") },
        { name: "synopsis", label: t("3. Synopsis") },
        { name: "details", label: t("4. Cast & Crew") },
        { name: "uniqueness", label: t("5. Uniqueness") },
        { name: "stills", label: t("6. Photo Albums") },
        { name: "trailer", label: t("7. Film Trailer") },
        { name: "reviews", label: t("8. Film Buzz") },
        { name: "resources", label: t("9. Resources") },
        { name: "treatment", label: t("10. Treatment") },
        { name: "sales_calculator", label: t("11. Sales Calculator") },
        { name: "backToStart", label: "<<" } // New arrow item to go back to "Cover"
    ];


    return loading ? (
        <div className="tw-h-screen">
            <LoadingSpin />
        </div>
    ) : (
        <div className="tw-flex tw-min-h-screen">
            <EPKSideMenu epk={fepk} filmmakerId={user.id} />
            <div className="tw-flex-grow tw-ml-2">
                {access ? (
                    <div>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            appElement={document.getElementById("root")}
                            style={{
                                overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                                content: {
                                    border: "2px solid #000",
                                    backgroundColor: "white",
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
                                <div>{t("EPK was created successfully!")}</div>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={closeModal}
                                    style={{ backgroundColor: "#712CB0", color: "white" }}
                                >
                                    {t("Ok")}
                                </button>
                            </div>
                        </Modal>


                        <div className="tw-w-full"
                            style={{
                                height: '1px',
                                background: 'linear-gradient(to right, #ff00a0, #1e0039)',
                            }}
                        />


                        <div
                            ref={carouselRef}
                            className="tw-overflow-x-auto tw-flex tw-space-x-4 tw-scrollbar-none"
                            style={{
                                maxWidth: "95vw",
                                overflowX: "scroll",
                                whiteSpace: "nowrap",
                                paddingLeft: window.innerWidth <= 768 ? "20vw" : "0",
                                paddingRight: window.innerWidth <= 768 ? "20vw" : "0",
                                justifyContent: window.innerWidth > 768 ? "space-between" : "flex-start",
                            }}
                        >
                            {sections.map(({ name, label }) => (
                                <div
                                    key={name}
                                    ref={(el) => (sectionRefs.current[name] = el)}
                                    onClick={() => handleSectionClick(name)}
                                    className={`tw-inline-block tw-cursor-pointer tw-transition-transform text-transparent bg-clip-text bg-gradient-to-r from-[#ff00a0] to-[#1e0039] hover:from-[#ff0077] hover:to-[#3e0069] ${sectionChosen === name ? "tw-text-lg tw-font-bold " : "tw-text-gray-500 tw-font-normal"
                                        }`}
                                    style={{
                                        fontSize: sectionChosen === name ? "1.5rem" : "1rem",
                                        opacity: sectionChosen === name ? 1 : 0.5,
                                        background: sectionChosen === name ? 'linear-gradient(to right, #ff00a0, #1e0039)' : "transparent",
                                        WebkitBackgroundClip: sectionChosen === name ? "text" : undefined,
                                        WebkitTextFillColor: sectionChosen === name ? "transparent" : "inherit",
                                    }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>


                        <div className="tw-w-full"
                            style={{
                                height: '1px',
                                background: 'linear-gradient(to right, #ff00a0, #1e0039)',
                            }}
                        />


                        <div className="tw-mt-5 tw-px-5">
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
                        </div>
                    </div>
                ) : (
                    <FepkDashboardNoAccess />
                )}
            </div>
        </div>
    );
}

export default FepkEditDashboard;
