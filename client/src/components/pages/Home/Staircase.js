import React from "react";
import "./Staircase.css";

import Trophy from "../../../assets/images/trophy.svg";

const Staircase = () => {
    return (
        <div className="Staircase-container">
            <div><img src={Trophy}/></div>
            <div className="top"/>
            <div className="middle"/>
            <div className="bottom"/>
        </div>
    )
}

export default Staircase;