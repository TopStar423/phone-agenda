import React, {Component} from 'react';
import LandingPageIntro from './../../components/landing-page-intro/LandingPageIntro';
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import './LandingPage.css';
import API from "./../../utils/API";


class LandingPage extends Component {
  state = {
    userId: ""
  };

  componentDidMount(){
    API.getUserData().then(res => {
      this.setState({
        userId: res.data.data.id
      })
    })
  }

  logout(){
    API.logout().then(
      this.setState({
        userId: ""
      })
    );
  }

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
            <Link to="/" onClick={this.logout}>Log Out</Link>
          )}
        </Header>
        <LandingPageIntro/>
      </div>
    );
  };
}

export default LandingPage;