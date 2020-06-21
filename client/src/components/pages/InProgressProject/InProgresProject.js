import React, { Component } from "react";
import {UserContext} from "../../../providers/UserProvider.js";
import { getProjectOwner } from "../../../api.js";
import JoinRequest from "../Project/JoinRequest.js";

// Assets
import HandSVG from "../../../assets/images/people_needed.svg";
import TimeSVG from "../../../assets/images/project_timeline.svg";
import TrophySVG from "../../../assets/images/project_owner.svg";
import "../Project/Project.css";
const HAND_ICON = (<img src={HandSVG} />);
const TIME_ICON = (<img src={TimeSVG} />);
const TROPHY_ICON = (<img src={TrophySVG} />)

const MOCK_UPDATE = {
    img: "",
    title: "",
    description: "",
};

const updateFactory = (update) => {
    return (
        <div className="col-md-12" style={{ width:"500px", height: "320px", margin: "2em", backgroundColor: "gray"}}>
            {update}
        </div>

    )
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
        console.log(projectData);
        const mainText = (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title" style={{ marginTop: "1em" }}>
                            {projectData.projectName}
                        </div>
                        <div className="description">
                            {projectData.longDescription}
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
        let cards = [1,2,3,4].map((update)=>updateFactory(update));
        return (
            <div>
                {cards}
            </div>
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
                    <div className="col-md-5">
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