import React, { Component } from 'react';
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import CommentCard from "../../components/comment-card/CommentCard";
import AddComment from "../../components/add-comment/AddComment";
import List from "../../components/list/List";

import API from "./../../utils/API";
import he from "he";
import "./EpisodePage.css";

class EpisodePage extends Component {
  state = {
    episode: {},
    podcast_title: "",
    episode_title: "",
    episodes: [],
    episode_comments: []
  }

  componentDidMount() {
    this.setState({
      podcast_title: this.props.match.params.pod_id,
      episode_title: this.props.match.params.ep_id,
      episode: {}
    })
  }

  handleStripHTML = (description) => {
    description = description || "";
    var stripped = description.replace(/<[^>]+>/g, "");
    var decoded = he.decode(stripped)
    return decoded;
  }

  getEpisode = () => {
    var replaced = this.props.match.params.pod_id.split(' ').join('+');
    API.searchEpisodes(replaced).then(res => this.setState({
      episodes: res.data.rss.items
    }))
      .catch(err => console.log(err));

    for(var i = 0; i < this.state.episodes.length; i++){
      //console.log(this.state.episodes[i]);
      if(this.state.episodes[i].episode_title === this.state.episode_title){
        return this.state.episode = this.state.episodes[i];
      }
    }
  }

  listEpisodes = () => {
    for (var i = 0; i < this.state.episodes.length; i++) {
      console.log(this.state.episodes[i]);
    }
  }

  render() {
    console.log(this.props.match.params.ep_id);
    return (
      
      <div>

          <EpisodeCard
            key={this.state.podcast_title}
            podcast_title={this.state.podcast_title}
            episode_title={this.state.episode.title}
            episode_description={this.state.episode.description}
            episode_release_date={this.state.episode.released}
            handleStripHTML={this.handleStripHTML}
          />

      {this.state.episode_comments.length === 0 ? (
        <li>
          <h3><em>No comments to display.</em></h3>
        </li>
      ) : (
      
      <div>
        <AddComment />
        <List length={this.state.episode_comments.length}>
          {this.state.episode_comments.map(comment => {
            return (
              <CommentCard
                key={comment.title}
                author={comment.author}
                comment_timestamp={comment.timestamp}
                message={comment.message}
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

export default EpisodePage;