import React, {Component} from 'react';
import LandingPageIntro from './../../components/landing-page-intro/LandingPageIntro';
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import './LandingPage.css';

class LandingPage extends Component {
  state = {
    userId: ""
  };

  render() {
    return (
      <div className="landing-page-wrapper">
        <Header>
          {!this.state.userId ? (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          ) : (
            <Link to="/">Log Out</Link>
          )}
        </Header>
        <LandingPageIntro/>
      </div>
    );
  };
}

export default LandingPage;