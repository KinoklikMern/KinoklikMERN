/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import BasicMenu from "./fepkMenu";
import http from "../../../http-common";
import { useTranslation } from "react-i18next";

function SalesCalculatorForm() {
  const [fepk, setFepk] = useState([]);
  const { t } = useTranslation();



  let { fepkId } = useParams();


  useEffect(() => {
    http.get(`/fepks/${fepkId}`).then((response) => {
      setFepk(response.data);
      console.log(response.data.title);
    });
  }, [fepkId]);

  const [totalAudienceReach, setTotalAudienceReach] = useState('0');
  const [filmPrice, setFilmPrice] = useState('0');
  const [engagementRate, setEngagementRate] = useState('0');
  const [possibleSales, setPossibleSales] = useState('0');
  const [potentialSales, setPotentialSales] = useState('0');

  const [budget, setBudget] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [followersCount, setFollowersCount] = useState('');
  const [predictionSale, setPredictionSale] = useState('');
  const [homepage, setHomepage] = useState('');

  const handlePredict = () => {
    const predictionSaleValue = budget * followersCount;
    setPredictionSale(predictionSaleValue);
  };

  const handleCalculate = () => {
    // Calculate Possible Sales
    const possibleSalesValue = totalAudienceReach * filmPrice;
    setPossibleSales(possibleSalesValue);

    // Calculate Potential Sales
    const potentialSalesValue = possibleSalesValue * engagementRate / 100;
    setPotentialSales(potentialSalesValue);
  };


  return (
    <>
      <div
        style={{
          boxShadow: "inset 1px 2px 9px #311465",
          marginLeft: "10%",
          marginBottom: "2%",
          width: "80%",
          borderRadius: "10px",
          backgroundColor: "white",
          minHeight: "750px",
        }}
      >
        <div className='tw-flex tw-items-center tw-justify-center tw-rounded-t-lg tw-bg-gradient-to-b tw-from-midnight tw-from-10% tw-via-transparent tw-via-20% tw-to-transparent tw-py-5'>
          <div className='col-3 tw-m-3 tw-text-center'>
            <h2
              className='tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl'
            >
              {t("EPK Dashboard")}
            </h2>
          </div>
          <div className='col-3 tw-m-3 tw-text-center'>
            <BasicMenu color='#1E0039' />
          </div>
          <div className='col-3 tw-m-3 tw-text-center'>
            <Link
              className='tw-text-lg tw-font-bold tw-text-[#1E0039] tw-no-underline md:tw-text-xl lg:tw-text-2xl'
              to={`/epk/${fepk.title}`}
            >
              {t("View EPK Page")}
            </Link>
          </div>
        </div>
        {/*Purple Frame*/ }
        <div
          style={{
            marginLeft: "10%",
            marginRight: "15%",
            color: "#311465",
            fontWeight: "normal",
            display: "flex"
          }}
        >
          <div style={{
            width: "100%",
          }}>
            <h1>Sales Calculator - TVOD</h1>
            <div style={{
              marginTop: "20px",
            }}>
              <div>
                <label>
                  Total Audience Reach:
                  <input
                      style={{
                        height: "30px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                      }}
                      className="form-control m-10"
                      type="number"
                      value={totalAudienceReach}
                      onChange={(e) => setTotalAudienceReach(e.target.value)}
                  />
                </label>

                <br />

                <label>
                  Film Price ($):
                  <input
                      style={{
                        height: "30px",
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        boxShadow: "1px 2px 9px #311465",
                        textAlign: "left",
                      }}
                      className="form-control m-10"
                      type="number"
                      value={filmPrice}
                      onChange={(e) => setFilmPrice(e.target.value)}
                  />
                </label>

                <br />

                <label>
                  Engagement Rate:
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={engagementRate}
                        onChange={(e) => setEngagementRate(e.target.value)}
                        style={{ width: '80%' , background: '#1E0039'}}
                    />
                    <span style={{ marginLeft: '5px', width: '20%' }}>{engagementRate}%</span>
                  </div>
                </label>

                <br />


                <Button
                    style={{
                      width: "120px",
                      boxShadow: "1px 2px 9px #311465",
                      backgroundColor: "#ffffff",
                      fontWeight: "bold",
                      marginTop: "20px",
                    }}
                    type="outline-primary"
                    block
                    onClick={handleCalculate}
                >
                  {t("Calculate")}
                </Button>

                <br />

                <p style={{
                  marginTop: "20px",
                }}>Possible Sales: {possibleSales} $</p>
                <p style={{
                  marginTop: "20px",
                }}>Potential Sales: {potentialSales} $</p>
              </div>

            </div>
          </div>
          <div style={{
            width: "100%"
          }}>
            <h1>Box Office Crystal Ball</h1>
            <div
                style={{
                  marginLeft: '10%',
                  marginRight: '15%',
                  color: '#311465',
                  fontWeight: 'normal',
                  display: 'flex',
                }}
            >
              <div>
                <label>
                  Budget ($):
                  <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      style={{
                        height: '30px',
                        width: '100%',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                      }}
                  />
                </label>

                <br />

                <label>
                  Genre:
                  <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      style={{
                        height: '30px',
                        width: '100%',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                      }}
                  >
                    <option value="action">Action</option>
                    <option value="drama">Drama</option>
                  </select>
                </label>

                <br />

                <label>
                  Homepage:
                  <select
                      value={homepage}
                      onChange={(e) => setHomepage(e.target.value)}
                      style={{
                        height: '30px',
                        width: '100%',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                      }}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>

                <br />

                <label>
                  Language:
                  <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        height: '30px',
                        width: '100%',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                      }}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                  </select>
                </label>

                <br />

                <label>
                  Followers Count:
                  <select
                      value={followersCount}
                      onChange={(e) => setFollowersCount(e.target.value)}
                      style={{
                        height: '30px',
                        width: '100%',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        boxShadow: '1px 2px 9px #311465',
                        textAlign: 'left',
                      }}
                  >
                    <option value="10000">10,000</option>
                    <option value="50000">50,000</option>
                  </select>
                </label>

                <br />

                <Button
                    style={{
                      width: '120px',
                      boxShadow: '1px 2px 9px #311465',
                      backgroundColor: '#ffffff',
                      fontWeight: 'bold',
                      marginTop: '20px',
                    }}
                    type="outline-primary"
                    onClick={handlePredict}
                >
                  Predict
                </Button>

                <br />

                <p style={{ marginTop: '20px' }}>Prediction Sale: {predictionSale} $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SalesCalculatorForm;
