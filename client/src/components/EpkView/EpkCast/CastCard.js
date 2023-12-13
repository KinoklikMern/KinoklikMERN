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
      className={`tw-my-16 tw-flex sm:tw-justify-between tw-text-inherit ${index % 2 === 0 ? 'sm:tw-flex-row' : 'sm:tw-flex-row-reverse'} tw-flex-col`}
    >
      <div className="tw-flex tw-flex-col tw-items-center tw-w-full">
        <img
          ref={imageRef}
          src={image}
          className={`${cardShadowStyle} tw-w-3/4 md:tw-w-2/3 lg:tw-w-1/2 tw-max-w-xs tw-min-w-[150px] tw-h-auto`} 
          alt=""
        />
        <a
       
          href={actorUrl}
          className={`${isActor ? "hover:tw-text-[#712CB0] tw-mt-4" : ""}`}
          style={{ textDecoration: "none" }}
        >
          <p ref={castNameRef} className="tw-text-[2rem] tw-font-semibold tw-mt-4">{castName}</p>
        </a>
      </div>
      <div className="tw-mx-12 tw-px-4 sm:tw-px-0 tw-flex tw-flex-col tw-justify-center  tw-self-center tw-w-full">
        {hasRoleTitle && (
          <p className="tw-text-center tw-font-semibold tw-text-2xl sm:tw-text-xl md:tw-text-2xl lg:tw-text-3xl">
            {formatChars(epkRole)}
          </p>
        )}
        <p ref={textRef} className="tw-text-center tw-text-xl">{text}</p>
      </div>
    </div>
  );
}