import React, {Component} from 'react';
import Input from "../../components/input/Input";
import Searchbar from "../../components/search-bar/Searchbar";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import List from "../../components/list/List";

import API from "./../../utils/API";
import he from "he";
import "./PodcastHomePage.css";

class PodcastHomePage extends Component {
  state = {
    podcast_title: "",
    podcast_description: "",
    podcast_url: "",
    image: "",
    episodes: []
  }

  componentDidMount() {
    var replaced = this.props.match.params.id.split(' ').join('+');
    API.searchEpisodes(replaced).then(res => this.setState({
      podcast_title: res.data.rss.title,
      podcast_description: res.data.rss.description,
      podcast_url: res.data.rss.url,
      image: res.data.rss.image,
      episodes: res.data.rss.items
    }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleStripHTML = (description) => {
    var stripped = description.replace(/<[^>]+>/g, '');
    var decoded = he.decode(stripped)
    return decoded;
  }

  listEpisodes = () => {
    for (var i = 0; i < this.state.episodes.length; i++) {
      console.log(this.state.episodes[i]);
    }
  }

  render() {
    //console.log("Podcast Home Page: " + this.state.podcast_title);
    //this.listEpisodes();
    return (
      <div>
        <div className="podcast-homepage">
          <PodcastCard
            podcast_description={this.state.podcast_description}
            podcast_title={this.props.match.params.id}
            podcast_url={this.state.podcast_url}
            image={this.state.image}
          />
        </div>

        {this.state.episodes.length === 0 ? (
          <h3><em>No episodes found.</em></h3>
        ) : (
          <div className="results-box">
            <div className="title-search">
              <h1><strong>{this.state.episodes.length} Episodes</strong></h1>
              <div className="episode-search">
                <h2>Find an episode:</h2>
                <Searchbar
                  handleInputChange={this.handleInputChange}
                  podcast_title={this.state.podcast_title}
                />
              </div>
            </div>
            <List>
              {this.state.episodes.map((episode, index) => {
                return (
                  <EpisodeCard
                    key={index}
                    episode_title={episode.title}
                    episode_description={episode.description}
                    episode_release_date={episode.released}
                    url={episode.enclosures[0].url}
                    handleStripHTML={this.handleStripHTML}
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
