import React, {Component} from 'react';
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import List from "../../components/list/List";
import API from "./../../utils/API";
import Header from './../../components/partials/header/Header';
import ResultsPageSearchbar from '../../components/search-bar/ResultsPageSearchbar';
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
    API.getUserData().then(res => {
      this.setState({
        userId: res.data.data.id
      })
    })
  }


  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }


  handleFormSubmit = event => {
    event.preventDefault();
    this.props.history.replace('/search-results/' + this.state.podcast_title);
    let replaced = this.state.podcast_title.split(' ').join('+');
    API.searchPodcasts(replaced).then(res => {
      this.setState({
        podcasts: res.data.results
      });
    })
      .catch(err => console.log(err));
  };


  logout(){
    API.logout().then(
      this.setState({
        userId: ""
      })
    );
  }

  render() {
    return (
      <div className="search-results-wrapper">
        <Header>
          {!this.state.userId ? (
            <div className="links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          ) : (
            <Link to="/" onClick={this.logout}>Log Out</Link>
          )}
        </Header>
        <ResultsPageSearchbar
          handleInputChange={this.handleInputChange}
          podcast_title={this.state.podcast_title}
          value={this.state.podcast_title}
          disabled={!this.state.podcast_title}
          submit={this.handleFormSubmit}
        />
        <div>
          {!this.state.podcasts.length ? (
            <h1><em>No results found.</em></h1>
          ) : (
            <div>
              <h1><strong>{this.state.podcasts.length} Results</strong></h1>
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