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
    <div className="col-md-4">
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
        console.log("Project ID: " + projectID)
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
                        People Needed <br />
                        <div className="infobarInfo">2 Members</div>

                </div>
                    <div className="col-md-2 infobarLabel">
                        Project Owner <br />
                        <div className="infobarInfo">Michael Li</div>
                </div>
                    <div className="col-md-2 infobarLabel">
                        Mentor <br />
                        <div className="infobarInfo">Marzia</div>
                </div>
                    <div className="col-md-2 infobarLabel">
                        Project Timeline <br />
                        <div className="infobarInfo">1 Month</div>
                </div>
                <div className="col-md-2 infoBarLabel">
                    <RoundedButton label="Join" bgcolor="#13133A" />
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


    getProjectDetails = () => {
        let details = [
            ["About", "You should give an overview of your project here. Make it exciting. Talk about why you started this. Show people that you care. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"],
            ["Help Needed", "How can people help? Are there any specific things that need to be built? Should they be comfortable with python? UX? Management?"],
            ["Current Status", "Out team members are based on the each coast. Some of the include Alyssa P Hacker (allysa@mit.edu) and Ben Bitdiddle (benbit@mit.edu)."]
        
        ]
        return (
            <div className="container">

                <div className="row">
                        {details.map((detail) => ProjectDetail(detail[0], detail[1]))}
                </div>
            </div>
        )
    }
    render() {
        if (this.state.projectData === undefined) return <></>

        const titleRow = this.getTitleRow();
        const projectDetails = this.getProjectDetails();

        return (
            <div className="project">
                {titleRow}
                {projectDetails}
            </div>
        )
    }
}
export default Project;
