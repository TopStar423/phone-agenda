import React, {Component} from 'react';
import LandingPageIntro from './../../components/landing-page-intro/LandingPageIntro';
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import LandingPageCss from './LandingPage.css';

class LandingPage extends Component {

  render() {
    return (
      <div className="landing-page-wrapper">
        <Header>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </Header>
        <LandingPageIntro/>
      </div>
    );
  };
}

export default LandingPage;