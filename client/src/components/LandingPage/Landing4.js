import React from 'react';
import "./Landing4.css";
import vip from '../../images/vip.png'

const Landing4 = () => {
    return (
        <>
            <div className="landing4" >
                <h1 className="mt-6 text-2xl font-bold text-center text-white-900   lg:text-3xl xl:text-4xl">Promote your film to industry professionals and your audience!</h1>
                <div className="section-image"   >
                    <img src={vip} className="img-fluid" />
                    <br />
                </div>
            </div>
        </>
    )
}
export default Landing4;