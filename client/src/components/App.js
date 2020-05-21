import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";

// Pages
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";

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
      // <> is like a <div>, but won't show
      // up in the DOM tree
      <>
        <NavBar/>
        <div className="App-container">
          <Router>
            <Home path="/"/>
            <NotFound default/>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
