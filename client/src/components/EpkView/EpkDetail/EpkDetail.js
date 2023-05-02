import React from "react";

export default function EpkDetail({ epkInfo }) {
  const image_detail = `${process.env.REACT_APP_AWS_URL}/${epkInfo.image_details}`;
  return (
    <div className="tw-bg-white">
      <div className="tw-flex tw-justify-around tw-py-6">
        <div>
          <img src={image_detail} className="tw-my-4 tw-h-full tw-border-2" />
        </div>
        <div className="tw-justify-between tw-text-[1.5rem]">
          <p>
            Directed by: <span></span>
          </p>
          <p>
            Produced by: <span></span>
          </p>
          <p>
            Cinematographer: <span></span>
          </p>
          <p>
            Writer: <span></span>
          </p>
          <p>
            Editor: <span></span>
          </p>
          <p>
            Editor: <span></span>
          </p>
          <p>
            Studio: <span></span>
          </p>
          <p>
            Directed by: <span></span>
          </p>
          <p>
            Distributed by: : <span></span>
          </p>
        </div>
        <div className="tw-text-[1.5rem]">
          <div>
            <p>Starring:</p>
            <p>Starring:</p>
            <p>Starring:</p>
          </div>
          <div>
            <p>
              Produced Year: <span></span>
            </p>
            <p>
              Duration: <span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
