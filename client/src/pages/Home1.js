import React from "react";
import { NavLink } from 'react-router-dom';
import HomeMainFilm from "../components/HomeMainFilm";
import '../styles/Home1.css';

const Home = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            
                        </div>
                    </div>
                </div>
                <HomeMainFilm />
            </section>
           
        </div>
         
    )
}

export default Home;