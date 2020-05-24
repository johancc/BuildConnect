import React from "react";
import "./Home.css";
import  Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Assets
import BannerImg from "../../public/homeBanner.svg";

export default () => {

    const title = (
        <div>
            <Typography className="Home-desc">
                <h1><b>Explore new projects</b></h1>
                <p>Join the community of innovative college students. Explore existing projects or post your own project for others to join. Get access to industry professional mentors for your group. </p>
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
        <section>
            <Typography>
                <h1>About (coming soon!) </h1>
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
