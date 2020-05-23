import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import "./Project.css";

// Styling assets
import Timelapse from "@material-ui/icons/Timelapse";
import EmojiPeople from "@material-ui/icons/EmojiPeople";

let MOCK_DATA = {
    title: "The Next Big Thing",
    tweet_description: "What's the next big thing? Find out soon",
    image: "https://cnet2.cbsistatic.com/img/LJTnIfiK9aCjOa7i2nOZRGGrPt8=/940x0/2017/02/24/f3db5bf7-590b-490f-bf41-754cea28c425/juicero.jpg",
    people_size: 10,
    date_started: Date.now(),
    long_description: "You should give an overview of your project here. Make it exciting.\
                       Talk about why you started this. Show people that you care.",
    help_needed: "Talk about what skills you're looking for in team members. Should they be \
                 comfortable with python? UX? Management skills?",
    members: "Just me.",
    link: "www.github.com/user/somethinggreat",
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
                
                <Image className="Project-header-item col-md-6" src={this.state.projectData.image} alt="" fluid/>


                <Card className="Project-header-item col-md-6 " style={{padding: "16px", 
                                                                       display:"flex",
                                                                       justifyContent: "space-between",
                                                                       flexDirection: "column" }} >
                    <div>
                        <Typography color="primary">
                            <h3>{this.state.projectData.title}</h3>
                            <h5 style={{color: "black"}}>{this.state.projectData.tweet_description}</h5>
                        </Typography>
                    </div>
                    
                    <div>
                        <Typography>
                                <p><b> <Timelapse /> Posted 9 days ago </b> </p>

                                <b> <EmojiPeople/> {this.state.projectData.people_size} members</b> 
                        </Typography>
                    </div>
                </Card>
            
            </div>
        )
    }
    render() {
        if (this.state.projectData === undefined) return <></>;

        let projectHeader = this.getProjectHeader();
        return (
            <div>
                {projectHeader}
            </div>
        );
    }
}

export default Project;
