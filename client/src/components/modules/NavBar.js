import React, { useState, useContext } from "react";
import { Link, navigate } from "@reach/router";
import Login from "./Login";
import { auth } from "../../firebase_config.js";
import { UserContext } from "../../providers/UserProvider.js";
import { Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";

// UI Assets
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// TODO: Delete later
import { updateUser } from "../../api";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {

  const [open, setOpen] = useState(false);
  const userProvider = useContext(UserContext);
  const logout = () => {
    auth.signOut();
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const loginDialog = (
    <div className="Navbar-loginDialog">
      <Dialog fullScreen={fullScreen} aria-labelledby="loginDialog" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <Login onLogin={()=> setOpen(false)} />
      </Dialog>
    </div>
  );

  const loggedIn = userProvider.user !== undefined;
  // TODO: Delete later: Remove upload button after testing
  let userLinks = loggedIn ? (
      <>
          <Nav.Link className="NavBar-link" as={Link} to="/explore" >Explore</Nav.Link>
          <Nav.Link className="NavBar-link" as={Link} to="/registerProject">Add a project</Nav.Link>
          <Nav.Link className="NavBar-link" as={Link} to="/project/123456">Project</Nav.Link>
          <Nav.Link className="NavBar-link" as={Link} to="/profile">Profile</Nav.Link>
          <Button onClick={() => {
              logout()
              navigate("/");
            }}>
              Sign Out
          </Button>
          <Button onClick={async () => {
              userProvider.user.photoData = "1234";
              const r = await updateUser(userProvider.user.token, userProvider.user);
              console.log(r);
          }}>
              Upload
          </Button>
      </>
      ) : (
        <>
          <Nav.Link className="NavBar-link" as={Link} to="/register">Register</Nav.Link>
          <Button color="primary" onClick={() => setOpen(true)}>
            Login
                  </Button>
          {loginDialog}
        </>
  );  

  return (
  <Navbar collapseOnSelect fixed="sticky-top" expand="lg" variant="light">
    <Navbar.Brand className="NavBar-brand" as={Link} to="/">
      Project Learning
        </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto" />
      <Nav className="NavBar-container">
        <Nav.Link className="NavBar-link" as={Link} to="/faq">FAQ</Nav.Link>
        <Nav.Link className="NavBar-link" as={Link} to="/contact">Contact</Nav.Link>
        {userLinks}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}
export default NavBar;
