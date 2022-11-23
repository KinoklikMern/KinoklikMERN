import React from 'react';
import "./Home2.css";
import List from "../components/List/List";
import Sponsored from '../components/Sponsored/Sponsored';

const Home2 = () => {
    return (
        <div className="home">
            <div className="listTitle">
                <span>MY PURCHASES</span>
            </div>
            <List />

            <div className="listTitle">
                <span>HORROR FILMS</span>
            </div>
            <List />

            <div className="listTitle">
                <span>COMEDY FILMS</span>
            </div>
            <List />

            <div className="listTitle">
                <span>ROMCOM FILMS</span>
            </div>
            <List />

            <div className="listTitle">
                <span></span>
            </div>

            <div className="sponsTitle">
                <span>SPONSORED RELEASED</span>
            </div>
            <Sponsored />

        </div>
    );
};

export default Home2;
