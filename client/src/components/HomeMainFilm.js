import React from 'react';
import { mainFilm } from './Category';
import "../styles/HomeMainFilm.css";

const HomeMainFilm = () => {
    return (
        <div className="c-container">
            
            <div className="c-row tw-overflow-hidden">
                {mainFilm.map((item) =>(
                    <div className="c-col tw-rounded-2xl tw-ml-5 tw-opacity-50 " key={item._id}>
                        <img className='' src={item.image} alt={item.title} />
                        {/* <div className="category-content"> */}
                            {/* <p>{item.title}</p>
                            <button className='c-btn'>Learn more</button> */}
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default HomeMainFilm;