import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

const EpkSalesCalculator = () => {
    const [totalAudienceReach, setTotalAudienceReach] = useState("0");
    const [filmPrice, setFilmPrice] = useState("0");
    const [engagementRate, setEngagementRate] = useState("0");
    const [potentialSales, setPotentialSales] = useState("0");

    const handleCalculate = () => {
        const potentialSalesValue =
            (totalAudienceReach * filmPrice * engagementRate) / 100;
        setPotentialSales(potentialSalesValue);
    };

    const { t } = useTranslation();

    return (
        <div className='tw-bg-white tw-items-center tw-justify-center tw-border-2 tw-border-gray-400 tw-w-[100%] tw-p-4 tw-mx-auto  tw-mt-10 tw-mb-10'>
            <div className="calculator-container" style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px",
                flexWrap: "wrap" // Allows wrapping on smaller screens
            }}>
                <div className="input-field" style={{ minWidth: "150px", flex: 1 }}>
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
                        type="number"
                        value={totalAudienceReach}
                        onChange={(e) => setTotalAudienceReach(e.target.value)}
                    />
                </div>

                <div> <br /> <span style={{ fontWeight: "bold" }}> X </span> </div>

                <div className="input-field" style={{ minWidth: "150px", flex: 1 }}>
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
                        type="number"
                        value={filmPrice}
                        onChange={(e) => setFilmPrice(e.target.value)}
                    />
                </div>

                <div> <br /> <span style={{ fontWeight: "bold" }}> X </span> </div>

                <div className="input-field" style={{ minWidth: "150px", flex: 1 }}>
                    Engagement Rate (%):
                    <input
                        style={{
                            height: "30px",
                            width: "100%",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "1px 2px 9px #311465",
                            textAlign: "left",
                        }}
                        type="number"
                        value={engagementRate}
                        onChange={(e) => setEngagementRate(e.target.value)}
                    />
                </div>

                <div> <br /> <span style={{ fontWeight: "bold" }}> -> </span> </div>

                <Button
                    style={{
                        width: "120px",
                        boxShadow: "1px 2px 9px #311465",
                        backgroundColor: "#ffffff",
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "20px",
                        minWidth: "150px",
                    }}
                    type="primary"
                    onClick={handleCalculate}
                >
                    {t("Calculate")}
                </Button>

                <div> <br /> <span style={{ fontWeight: "bold" }}> = </span> </div>

                <p
                    style={{
                        marginTop: "20px",
                        fontSize: "1em",
                        fontWeight: "bold",
                        minWidth: "150px",
                        flex: 1
                    }}
                >
                    Potential Sales: {potentialSales} $
                </p>
            </div>
        </div>
    );
};

export default EpkSalesCalculator;
