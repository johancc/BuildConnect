/**
 * UserProvider is meant to allow any component have access to the user
 * object once authentication finishes.
 */
import React, { Component, createContext } from "react";
import { auth } from "../firebase_config.js";
import { get } from "../utilities.js";

export const UserContext = createContext({
    user: undefined,
    refreshUser: ()=>{},
});

class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.refreshUser = this.refreshUser.bind(this);
        this.state = {
            user: undefined,
            refreshUser: this.refreshUser,
        };
    };

    async refreshUser() {
        try {
            const token = this.state.user.token;
            let user;
            try {
                user = await get("/api/user", {token: token});
            } catch {
                user = await get("/api/mentor", {token: token});
            }
            user.token = token;
            user.verified = auth.currentUser.emailVerified;
            this.setState({user: user});
            return user;
        } catch (err) {
            this.setState({user: undefined});
        }
    };

    componentDidMount() {
        auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const token = await firebaseUser.getIdToken(true);
                    const verified = firebaseUser.emailVerified;
                    let user;
                    try {
                        user = await get("/api/user", {token: token});
                    } catch {
                        user = await get("/api/mentor", {token: token});
                    }
                    if (!!user) {
                        user.verified = verified;
                        user.token = token;
                    } else {
                        user = { token: token};
                    }
                    this.setState({user: user});
                    
                } catch (err) {
                    console.log(err); // TODO: Handle properly.
                }
            } else {
                this.setState({user: undefined});
            };
        });
    };

    render() {
        return <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>;
    }
}

export default UserProvider;
