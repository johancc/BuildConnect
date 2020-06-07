/**
 * TODOS 1:43AM:
 *      Add the icons to the site
 *      make the inforow two columns justified between, with the left column having a row with space-between
 *      Move from hardcode to server reply.
 *      Find a background balance.
 * 
 */

import React, { Component } from "react";
import "./Project.css";

// Styling
import RoundedButton from "../../modules/RoundedButton.js";

// Assets 
import AwardSVG from "../../../assets/icons/mentor.svg";
import HandSVG from "../../../assets/images/people_needed.svg";
import TimeSVG from "../../../assets/images/project_timeline.svg";
import TrophySVG from "../../../assets/images/project_owner.svg";
import MembersSVG from "../../../assets/icons/members.svg";

const MEMBERS_ICON = (<img src={MembersSVG}/>);
const MENTOR_ICON = (<img src={AwardSVG}/>);
const HAND_ICON = (<img src={HandSVG}/>);
const TIME_ICON = (<img src={TimeSVG}/>);
const TROPHY_ICON = (<img src={TrophySVG}/>)
const MOCK_DATA = {
    title: "The Next Big Thing",
    shortDescription: "Join the community of innovative college students, Explore existing projects or post your own for others to join.",
    date: "3",
    imageURL: "https://croud123.wpengine.com/wp-content/uploads/2015/09/landing-page-banner.jpg",
    memberCount: 10,
    skillsNeeded: ["Breathing", "Existing", "Walking", "Racing"],
}

const ProjectDetail = (title, text) => {
    return (
    <div className="col-md-6">
            <div className="ProjectBox">
                <div className="ProjectBox-label">
                    {title}
                </div>
                <div className="ProjectBox-text" width="fit-content">
                    {text}
                </div>
            </div>
    </div>);
}
/**
 * Displays the information about a given project and allows
 * users to join.
 * Uses the relative path to find the project id
 */
class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectData: MOCK_DATA,
        }
    }

    componentDidMount() {
        let projectID;
    }

    getTitleRow = () => {
        const mainText = (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="title" style={{ marginTop: "1em" }}>
                            {this.state.projectData.title}
                        </div>
                        <div className="description">
                            {this.state.projectData.shortDescription}
                        </div>
                    </div>
                </div>
            </div>
            
        )
        
        const infoRow = (
            <div className="container">

                <div className="row justify-content-between " >
                    
                    <div className="col-md-2 infobarLabel">
                        <div className="container">
                            <div className="row">
                                {HAND_ICON} 
                                <div>
                                    People Needed <br />
                                    <div className="infobarInfo">2 People</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 infobarLabel">
                        <div className="container">
                            <div className="row">
                                {TROPHY_ICON}
                                <div>
                                    Project Owner <br />
                                    <div className="infobarInfo">Michael Li</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 infobarLabel">
                        <div className="container">
                            <div className="row">
                                {MENTOR_ICON}
                                <div>
                                    Mentor <br />
                                    <div className="infobarInfo">Marzia</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 infobarLabel">
                        <div className="container">
                            <div className="row">
                                {TIME_ICON}
                                <div>
                                    Project  Timeline<br />
                                    <div className="infobarInfo">2 Months</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 justify-content-end infoBarLabel ">
                        
                        <div className="col-md-6 float-right">
                            <RoundedButton label="Join" bgcolor="#13133A" />
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                    {mainText}
                    <br/>
                    
                    <br/>
                    {infoRow}
            </div>
        )
    }

    getExtraDetailBox = () => {
        let skillsNeeded = this.state.projectData.skillsNeeded;
        
        let skillCards = skillsNeeded.map((skill) => {
            return (<div className="col-md-auto roundedBox">{skill}</div>)
        });

        return (
            <div className="container extraDetails">
                <br/>
                <h3 className="row">Current Team Size</h3>
                <div className="row">{MEMBERS_ICON} 6 Members</div>
                <br/>
                <h3 className="row">Skills Required</h3>
                <div className="row">
                    {skillCards}
                </div>
                <br/>
                <h3 className="row">Resources</h3>
                <div className="row">
                    Resource 2
                </div>
            </div>
        )
    }

    getProjectDetails = () => {
        let details = [
            ["About", "You should give an overview of your project here. Make it exciting. Talk about why you started this. Show people that you care. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"],
            ["Help Needed", "How can people help? Are there any specific things that need to be built? Should they be comfortable with python? UX? Management?"],
            ["Current Status", "Out team members are based on the each coast. Some of the include Alyssa P Hacker (allysa@mit.edu) and Ben Bitdiddle (benbit@mit.edu)."]
        
        ]
        return (
            <div className="container">

                <div className="row">
                        <div className="col-md-3">
                            {this.getExtraDetailBox()}
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                {details.map((detail) => ProjectDetail(detail[0], detail[1]))}
                            </div>
                        </div>
                </div>
            </div>
        )
    }
    render() {
        if (this.state.projectData === undefined) return <></>

        const titleRow = this.getTitleRow();
        const projectDetails = this.getProjectDetails();

        return (
            <>
                <div className="project">
                    {titleRow}
                </div>
                <div className="greybg">
                    {projectDetails}
                </div>
            </>
        )
    }
}
export default Project;
