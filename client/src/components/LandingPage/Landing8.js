import React, { useState, useEffect, useRef } from "react";
import "./Landing8.css";
import http from "../../http-common";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

const Landing8 = () => {
  const { t } = useTranslation();

  const [fepksNew, setFepks] = useState([]);
  const [fepksPopular, setPopularFepks] = useState([]);

  const newRowRef = useRef(null);
  const popularRowRef = useRef(null);

  useEffect(() => {
    http.get(`fepks/newest/1`).then((response) => setFepks(response.data));
    http.get(`fepks/popular/1`).then((response) => setPopularFepks(response.data));
  }, []);

  useEffect(() => {
    if (!fepksNew.length || !fepksPopular.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const setupLoop = (ref, direction) => {
      const el = ref.current;
      const totalWidth = el.scrollWidth / 2; // half because items are duplicated
      const xStart = direction === "left" ? 0 : -totalWidth;
      const xEnd = direction === "left" ? -totalWidth : 0;

      gsap.set(el, { x: xStart });

      const tween = gsap.to(el, {
        x: xEnd,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const parsed = parseFloat(x);
            // Seamlessly wrap when we reach the end
            if (direction === "left" && parsed <= -totalWidth) {
              return "0px";
            }
            if (direction === "right" && parsed >= 0) {
              return `${-totalWidth}px`;
            }
            return `${parsed}px`;
          },
        },
        paused: true,
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tween.play(),
        onLeave: () => tween.pause(),
        onEnterBack: () => tween.play(),
        onLeaveBack: () => tween.pause(),
      });

      el.addEventListener("mouseenter", () => tween.pause());
      el.addEventListener("mouseleave", () => tween.play());

      return tween;
    };

    const tween1 = setupLoop(newRowRef, "left");
    const tween2 = setupLoop(popularRowRef, "right");

    return () => {
      tween1.kill();
      tween2.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [fepksNew, fepksPopular]);

  return (
    <>
      <div className="tw-overflow-hidden tw-bg-gradient-to-t tw-from-white tw-to-midnight">
        <h1 className="tw-py-28 tw-text-center tw-text-xl tw-font-bold tw-text-white md:tw-text-2xl lg:tw-text-3xl xl:tw-text-4xl">
          {t("Are you a Distributor, a Film Festival, Sales Agent")} <br />
          {t(" or Investor searching for new upcoming film projects?")}
        </h1>
        <h2 className="tw-my-8 tw-ml-10 tw-text-xl tw-font-bold tw-text-white md:tw-text-3xl">
          {t("NEW FILMS")}
        </h2>
          <div ref={newRowRef} className="slide-right-left tw-my-6 tw-flex tw-gap-5">
            {[...fepksNew, ...fepksNew].map((item, index) => (
              <div
                className="tw-w-48 tw-flex-shrink-0 tw-rounded-lg tw-shadow-md tw-shadow-gray-600 md:tw-w-96"
                key={`${item._id}-${index}`}
              >
                <Link to={item.title ? `epk/${item._id}` : "/"}>
                  <img
                    className="tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-duration-200 hover:tw-scale-105"
                    src={`${process.env.REACT_APP_AWS_URL}/${item.image_details}`}
                    alt={item.title}
                  />
                </Link>
              </div>
            ))}
          </div>

        <h2 className="tw-my-8 tw-ml-10 tw-text-xl tw-font-bold tw-text-white md:tw-text-3xl">
          {t("MOST POPULAR")}
        </h2>
          <div ref={popularRowRef} className="slide-left-right tw-my-6 tw-flex tw-gap-5">
          {[...fepksPopular, ...fepksPopular].map((item, index) => (
            <div
              className="tw-w-48 tw-flex-shrink-0 tw-rounded-lg tw-shadow-md tw-shadow-gray-600 md:tw-w-96"
              key={`${item._id}-${index}`}
            >
              <Link to={`epk/${item._id}`}>
                <img
                  className="tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-duration-200 hover:tw-scale-105"
                  src={`${process.env.REACT_APP_AWS_URL}/${item.image_details}`}
                  alt={item.title}
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="tw-flex tw-items-center tw-justify-center tw-p-6">
          
            <a className="tw-mr-4 tw-inline-block tw-rounded-lg tw-bg-midnight tw-px-4 tw-py-2 tw-text-xl tw-font-bold tw-tracking-wider tw-text-white tw-shadow-lg hover:tw--translate-y-0.5 hover:tw-bg-violet-600 focus:tw-outline-none sm:tw-text-base"
            href="/catalog"
          >
            {t("Browse EPKs")}
          </a>
        </div>
      </div>
    </>
  );
};

export default Landing8;