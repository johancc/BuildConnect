/**
 * This page allows people to find projects, it allows
 * for simple filtering ( skills / author ).
 * This is an authenticated page.
 *  TODOS:
 *      Vertical align the filter checkboxes.
 *      Text overflows out of the checkbox.
 *      Dynamically switch checkbox colors
 *      Make the checkbox a circle instead of a square.
 *      Make the buttons lead to a project page instead of an alert.
 *      Ask vanasa for the people icon.
 * Major TODO:
 *      Connect the server to the backend.
 *  
 */

import React, { Component } from "react";
import { getProjects } from "../../../api.js";
import { navigate } from "@reach/router";
import { UserContext } from "../../../providers/UserProvider.js";
import "./Explore.css";
const SKILLS = ["Comp Sci", "Mech. Eng.", "Design"];
const PROJECT_AUTHORS = ["Students", "Mentors"];
// Shared assets
import RoundedButton from "../../modules/RoundedButton.js";
import RoundedCheckbox from "../../modules/RoundedCheckbox.js";
import GoSVG from "../../../assets/icons/go.svg";
import PeopleSVG from "../../../assets/icons/checkbox.svg";

const DARK_BLUE = "#13133A";
const LIGHT = "#F5F7FB";


const GoIcon = GoSVG;// (<img src={GoSVG} alt=""/>);
const PeopleIcon = (<img src={PeopleSVG} alt=""/>);

class Explore extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            authorFilters: [],
            skillFilters: [],
        }
    };

    componentDidMount() {
        getProjects(this.context.user.token).then((projects) => {
            this.setState({
                projects: projects,
            })
        })
    }
    
    generateProjectCard = (proj) => {
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
                    callback={() => { navigate("/project", {state: {projectData: proj}}) }} />
            </div>);
    };

    getTitle() {
        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6">
                        <h1>Find Your Next Project</h1>
                        <br/>
                        <h2>Join the community of innovative college students,
                            Explore existing projects, or post your own for others
                            to join.
                        </h2>
                    </div>
                    <div className="col-md-3 align-self-end"  style={{color: "#FFF"}}>
                        <RoundedButton label="Post Project" bgcolor={DARK_BLUE} callback={()=>navigate("/registerProject")} icon={GoIcon}/>
                    </div>
                </div>
            </div>
        );
    };

    
   
    getProjectListings() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.projects.map((proj) => {
                        return (
                            <div className="x mt-3 mb-3 col-md-4">
                                {this.generateProjectCard(proj)}
                            </div>
                    )})}
                </div>
            </div>
        );
    }


    generateCheckbox(label, onClick) {
        // TODO : Dynamically change the background and text color.
        return (
            <div style={{height: "50px", 
                        color:  "#13133A"}}>
                <RoundedCheckbox label={label} onClick={onClick} bgcolor={LIGHT}/>
           </div>
        )
    }
    getProjectFilterColumn() {
        return (
            <div className="container">
                Skills
                <div className="row mt-auto">
                    {SKILLS.map((skill) => {
                        return (
                            <div className="x mt-3 mb-3 col-md-12">
                                {this.generateCheckbox(skill, () => {
                                    if (this.state.skillFilters.includes(skill)) {
                                        let i = this.state.skillFilters.indexOf(skill);
                                        let filters = this.state.skillFilters;
                                        filters.splice(i);
                                        this.setState({skillFilters: filters});
                                    } else {
                                        let update = this.state.skillFilters;
                                        update.push(skill);
                                        this.setState({skillFilters: update});
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>

                Projects by
                <div className="row mt-auto">
                    {PROJECT_AUTHORS.map((author) => {
                        return (
                            <div className="x mt-3 mb-3 col-md-12">
                                {this.generateCheckbox(author, () => {
                                    if (this.state.authorFilters.includes(author)) {
                                        let update = this.state.authorFilters;
                                        update.splice(update.indexOf(author));
                                        this.setState({authorFilters: update});
                                    } else {
                                        let update = this.state.authorFilters;
                                        update.push(author);
                                        this.setState({authorFilters: update});
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }

    getProjectColumn() {
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
        let projects = this.state.projects.length !== 0 ? this.getProjectColumn() : (<></>);

        return (
            <>
                {titleRow}
                <br/>
                {projects}
            </>
        )
    }

}

export default Explore;