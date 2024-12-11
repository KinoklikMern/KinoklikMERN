/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from "react";
import {Button} from "antd";
import { useParams} from "react-router-dom";
// import BasicMenu from "./fepkMenu";
// import http from "../../../http-common";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {getFepksById} from "../../../api/epks";

function SalesCalculatorForm() {
    const [fepk, setFepk] = useState([]);
    const {t} = useTranslation();

    //Changed by Aleksejs to use ID instead of title in URL
    //let { title } = useParams();
    let {id} = useParams();

    // useEffect(() => {
    //     http
    //         .get(`/fepks/byTitle/${title.replace(/ /g, "-").trim()}`)
    //         .then((response) => {
    //             setFepk(response.data);
    //             // console.log(response.data.title);
    //         });
    // }, [title]);

    useEffect(() => {
        getFepksById(id).then((response) => {
            setFepk(response);
        });
    }, [id]);

    const [totalAudienceReach, setTotalAudienceReach] = useState("0");
    const [filmPrice, setFilmPrice] = useState("0");
    const [engagementRate, setEngagementRate] = useState("0");
    const [possibleSales, setPossibleSales] = useState("0");
    const [potentialSales, setPotentialSales] = useState("0");

    const [budget, setBudget] = useState("0");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");
    const [followersCount, setFollowersCount] = useState("");
    const [runtime, setRuntime] = useState("0");
    const [predictionSale, setPredictionSale] = useState("0");
    const [homepage, setHomepage] = useState("");

    const handlePredict = () => {
        if (parseInt(budget) < 50000) {
            alert("Budget must be over $50,000");
            return;
        }
        if (runtime < 20) {
            alert("Runtime must be over 20 minutes");
            return;
        }
        if (genre === "") {
            alert("Please select a genre");
            return;
        }
        if (language === "") {
            alert("Please select a language");
            return;
        }
        if (followersCount === "") {
            alert("Please select a followers count");
            return;
        }
        if (homepage === "") {
            alert("Please select a homepage");
            return;
        }

        const predictionData = {
            budget: parseInt(budget),
            genre: [genre],
            popularity: parseInt(followersCount),
            runtime: parseInt(runtime),
            homepage: homepage === "yes",
            language: language.toLowerCase(),
        };
        console.log(predictionData);

        // URL of your Python backend endpoint
        const apiUrl = "http://127.0.0.1:5000/predict"; // Replace with the actual URL if deployed

        axios
            .post(apiUrl, predictionData)
            .then((response) => {
                // Assuming the backend returns an object with a property 'predictedRevenue'
                console.log(response.data.predicted_revenue);
                setPredictionSale(response.data.predicted_revenue);
            })
            .catch((error) => {
                console.error("Error making the prediction:", error);
            });
    };

    const handleCalculate = () => {
        // Calculate Potential Sales
        const potentialSalesValue = (
            (totalAudienceReach * filmPrice * engagementRate) /
            100
        ).toLocaleString();
        setPotentialSales(potentialSalesValue);
    };

    const calculatePossibleSales = (totalAudienceReach, filmPrice) => {
        const possibleSalesValue = (
            totalAudienceReach * filmPrice
        ).toLocaleString();
        setPossibleSales(possibleSalesValue);
    };

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    return (
        <>
            {/*main div*/}
            <div className="tw-card-body tw--mr-4 tw-mb-1 tw-h-auto tw-pb-2 tw-ml-4"
                 style={{
                     backgroundColor: "transparent",
                     margin: "0 auto",
                 }}>
                <form className="row d-flex flex-column flex-md-row">

                    <div className="d-flex flex-column flex-md-row" style={{gap: '20px', width: '100%'}}>

                        {/*first section div*/}
                        <div className="col-lg-4">

                            {/*title div*/}
                            <div>
                                <h1 style={{marginBottom: "20px"}}> Sales Calculator - TVOD</h1>
                                <span
                                    style={{
                                        fontSize: "0.6rem",
                                    }}
                                >
                          You can use this Sales Calculator to calculate the possible number
                          of sales, based on your expected audience, film price and your
                          audience engagement rate.{" "}
                        </span>
                            </div>

                            {/*fppu/far div*/}
                            <div className="row">

                                {/*fppu div*/}
                                <div className="col my-2">
                                    <label>
                                        Film Price ($):
                                        <input
                                            style={{
                                                height: "30px",
                                                // width: "100%",
                                                borderRadius: "5px",
                                                // marginBottom: "20px",
                                                boxShadow: "1px 2px 9px #311465",
                                                // textAlign: "left",
                                            }}
                                            className="form-control m-10"
                                            type="number"
                                            value={filmPrice}
                                            onChange={(e) => {
                                                setFilmPrice(e.target.value);
                                                calculatePossibleSales(
                                                    totalAudienceReach,
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </label>
                                </div>

                                {/*far div*/}
                                <div className="col my-2">
                                    <label>
                                        Film Audience Reach:
                                        <input
                                            style={{
                                                height: "30px",
                                                // width: "100%",
                                                borderRadius: "5px",
                                                // marginBottom: "20px",
                                                boxShadow: "1px 2px 9px #311465",
                                                // textAlign: "left",
                                            }}
                                            className="form-control m-10"
                                            type="number"
                                            value={totalAudienceReach}
                                            onChange={(e) => {
                                                setTotalAudienceReach(e.target.value);
                                                calculatePossibleSales(e.target.value, filmPrice);
                                            }}
                                        />
                                    </label>
                                </div>

                            </div>

                            {/*slider div*/}
                            <div className="row">
                                <label style={{width: "100%", position: "relative"}}>
                                    Engagement Rate:
                                    <span
                                        style={{
                                            position: "absolute",
                                            right: "0",
                                            fontSize: "0.9em",
                                            fontWeight: "bold",
                                        }}
                                    >
      {engagementRate}%
    </span>
                                    <div style={{alignItems: "center"}}>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={engagementRate}
                                            onChange={(e) => setEngagementRate(e.target.value)}
                                            style={{width: "100%"}}
                                        />

                                    </div>
                                </label>
                            </div>

                            {/*calculate/sales div*/}
                            <div className="row">

                                {/*calculate button div*/}
                                <div className="col my-2">
                                    <Button
                                        style={{
                                            height: "30px",
                                            width: "100%",
                                            borderRadius: "5px",
                                            marginBottom: "20px",
                                            boxShadow: "1px 2px 9px #311465",
                                        }}
                                        type="outline-primary"
                                        block
                                        onClick={handleCalculate}
                                    >
                                        {t("Calculate")}
                                    </Button>
                                </div>

                                {/*potential sales div*/}
                                <div className="col my-2">
                                    <p
                                        style={{
                                            fontSize: "1.25em",
                                            fontWeight: "bold",
                                            display: "grid",
                                            gridTemplateColumns: "1fr",
                                            gap: "20px",
                                        }}
                                    >
                                        Possible Sales: {possibleSales} $
                                    </p>

                                    <p
                                        style={{
                                            fontSize: "1.25em",
                                            fontWeight: "bold",
                                            display: "grid",
                                            gridTemplateColumns: "1fr",
                                            gap: "20px",
                                        }}
                                    >
                                        Potential Sales: {potentialSales} $
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        {/*second section div*/}
                        <div className="col-lg-7">

                            {/*cyrstal ball title div  */}
                            <div className="row">
                                <h1 style={{marginBottom: "20px"}}> Box Office Crystal Ball</h1>
                                <span
                                    style={{
                                        fontSize: "1.0em",
                                    }}
                                >
                  The Crystal Ball feature uses Artificial Intelligence in an
                  attempt to predict the possible box office sales for this film,
                  based on a combination of previous box office sales and a
                  multitude of other several data entry points, as well as the
                  following data you will provide below. Please know that this
                  feature is an early prototype in its infancy and is only made
                  available to o you for entertainment purposes only. It is not a
                  100% correct, accurate prediction of future sales, but only an
                  attempt to calculate potential sales of your film.
                </span>
                            </div>

                            {/*fields div*/}
                            <div className="row">

                                <div className="col my-2">
                                    {/*fppu div*/}
                                    <div className="row">
                                        <label>
                                            Film Price Per Unit ($):
                                            <input
                                                type="number"
                                                value={budget}
                                                onChange={(e) => setBudget(e.target.value)}
                                                style={{
                                                    height: "30px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    marginBottom: "20px",
                                                    boxShadow: "1px 2px 9px #311465",
                                                    textAlign: "left",
                                                    paddingLeft: "10px",
                                                }}
                                            />
                                        </label>
                                    </div>

                                    {/*genre div*/}
                                    <div className="row">
                                        <label>
                                            Genre:
                                            <select
                                                value={genre}
                                                onChange={(e) => setGenre(e.target.value)}
                                                style={{
                                                    height: "30px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    marginBottom: "20px",
                                                    boxShadow: "1px 2px 9px #311465",
                                                    textAlign: "left",
                                                    paddingLeft: "10px",
                                                }}
                                            >
                                                <option value="" disabled selected>
                                                    Select
                                                </option>
                                                <option value="Drama">Drama</option>
                                                <option value="Comedy">Comedy</option>
                                                <option value="Action">Action</option>
                                                <option value="Thriller">Thriller</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Romance">Romance</option>
                                                <option value="Crime">Crime</option>
                                                <option value="ScienceFiction">Science Fiction</option>
                                                <option value="Horror">Horror</option>
                                                <option value="Fantasy">Fantasy</option>
                                            </select>
                                        </label>
                                    </div>

                                </div>

                                <div className="col my-2">

                                    {/*website div*/}
                                    <div className="row">
                                        <label>
                                            Website:
                                            <select
                                                value={homepage}
                                                onChange={(e) => setHomepage(e.target.value)}
                                                style={{
                                                    height: "30px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    marginBottom: "20px",
                                                    boxShadow: "1px 2px 9px #311465",
                                                    textAlign: "left",
                                                    paddingLeft: "10px",
                                                }}
                                            >
                                                <option value="" disabled selected>
                                                    Select
                                                </option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </label>
                                    </div>

                                    {/*runtime div*/}
                                    <div className="row">
                                        <label>
                                            Runtime (minutes):
                                            <input
                                                type="number"
                                                min="0"
                                                max="360"
                                                value={runtime}
                                                onChange={(e) => setRuntime(e.target.value)}
                                                style={{
                                                    height: "30px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    marginBottom: "20px",
                                                    boxShadow: "1px 2px 9px #311465",
                                                    textAlign: "left",
                                                    paddingLeft: "10px",
                                                }}
                                            />
                                        </label>
                                    </div>

                                </div>

                                <div className="col my-2">

                                    {/*language div*/}
                                    <div className="row">
                                        <label>
                                            Language:
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                style={{
                                                    height: "30px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    marginBottom: "20px",
                                                    boxShadow: "1px 2px 9px #311465",
                                                    textAlign: "left",
                                                    paddingLeft: "10px",
                                                }}
                                            >
                                                <option value="" disabled selected>
                                                    Select
                                                </option>
                                                <option value="en">English</option>
                                                <option value="fr">French</option>
                                                <option value="hi">Hindi</option>
                                                <option value="uk">Ukrainian</option>
                                                <option value="zh">Chinese</option>
                                                <option value="ko">Korean</option>
                                                <option value="fi">Finnish</option>
                                                <option value="ja">Japanese</option>
                                                <option value="it">Italian</option>
                                                <option value="ru">Russian</option>
                                                <option value="cn">Cantonese</option>
                                                <option value="es">Spanish</option>
                                                <option value="de">German</option>
                                                <option value="te">Telugu</option>
                                                <option value="pt">Portuguese</option>
                                                <option value="th">Thai</option>
                                                <option value="no">Norwegian</option>
                                                <option value="id">Indonesian</option>
                                                <option value="da">Danish</option>
                                                <option value="el">Greek</option>
                                                <option value="sv">Swedish</option>
                                                <option value="gl">Galician</option>
                                                <option value="ar">Arabic</option>
                                                <option value="nl">Dutch</option>
                                                <option value="kn">Kannada</option>
                                                <option value="fa">Persian</option>
                                                <option value="nb">Norwegian Bokmål</option>
                                                <option value="xx">Unknown</option>
                                                <option value="af">Afrikaans</option>
                                                <option value="pl">Polish</option>
                                                <option value="he">Hebrew</option>
                                                <option value="vi">Vietnamese</option>
                                                <option value="ro">Romanian</option>
                                            </select>
                                        </label>
                                    </div>

                                    {/*followers div*/}
                                    <div className="row">
                                        <label>
                                            Followers Count:
                                            <select
                                                value={followersCount}
                                                onChange={(e) => setFollowersCount(e.target.value)}
                                                style={{
                                                    height: "30px",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    marginBottom: "20px",
                                                    boxShadow: "1px 2px 9px #311465",
                                                    textAlign: "left",
                                                    paddingLeft: "10px",
                                                }}
                                            >
                                                <option value="" disabled selected>
                                                    Select
                                                </option>
                                                <option value="1">999 - 4,999</option>
                                                <option value="2">5,000 - 9,999</option>
                                                <option value="3">10,000 - 49,999</option>
                                                <option value="4">50,000 - 99,999</option>
                                                <option value="5">100,000 - 999,999</option>
                                                <option value="6">1,000,000 - 4,999,999</option>
                                                <option value="7">5,000,000 - over</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>

                                {/*disclaimer div*/}
                                <div className="row">
                                    <p style={{fontWeight: "bold", fontSize: "1.2em"}}>
                                        Disclaimer
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "1.0em",
                                        }}
                                    >
                                        I understand that this Crystal Ball feature is an early
                                        prototype in its infancy, and is only made available for
                                        entertainment purposes only. The following sales prediction
                                        by this feature should not be considered accurate nor
                                        investment advice.
                                    </p>

                                    <label style={{fontWeight: "bold", fontSize: "1.2em"}}>
                                        <input
                                            type="checkbox"
                                            checked={isCheckboxChecked}
                                            onChange={handleCheckboxChange}
                                            style={{
                                                marginRight: "5px",
                                                verticalAlign: "middle",
                                            }}
                                        />
                                        I Accept
                                    </label>
                                </div>

                                {/*checkbox div*/}
                                <div>
                      <span>
                        <svg
                            width="74"
                            height="93"
                            viewBox="0 0 74 93"
                            style={{
                                placeSelf: "center",
                                fill: isCheckboxChecked ? "#311465" : "lightgray",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              d="M63.5597 65.6405C56.5339 72.426 47.254 76.3001 37.5483 76.4994C27.8427 76.6987 18.4153 73.2087 11.1238 66.7172C9.73535 73.4948 8.38569 79.8467 7.10845 85.6685C16.5144 90.4885 26.9077 93 37.4489 93C47.99 93 58.3834 90.4885 67.7893 85.6685C66.4509 79.5398 65.0226 72.8221 63.5597 65.6405ZM18.5607 85.8938C16.2805 85.1724 14.0427 84.3199 11.8583 83.3404C12.6367 79.7465 13.415 76.074 14.1904 72.352C16.2472 73.7062 18.4189 74.8726 20.6796 75.8374C19.977 79.2364 19.2707 82.5871 18.5607 85.8896V85.8938ZM36.7644 0.000188664C29.4567 0.047334 22.3264 2.28538 16.2729 6.43206C10.2193 10.5787 5.51364 16.4483 2.7493 23.3005C-0.0150441 30.1527 -0.714229 37.6807 0.739925 44.9349C2.19408 52.1891 5.73645 58.8447 10.9202 64.0622C16.104 69.2797 22.6971 72.8255 29.8679 74.2523C37.0387 75.6792 44.466 74.9232 51.2132 72.0797C57.9603 69.2362 63.7251 64.4326 67.7804 58.2747C71.8357 52.1167 73.9999 44.8803 74 37.4781C73.9687 27.5067 70.0281 17.9563 63.045 10.9279C56.062 3.89942 46.6086 -0.031378 36.7644 0.000188664ZM28.1451 60.3808C27.536 60.3769 26.9416 60.1905 26.437 59.8449C25.9324 59.4993 25.5402 59.0101 25.3097 58.4389C25.0793 57.8678 25.021 57.2404 25.1422 56.6357C25.2633 56.0311 25.5586 55.4763 25.9906 55.0414C26.4227 54.6065 26.9722 54.3109 27.5699 54.192C28.1676 54.073 28.7867 54.136 29.349 54.373C29.9114 54.61 30.3919 55.0104 30.73 55.5237C31.068 56.0369 31.2484 56.6401 31.2484 57.2571C31.2472 57.6686 31.1659 58.0758 31.0093 58.4556C30.8527 58.8353 30.6238 59.18 30.3356 59.4701C30.0474 59.7602 29.7056 59.9899 29.3298 60.1462C28.9539 60.3025 28.5513 60.3822 28.1451 60.3808ZM22.9739 38.1714C21.3233 32.1564 19.9848 30.81 14.0088 29.1494C19.9848 27.4889 21.3233 26.1414 22.9739 20.1274C24.6235 26.1414 25.9619 27.4889 31.937 29.1494C25.9619 30.81 24.6245 32.1564 22.9739 38.1714ZM38.8332 16.3103C38.8292 15.6877 39.0078 15.0779 39.3463 14.5582C39.6849 14.0385 40.1682 13.6324 40.735 13.3914C41.3017 13.1503 41.9264 13.0852 42.5297 13.2042C43.1331 13.3232 43.6879 13.6211 44.124 14.06C44.56 14.4988 44.8575 15.059 44.9788 15.6694C45.1001 16.2798 45.0397 16.9129 44.8052 17.4884C44.5708 18.064 44.1729 18.5561 43.662 18.9023C43.1511 19.2485 42.5502 19.4332 41.9355 19.433C41.1153 19.4355 40.3278 19.1079 39.746 18.5223C39.1643 17.9367 38.8359 17.141 38.8332 16.3103ZM47.1077 55.5221C46.0875 51.8207 45.2714 50.992 41.5917 49.97C45.2643 48.9481 46.0916 48.1193 47.1077 44.4179C48.1228 48.1193 48.944 48.9481 52.6237 49.97C48.946 50.992 48.1228 51.8207 47.1077 55.5221ZM57.451 38.1714C56.689 35.3959 56.0718 34.7738 53.3133 34.0071C56.0677 33.2414 56.689 32.6194 57.451 29.8438C58.2121 32.6194 58.8303 33.2414 61.5878 34.0071C58.8303 34.7738 58.2121 35.3959 57.451 38.1714Z"/>
                        </svg>
                      </span>
                                </div>

                                {/*button div*/}
                                <div>
                                    <Button
                                        disabled={!isCheckboxChecked}
                                        style={{
                                            width: "120px",
                                            boxShadow: "1px 2px 9px #311465",
                                            backgroundColor: "#ffffff",
                                            fontWeight: "bold",
                                            marginTop: "20px",
                                            color: isCheckboxChecked ? "#311465" : "lightgray",
                                            placeSelf: "center",
                                        }}
                                        type="outline-primary"
                                        onClick={handlePredict}
                                    >
                                        Predict
                                    </Button>
                                </div>

                                {/*prediction div*/}
                                <div>
                        <span
                            style={{
                                marginTop: "20px",
                                fontSize: "1.25em",
                                fontWeight: "bold",
                                textAlign: "right",
                                placeSelf: "center",
                            }}
                        >
                      Prediction Sale:{" "}
                            <span style={{fontWeight: "normal"}}>
                        {Number(predictionSale).toLocaleString()} $
                        </span>
                        </span>
                                </div>
                            </div>

                            {/*end of second section*/}
                        </div>
                    </div>
                </form>

                {/*end of main div*/}
            </div>
        </>
    )
        ;
}

export default SalesCalculatorForm;
