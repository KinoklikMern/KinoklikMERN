import React from "react";
import { Link, NavLink } from 'react-router-dom';
import HomeMainFilm from "../components/HomeMainFilm";
import '../styles/Home1.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faComment } from "@fortawesome/free-solid-svg-icons";
import { fas, faCoffee, faHouse, faSackDollar, faBookBookmark, faBookmark, faShare, faShareFromSquare, faShareNodes, faBars, faMagnifyingGlass, faFilm, faVolumeHigh, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
//import { Icon } from '@mui/material';
//import LocalMallIcon from '@mui/icons-material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Icon from '@mui/material/Icon';


const Home = () => {
    return (
        <div>
            <section id="home">
            <div className="menu-icon">
                <Link to="/bookmark"> <FontAwesomeIcon icon={faBookmark} /> </Link>
                <FontAwesomeIcon icon={faSackDollar} />
                <FontAwesomeIcon icon={faShareNodes} />
            </div>
            <div className="menu-icon1">
                <FontAwesomeIcon icon={faBars} />
                <FontAwesomeIcon icon={faWindowRestore} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <FontAwesomeIcon icon={faFilm} />
                <FontAwesomeIcon icon={faVolumeHigh} />
            </div>
                <div className='c-row1'>
                    <h1 className="movieTitle">JOKER</h1> 
                    <p className="movieIntro">Dramatic film about a sad who goes through shit in life. "Joker" centers
                    around the iconic arch-nemesis and is an original, standalone story not seen 
                    before on the big screen.</p>
                </div>
                <HomeMainFilm />
            </section>            
        </div>
         
    )
}

export default Home;