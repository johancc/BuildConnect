import React from "react";
import RoundedButton from "../../modules/RoundedButton.js";

import "./Contact.css";

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
        {makeSmallTitle("Contact Us")}
        {makeSection("Have questions or suggestions for new features? Send us a message.")}
        <RoundedButton label={"Send us an email"} callback={() => alert("email")} />
    </div>)
}