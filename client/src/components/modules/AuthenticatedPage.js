import React, { Component } from "react";

import { UserContext } from "../../providers/UserProvider";
import { Redirect } from "@reach/router";

class AuthenticatedPage extends Component {
    static contextType = UserContext;
    render() {
        const Component = this.props.component;
        const authenticated = this.context.user !== undefined;
        return (
            <>
                {authenticated ? <Component user={this.context.user} /> : <Redirect to="/" />}
            </>
        )
    }
}

export default AuthenticatedPage;