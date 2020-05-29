import React from "react";


// Styling
import "./Home.css";
import Buttom from "react-bootstrap/Button";
import FancyCard from "../../modules/FancyCard.js";
import Testimonial from "./Testimonial.js";
import Staircase from "./Staircase.js";

const MOCK_DATA = {
    img: "https://miro.medium.com/max/2560/1*yOmBkzDKE6HuWOvrWw1E1Q.jpeg",
    title: "Get Artsy at Home",
    description: "Build an interactive museum experience by using GANs to stylize the world around you.",
    quote: "\"In order to decide on the most useful datasets for this project, I think you should talk to people who have been doing research in the field. I know someone in the healthcare industry that I’d be happy to make an introduction for you!\" ",
    portfolio: "Create and showcase portfolio-worthy work to potential job opportunities",
    join: "Join the community of innovative college students, explore existing ",

}

const moveBoxDown = (box) => {
    return (
        <div style={{paddingTop: "5em"}}>
            {box}
        </div>
    )
}

const makeSection = (title, subtitle) => {
    return (
        <div width="100%" height="100%">
            <div className="Home-title">{title}</div>
            <div className="Home-subtitle">{subtitle}</div>
        </div>
    )
}

const makeSmallTitle = (title) => {
    return (
        <div className="Home-smallTitle">{title}</div>
    )
}
const Home = () => {

    const joinSection = makeSection("Find projects that align with your skillsets and interest", "Join the community of innovative college students, explore existing...");
    const projectBox = (moveBoxDown(FancyCard(MOCK_DATA.img, MOCK_DATA.title, MOCK_DATA.description)));
    

    const mentorSection = makeSection("Keep in constant touch with mentors and get their feedback", "Keep in constant touch with mentors and get their feedback")
    const mentorBox = moveBoxDown(Testimonial("", "", MOCK_DATA.quote, ""));
    
    const communitySection = makeSection(MOCK_DATA.portfolio, MOCK_DATA.join);
    const award = moveBoxDown((<Staircase />))

    const contactSection = (
        <div>
            {makeSmallTitle("Contact Us")}
            {makeSection("Have questions or suggestions for new features? Send us a message.")}
        </div>
    )

    const aboutSection = (
        <div>
            {makeSmallTitle("About Us")}
            {makeSection("We are a group of undergraduates from various universities who were brought together with the goal of helping students who lost their summer plans to recreate the work experience as closely as possible. ")}
            {makeSmallTitle("buildconnect@gmail.com")}
        </div>

    )
    return (
        <>
            <section id="title" className="Home-flex Home-titleContainer">
                <div className="col-md-12">
                    <div className="Home-title">Explore new projects and about connections</div>
                    <div className="Home-subtitle">Join the community of innovative college students, Explore existing projects or post your own for others to join, Get access to industry professional mentors for your group.</div>
                </div>
              </section>
            <section id="showcase">
                
                <div className="Home-showcase">
                    
                    <div className="u-screenCenter Home-showcaseSection Home-flex">
                        <div className="col-md-7">{joinSection}</div>
                        <div className="col-md-5">{projectBox}</div>
                    </div>
                    <div className=" u-screenCenter Home-showcaseSection Home-flex">
                        <div className="col-md-7">{mentorSection}</div>
                        <div className="col-md-5">{mentorBox}</div>
                    </div>
                    <div className="u-screenCenter Home-showcaseSection Home-flex">
                        <div className="col-md-7">{communitySection}</div>
                        <div className="col-md-5">{award}</div>
                    </div>
                </div>
            </section>
        
            <section id="contact" className="Home-flex Home-titleContainer u-screenCenter">
                {contactSection}
            </section>
            <section id="about" className="Home-flex Home-titleContainer u-screenCenter">
                {aboutSection}
            </section>

        </>
    );
}

export default Home;