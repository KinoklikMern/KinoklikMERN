import React from 'react';
import "./Landing4.css";
import vip from '../../images/vip.png'

const Landing4 = () => {
    return (
        <>
            <div className="landing4" >
                <h1 className="section-title">Promote your film to industry professionals and your audience!</h1>
                <div className="section-image"   >
                    <img src={vip} className="img-fluid" />
                    <br />
                </div>
            </div>
        </>
    )
}
export default Landing4;