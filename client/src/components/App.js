import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import theme from "../Constants.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";

// Prevents protected pages from being directly accessed.
import AuthenticatedPage from "./modules/AuthenticatedPage.js";
// Providers
import UserProvider from "../providers/UserProvider";

// Pages
import Home from "./pages/Home/Home.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Project from "./pages/Project/Project.js";
import Explore from "./pages/Explore/Explore.js";
import RegisterUser from "./pages/RegisterUser/RegisterUser.js";
import Profile from "./pages/Profile/Profile.js";

// to use styles, import the necessary CSS files
import "../utilities.css";
import "./App.css";
const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

/**
 * Define the "App" component as a class.
 */
class App extends Component {

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      
      // <> is like a <div>, but won't show
      // up in the DOM tree
      <UserProvider>
        <JssProvider generateClassName={generateClassName}>
          <div className="App-container" style={{ margin: 0, padding: 0 }}>

            <MuiThemeProvider theme={theme}>
              <NavBar />
              <Router style={{ backgroundColor: "#f4f5f7" }}>
                <Home path="/" />
                <AuthenticatedPage path="/project/:_id" component={Project}/>
                <AuthenticatedPage path="/explore" component={Explore} />
                <AuthenticatedPage path="/profile" component={Profile} />
                <RegisterUser path="/register" />
                <NotFound default />
              </Router>
            </MuiThemeProvider>
          </div>
        </JssProvider>  
      </UserProvider>     
    );
  }
}

export default App;
