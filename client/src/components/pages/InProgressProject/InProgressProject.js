import React, { Component } from "react";
import {UserContext} from "../../../providers/UserProvider.js";

// Assets
import HandSVG from "../../../assets/images/people_needed.svg";
import TimeSVG from "../../../assets/images/project_timeline.svg";
import TrophySVG from "../../../assets/images/project_owner.svg";
import "../Project/Project.css";
import "./InProgressProject.css";
const HAND_ICON = (<img src={HandSVG} />);
const TIME_ICON = (<img src={TimeSVG} />);
const TROPHY_ICON = (<img src={TrophySVG} />);
/*
Generates a box outlining the update of a project.
An update has the following structure - 
{
    title: string,
    date: Date,
    description: string,
    image: string,
}
*/

const updateFactory = (update) => {
    if (update.description.length === 0 || update.title.length == 0) {
        return;
    }
    const time_ago = FindWeeksPassed(update.date);
    return (
        <div className="ProjectUpdate">
            <h3>{update.title}</h3>
            {time_ago <= 0 ? 
                <p>This week</p> :
                <p>{time_ago} weeks ago</p>
            }
            <p>{update.description}</p>
            <img src={update.image}></img>
        </div>
    )
}

// Helper function to print dates nicely.
const FindWeeksPassed =  (startTime) => {
    const todayMilli = Date.now();
    const milliDelta = todayMilli - startTime;
    const millis_in_a_week = 604800000;
    const milliWeeks = milliDelta / millis_in_a_week;
    return Math.floor(milliWeeks);
}

class InProgressProject extends Component {
    static contextType = UserContext;

    getProjectInfoCol = () => {
        console.log(this.props);
        const team = this.props.location.state.team;
        console.log(team);
        const projectData = team.projectData;
    
        const mainText = (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title" style={{ marginTop: "1em" }}>
                            {projectData.projectName}
                        </div>
                        <div className="description">
                            {projectData.shortDescription}
                        </div>
                    </div>
                </div>
            </div>

        )

        const infoRow = (
            <div className="container">

                <div className="row">
                    
                    <div className="col-md-2 infobarLabel">
                        <div className="container">
                            <div className="row">
                                {HAND_ICON}
                                <div>
                                    People Needed <br />
                                    <div className="infobarInfo">{projectData.teamSize} People</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {team.teamName ?
                        <div className="col-md-2 infobarLabel">
                            <div className="container">
                                <div className="row">
                                    {TROPHY_ICON}
                                    <div>
                                        Project Owner <br />
                                        <div className="infobarInfo">{team.teamName}</div>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                    }
                    {projectData.timeline !== undefined ?
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
                </div>
            </div>
        )
        return (
            <div>
                {mainText}
                <br />

                <br />
                {infoRow}
            </div>
        )
    
    };

    getUpdatesCol = () => {
        if (this.props.location.state.team.projectData === undefined) {
            return(<> </>)
        }
        const updates = this.props.location.state.team.updates.map((update)=>updateFactory(update));
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="description" style={{marginTop: "3em", marginBottom: "1em"}}>
                            Updates
                        </div>
                        {updates}
                    </div>
                </div>
            </>
        );
    }


    render() {
        const projectDescription = this.getProjectInfoCol();
        const updateCol = this.getUpdatesCol();
        return (
            <div className="container">
                <div className="row justify-content-between">

                    <div className="col-md-5">
                        <div className="row">
                            {projectDescription}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            {updateCol}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default InProgressProject;