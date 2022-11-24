import React from 'react';
import "../styles/Homebody.css";
import List from "../components/List/List";
import Sponsored from '../components/Sponsored/Sponsored';
import Festival from '../components/Festival/Festival';


const Homebody = () => {
    return (
        <>
            {/* <div className="home">
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

                <div className="listTitle">
                    <span>From The Festivals</span>
                </div>
                <div className='kk'></div>
            </div> */}

            <div>
                <Festival />
            </div>

        </>

    );
};

export default Homebody;
