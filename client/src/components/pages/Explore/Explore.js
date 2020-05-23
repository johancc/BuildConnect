/**
 * This component is meant to display ongoing projects and allow
 * for search and filter functionality.
 * Proptypes:
 *  None
 * 
*/
import React, { Component } from "react";
import ProjectCard from "../../modules/ProjectCard.js";
import "./Explore.css";
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
        this.state = {
            projects: Array(15).fill(MOCK_DATA),
            sort: "Newest",
            category: "Any",
        }
    }

    componentDidMount() {
        // Make API call here.

    }

    getProjectListings() {
       
    }
    render() {
        let projectListings = this.getProjectListings();
        return (
            <div className="Explore-container">
                {projectListings}
            </div>
        );
    }
}

export default Explore;
