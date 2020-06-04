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


const RoundedButton = ({label, icon, callback, bgcolor}) => {
    let style = {...buttonStyle };
    if (bgcolor) {
        style.backgroundColor = bgcolor;
    }
    if (!label || label.length===0) {
        return (
            <Button className="btn-lg" variant="outline" style={style} onClick={callback}>
                {icon}
            </Button>
        )
    } else if (!icon) {
        return (
            <Button className="btn-lg" variant="outline" style={style} onClick={callback}>
                {label}
            </Button>
        )
    }
    return (
        <Button className="btn-lg"  variant="outline" style={style} onClick={callback}>
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        {label}
                    </div>
                    <div className="col-md-2">
                        <img src={icon} />
                    </div>
                </div>
            </div>
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