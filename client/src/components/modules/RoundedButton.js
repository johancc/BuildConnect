import React from "react";
import Button from "react-bootstrap/Button";


const buttonStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "15px 15px 15px 5px",
    color: "#FFFFFF",
    backgroundColor: "#DF4F59",
    textTransform: 'none',
}


const RoundedButton = ({label, callback}) => {
    return (
        <Button variant="outline" style={buttonStyle} onClick={callback}>
            {label}
        </Button>
    )
}

export const RoundedButtonLink = ({label, link}) => {
    return (
        <Button as="a" variant="outline" style={buttonStyle} href={link} target="_blank">
            {label}
        </Button>
    )
}

export default RoundedButton;