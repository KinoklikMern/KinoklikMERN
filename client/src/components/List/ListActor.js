import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItemActor from "../ListItem/ListItemActor";
import "./List.css";
import React from "react";

export default function List({ title, status, type, role }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 62;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${1391 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 2) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-1391 + distance}px)`;
    }
  };
  return (
    <div className='list'>
      <div className='wrapper'>
        <ArrowBackIosOutlined
          className='sliderArrow left'
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className='container' ref={listRef}>
          <ListItemActor
            title={title}
            status={status}
            type={type}
            role={role}
          />
        </div>
        <ArrowForwardIosOutlined
          className='sliderArrow right'
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
