import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EpkSalesCalculator = ({ epkInfo, globalTotalReach }) => {
    const { t } = useTranslation();

    const [totalAudienceReach, setTotalAudienceReach] = useState(1000000);
    const [filmPrice, setFilmPrice] = useState("10");
    const [engagementRate, setEngagementRate] = useState("10");
    const [potentialSales, setPotentialSales] = useState(0);

    // AUTOMATICALLY UPDATE when the Header passes down the real number
    useEffect(() => {
        if (globalTotalReach && globalTotalReach > 0) {
            setTotalAudienceReach(globalTotalReach);
        }
    }, [globalTotalReach]);

    const safeReach = Math.max(0, Number(totalAudienceReach) || 0);
    const safePrice = Math.max(0, Number(filmPrice) || 0);
    const safeRate = Math.max(0, Number(engagementRate) || 0);

    const possibleSales = safeReach * safePrice;

    useEffect(() => {
        handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalAudienceReach]);

    const handleCalculate = () => {
        const potentialSalesValue = (safeReach * safePrice * safeRate) / 100;
        setPotentialSales(potentialSalesValue);
    };

    return (
        <div className="tw-w-full tw-bg-[#1E0039] tw-py-12">
            
            {/* White Calculator Container */}
            <div className="tw-bg-white tw-w-full tw-max-w-[1400px] tw-mx-auto tw-py-8 tw-px-4 md:tw-px-10 tw-shadow-2xl">
                
                <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-justify-between tw-gap-6 lg:tw-gap-2">
                    
                    {/* 1. Total Audience Reach */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-auto">
                        <label className="tw-text-[#1E0039] tw-font-medium tw-mb-2 tw-text-sm md:tw-text-base tw-whitespace-nowrap">
                            TAR (Total Audience Reach)
                        </label>
                        <input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            className="tw-w-full lg:tw-w-36 tw-py-2 lg:tw-py-0 tw-rounded-full lg:tw-rounded-none tw-border tw-border-gray-200 lg:tw-border-none tw-shadow-sm lg:tw-shadow-none tw-bg-transparent tw-text-center tw-text-[#1E0039] tw-font-bold tw-text-xl focus:tw-outline-none [&::-webkit-inner-spin-button]:tw-appearance-none [&::-webkit-outer-spin-button]:tw-appearance-none tw-appearance-none"
                            value={totalAudienceReach}
                            onChange={(e) => setTotalAudienceReach(e.target.value)}
                        />
                    </div>

                    <div className="tw-hidden lg:tw-block tw-text-[#1E0039] tw-font-bold tw-text-2xl tw-mt-4">X</div>

                    {/* 2. Film Price */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-auto">
                        <label className="tw-text-[#1E0039] tw-font-medium tw-mb-2 tw-text-sm md:tw-text-base tw-whitespace-nowrap">
                            Film Price ($)
                        </label>
                        <input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            className="tw-w-full lg:tw-w-32 tw-py-2 lg:tw-py-0 tw-rounded-full lg:tw-rounded-none tw-border tw-border-gray-200 lg:tw-border-none tw-shadow-sm lg:tw-shadow-none tw-bg-transparent tw-text-center tw-text-[#1E0039] tw-font-bold tw-text-xl focus:tw-outline-none [&::-webkit-inner-spin-button]:tw-appearance-none [&::-webkit-outer-spin-button]:tw-appearance-none tw-appearance-none"
                            value={filmPrice}
                            onChange={(e) => setFilmPrice(e.target.value)}
                        />
                    </div>

                    <div className="tw-hidden lg:tw-block tw-text-[#1E0039] tw-font-bold tw-text-2xl tw-mt-4">=</div>

                    {/* 3. Possible Sales */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-auto">
                        <label className="tw-text-[#1E0039] tw-font-medium tw-mb-2 tw-text-sm md:tw-text-base tw-whitespace-nowrap">
                            Possible Sales
                        </label>
                        <div className="tw-w-full lg:tw-w-44 tw-py-2 lg:tw-py-0 tw-rounded-full lg:tw-rounded-none tw-border tw-border-gray-200 lg:tw-border-none tw-shadow-sm lg:tw-shadow-none tw-text-center tw-text-[#1E0039] tw-font-bold tw-text-xl">
                            {possibleSales.toLocaleString()}$
                        </div>
                    </div>

                    <div className="tw-hidden lg:tw-block tw-text-[#1E0039] tw-font-bold tw-text-2xl tw-mt-4">X</div>

                    {/* 4. Engagement Rate */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-auto">
                        <label className="tw-text-[#1E0039] tw-font-medium tw-mb-2 tw-text-sm md:tw-text-base tw-whitespace-nowrap">
                            Engagement Rate (%)
                        </label>
                        
                        {/* Desktop Input */}
                        <div className="tw-hidden lg:tw-block tw-w-full lg:tw-w-32">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                inputMode="numeric"
                                className="tw-w-full tw-bg-transparent tw-text-center tw-text-[#1E0039] tw-font-bold tw-text-xl focus:tw-outline-none [&::-webkit-inner-spin-button]:tw-appearance-none [&::-webkit-outer-spin-button]:tw-appearance-none tw-appearance-none"
                                value={engagementRate}
                                onChange={(e) => setEngagementRate(e.target.value)}
                            />
                        </div>

                        {/* Mobile Slider + Input Stack */}
                        <div className="tw-flex lg:tw-hidden tw-w-full tw-flex-col tw-items-center tw-gap-3 tw-px-2 tw-mt-2">
                            {/* The Gradient Slider */}
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={safeRate} 
                                onChange={(e) => setEngagementRate(e.target.value)}
                                className="tw-w-full tw-max-w-[200px] tw-h-1.5 tw-bg-gray-200 tw-rounded-lg tw-appearance-none tw-cursor-pointer 
                                [&::-webkit-slider-thumb]:tw-appearance-none [&::-webkit-slider-thumb]:tw-w-4 [&::-webkit-slider-thumb]:tw-h-4 [&::-webkit-slider-thumb]:tw-rounded-full [&::-webkit-slider-thumb]:tw-bg-gradient-to-r [&::-webkit-slider-thumb]:tw-from-[#FF00A0] [&::-webkit-slider-thumb]:tw-to-[#1E0039]
                                [&::-moz-range-thumb]:tw-appearance-none [&::-moz-range-thumb]:tw-w-4 [&::-moz-range-thumb]:tw-h-4 [&::-moz-range-thumb]:tw-rounded-full [&::-moz-range-thumb]:tw-bg-gradient-to-r [&::-moz-range-thumb]:tw-from-[#FF00A0] [&::-moz-range-thumb]:tw-to-[#1E0039] [&::-moz-range-thumb]:tw-border-none"
                            />
                            {/* The Input Box Below */}
                            <div className="tw-relative tw-w-full tw-max-w-[150px]">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    inputMode="numeric"
                                    className="tw-w-full tw-py-1.5 tw-rounded-full tw-border tw-border-gray-200 tw-shadow-sm tw-bg-transparent tw-text-center tw-text-[#1E0039] tw-font-bold tw-text-lg focus:tw-outline-none focus:tw-border-[#FF00A0] [&::-webkit-inner-spin-button]:tw-appearance-none [&::-webkit-outer-spin-button]:tw-appearance-none tw-appearance-none"
                                    value={engagementRate}
                                    onChange={(e) => setEngagementRate(e.target.value)}
                                />
                                <span className="tw-absolute tw-right-6 tw-top-1/2 -tw-translate-y-1/2 tw-text-[#1E0039] tw-font-bold tw-text-sm">%</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Calculate Button */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-auto tw-mt-6 lg:tw-mt-6">
                        <button
                            onClick={handleCalculate}
                            className="tw-w-full lg:tw-w-auto tw-max-w-[200px] tw-px-10 tw-py-2.5 tw-rounded-full tw-bg-gradient-to-r tw-from-[#FF00A0] tw-to-[#1E0039] hover:tw-opacity-90 tw-text-white tw-font-bold tw-text-lg tw-transition-opacity"
                        >
                            {t("Calculate")}
                        </button>
                    </div>

                    {/* 6. Potential Sales Result */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-auto tw-mt-6 lg:tw-mt-0">
                        <label className="tw-text-[#1E0039] tw-font-medium tw-mb-2 tw-text-sm md:tw-text-base tw-whitespace-nowrap">
                            Potential Sales
                        </label>
                        <div className="tw-w-full lg:tw-w-44 tw-py-2.5 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-text-[#1E0039] tw-font-bold tw-text-xl tw-border-[2.5px] tw-border-[#1E0039]">
                            {Math.floor(potentialSales).toLocaleString()}$
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EpkSalesCalculator;