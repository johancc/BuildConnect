import React, { useState, useContext } from "react";

// Routing 
import { Link, navigate } from "@reach/router";
import { Nav, Navbar } from "react-bootstrap";

// Styling assets.
import "../../utilities.css";
import "./NavBar.css";

/**
 * Navigation bar that should be on top of all pages. 
 * Takes no props, but needs to be under UserProvider.
 * Renders links conditional on whether the user is logged in or not.
 */

 const NavBar = () => {
    return (
        <div className="u-screenCenter">
            <Navbar collapseOnSelect fixed="sticky-top" expand="sm" variant="light">
                <Navbar.Brand as={Link} to="/">
                    <div className="NavBar-logo-title">BuildConnect</div>
                </Navbar.Brand>
                <Navbar.Toggle className="NavBar-toggle" aria-controls="responsive-navbar-nav"  />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end ">
                    
                    <Nav pullRight className="NavBar-linkContainer">
                        <Nav.Link as={Link} to="/about">
                            <div className="NavBar-link">
                                About Us
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact">
                            <div className="NavBar-link">
                                Contact
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
                            <div className="NavBar-link">
                                Login
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
 }

 export default NavBar;