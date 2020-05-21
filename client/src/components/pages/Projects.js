/**
 * This component is meant to display ongoing projects and allow
 * for search and filter functionality.
 * Proptypes:
 *  None
 * 
*/
import React, { Component } from "react";

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
