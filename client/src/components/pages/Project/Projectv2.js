import React, { Component } from "react";
import "./Project.css";

// Styling
import RoundedButton from "../../modules/RoundedButton.js";

const PEOPLE_ICON = "";
const TIME_ICON = "";
const MOCK_DATA = {
    title: "The Next Big Thing",
    shortDescription: "Join the community of innovative college students, Explore existing projects or post your own for others to join.",
    date: "3",
    imageURL: "https://croud123.wpengine.com/wp-content/uploads/2015/09/landing-page-banner.jpg",
    memberCount: 10,
}

const ProjectDetail = (title, text) => {
    return (
    <div className="col-md-4 projectDetails">
            <div className="projectDetail">
                <div className="projectDetail-label">
                    {title}
                </div>
                <div className="projectDetail-text">
                    {text}
                </div>
            </div>
    </div>

    );
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
        console.log("Project ID: " + projectID)
    }

    getTitleRow = () => {
        const titleLeft = (
            <div className="col-md-6">
                <div className="title" style={{marginTop: "2em", marginBottom: "1em"}}>
                    {this.state.projectData.title}
                    {/* // TODO */}
                    {this.state.projectData.mentor ? <></> : <> </>}
                </div>
                <div className="description">{this.state.projectData.shortDescription}</div>
            </div>
        );
        const titleRight = (
            <>
                <div className="col-md-3 align-self-center offset-down bottom ">
                    <div className="stats">10 Members</div>
                    <div className="stats">9 Days ago</div>
                </div>
                <div className="col-md-3 align-self-center offset-down bottom">
                    <RoundedButton label="Join" bgcolor="#13133A"/>
                </div>
            </>
        );

        return (
            <div className="container">
                <div className="row">
                    {titleLeft}
                    {titleRight}
                </div>
            </div>
        )
    }

    getProjectImage = () => {
        return (
            <div className="container" style={{maxHeight: "250px"}}>
                <div className="row">
                    <img className="Project-title-img col-md-12 offset-down" src={this.state.projectData.imageURL}/>
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

                <div className=" row">
                        {details.map((detail) => ProjectDetail(detail[0], detail[1]))}
                </div>
            </div>
        )
    }
    render() {
        if (this.state.projectData === undefined) return <></>

        const titleRow = this.getTitleRow();
        const projectImage = this.getProjectImage();
        const projectDetails = this.getProjectDetails();

        return (
            <>
                {titleRow}
                {projectImage}
                {projectDetails}
            </>
        )
    }
}
export default Project;
