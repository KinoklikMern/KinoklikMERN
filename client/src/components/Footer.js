import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import LanguageToggle from "./LanguageToggle";

function Footer() {
  return (
    <>
      <div className='footer-container'>
        <footer className='footer tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-bg-gradient-to-t tw-from-purple-950 tw-to-purple-900 tw-p-6 tw-text-white'>
          <div className='tw-mb-4 tw-flex tw-w-full tw-flex-col tw-items-center md:tw-flex-row md:tw-justify-around'>
            <div className='tw-mb-4 tw-flex tw-justify-center md:tw-mb-0'>
              <img src={logo} alt='Logo' className='tw-h-22' />
            </div>
            <div className='footer-columns tw-mb-4 tw-text-center md:tw-mb-0'>
              <h5 className='tw-mb-4 tw-text-left tw-text-lg tw-font-semibold'>
                KinoKlik EPK
              </h5>
              <Link to='/forFilmMakers' className='footer-li tw-mb-2 tw-block'>
                For Filmmakers
              </Link>
              <Link to='/forIndustryProf' className='footer-li tw-block'>
                For Industry <br />
                Professionals
              </Link>
            </div>
            <div className='footer-columns tw-mb-4 tw-text-center md:tw-mb-0'>
              <h5 className='tw-mb-4 tw-text-left tw-text-lg tw-font-semibold'>
                Company
              </h5>
              <a href='#aboutus' className='footer-li tw-mb-2 tw-block'>
                About Us
              </a>
              <a href='#contactus' className='footer-li tw-mb-2 tw-block'>
                Contact Us
              </a>
              <a href='#support' className='footer-li tw-block'>
                Support
              </a>
            </div>
            <div className='footer-columns tw-mb-4 tw-text-center md:tw-mb-0'>
              <h5 className='tw-mb-4 tw-text-left tw-text-lg tw-font-semibold'>
                Relations
              </h5>
              <a href='#partners' className='footer-li tw-mb-2 tw-block'>
                Partners
              </a>
              <a href='#investors' className='footer-li tw-mb-2 tw-block'>
                Investors
              </a>
              <a href='#media' className='footer-li tw-block'>
                Media & Blog
              </a>
            </div>
            <div className='footer-links tw-flex tw-flex-row tw-items-center tw-justify-center tw-text-center md:tw-flex-col'>
              <a
                href='https://www.facebook.com/kinoklikcanada'
                target='_blank'
                rel='noreferrer'
                className='tw-mb-2'
              >
                <FontAwesomeIcon icon={faFacebook} className='tw-text-4xl' />
              </a>
              <a
                href='https://www.instagram.com/kinoklik'
                target='_blank'
                rel='noreferrer'
                className='tw-mb-2'
              >
                <FontAwesomeIcon icon={faInstagram} className='tw-text-4xl' />
              </a>
              <a
                href='https://www.linkedin.com/company/kinoklik/?viewAsMember=true'
                target='_blank'
                rel='noreferrer'
                className='tw-mb-2'
              >
                <FontAwesomeIcon icon={faLinkedin} className='tw-text-4xl' />
              </a>
              <a
                href='https://twitter.com/kinoklik_canada'
                target='_blank'
                rel='noreferrer'
                className='tw-mb-2'
              >
                <FontAwesomeIcon icon={faTwitter} className='tw-text-4xl' />
              </a>
            </div>
          </div>
          <LanguageToggle />
          <div className='tw-text-gray-300'>
            &copy; {new Date().getFullYear()} KinoKlik. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
