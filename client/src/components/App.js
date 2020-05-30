import React, {Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";

// Prevents protected pages from being directly accessed.
import AuthenticatedPage from "./modules/AuthenticatedPage.js";
// Providers
import UserProvider from "../providers/UserProvider";

// Pages
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About.js";
import Contact from "./pages/Contact/Contact.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Project from "./pages/Project/Project.js";
import Explore from "./pages/Explore/Explore.js";
import RegisterUser from "./pages/RegisterUser/RegisterUser.js";
import RegisterProject from "./pages/RegisterProject/RegisterProject.js";
import Profile from "./pages/Profile/Profile.js";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <div className="contentWrap">
        <UserProvider>
            <div className="App-container">

                <NavBar />
                <Router>
                  <Home path="/" />
                  <About path="/about" />
                  <Contact path="/contact" />
                  <AuthenticatedPage path="/project/:_id" component={Project} />
                  <AuthenticatedPage path="/explore" component={Explore} />
                  <AuthenticatedPage path="/registerProject" component={RegisterProject} />
                  <AuthenticatedPage path="/profile" component={Profile} />
                  <RegisterUser path="/register" />
                  <NotFound default />
                </Router>
            </div>
        </UserProvider>     
      </div>
    );
  }
}

export default App;
