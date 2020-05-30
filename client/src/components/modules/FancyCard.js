import React from "react";
import "./FancyCard.css";

/**
 * A card with a picture, description, and a button
 */
const FancyCard = (img, title, description, actionLabel, callback) => {
    return (
        <div className="FancyCard-container">
            <img src={img}/>
            
            {actionLabel && callback ? <></> : <></>}
            
            <h1>{title}</h1>
            <p>{description}</p>
            
        </div>
    )
}

export default FancyCard;
