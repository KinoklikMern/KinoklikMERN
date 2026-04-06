import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactComponent as LeftArrow } from "../../../images/icons/left-arrow.svg"
import { ReactComponent as RightArrow } from "../../../images/icons/right-arrow.svg"


function buildSlides(epkList, currentIndex) {
    const len = epkList.length;
    const slots = [];

    if (len === 0) return [null, null, null, null, null];

    for (let offset = -1; offset <= 1; offset++) {
        if (len <= 3) {
            const i = currentIndex + offset;
            slots.push(i >= 0 && i < len ? epkList[i] : null);
        } else {
            const i = (currentIndex + offset + len) % len;
            slots.push(epkList[i]);
        }
    }

    return slots;
}


function computeDisabled(slides) {
    const leftDisabled = slides[0] === null;
    const rightDisabled = slides[2] === null;
    return { leftDisabled, rightDisabled };
}

const SIZES = {
    big: 160,
    mid: 120,
    small: 95,
};


function getScale(dist) {
    if (dist === 0) return 1.25;
    if (dist === 1) return 0.95;
}


function getOpacity(dist) {
    if (dist === 0) return 1;
    if (dist === 1) return 0.9;

}



export default function NotificationGallery({
    epkList = [],
    selectedEpk,
    handleSelectedEPK,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const centerIndex = 1;


    useEffect(() => {
        if (!selectedEpk || !epkList.length) return;
        const idx = epkList.findIndex((e) => e._id === selectedEpk._id);
        if (idx !== -1) setCurrentIndex(idx);
    }, [selectedEpk, epkList]);


    if (!epkList.length) {
        return null;
    }


    const slides = buildSlides(epkList, currentIndex);


    const { leftDisabled, rightDisabled } = computeDisabled(slides);

    return (
        <div className="tw-w-full tw-my-10 tw-flex tw-justify-center">

            <div className="tw-relative tw-w-full tw-max-w-5xl tw-px-4">

                <button
                    disabled={leftDisabled}
                    onClick={() => {
                        if (leftDisabled) return;
                        const nextIndex =
                            epkList.length <= 3
                                ? currentIndex - 1
                                : (currentIndex - 1 + epkList.length) % epkList.length;

                        setCurrentIndex(nextIndex);
                        handleSelectedEPK(epkList[nextIndex]);
                    }}
                    className="
        tw-absolute
        tw-left-[10%]
        tw-top-1/2
        tw--translate-y-1/2
        
        tw-flex
        tw-items-center
        tw-justify-center
        tw-w-[40px]
        tw-h-[40px]
        tw-rounded-full
        tw-bg-transparent
        hover:tw-scale-110
        tw-transition
    "
                >
                    <LeftArrow className="tw-w-[28px] tw-h-[28px]" />
                </button>

                <button
                    disabled={rightDisabled}
                    onClick={() => {
                        if (rightDisabled) return;
                        const nextIndex =
                            epkList.length <= 3
                                ? currentIndex + 1
                                : (currentIndex + 1) % epkList.length;

                        setCurrentIndex(nextIndex);
                        handleSelectedEPK(epkList[nextIndex]);
                    }}
                    className="
        tw-absolute
        tw-right-[10%]
        tw-top-1/2
        tw--translate-y-1/2
        
        tw-flex
        tw-items-center
        tw-justify-center
        tw-w-[40px]
        tw-h-[40px]
        tw-rounded-full
        tw-bg-transparent
        hover:tw-scale-110
        tw-transition
    "
                >
                    <RightArrow className="tw-w-[28px] tw-h-[28px]" />
                </button>


                <div className="tw-overflow-hidden tw-h-[360px] sm:tw-h-[360px] tw-flex tw-items-center tw-justify-center tw-w-full">

                    <div className="tw-flex tw-gap-4 sm:tw-gap-6 tw-items-center tw-w-max tw-mx-auto">
                        {slides.map((item, i) => {
                            const dist = Math.abs(i - centerIndex);

                            const width =
                                dist === 0
                                    ? SIZES.big
                                    : dist === 1
                                        ? SIZES.mid
                                        : SIZES.small;

                            const scale = getScale(dist);
                            const opacity = item ? getOpacity(dist) : 0;

                            return (
                                <motion.div
                                    key={item ? item._id : `empty-${i}`}
                                    animate={{ scale, opacity, width }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 35,
                                        damping: 20,
                                        mass: 1.1,
                                    }}
                                    className="tw-flex tw-flex-col tw-items-center tw-cursor-pointer"
                                    onClick={() => {
                                        if (!item) return;
                                        const idx = epkList.findIndex((e) => e._id === item._id);
                                        if (idx !== -1) {
                                            setCurrentIndex(idx);
                                            handleSelectedEPK && handleSelectedEPK(item);
                                        }
                                    }}
                                >

                                    {dist === 0 ? (
                                        <p
                                            className="tw-text-lg  tw-font-bold   tw-text-center tw-tracking-tighter"
                                            style={{
                                                background: "linear-gradient(to right, #FF00A0, #1E0039)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                            {item?.title}
                                        </p>
                                    ) : (
                                        <div className="tw-h-[24px] sm:tw-h-[28px] " />
                                    )}


                                    {item && (
                                        <img
                                            src={`${process.env.REACT_APP_AWS_URL}/${item.banner_url}`}
                                            className="tw-w-full tw-h-[180px] sm:tw-h-[220px] tw-object-cover tw-rounded-[10px]"
                                            alt={item.title || ""}
                                        />
                                    )}
                                    {/* <div
                                        className={`tw-mt-3 tw-w-11/12 tw-mx-auto tw-h-[1px] ${dist === 0 ? "tw-bg-purple-700 tw-bg-gradient-to-r  tw-from-[#FF00A0] tw-to-[#1E0039] " : "tw-bg-gray-300"
                                            }`}
                                        style={{ bottom: -10 }}
                                    /> */}
                                </motion.div>


                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
