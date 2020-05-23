import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import theme from "../Constants.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createGenerateClassName } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
// Pages
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import Project from "./pages/Project.js";

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
       <JssProvider generateClassName={generateClassName}>
         <>
          <NavBar />
          <div className="App-container" style={{ backgroundColor: "#f4f5f7" }}>
            <MuiThemeProvider theme={theme}>
              <Router>
                <Home path="/" />
                <Project path="/project" />
                <NotFound default />
              </Router>

            </MuiThemeProvider>
          </div>
        </>
        </JssProvider>  
    );
  }
}

export default App;
