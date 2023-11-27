import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

export default function ResourceCard({ resourceInfo, fepkTitle }) {
  const image_resource = `${process.env.REACT_APP_AWS_URL}/${resourceInfo.image}`;
  const currentUrl = window.location.href.startsWith("http")
    ? window.location.href
    : `https://${window.location.href}`;
  const urlShare = `We are currently looking for ${resourceInfo.title} for our film ${fepkTitle}, please check our EPK built with #KinoKlik #EPK on ${currentUrl}`;

  return (
    <div className="tw-m-6 tw-flex tw-flex-col tw-justify-around tw-rounded-3xl tw-bg-[#1e0039]/20 md:tw-flex-row">
      <div className="tw-flex tw-w-full">
        <img
          src={image_resource}
          style={{ width: "100%", height: "100%" }}
          alt=""
        />
      </div>
      <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-text-[#1E0039]">
        <p className="tw-p-4 tw-text-center tw-text-[1.5rem] tw-font-semibold md:tw-text-[3rem]">
          {resourceInfo.title}
        </p>
        <p className="tw-p-4 md:tw-text-[1.5rem]">{resourceInfo.time}</p>
        <p className="tw-p-4 tw-text-center md:tw-text-[1.5rem]">
          {resourceInfo.description}
        </p>
        <div className="tw-mt-5 tw-flex tw-w-full tw-items-center tw-justify-center">
          <div className="smd tw-m-2">
            <FacebookShareButton url={urlShare}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
          </div>
          <div className="smd tw-m-2">
            <WhatsappShareButton url={urlShare}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
          <div className="smd tw-m-2">
            <TwitterShareButton url={urlShare}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>
          <div className="smd tw-m-2">
            <LinkedinShareButton url={urlShare}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
          <div className="smd">
            <EmailShareButton url={urlShare}>
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
}
