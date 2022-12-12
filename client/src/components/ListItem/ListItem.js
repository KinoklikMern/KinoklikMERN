import React from 'react';
import "./ListItem.css";
import IMAGES from "../Itemlist.js";

export default function ListItem() {
    return (
        <>
            {
                IMAGES && IMAGES.map((item) =>
                    <div className="listItem" key={item.id}>
                        <img src={item.image} alt="" />
                    </div>
                )

            }
        </>
    );
}
