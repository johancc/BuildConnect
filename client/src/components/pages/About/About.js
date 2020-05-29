import React from "react";
import "./About.css";

const makeSection = (title, subtitle) => {
    return (
        <div width="100%" height="100%">
            <div className="Contact-title">{title}</div>
            <div className="Contact-subtitle">{subtitle}</div>
        </div>
    )
}

const makeSmallTitle = (title) => {
    return (
        <div className="Contact-smallTitle">{title}</div>
    )
}

export default () => {
    return (
    <div className="u-screenCenter">
        {makeSmallTitle("About Us")}
        {makeSection("We are a group of undergraduates from various universities who were brought together with the goal of helping students who lost their summer plans to recreate the work experience as closely as possible. ")}
        {makeSmallTitle("buildconnect@gmail.com")}
    </div>)
}