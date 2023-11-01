import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const SocialShareModal = ({ isOpen, urlShare, closeModal }) => {
  const [copySuccess, setCopySuccess] = useState("");

  if (!isOpen) return null;

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess("Copied!");
      console.log("URL to be copied:", currentUrl);
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div
          className="modal-content col-12"
          style={{
            borderRadius: "13px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <div
            className="modal-header"
            style={{ borderBottom: "none", padding: "0.5rem 1rem" }}
          >
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={closeModal}
              style={{
                marginLeft: "auto",
                outline: 0,
                boxShadow: "none",
                backgroundColor: "transparent",
                fontSize: "1.5rem",
              }}
            >
              &times;
            </button>
          </div>
          <div
            className="modal-body"
            style={{ color: "#3b3b3b", paddingTop: "0.5rem" }}
          >
            <h5
              className="modal-title"
              style={{
                fontWeight: 700,
                fontSize: "1.2rem",
                textAlign: "center",
                width: "100%",
                marginBottom: "20px",
                color: "#1e0039",
              }}
            >
              Share your EPK with the world!
            </h5>
            <div className="icon-container1 d-flex justify-content-between">
              <div className="smd">
                <FacebookShareButton url={urlShare}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
              </div>
              <div className="smd">
                <WhatsappShareButton url={urlShare}>
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
              </div>
              <div className="smd">
                <TwitterShareButton url={urlShare}>
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
              </div>
              <div className="smd">
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
          <div
            className="modal-footer"
            style={{ display: "block", marginTop: "10px" }}
          >
            <label style={{ fontWeight: 600 }}>
              <span
                className="message"
                style={{ fontSize: "1rem", color: "#1e0039" }}
              >
                {copySuccess}
              </span>
            </label>
            <br />
            <div className="row">
              <input
                className="col-10 ur"
                type="url"
                value={window.location.href}
                id="myInput"
                aria-describedby="inputGroup-sizing-default"
                style={{
                  flex: 1,
                  height: "40px",
                  border: "none",
                  backgroundColor: "#e6e2e2",
                  borderRadius: "4px 0 0 4px",
                  outline: 0,
                  boxShadow: "none",
                  padding: "0 10px",
                }}
                readOnly
              />
              <button
                className="cpy"
                onClick={copyToClipboard}
                style={{
                  width: "40px",
                  border: "none",
                  backgroundColor: "#e6e2e2",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                  outline: 0,
                  boxShadow: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faCopy}
                  style={{ backgroundColor: "transparent" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
