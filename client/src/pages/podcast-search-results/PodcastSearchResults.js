import React, {Component} from 'react';
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import List from "../../components/list/List";
import API from "./../../utils/API";
import Header from './../../components/partials/header/Header';
import Searchbar from './../../components/search-bar/Searchbar';
import {Link} from "react-router-dom";
import './PodcastSearchResults.css';

class PodcastSearchResults extends Component {
  state = {
    podcast_title: "",
    podcast_feed_url: "",
    podcasts: [],
    userId: ""
  };

  componentDidMount() {
    this.setState({
      podcast_title: this.props.match.params.id
    });

    let replaced = this.props.match.params.id.split(' ').join('+');
    API.searchPodcasts(replaced).then(res => this.setState({
      podcasts: res.data.results
    }))
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  searchAgain() {
    let replaced = this.props.match.params.id.split(' ').join('+');
    API.searchPodcasts(replaced).then(res => this.setState({
      podcasts: res.data.results
    }))
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="search-results-wrapper">
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
        <div>
          {!this.state.podcasts.length ? (
            <h1><em>No results found.</em></h1>
          ) : (
            <div>
              <Searchbar
                handleInputChange={this.handleInputChange}
                podcast_title={this.state.podcast_title}
                onClick={this.searchAgain}
                value={this.state.podcast_title}
              />
              <h1><strong>{this.state.podcasts.length} Results Found for: "{this.state.podcast_title}"</strong></h1>
              <List>
                {this.state.podcasts.map((podcast, index) => {
                  return (
                    <PodcastThumbnail
                      key={index}
                      podcast_title={podcast.collectionName}
                      image={podcast.artworkUrl100}
                    />
                  );
                })}
              </List>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export default PodcastSearchResults;