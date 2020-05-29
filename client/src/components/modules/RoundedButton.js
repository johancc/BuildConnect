import React from "react";
import Button from "react-bootstrap/Button";
const roundedStyle = {
    borderRadius: "15px 15px 15px 5px",
    backgroundColor: "black",
    textAlign: "center",
};

const linkStyle = {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "24px",
    lineHeight: "40px",
    color: "#FFFFFF",
}

const RoundedButton = ({label, callback}) => {
    return (
        <div style={roundedStyle}>
            <Button variant="outline" style={linkStyle} onClick={() => callback()}>
                {label}
            </Button>
        </div>
    )
}

export default RoundedButton;