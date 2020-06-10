import React, { Suspense, lazy } from "react";
import NavBar from "./modules/NavBar.js";
import { Router, createHistory, LocationProvider } from "@reach/router";
// GOOGLE ANALYTICS
import ReactGA from "react-ga";

// NOT NEEDED UNTIL ACCOUNTS ARE ACCEPTED AND REVIEWED.
// Providers
import UserProvider from "../providers/UserProvider";
import AuthenticatedPage from "./modules/AuthenticatedPage.js";
// Pages
const Home = lazy(() => import("./pages/Home/Home.js"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.js"));

// NOT NEEDED UNTIL ACCOUNTS ARE ACCEPTED AND REVIEWED.
import Project from "./pages/Project/Projectv2.js";
import Explore from "./pages/Explore/ExploreV2.js";
import Mentors from "./pages/Mentors/Mentors.js";
import RegisterUser from "./pages/RegisterUser/RegisterUser.js";
import RegisterProject from "./pages/RegisterProject/RegisterProject.js";
import RegisterMentor from "./pages/RegisterMentor/RegisterMentor.js"
// import Profile from "./pages/Profile/Profile.js";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";

ReactGA.initialize("UA-167697452-2");
const history = createHistory(window);

/**
 * Define the "App" component as a class.
 */
const App = () => {

  // Tracking website usage.
  history.listen(window => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <div className="contentWrap">
      <Suspense fallback={<div />}>
        <UserProvider>
          <LocationProvider history={history}>
            <div className="App-container">
              <NavBar />
              <Router>
                <Home path="/" />
                <AuthenticatedPage component={Project} path="/project" />
                <AuthenticatedPage component={Explore} path="/explore" />
                <AuthenticatedPage component={Mentors} path="/mentors" />
                {/* 
                    NOT NEEDED UNTIL ACCOUNTS ARE ACCEPTED AND REVIEWED.
                  {<AuthenticatedPage path="/project/:_id" component={Project} />
                  <AuthenticatedPage path="/explore" component={Explore} />
                  <AuthenticatedPage path="/profile" component={Profile} />
                  <AuthenticatedPage path="/registerProject" component={RegisterProject} />
                  */}
                  <RegisterProject path="/registerProject" />
                  <RegisterMentor path="/registerMentor" />
                  <RegisterUser path="/register" />
                  <NotFound default />
                </Router>
              </div>
            </LocationProvider>  
          </UserProvider>    
        </Suspense> 
      </div>
    );
  }


export default App;
