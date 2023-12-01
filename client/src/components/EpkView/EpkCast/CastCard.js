import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CastCard({
  index,
  image,
  text,
  castName,
  epkRole,
  actorUrl,
}) {

  gsap.registerPlugin(ScrollTrigger);
  const imageRef = useRef(null);
  const castNameRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && castNameRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // Image animation
      tl.fromTo(
        imageRef.current,
        { scale: 0.2 },
        { scale: 1, duration: 1, ease: "power1.out" }
      );

      // castName animation
      tl.fromTo(
        castNameRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        "-=0.5" // Start this animation 1 second before the previous animation ends
      );

      // text animation
      tl.fromTo(
        textRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 }
      );
    }
  }, []);

  const isReverse = index % 2 === 0;
  const isActor = epkRole.includes("actor") || epkRole.includes("Actor");
  const cardShadowStyle = epkRole.includes("actor" && "Actor")
    ? "tw-shadow-[6px_6px_3px_#1E0039]"
    : "tw-shadow-[6px_6px_3px_#ffffff]";
  const hasRoleTitle = epkRole.includes("actor" && "Actor") ? false : true;

  const formatChars = (chars) => {
    let noSpecialChars = chars.replace(/[^a-zA-Z0-9]/g, " "); // remove special characters
    // capitalize the first character.
    let formatedChars = noSpecialChars
      .split(" ")
      .map((char) => {
        return char[0].toUpperCase() + char.substring(1);
      })
      .join(" ");

    return formatedChars;
  };
  return (
    <div
      className={`tw-my-16 tw-flex tw-justify-between tw-gap-36 tw-text-inherit ${
        !isReverse && " tw-flex-row-reverse"
      }`}
    >
      <div className="tw-flex tw-w-1/3 tw-flex-col tw-items-center">
        <img
        ref={imageRef}
          src={image}
          style={{ width: "50%", height: "auto" }}
          className={cardShadowStyle}
          alt=""
        />
        <a
          href={actorUrl}
          className={`${isActor ? "hover:tw-text-[#712CB0]" : ""}`}
          style={{ textDecoration: "none" }}
        >
          <p  ref={castNameRef}  className="tw-text-[2rem] tw-font-semibold">{castName}</p>
        </a>
      </div>
      <div className="tw-mx-12 tw-flex tw-w-1/3 tw-flex-col tw-justify-center tw-gap-6 tw-self-center">
        {hasRoleTitle && (
          <p className="tw-text-center tw-text-[3rem]">
            {formatChars(epkRole)}
          </p>
        )}
        <p ref={textRef} className="tw-text-center tw-text-2xl">{text}</p>
      </div>
    </div>
  );
}
