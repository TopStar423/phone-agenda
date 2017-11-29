import React, { Component } from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import LandingPagePodcastCard from "../../components/landing-page-podcast-card/LandingPagePodcastCard";
import List from "../../components/list/List";
import API from "./../../utils/API";

class PodcastSearchResults extends Component {
  state = {
    podcast_title: "",
    podcast_feed_url: "",
    podcasts: []
  }

  componentDidMount() {
    this.setState({
      podcast_title: this.props.match.params.id
    })

    var replaced = this.props.match.params.id.split(' ').join('+');
    API.searchPodcasts(replaced).then(res => this.setState({
      podcasts: res.data.results
    }))
    .catch(err => console.log(err)); 
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
   
    return (
      <div>
      {this.state.podcasts.length === 0 ? (
          <h3><em></em></h3>
        ) : (
          <div>
            <h1><strong>{this.state.podcasts.length} Results Found for: "{this.state.podcast_title}"</strong></h1>
            <List>
            {this.state.podcasts.map((podcast, index) => {
              return (
                <LandingPagePodcastCard
                  key={index}
                  podcast_title={podcast.collectionName}
                  podcast_release_date={podcast.releaseDate}
                  image={podcast.artworkUrl100}
                  handlePodcastSelection={this.props.handlePodcastSelection}
                />
              );
            })}
            </List>
          </div>
        )}
    </div>
    );
  };
}

export default PodcastSearchResults;