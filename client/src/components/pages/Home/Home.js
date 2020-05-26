import React from "react";
import "./Home.css";
import  Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { aboutUs } from "../../../Constants.js";

// Assets
import BannerImg from "../../../public/homeBanner.svg";

export default () => {

    const title = (
        <div>
            <Typography className="Home-desc" style={{
                                                    fontSize: "300px", 
                                                    letterSpacing: "2px",
                                                    fontWeight: 400, 
                                                    marginBottom: 32}}>
                <h1><b>Explore new projects</b></h1>
            </Typography>
            <Typography style={{fontSize: "200px", fontWeight: 100, letterSpacing: "1px", marginBottom: 32}}>
                <h3>Join the community of innovative college students. Explore existing projects or post your own project for others to join. Get access to industry professional mentors for your group. </h3>
            </Typography>
            <Button size="large" style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "150px"
                }}>
                    Apply now
            </Button>
            <br/>
            <br/>
       
        </div>
    )
    
    const banner = (
        <>
            <img src={BannerImg} alt="" className="Home-img"/>
        </>
    )


    const topSection = (
        <section className="Home-top">
            <div className="Home-title col-md-6">
                {title}
            </div>
            <div className="Home-banner col-md-6">
                {banner}
            </div>
        </section>
    );

    const middleSection = (
        <section className="Home-middle">
            <Typography style={{}}>
                <h1>About Us </h1>
            </Typography>
            <Typography style={{ fontSize: "24px"}}>
                <p>{aboutUs}</p>
            </Typography>
        </section>
    )

    return (
        <div className="Home-landing" style={{height: "100vh", width: "100%"}}>
            {topSection}
            {middleSection}
        </div>
    )
}
