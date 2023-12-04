import React from "react";
import image from "../../images/LandingPage/DeadEndEPKScreenshot.png";

const Landing2 = () => {
  // const imageRef = useRef(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   gsap.from(imageRef.current, {
  //     scrollTrigger: {
  //       trigger: imageRef.current,
  //       start: "top bottom", // Animation starts when the top of the image hits the bottom of the viewport
  //       toggleActions: "play none none reset", // Reset animation on scroll up
  //     },
  //     scale: 0.5, // Starting from half size
  //     opacity: 0, // Starting from fully transparent
  //     duration: 1,
  //     ease: "power1.out",
  //   });
  // }, []);

  return (
    <>
      <div className='tw-w-full tw-bg-gradient-to-t tw-from-white tw-to-[#1e0039]'>
        <img
          //  ref={imageRef}
          src={image}
          alt='EPK'
          className='tw-h-full tw-w-[50rem]'
        />
      </div>
    </>
  );
};
export default Landing2;
