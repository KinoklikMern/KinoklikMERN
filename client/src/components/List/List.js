import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./List.css";
import React from 'react';

export default function List() {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 58;
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            // listRef.current.style.transform = `translateX(${339 + distance}px)`;
            listRef.current.style.transform = `translateX(${1391 + distance}px)`;

            console.log(distance)

        }
        if (direction === "right"
            && slideNumber < 2
        ) {
            setSlideNumber(slideNumber + 1);
            // listRef.current.style.transform = `translateX(${-339 + distance}px)`;
            listRef.current.style.transform = `translateX(${-1391 + distance}px)`;

            console.log(distance)
        }
    };
    return (
        <div className="list">
            <span className="listTitle">MY PURCHASES</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                <div className="container" ref={listRef}>
                    <ListItem index={0} />
                    <ListItem index={1} />
                    <ListItem index={2} />
                    <ListItem index={3} />
                    <ListItem index={4} />
                    <ListItem index={5} />
                    <ListItem index={6} />
                    <ListItem index={7} />
                    <ListItem index={8} />
                    <ListItem index={9} />
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}
