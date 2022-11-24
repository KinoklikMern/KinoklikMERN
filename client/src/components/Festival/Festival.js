
import React from 'react';
import image01 from "../../images/Festival/01.png";
import image02 from "../../images/Festival/02.png";
import image03 from "../../images/Festival/03.png";
import image04 from "../../images/Festival/04.png";
import logo from "../../images/Festival/logo.png";
import "./Festival.css";

export default function Festival() {
    return (
        <div className="festival-container">
            <div className="festivalLogo">
                <img className='logo1' src={logo} alt="" width="150" height="150" />
                <img className='logo2' src={logo} alt="" width="150" height="150" />
                <img className='logo3' src={logo} alt="" width="150" height="150" />
            </div>
            <div className="festival-row">
                <div className="c-col odd">
                    <img src={image01} alt="" />
                </div>
                <div className="c-col even">
                    <img src={image02} alt="" />
                </div>
                <div className="c-col odd">
                    <img src={image03} alt="" />
                </div>
                <div className="c-col even">
                    <img src={image04} alt="" />
                </div>
            </div>
        </div>
    );
}
