import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <>
      <div class="footer footer-container">
        <div class=" footer-container">
          <div class="row">
            <div class="col-md-2 px-4 py-3 footer-container">
              <img
                src={require("../images/logo.png")}
                alt="Logo"
                class="logo"
              />
            </div>
            <div class="col-md-2 px-4 py-3 footer-columns">
              <ul class="footer-ul">
                <li>
                  <h5 class="footer-header">About us</h5>
                </li>
                <li class="footer-li">
                  <a href=""></a>Home
                </li>
                <li class="footer-li">
                  <a href=""></a>Shows
                </li>
                <li class="footer-li">
                  <a href=""></a>Our Story
                </li>
              </ul>
            </div>
            <div class="col-md-2 px-4 py-3 footer-columns">
              <ul class="footer-ul">
                <li>
                  <h5 class="footer-header">More info</h5>
                </li>
                <li class="footer-li">
                  <a href=""></a>Terms of Service
                </li>
                <li class="footer-li">
                  <a href=""></a>Privacy Policy
                </li>
                <li class="footer-li">
                  <a href=""></a>More Legal Notices
                </li>
              </ul>
            </div>
            <div class="col-md-2 px-4 py-3 footer-columns">
              <ul class="footer-ul">
                <li>
                  <h5 class="footer-header">Contact us</h5>
                </li>
                <li class="footer-li">
                  <a href=""></a>Customer Support
                </li>
                <li class="footer-li">
                  <a href=""></a>press@kinoklik.ca
                </li>
              </ul>
            </div>
            <div class="col-md-2 px-4 py-3 footer-columns">
              <h5 class="footer-header">Follow us on:</h5>
              <div class="footer-links">
                {/*          <a href="https://www.instagram.com/kinoklik"><i class="fab fa-instagram"></i></a>
              <a href="https://twitter.com/kinoklik_canada"><FontAwesomeIcon icon="fab fa-twitter" /></a>
              <a href="https://www.facebook.com/kinoklikcanada"><i class="fab fa-linkedin"></i></a>
              <a href="https://www.youtube.com/channel/UCt2KiIE6jFI0UIa_9olo3Uw"><i class="fab fa-youtube"></i></a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
