import React from 'react';
import { mainFilm } from './Category';
import "../styles/HomeMainFilm.css";

const HomeMainFilm = () => {
    return (
        <div className="c-container">
            
            <div className="c-row">
                {mainFilm.map((item) =>(
                    <div className="c-col  tw-opacity-50" key={item._id}>
                        <img src={item.image} alt={item.title} />
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