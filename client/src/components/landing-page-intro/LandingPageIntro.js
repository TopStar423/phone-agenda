import React, {Component} from 'react';
import Searchbar from "../search-bar/Searchbar";
import "./LandingPageIntro.css";
import {withRouter} from "react-router-dom";



class LandingPageIntro extends Component {
  state = {
    podcast_title: "",
    podcast_feed_url: "",
    podcasts: []
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.history.push('/search-results/' + this.state.podcast_title);
  }

  render() {
    return (
      <div className="landingIntro">
        <h1>podtalk</h1>
        <h2>Join the Conversation</h2>
        <h3><em>Find a Podcast</em></h3>
        <Searchbar
          handleInputChange={this.handleInputChange}
          value={this.state.podcast_title}
          podcast_title={this.state.podcast_title}
          disabled={!this.state.podcast_title}
          submit={this.handleFormSubmit}
        />
      </div>
    );
  };
}

export default withRouter(LandingPageIntro);