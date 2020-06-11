/**
 * TODO (6/6/2020):
 *  - Make a resource component for the info box
 *  - For the sake of all that is good in coding, refactor this code.
 *  - Change the project schema to include the mentor.
 */

import React, { Component } from "react";
import JoinRequest from "./JoinRequest.js";
import { UserContext } from "../../../providers/UserProvider";
import { getProjectOwner } from "../../../api.js";
import "./Project.css";

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
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        // The project data is passed from the explore page.
        let projectData = this.props.location.state.projectData;
        this.setState({
            projectData: projectData,
        });
        let owner = await getProjectOwner(projectData, this.context.user.token);
  
        this.setState({
            ownerName: owner.name,
        })
        // this.state = {
        //     projectData: MOCK_DATA,
        // }
    }

    getTitleRow = () => {
        const mainText = (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="title" style={{ marginTop: "1em" }}>
                            {this.state.projectData.projectName}
                        </div>
                        <div className="description">
                            {this.state.projectData.description}
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
                                <div className="infobarInfo">{this.state.projectData.teamSize} People</div>
                            </div>
                        </div>
                    </div>
                </div>

                    {this.state.ownerName || true ? 
                        <div className="col-md-2 infobarLabel">
                            <div className="container">
                                <div className="row">
                                    {TROPHY_ICON}
                                    <div>
                                        Project Owner <br />
                                        <div className="infobarInfo">{this.state.ownerName}</div>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                    }
                   
                    {/* Unused for now: We need to add mentor _ids in the project schema.
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
                    </div> */}
                    {this.state.projectData.timeline !== undefined ?
                        (<div className="col-md-2 infobarLabel">
                            <div className="container">
                                <div className="row">
                                    {TIME_ICON}
                                    <div>
                                        Project  Timeline<br />
                                        <div className="infobarInfo">2 Months</div>
                                    </div>
                                </div>
                            </div>
                        </div>) : <></>}
                    <div className="col-md-4 justify-content-end infoBarLabel ">
                        
                        <div className="col-md-6 float-right">
                            
                            <JoinRequest projectID={this.state.projectData._id}/>
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
        
        // Skills are freeform text for now.
        // let skillCards = skillsNeeded.map((skill) => {
        //     return (<div className="col-md-auto roundedBox">{skill}</div>)
        // });

        return (
            <div className="container extraDetails">
                <br/>
        
                <h3 className="row">Skills Required</h3>
                <div className="row">
                    {skillsNeeded}
                </div>
                <br/>
                <h3 className="row">Learn More</h3>
                <div className="row">
                    <div style={{ wordWrap: "break-word", width: "100%" }}>
                        <a href={this.state.projectData.link} target="_blank">{this.state.projectData.link}</a>

                    </div>
                </div>
            </div>
        )
    }

    getProjectDetails = () => {
        let details = [
            ["About", this.state.projectData.longDescription],
            ["Help Needed",this.state.projectData.helpNeeded],
            ["Team Description",this.state.projectData.teamDescription]
        
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
