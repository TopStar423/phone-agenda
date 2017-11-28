import React, { Component } from 'react';
import Input from "../../components/input/Input";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import List from "../../components/list/List";

class PodcastHomePage extends Component {
  state = {
    podcast: {},
    episodes: [],
    podcast_comments: []
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
        {!this.state.podcast ? (
          <li>
            <h3 style={{ marginTop: "10px", marginBottom: "15px" }}><span><em>No podcast to display.</em></span></h3>
          </li>
        ) : (
        <div>
          <PodcastCard
            image={this.state.podcast.image}
            podcast_title={this.state.podcast.title}
            podcast_description={this.state.podcast.description}
            subscribed={this.state.podcast.subscribed}
          />

          <List length={this.state.episodes.length}>
            <Input
              placeholder="Input"
              className="Input"
            />
            {this.state.episodes.map(episode => {
              return (
                <EpisodeCard
                  key={episode.title}
                  image={this.state.podcast.image}
                  podcast_title={this.state.podcast.title}
                  episode_title={episode.title}
                  episode_description={episode.description}
                  episode_release_date={episode.pub_date}
                  url={episode.url}
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

export default PodcastHomePage;
