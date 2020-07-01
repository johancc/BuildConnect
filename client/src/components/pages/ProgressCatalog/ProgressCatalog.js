import React, { Component } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "../../../providers/UserProvider.js";
import { getTeams, getProject } from "../../../api.js";

// Assets
import RoundedButton from "../../modules/RoundedButton.js";
import PeopleSVG from "../../../assets/icons/checkbox.svg";
import GoSVG from "../../../assets/icons/go.svg";
import project from "../../../../../server/models/project.js";
const DARK_BLUE = "#13133A";
const PeopleIcon = (<img src={PeopleSVG} alt="" />);
const GoIcon = GoSVG;

// Helper methods.
let generateTeamCard = (team) => {
    console.log(team);
    return (<h1>hi</h1>)
    const projectData = team.projectData; // team.projectData
    return (
        <div className="ProjectBox">
            <img src={projectData.photoURL} style={{ width: "100%", objectFit: "cover" }} />

            <div className="col-md-12">
                <h3> {projectData.projectName} </h3>
                <p> {projectData.shortDescription} </p>
                <div>{PeopleIcon} {projectData.teamSize} members </div>
                <br />
            </div>
            <RoundedButton label="Learn More" icon={GoIcon} bgcolor={DARK_BLUE}
                callback={() => { navigate("/InProgressProject", { state: { projectData: projectData } }) }} />
        </div>);
};

class ProgressCatalog extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            teams : [],
        }
    }

    async componentDidMount() {
        // Get in progress 
        getTeams(this.context.user.token)
        .then(async (teams) => {
            // Teams only contain the _id of the project.
            teams = await teams.map(async (team) => {
                let projectData = await getProject(team.project, this.context.user.token);
                team.projectData = projectData;
                return team;
            })
            return teams;
        })
        .then((teams) => 
            {console.log(teams);
            this.setState({teams: []})});
    }

    getTitle() {
        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6">
                        <h1>In The Works</h1>
                        <br />
                        <h2>Join the community of innovative college students,
                        Explore existing projects, or post your own for others
                        to join.
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    getTeamListings() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.teams.map((team) => {
                        return (
                            <div className="x mt-3 mb-3 col-md-4">
                                {generateTeamCard(team)}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    getTeamSection() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        hi
                    </div>
                </div>
            </div>

        )
    }

    render() {
        let titleRow = this.getTitle();
        let teams = this.state.teams.length !== 0 ? this.getTeamSection() : (<></>);

        return (
            <>
                {titleRow}
                <br />
                {teams}
            </>
        )
    }

}

export default ProgressCatalog;