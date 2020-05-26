/**
 * This component is meant to display ongoing projects and allow
 * for search and filter functionality.
 * Proptypes:
 *  None
 * 
 * 
 * TODO:
 *  (5/25/2020) - Implement an actual query to the database once the server is setup 
 *              - Some search or sorting functionality needs to be implemented.
*/
import React, { Component } from "react";
import ProjectCard from "./ProjectCard.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./Explore.css";

// Images
import Explore1 from "../../../public/explore1.svg";
import Explore2 from "../../../public/explore2.svg";
import Explore3 from "../../../public/explore3.svg";

const EXPLORE_IMGS = [Explore1, Explore2, Explore3];

// Remove once the backend is implemented!
let MOCK_FACTOR = 24;
let MOCK_DATA = {
    title: "The Next Big Thing",
    tweet_description: "What's the next big thing? Find out soon",
    image: "https://blog-assets.hootsuite.com/wp-content/uploads/2019/05/Instagram-analytics-tools.png",
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

let SORT_OPTIONS = ["Newest", "Popularity"];
let CATEGORY_OPTIONS = ["Software", "Mechanical", "Electrical"];

/**
 * Internal Spec:
 *  The search function should support tags and full-text search.
 *  This should retrieve data from /api/projects and display
 *  the results with the Project component.
 *  The project listing should support sorting by popularity and
 *  date added.
 *  Design:
 *      The topmost element should be the search component, which 
 *      once clicked will refresh the listings.
 *      Initially, the listings will be the top N (~20) most popular 
 *      projects.
 *      Inspiration: https://dribbble.com/shots/9738958-Project-listing-UI
 */
class Explore extends Component {
    constructor(props) {
        super(props);
        let getRandomInt = (max) =>  {
            return Math.floor(Math.random() * Math.floor(max));
        }
        this.state = {
            projects: Array(MOCK_FACTOR).fill(MOCK_DATA),
            sort: "Newest",
            category: "Any",
            imgIndex: getRandomInt(EXPLORE_IMGS.length),
        }
    }

    componentDidMount() {
        // Make API call here.

    }

    getProjectListings() {
       return (
           <div className="Explore-list">
           {
               this.state.projects.map((proj, i) => {
                   return (
                       <ProjectCard className="Explore-card" projectData={proj} key={i}/>
                   )
               })
           }
           </div>
       )
    }

    getExploreTitle() {
        const exploreImg = EXPLORE_IMGS[this.state.imgIndex];
        return (
            <Jumbotron fluid style={{ backgroundColor: "#ebf5fa"}}>
                <Container>
                    <div className="Explore-title">
                        <div className="Explore-title-text">
                            <h1>Find your next project.</h1>
                            <h3>Join the community of innovative college students. Explore existing projects or post your own project for others to join. Get access to industry professional mentors for your group. </h3>
                        </div>
                        <img src={exploreImg} className="Explore-title-img" alt="" />
                    </div>
                </Container>
            </Jumbotron>
        )
    }
    render() {
        let exploreTitle = this.getExploreTitle();
        let projectListings = this.getProjectListings();
        
        return (
            <div className="Explore-container">
                {exploreTitle}
                {projectListings}
            </div>
        );
    }
}

export default Explore;
