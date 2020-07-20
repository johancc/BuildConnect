import React, {Suspense, lazy} from 'react';
import NavBar from './modules/NavBar.js';
import {Router, createHistory, LocationProvider} from '@reach/router';
// GOOGLE ANALYTICS
import ReactGA from 'react-ga';

// Providers
import UserProvider from '../providers/UserProvider';
import AuthenticatedPage from './modules/AuthenticatedPage.js';
// Pages
const Home = lazy(() =>
  import('./pages/Home/Home.js'));
const NotFound = lazy(() =>
  import('./pages/NotFound/NotFound.js'));
const Project = lazy(() =>
  import('./pages/Project/Projectv2.js'));
const Explore = lazy(() =>
  import('./pages/Explore/ExploreV2.js'));
const Mentors = lazy(() =>
  import('./pages/Mentors/Mentors.js'));
const RegisterUser = lazy(() =>
  import('./pages/RegisterUser/RegisterUser.js'));
const RegisterProject = lazy(() =>
  import('./pages/RegisterProject/RegisterProject.js'));
const RegisterMentor = lazy(() =>
  import('./pages/RegisterMentor/RegisterMentor.js'));
const ProgressCatalog = lazy(() =>
  import('./pages/ProgressCatalog/ProgressCatalog.js'));
const ResetPassword = lazy(() =>
  import('./pages/ResetPassword/ResetPassword.js'));
const InProgressProject = lazy(() =>
  import('./pages/InProgressProject/InProgressProject.js'));

// to use styles, import the necessary CSS files
import '../utilities.css';
import './App.css';

ReactGA.initialize('UA-167697452-2');
const history = createHistory(window);


const App = () => {
  // Tracking website usage.
  history.listen((window) => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <div className="contentWrap">
      <Suspense fallback={<div />}>
        <UserProvider>
          <LocationProvider>
            <div className="App-container">
              <NavBar />
              <Router>
                <Home path="/" />
                <Project path="/project"/>
                <InProgressProject path="/InProgressProject"/>
                <AuthenticatedPage
                  component={Explore} path="/explore" />
                <AuthenticatedPage
                  component={ProgressCatalog} path="/inProgress"/>
                <AuthenticatedPage
                  component={Mentors} path="/mentors" />
                <AuthenticatedPage
                  component={RegisterProject} path="/registerProject"/>
                <RegisterMentor path="/registerMentor" />
                <RegisterUser path="/register" />
                <ResetPassword path="/resetPassword"/>
                <NotFound default />
              </Router>
            </div>
          </LocationProvider>
        </UserProvider>
      </Suspense>
    </div>
  );
};


export default App;
