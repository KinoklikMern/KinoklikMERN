
import React from 'react';
import image01 from "../../images/Festival/01.png";
import image02 from "../../images/Festival/02.png";
import image03 from "../../images/Festival/03.png";
import image04 from "../../images/Festival/04.png";
import logo from "../../images/Festival/log2.png";
import "./Festival.css";

export default function Festival() {
    return (
        <div className="festival-container">
            <div className="festivalTitle">
                <span>From The Festivals</span>

            </div>

            <div className="festivalLogo">

                <div class="first">
                    <img src={logo} alt="" width="150" height="150" />
                </div>
                <div class="second">
                    <img src={logo} alt="" width="150" height="150" />
                </div>
                <div class="third">
                    <img src={logo} alt="" width="150" height="150" />
                </div>

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
