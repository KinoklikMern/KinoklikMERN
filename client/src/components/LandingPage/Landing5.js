import React from 'react';
import "./Landing5.css";

const Landing5 = () => {
    return (
        <>
            <div className="bg-midnight sm:text-2xl lg:text-4xl">

              
                <div className="step" >

                    <div className='stepLeft align-top'>
                        Step 1.
                    </div>
                    <div className="stepRight  text-justify sm:text-2xl lg:text-4xl">
                    Create a free filmmaker account.
                    </div>

                </div>

                <div className="step" >

                    <div className='stepLeft align-top'>
                        Step 2.
                    </div>
                    <div className="stepRight  text-justify sm:text-2xl lg:text-4xl">
                        Upload your film info to the EPK Page.
                    </div>

                </div>

                <div className="step" >

                    <div className='stepLeft align-top'>
                        <p className='align-center'>Step 3.</p>
                    </div>
                    <div className='stepRight mb-20 text-justify sm:text-2xl lg:text-4xl'>
                        Share your EPK unique URL with
                        industry professionals and track your
                        engagement with!
                    </div>

                </div>
            </div>

        </>
    )
}
export default Landing5;