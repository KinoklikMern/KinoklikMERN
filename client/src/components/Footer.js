import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer footer-container">
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
                  <h5 className="footer-header mb-4 text-lg">KinoKlik APK</h5>
                </li>
                <li className="footer-li">
                <Link to="/forFilmMakers">For Filmmakers</Link>
               
                </li>
                <li className="footer-li">
                <Link to="/forIndustryProf"><a>For Industry <br />
                Professionals</a></Link>
                 
                </li>
              </ul>
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns">
              <ul className="footer-ul">
                <li>
                  <h5 className="footer-header mb-4 text-lg">Company</h5>
                </li>
                <li className="footer-li">
                  <a href=""></a>About Us
                </li>
                <li className="footer-li">
                  <a href=""></a>Contact Us
                </li>
                <li className="footer-li">
                  <a href=""></a>Support
                </li>
              </ul>
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns">
              <ul className="footer-ul">
                <li>
                  <h5 className="footer-header mb-4 text-lg">Relations</h5>
                </li>
                <li className="footer-li">
                  <a href="">Partners</a>
                </li>
                <li className="footer-li">
                  <a href="">Investors</a>
                </li>
                <li className="footer-li">
                  <a href="">Media & Blog</a>
                </li>
                {/*  <li className="footer-li">
                  <a href="press@kinoklik.ca">press@kinoklik.ca</a>
  </li> */}
              </ul>
            </div>
            <div className="col-md-2 px-4 py-3 footer-columns mt-20">
              {/* <h5 className="footer-header">Follow us on:</h5> */}

              <div className="footer-links  mt-8 ">
            
                <a href="https://www.facebook.com/kinoklikcanada">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />

                  {/*<i className="fab fa-instagram"></i> */}
                </a>
                <a href="https://www.instagram.com/kinoklik">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://www.linkedin.com/company/kinoklik/?viewAsMember=true">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a href="https://twitter.com/kinoklik_canada">
                  {/*  <a href="https://www.youtube.com/channel/UCt2KiIE6jFI0UIa_9olo3Uw"> */}

                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
