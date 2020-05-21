import React from "react";
import "./Home.css";
import  Typography from "@material-ui/core/Typography";
import Button from "react-bootstrap/Button";

// Assets
import splash from "../../public/splash.svg";

export default () => {

    const title = (
        <div>
            <Typography className="Home-desc">
                <h1><b>Explore new projects</b></h1>
                <p>Join the community of innovative college students. Explore existing projects or post your own project for others to join. Get access to industry professional mentors for your group. </p>
            </Typography>
            <Button variant="primary" size="lg">
                Apply now
            </Button>
            <br/>
            <br/>
            <Typography>
                <p fontSize="16px">Looking to be a mentor? <a color="primary" href="/mentorjoin">Join</a></p>
            </Typography>
        </div>
    )
    
    const banner = (
        <>
            <img src={splash} alt=""/>
        </>
    )
    return (
    <div className="Home-landing">
        <div className="Home-banner col-md-6">
            {title}
        </div>
        <div className="Home-title col-md-6">
            {banner}
        </div>
    </div>)
}
