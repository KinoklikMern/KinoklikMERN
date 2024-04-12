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
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className='footer-container tw-overflow-hidden'>
        <footer className='footer tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-bg-gradient-to-t tw-from-purple-950 tw-to-purple-900 tw-p-6 tw-text-white'>
          <div className='tw-mb-4 tw-grid  tw-w-full  tw-grid-cols-2 tw-items-center md:tw-grid-cols-5 md:tw-justify-around'>
            <div className='tw-mb-4 tw-flex md:tw-mb-0'>
              <img
                src={logo}
                alt='Logo'
                className='tw-h-22 tw-ml-0 md:tw-mx-auto'
              />
            </div>
            <div className='footer-columns tw-mb-4 tw-text-center md:tw-mb-0'>
              <h5 className='tw-mb-4 tw-text-left tw-text-lg tw-font-semibold'>
                {t("KinoKlik EPK")}
              </h5>
              <Link to='/forFilmMakers' className='footer-li tw-mb-2 tw-block'>
                {t("For Filmmakers")}
              </Link>
              <Link to='/forIndustryProf' className='footer-li tw-block'>
                {t("For Industry")} <br />
                {t("Professionals")}
              </Link>
            </div>
            <div className='footer-columns tw-mb-4 tw-text-center md:tw-mb-0'>
              <h5 className='tw-mb-4 tw-text-left tw-text-lg tw-font-semibold'>
                {t("Company")}
              </h5>
              <a href='#aboutus' className='footer-li tw-mb-2 tw-block'>
                {t("About Us")}
              </a>
              <a href='#contactus' className='footer-li tw-mb-2 tw-block'>
                {t("Contact Us")}
              </a>
              <a href='#support' className='footer-li tw-block'>
                {t("Support")}
              </a>
            </div>
            <div className='footer-columns tw-mb-4 tw-text-center md:tw-mb-0'>
              <h5 className='tw-mb-4 tw-text-left tw-text-lg tw-font-semibold'>
                {t("Relations")}
              </h5>
              <a href='#partners' className='footer-li tw-mb-2 tw-block'>
                {t("Partners")}
              </a>
              <a href='#investors' className='footer-li tw-mb-2 tw-block'>
                {t("Investors")}
              </a>
              <a href='#media' className='footer-li tw-block'>
                {t("Media & Blog")}
              </a>
            </div>
            <div className='footer-links tw-col-span-2 tw-flex tw-justify-center tw-text-center md:tw-col-span-1 md:tw-justify-normal'>
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

          <div className='tw-mt-2 tw-text-gray-300'>
            &copy; {new Date().getFullYear()}{" "}
            {t("KinoKlik. All Rights Reserved.")}
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
