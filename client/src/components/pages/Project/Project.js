import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import JoinRequest from "./JoinRequest.js";

import "./Project.css";

// Styling assets
import Timelapse from "@material-ui/icons/Timelapse";
import EmojiPeople from "@material-ui/icons/EmojiPeople";
const BULLET = '\u2B24';
let MOCK_DATA = {
    title: "The Next Big Thing",
    tweet_description: "What's the next big thing? Find out soon",
    image: "https://cnet2.cbsistatic.com/img/LJTnIfiK9aCjOa7i2nOZRGGrPt8=/940x0/2017/02/24/f3db5bf7-590b-490f-bf41-754cea28c425/juicero.jpg",
    people_size: 10,
    date_started: Date.now(),
    long_description: "You should give an overview of your project here. Make it exciting.\
                       Talk about why you started this. Show people that you care.",
    help_needed: "How can people help? Are there any specific things that need to be built? Should they be \
                 comfortable with python? UX? Management skills?",
    team_description: "Out team members are based on the each coast. Some of the include Alyssa P Hacker (allysa@mit.edu) and Ben Bitdiddle (benbit@mit.edu). ",
    members: "Just me.",
    link: "www.github.com/user/somethinggreat",
    contact_info: "Please email someemail@mit.edu if you have any questions.",
    skills_needed: ["breathing", "existing", "able to send emails"]
}
/**
 * Displays information about a given project and allows you to
 * contact the team members.
 * Proptypes:
 *      projectId - (string) UID of the project
 */
class Project extends Component {
 /*
 Implementation details:
    This has two use cases:
        1) A student looking to join a team
        2) An industry mentor looking to help a team
    This component should decide which functionality to display
    based on the user.
    
Design Details:

 */   
    
    constructor(props) {
        super(props);
        this.state = {
            projectData: undefined,
        }
    };

    componentDidMount() {
        // Make api call here.
        this.setState({
            projectData: MOCK_DATA,
        })
    }

    getProjectHeader() {
        return (
            <div className="Project-header">
                
                <Image className="Project-item col-md-5"  style={{padding: "16px"}} src={this.state.projectData.image} alt="" fluid/>

                <div className="Project-item col-md-7" style={{padding: "16px"}}>
                    <Card  style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-evenly", // Might be better to use space-around?
                        flexDirection: "column"
                    }} >
                        <div style={{ margin: "16px", marginLeft: "32px", marginRight: "32px"  }}>
                            <Typography color="primary">
                                <h3>{this.state.projectData.title}</h3>
                                <h5 style={{ color: "black" }}>{this.state.projectData.tweet_description}</h5>
                            </Typography>
                        </div>

                        <div style={{ margin: "16px", marginLeft: "32px", marginRight: "32px" }}>
                            <Typography>
                                
                                <div style={{justifyContent: "space-between", display: "flex", flexDirection: "row", alignItems:"center"}}>
                                    <b> <Timelapse /> Posted 9 days ago </b>
                                    <b> <EmojiPeople /> {this.state.projectData.people_size} members</b>
                                    <JoinRequest/>
                                </div>

                                
                            </Typography>
                            
                        </div>
                    </Card>
                </div>
                
            
            </div>
        )
    }
    getVolunteerInfo() {
        return (
            <div style={{ padding: "16px" }}>
                <Card style={{ padding: "32px" }}>
                    <Typography color="primary">
                        <h5>Help Needed</h5>
                    </Typography>
                    <Typography variant="subheader">
                        <b>Skills needed</b>
                        {this.state.projectData.skills_needed.map((skill, i) => {
                            return (
                                <div key={i}>
                                    <span>{BULLET}</span> {skill}
                                </div>
                            )
                        })}

                    </Typography>
                    <Typography variant="subheader">
                        <b>What help is needed</b>
                        <p>{this.state.projectData.help_needed}</p>
                    </Typography>
                </Card>

            </div>
        )
    }
    getProjectAbout() {
        let volunteerInfo = this.getVolunteerInfo();
        return (
            <>
                <div style={{ padding: "16px" }}>
                    <Card style={{ padding: "32px" }}>
                        <Typography color="primary">
                            <h5>About this project</h5>
                            
                        </Typography>
                        <Typography variant="subheader">
                            <b>Description</b>
                            <p>{this.state.projectData.long_description}</p>
                        </Typography>

                    </Card>

                </div>
                {volunteerInfo}
            </>
        )
        
    }

    getProjectContact() {
        return (
            <div style={{padding: "16px"}}>
                <Card style={{padding: "32px"}}>
                    <Typography color="primary">
                        <h5>Project Details</h5>
                    </Typography>
                    <Typography>
                        <b> Who is already working on this </b>
                    </Typography>
                    <Typography variant="subheader">
                        <p>{this.state.projectData.team_description}</p>
                    </Typography>

                    <Typography>
                        <b> How to get in touch </b>
                    </Typography>
                    <Typography variant="subheader">
                        <p>{this.state.projectData.contact_info}</p>
                    </Typography>
                </Card>
            </div>

        )
    }


    render() {
        if (this.state.projectData === undefined) return <></>;

        let projectHeader = this.getProjectHeader();
        let projectAbout = this.getProjectAbout();
        let projectContact = this.getProjectContact();
        let volunteerInfo = this.getVolunteerInfo();
        return (
            <div className="Project-container">
                <div className="col-md-12" style={{padding: 0}}>
                    {projectHeader}
                </div>
                <div className="col-md-7" style={{padding: 0}}>
                    {projectAbout}
                </div>
                <div className="col-md-5" style={{ padding: 0 }}>
                    {projectContact}
                </div>
            </div>
            
        );
    }
}

export default Project;
