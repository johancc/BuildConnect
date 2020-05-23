/**
 * This component is meant to display ongoing projects and allow
 * for search and filter functionality.
 * Proptypes:
 *  None
 * 
*/
import React, { Component } from "react";

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
class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        // Make API call here.

    }

    render() {
        return (
            <div>
                {projects.map((project, i) => {
                    return (
                        <div key={i}>
                            {/* Project component here */}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Projects;
