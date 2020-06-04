import React from "react";
import InputGroup from "react-bootstrap/InputGroup";

const buttonStyle = {
    width: "100%",
    height: "100%",
    padding: "4px",
    borderRadius: "15px 15px 15px 5px",
    textTransform: 'none',
}

const RoundedCheckBox = ({ label, bgcolor, onClick}) => {
    let style = buttonStyle;
    if (bgcolor) {
        console.log("Setting bg color to " + bgcolor)
        style.backgroundColor = bgcolor;
    } else {
        style.backgroundColor = "#DF4F59";
    }

    return (
        <div className="container" style={style}>
            <div className="row">
                <div className="col-md-2">
                        <input id="cb" type="checkbox" style={{ width: "1em", height: "1em" }} onClick={onClick}/>
                </div>
                <div className="col-md-6">
                        {label}
                </div>
            </div>
        </div>
    )
};

export default RoundedCheckBox;