import React, { Component } from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import List from "../../components/list/List";

class PodcastSearchResults extends Component {
  state = {
    cards: []
  };

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
      {!this.state.cards.length ? (
        <li>
          <h3 style={{ marginTop: "10px", marginBottom: "15px" }}><span><em>No podcast found.</em></span></h3>
        </li>
      ) : (
        <List length={this.state.cards.length}>
          {this.state.cards.map(card => {
            return (
              <PodcastCard
                key={this.state.podcast.title}
                image={this.state.podcast.image}
                podcast_title={this.state.podcast.title}
                podcast_description={this.state.podcast.description}
                subscribed={this.state.podcast.subscribed}
              />
            );
          })}
        </List>
      )}
    </div>
    );
  };
}

export default PodcastSearchResults;