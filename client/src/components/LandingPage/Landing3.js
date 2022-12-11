import React from 'react';
import img2 from '../../images/CreateLOGO2.jpg'
import "./Landing3.css";

const Landing3 = () => {
    return (
        <>
            <div className="landing3">
                <div className='createEPKPagePart'>
                    <div className='landing3leftColumn1'>
                        <h2 className='landing3Title'><b>Create a free EPK!</b></h2>
                        <p className='landing3introText'>Promote your film idea to industry<br />professionals with a free Eletronic Press Kit!</p>
                        <button className='CreateEPK'>Create Film EPK </button>
                    </div>

                    <div className='landing3rightColumn1' >
                        <img className="landing3CreateImg" src={img2} alt=""></img>
                    </div>

                    <br />
                </div>
            </div>
        </>
    )
}
export default Landing3;