import React, {Component} from 'react';
import API from "./../../utils/API";
import List from "../list/List";
import PodcastThumbnail from "../podcast-thumbnail/PodcastThumbnail";
import PodcastSearchResults from "../../pages/podcast-search-results/PodcastSearchResults"
import Searchbar from "../search-bar/Searchbar";
import "./LandingPageIntro.css";


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
  }

  render() {
    //console.log(this.state.podcasts.length);
    return (
      <div className="landingIntro">
        <h1>podtalk</h1>
        <h2>Join the Conversation</h2>
        <h3><em>Find a Podcast</em></h3>
        <Searchbar
          handleInputChange={this.handleInputChange}
          podcast_title={this.state.podcast_title}
        />

        {this.state.podcasts.length === 0 ? (
          <h3><em></em></h3>
        ) : (
          <div>
            <PodcastSearchResults/>
          </div>
        )}
      </div>
    );
  };
}

export default LandingPageIntro;