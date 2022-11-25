import React from 'react';
import "./Sponsored.css";
import img from '../../images/sponsored.png'


export default function Sponsored() {
    return (
        <div className="sponsored">
            <div className="warp">
                <img src={img} alt="" />
            </div>
        </div>
    );
}
