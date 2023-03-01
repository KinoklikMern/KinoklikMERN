import React from 'react';
import "./HomeBody.css";
import List from "../List/List";
import Sponsored from '../Sponsored/Sponsored';


const HomeBody = () => {
    return (
        <>
            <div className="home">
                <div className="listTitle">
                    <span>STARRED</span>
                </div>
                <List />

                <div className="listTitle">
                    <span>FOLLOWED</span>
                </div>
                <List />

                <div className="listTitle">
                    <span>COMEDY</span>
                </div>
                <List />

                <div className="listTitle">
                    <span>ROMCOM</span>
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
