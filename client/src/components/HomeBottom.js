import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/HomeBottom.css";

const HomeBottom = () => {
    return (
        <div className="upload">
            <p className='uploadtext'>Upload Your Film</p>
            <FontAwesomeIcon className="uploadFilm" icon={faFolderPlus} />
            <button className='uploadNow'>Upload Now</button>
            <button className='howWork'>How it Works</button>
        </div>

    )
}
export default HomeBottom;