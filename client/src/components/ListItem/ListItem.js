import React from 'react';
import "./ListItem.css";
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";

export default function ListItem({ index }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="listItem">
            <img
                src="https://m.media-amazon.com/images/I/71PR1evv9aL._AC_SY879_.jpg"
                alt=""
            />

        </div>
    );
}
