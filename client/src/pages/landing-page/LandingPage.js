import React, {Component} from 'react';
import LandingPageIntro from './../../components/landing-page-intro/LandingPageIntro';
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import './LandingPage.css';
import API from "./../../utils/API";


class LandingPage extends Component {
  state = {
    user_data: {}
  };

  componentDidMount(){
    API.getUserData().then(res => {
      this.setState({
        user_data: res.data.data
      })
      console.log(this.state.user_data)
    })
  }

  logout(){
    API.logout().then(
      this.setState({
        user_data: {}
      })
    );
  }

  render() {
    return (
      <div className="landing-page-wrapper">
        <Header>
          {this.state.user_data ? (
            <Link to="/" onClick={this.logout}>Log Out</Link>
          ) : (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
        </Header>
        <div className="landing-intro-wrapper">
          <LandingPageIntro/>
        </div>

      </div>
    );
  };
}

export default LandingPage;