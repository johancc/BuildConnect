import React from "react";

// Scrolling
import { refs, scrollToRef } from "../../modules/Ref.js";

// Styling
import "./Home.css";
import RoundedButton, { RoundedButtonLink } from "../../modules/RoundedButton.js";

// Images
// Join
import ProjectTop from "../../../assets/images/volunteer_top.svg";
import ProjectBotom from "../../../assets/images/volunteer_bottom.svg";
// Mentor
import MentorTop from "../../../assets/images/mentor_top.svg";
import MentorBottom from "../../../assets/images/mentor_bottom.svg";
// Portfolio
import PortfolioTop from "../../../assets/images/portfolio_top.svg";
import PortfolioBottom from "../../../assets/images/portfolio_bottom.svg";

const EMAIL = "buildconnectteam@gmail.com";
const APPLY_STUDENT = "https://forms.gle/6vmx1AMtjzw3kbZY9";
const APPLY_MENTOR = "https://forms.gle/W2GGGDUW3J6NEZnYA";
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

    const applyButtons = (
        <div className="container">
            <div className="row justify-content-md-center">

            <div className="col-md-3  Home-apply">
                    <RoundedButtonLink label={"Apply as a Student "} link={APPLY_STUDENT} newTab/>
            </div>
            <div className="col-md-3  Home-apply">
                <RoundedButtonLink label={"Apply as a Mentor"} link={APPLY_MENTOR}/>
            </div>

        </div>
        </div>
    )

    const mentorSection = makeSection("Keep in constant touch with mentors and get their feedback", "Keep in constant touch with mentors and get their feedback")
    const mentorBox = moveBoxDown((
        <>
        <img src={MentorTop} width="100%"/>
        <img src={MentorBottom} width="100%" />
        </>
    ));
    
    const communitySection = makeSection(MOCK_DATA.portfolio, MOCK_DATA.join);
    const award = moveBoxDown((
        <img src={PortfolioTop} width="100%"/>
    ))


    const contactSection = (
        <div>
          
                {makeSmallTitle("Contact Us")}
       
           
                {makeSection("Have questions or suggestions for new features?")}

       
                <div className="row">
                    <div className="col-md-4">
                        <RoundedButtonLink label={"Send a message"} link={"mailto:"+EMAIL} />
                    </div>
                   
                </div>

                {moveBoxDown(makeSmallTitle(EMAIL))}

                {makeSmallTitle("Grace Hsu - Johan Cervantes - Yanni Wang - Vanasa Liu")}
            </div>

    )
    const aboutSection = (
        <div>
            {makeSmallTitle("About Us")}
            {makeSection("We are a group of undergraduates from various universities who were brought together with the goal of helping students who lost their summer plans to recreate the work experience as closely as possible. ")}
        </div>
    );

    return (
        <>
        <section id="title" className="Home-titleContainer">
            <div className="container">
                <div className="Home-title">Explore new projects and build connections</div>
                <div className="Home-subtitle">Join the community of innovative college students, Explore existing projects or post your own for others to join, Get access to industry professional mentors for your group.</div>
                {applyButtons}
            </div>
        </section>
            <section id="showcase">
                
                <div className="Home-showcase graybg">
                    
                    <div className="u-screenCenter Home-showcaseSection Home-flex">
                        <div className="col-md-7" >{joinSection}</div>
                        <div className="col-md-5">
                            <img src={ProjectTop} width="100%" />
                            <img src={ProjectBotom} width="100%" />
                        </div>
                    </div>
                    
                    <div className=" u-screenCenter Home-showcaseSection Home-flex">
                        <div className="col-md-7">{mentorSection}</div>
                        <div className="col-md-5">{mentorBox}</div>
                    </div>
                    <div className="u-screenCenter Home-showcaseSection Home-flex">
                        <div className="col-md-7">{communitySection}</div>
                        <div className="col-md-5">
                            <img src={PortfolioTop} width="100%" />
                            <img src={PortfolioBottom} width="100%" />
                        </div>
                    </div>
                </div>
            </section>
        
            
            <section ref={ (ref) => refs.about=ref} id="about" className="Home-flex Home-titleContainer u-screenCenter">
                {aboutSection}
            </section>
            <section ref={(ref) => refs.contact = ref} id="contact" className="Home-flex Home-titleContainer u-screenCenter">
                {contactSection}
            </section>
        </>
    );
}

export default Home;