import React, { Component } from 'react';
import {Route} from "react-router-dom";
import LandingPage from './pages/landing-page/LandingPage';
import PodcastHomePage from './pages/podcast-home-page/PodcastHomePage';
import PodcastSearchResults from './pages/podcast-search-results/PodcastSearchResults';
import ProfilePage from './pages/profile-page/ProfilePage';
import EpisodePage from './pages/episode-page/EpisodePage';
import UserHomePage from './pages/user-home-page/UserHomePage';
import AccountSettings from './pages/account-settings/AccountSettings';
import SignUp from './pages/sign-up/SignUp';
import LogIn from './pages/log-in/LogIn';
import './Routes.css';


class Routes extends Component {
  state = {

  }

  render(){
    return (
      <div className="routes">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/podcast-home/:id" component={PodcastHomePage} />
        <Route exact path="/search-results/:id" component={PodcastSearchResults}/>
        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/episode/:pod_id/:ep_url/:ep_id" component={EpisodePage}/>
        <Route exact path="/home" component={UserHomePage}/>
        <Route exact path="/settings" component={AccountSettings}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/login" component={LogIn}/>
      </div>
    );
  };
}

export default Routes;