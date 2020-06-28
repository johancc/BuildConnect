import React, { Component } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "../../../providers/UserProvider.js";
import { getTeams } from "../../../api.js";

// Assets
import RoundedButton from "../../modules/RoundedButton.js";
import PeopleSVG from "../../../assets/icons/checkbox.svg";
import GoSVG from "../../../assets/icons/go.svg";
const DARK_BLUE = "#13133A";
const PeopleIcon = (<img src={PeopleSVG} alt="" />);
const GoIcon = GoSVG;

// Helper methods.
let generateTeamCard = (proj) => {
    return (
        <div className="ProjectBox">
            <img src={proj.photoURL} style={{ width: "100%", objectFit: "cover" }} />

            <div className="col-md-12">
                <h3> {proj.projectName} </h3>
                <p> {proj.shortDescription} </p>
                <div>{PeopleIcon} {proj.teamSize} members </div>
                <br />
            </div>
            <RoundedButton label="Learn More" icon={GoIcon} bgcolor={DARK_BLUE}
                callback={() => { navigate("/InProgressProject", { state: { projectData: proj } }) }} />
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

    componentDidMount() {
        // Get in progress 
        getTeams(this.context.user.token)
        .then((teams) => this.setState({teams: teams}))
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

    getProjectListings() {
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

    getTeamColumn() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {this.getProjectListings()}
                    </div>
                </div>
            </div>

        )
    }

    render() {
        let titleRow = this.getTitle();
        let teams = this.state.teams.length !== 0 ? this.getTeamColumn() : (<></>);

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