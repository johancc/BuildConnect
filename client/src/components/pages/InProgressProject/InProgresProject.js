import React, { Component } from "react";
import {UserContext} from "../../../providers/UserProvider.js";
import { getProjectOwner } from "../../../api.js";

// Assets
import HandSVG from "../../../assets/images/people_needed.svg";
import TimeSVG from "../../../assets/images/project_timeline.svg";
import TrophySVG from "../../../assets/images/project_owner.svg";
import "../Project/Project.css";
import "./InProgressProject.css";
const HAND_ICON = (<img src={HandSVG} />);
const TIME_ICON = (<img src={TimeSVG} />);
const TROPHY_ICON = (<img src={TrophySVG} />)
const MOCK_UPDATE = {
    title: "The Premise",
    date_posted: Date.now(),
    description: "Out team members are based on the each coast. \
    Some of the include Alyssa P Hacker (allysa@mit.edu) and Ben Bitdiddle (benbit@mit.edu).",
    image: "https://cdn.shopify.com/s/files/1/1260/4715/products/2131-60-silvergray_8d500761-2f28-40b1-8cbd-8ded6903fbb5_2000x.png?v=1533073130",
}
/*
Generates a box outlining the update of a project.
An update has the following structure - 
{
    title: string,
    date: Date,
    description: string,
    image: string,
}
TODO: Support images.
*/

const updateFactory = (update) => {
    if (update.description.length === 0 || update.title.length == 0) {
        return;
    }
    const time_ago = FindWeeksPassed(update.date_posted);
    return (
        <div className="ProjectUpdate">
            <h3>{update.title}</h3>
            {time_ago === 0 ? 
                <p>This week</p> :
                <p>{time_ago} weeks ago</p>
            }
            <p>{update.description}</p>
            <img src={update.image}></img>
        </div>
    )
}

// Helper function to print dates nicely.
const FindWeeksPassed =  (priorMilli) => {
    const todayMilli = Date.now();
    const milliDelta = todayMilli - priorMilli;
    const millis_in_a_week = 604800000;
    const milliWeeks = milliDelta / millis_in_a_week;
    return Math.floor(milliWeeks);
}

class InProgressProject extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            ownerName: "",
        }
    }

    async componentDidMount() {
        let projData = this.props.location.state.projectData;

        let owner = await getProjectOwner(projData, this.context.user.token);
        this.setState({
            ownerName: owner.name,
        });
    }

    getProjectInfoCol = () => {
        const projectData = this.props.location.state.projectData;
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
                    {this.state.ownerName ?
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
        let cards = [MOCK_UPDATE].map((update)=>updateFactory(update));
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="description" style={{marginTop: "3em", marginBottom: "1em"}}>
                            Updates
                        </div>
                        {cards}
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