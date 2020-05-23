/**
 * Displays and edits the personal information of the user
 * 
 */
import React, { Component } from "react";

const MOCK_USER = {
    name: "Bit Bitdiddle",
    email: "bit@mit.edu",
    school: "MIT",
    profile_pic: "urlhere",
    projects: [{}],
}

class UserProfile extends Component {
    /**
     * Implemention details:
     *      This should allow for viewing and editing fields, which
     *      are defined in ../components/UserFields.js
     * 
     */
    render() {
        return (
            <div>
                {}
            </div>
        );
    }
}

export default UserProfile;
