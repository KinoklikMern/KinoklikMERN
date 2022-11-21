import React from "react";
import { NavLink } from 'react-router-dom';
import HomeMainFilm from "../components/HomeMainFilm";
import '../styles/Home1.css';

const Home = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className='c-row1'>
                        <h1 className="movieTitle">JOKER</h1> 
                        <p className="movieIntro">Dramatic film about a sad who goes through shit in life. "Joker" centers
                        around the iconic arch-nemesis and is an original, standalone story not seen 
                        before on the big screen.</p>
                    </div>
                </div>
                <HomeMainFilm />
            </section>
           
        </div>
         
    )
}

export default Home;