/**
    TODO: 
        Buttons should be the same color as the UI and align to the right.
        Only display two / three sentences in the card.
        Make the API call.
        You need user context to get the user id.
*/
import React, { Component } from "react";
import { getMentors } from "../../../api.js";
import { UserContext } from "../../../providers/UserProvider.js";
import "./Mentors.css";

import RoleSvg from '../../../assets/icons/mentor.svg';
import AvailabilitySvg from "../../../assets/icons/availability.svg";
import RequestMentorButton from "./RequestMentorButton.js";

const ROLE_ICON = (<img src={RoleSvg}/>);
const AVAILABILITY_ICON = (<img src={AvailabilitySvg}/>);

const MentorCard = ({mentor}) => {
    let name = mentor.name;
    let role = mentor.role;
    let availability = mentor.availability;
    // skipping pic for now. let profilePic = mentor.photoURL;
    let shortBio = mentor.shortBio;
    return (
        <div className="mentorCard" style={{ marginBottom: "2em", padding: "2em"}} >
            <h3> {name} </h3>
            <p> {ROLE_ICON} {role}</p>
            {/* TODO: Renable once it is a field in the registration page.
             {<p> {AVAILABILITY_ICON} {availability}</p>} */}
            <div style={{wordWrap: "break-word", width: "100%"}}>
                <p> {shortBio} </p>
            </div>

            <div style={{height: "50px"}}>
                <RequestMentorButton mentor={mentor}/>
            </div>
        </div>
    );
}


class Mentors extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            mentorData: [],
        }
    }
    async componentDidMount() {
        // TODO: Get the list of mentors from the server.
        const mentors = await getMentors(this.context.user.token);
        this.setState({
            mentorData: mentors,
        })
    }

    getTitleRow() {
        return (
            <div className="container title">
                <div className="row">
                    <h1 className="col-md-12"> Find Your Team Mentor </h1>
                    <h3 className="col-md-8"> 
                        Get the opportunity to be connected with an industry-professional 
                        mentor to advise you throughout your project.
                    </h3>
                </div>
            </div>
        )
    }

    getMentorSection() {
        let mentorCards = this.getMentorCards();
        return (
            <div className="container">
                <div className="row justify-content-between">
                    {mentorCards.map((card) => (<div className="col-md-4">{card} </div>))}
                </div>
            </div>
        )
    }

    getMentorCards() {
        if (this.state.mentorData.length == 0) { return []};
        return (this.state.mentorData.map((mentor) => <MentorCard mentor={mentor}/>));
    }
    render() {
        let titleRow = this.getTitleRow();
        let mentorSection = this.getMentorSection();
        return (
            <>
                {titleRow}
                <br/>
                {mentorSection}
            </>
        );
    }

}

export default Mentors;