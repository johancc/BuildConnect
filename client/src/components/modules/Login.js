import React, { Component } from "react";
import Form from "react-bootstrap/Form"

// Needed for firebase
import { auth } from "../../firebase_config.js";
import { UserContext } from "../../providers/UserProvider.js";
import { navigate } from "@reach/router";

// UI assets
import Snackbar from "./Snackbar.js";
import { Col, Row, Button, Container } from 'react-bootstrap'

const withNavigate = (Component) => {
    return (props) => {
        return <Component {...props} navigate={navigate}/>
    }
}
/**
 * Proptypes:
 *  onLogin - Callback used when authentication is complete.
 */
class Login extends Component {
    // Stores the use state
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.signin = this.signin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            error: undefined,
            form: { email: undefined, password: undefined },
        }
    }

    async signin(event) {
        event.preventDefault();
        try {
            // TODO: Fix.
            await auth.signInWithEmailAndPassword(this.state.form.email, this.state.form.password);
            this.props.navigate("/explore");
            this.props.onLogin();
        } catch (err) {
            this.setState({
                error: (<Snackbar message="Wrong email / password"/>)
            })
            console.log(err);
        }
    }

    handleChange(event) {
        const form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({form: form});
        // Remove the error message when the user types again.
        if (this.state.error !== undefined) this.setState({error: undefined});
    }

    render() {
        return (
            <Container fluid="sm" style={{minWidth: "400px", padding: "16px"}}>
                <Row>
                    <Col md="12" >
                        <h1 style={{textAlign: "left", marginLeft: "0px", paddingLeft: "0px"}}>Sign In </h1>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" value={this.state.form.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" value={this.state.form.password} onChange={this.handleChange} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button className="loginButton" block onClick={this.signin}>
                                Sign In
                            </Button>
                            {this.state.error}
                            <a href="/reset-password-request">Forgot Password?</a>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withNavigate(Login);