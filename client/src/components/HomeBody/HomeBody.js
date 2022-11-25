import React from 'react';
import "./HomeBody.css";
import List from "../List/List";
import Sponsored from '../Sponsored/Sponsored';


const HomeBody = () => {
    return (
        <>
            <div className="home">
                <div className="listTitle">
                    <span>MY FAVOURITES</span>
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
        </>
    );
};

export default HomeBody;
