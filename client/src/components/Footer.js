import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <>
      <div className="footer footer-container footer-bottom">
        <div className=" footer-container">
          <div className="row">
            <div className="col-md-2 px-4 py-3 footer-container">
              <img
                src={require("../images/logo.png")}
                alt="Logo"
                className="logo"
              />
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns">
              <ul className="footer-ul">
                <li>
                  <h5 className="footer-header">About us</h5>
                </li>
                <li className="footer-li">
                  <a href=""></a>Home
                </li>
                <li className="footer-li">
                  <a href=""></a>Shows
                </li>
                <li className="footer-li">
                  <a href=""></a>Our Story
                </li>
              </ul>
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns">
              <ul className="footer-ul">
                <li>
                  <h5 className="footer-header">More info</h5>
                </li>
                <li className="footer-li">
                  <a href=""></a>Terms of Service
                </li>
                <li className="footer-li">
                  <a href=""></a>Privacy Policy
                </li>
                <li className="footer-li">
                  <a href=""></a>More Legal Notices
                </li>
              </ul>
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns">
              <ul className="footer-ul">
                <li>
                  <h5 className="footer-header">Contact us</h5>
                </li>
                <li className="footer-li">
                  <a href=""></a>Customer Support
                </li>
                <li className="footer-li">
                  <a href=""></a>press@kinoklik.ca
                </li>
              </ul>
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns">
              <h5 className="footer-header">Follow us on:</h5>
              <div className="footer-links">
                {/*          <a href="https://www.instagram.com/kinoklik"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com/kinoklik_canada"><FontAwesomeIcon icon="fab fa-twitter" /></a>
              <a href="https://www.facebook.com/kinoklikcanada"><i className="fab fa-linkedin"></i></a>
              <a href="https://www.youtube.com/channel/UCt2KiIE6jFI0UIa_9olo3Uw"><i className="fab fa-youtube"></i></a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
