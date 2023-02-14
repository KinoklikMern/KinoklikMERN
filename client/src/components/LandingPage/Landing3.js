import React from "react";

const Landing3 = () => {
  return (
    <>
      <div className="landing3 justify-center items-center mb-30 h-[45vh]">
        <div className="text-5xl font-bold text-center"> What is a film EPK?</div>
        <div className="text-2xl  text-justify lg:pl-40 lg:pr-40 py-10 mx-32">
          
          <p>
            Traditionally, an EPK a PDF document displaying information such as
            pictures, synopsis and cast and crew biographies to help your
            promote the film you want to make. It usually contains the
            following:
          </p>
        </div>
        <div className="mx-32">
          <ul className="text-2xl font-bold lg:pl-40 text-start mx-32">
            <li className="list-disc "> Poster</li>
            <li className="list-disc">Logline</li>
            <li className="list-disc">Synopsis</li>
            <li className="list-disc">Actors pictures and bios</li>
            <li className="list-disc"> Producer, Director, Cinematographer(DOP) pictures and bio </li>
            <li className="list-disc"> Production Stills</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Landing3;
