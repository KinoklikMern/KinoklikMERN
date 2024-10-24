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
            <div
                className="calculator-container"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '20px',
                    flexWrap: 'wrap',
                    gap: '15px',
                    alignItems: 'center',
                }}
            >
                <div className="input-field" style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>Total Audience Reach:</label>
                    <input
                        style={{
                            height: '30px',
                            width: '100%',
                            borderRadius: '5px',
                            marginBottom: '20px',
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'left',
                        }}
                        type="number"
                        value={totalAudienceReach}
                        onChange={(e) => setTotalAudienceReach(e.target.value)}
                    />
                </div>

                <div style={{ fontWeight: 'bold', padding: '0 10px' }}>X</div>

                <div className="input-field" style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>Film Price ($):</label>
                    <input
                        style={{
                            height: '30px',
                            width: '100%',
                            borderRadius: '5px',
                            marginBottom: '20px',
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'left',
                        }}
                        type="number"
                        value={filmPrice}
                        onChange={(e) => setFilmPrice(e.target.value)}
                    />
                </div>

                <div style={{ fontWeight: 'bold', padding: '0 10px' }}>X</div>

                <div className="input-field" style={{ flex: 1, minWidth: '150px' }}>
                    <label style={{ whiteSpace: 'nowrap' }}>Engagement Rate (%):</label>
                    <input
                        style={{
                            height: '30px',
                            width: '100%',
                            borderRadius: '5px',
                            marginBottom: '20px',
                            boxShadow: '1px 2px 9px #311465',
                            textAlign: 'left',
                        }}
                        type="number"
                        value={engagementRate}
                        onChange={(e) => setEngagementRate(e.target.value)}
                    />
                </div>

                <div style={{ fontWeight: 'bold', padding: '0 10px' }}>-></div>

                <Button
                    style={{
                        width: '120px',
                        boxShadow: '1px 2px 9px #311465',
                        backgroundColor: '#ffffff',
                        fontWeight: 'bold',
                        marginTop: '20px',
                        minWidth: '150px',
                        color: '#311465',
                    }}
                    type="primary"
                    onClick={handleCalculate}
                >
                    {t("Calculate")}
                </Button>

                <div style={{ fontWeight: 'bold', padding: '0 10px' }}>=</div>

                <p
                    style={{
                        marginTop: '20px',
                        fontSize: '1em',
                        fontWeight: 'bold',
                        minWidth: '150px',
                        flex: 1,
                    }}
                >
                    Potential Sales: {potentialSales} $
                </p>
            </div>
        </div>
    );
};

export default EpkSalesCalculator;
