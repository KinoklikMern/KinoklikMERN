import React from "react";

const Landing3 = () => {
  return (
    <>
      <div className="landing3 tw-mb-12 tw-h-[45vh] tw-items-center tw-justify-center">
        <div className="tw-text-center tw-text-5xl tw-font-bold">
        
          What is a film EPK?
        </div>
        <div className="tw-mx-32 tw-py-10 tw-text-justify tw-text-2xl lg:tw-pl-40 lg:tw-pr-40">
          <p>
            Traditionally, an EPK a PDF document displaying information such as
            pictures, synopsis and cast and crew biographies to help your
            promote the film you want to make. It usually contains the
            following:
          </p>
        </div>
        <div className="tw-mx-32">
          <ul className="tw-mx-32 tw-text-start tw-text-2xl tw-font-bold lg:tw-pl-40">
            <li className="tw-list-disc "> Poster</li>
            <li className="tw-list-disc">Logline</li>
            <li className="tw-list-disc">Synopsis</li>
            <li className="tw-list-disc">Actors pictures and bios</li>
            <li className="tw-list-disc">
              {" "}
              Producer, Director, Cinematographer(DOP) pictures and bio{" "}
            </li>
            <li className="tw-list-disc"> Production Stills</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Landing3;
