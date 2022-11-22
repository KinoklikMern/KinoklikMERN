import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faFilm } from "@fortawesome/free-solid-svg-icons";
import "../styles/HomeBottom.css";
import Button from '@mui/material/Button';

const HomeBottom = () => {
    return (
        <div className="upload">
            <p className='uploadtext'>Upload Your Film</p>
            <FontAwesomeIcon className="uploadFilm" icon={faFilm} />
            <button variant="outlined" size="lg" color="success">Upload Now</button>
            <button>How it Works</button>
        </div>
    )

}

export default HomeBottom;