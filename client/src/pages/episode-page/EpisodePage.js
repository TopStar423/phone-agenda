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
    episode_comments: []
  }

  componentDidMount() {
    console.log(this.props.match.params);
    var replaced = this.props.match.params.pod_id.split(' ').join('+');
    // API.searchEpisode(replaced, this.props.match.params.ep_url).then(res => this.setState({
    //   episode: res.data.rss,
    //   podcast_title: replaced
    // }))
    //   .catch(err => console.log(err));
  }

  handleStripHTML = (description) => {
    description = description || "";
    var stripped = description.replace(/<[^>]+>/g, "");
    var decoded = he.decode(stripped)
    return decoded;
  }

  listEpisodes = () => {
    for (var i = 0; i < this.state.episodes.length; i++) {
      console.log(this.state.episodes[i]);
    }
  }

  getEpisode = () => {
    var ep_id = this.props.match.params.ep_id;
    ep_id = ep_id.trim().split('%20').join(' ');
    
    for(var i = 0; i < this.state.episodes.length; i++){
      var ep_title = this.state.episodes[i].title;
      ep_title = ep_title.trim();

      if(ep_title === ep_id){
        this.setState({
          episode: this.state.episodes[i]
        });
        break;
      }
    }
  }

  render() {
    console.log(this.props.match.params);
    return (
      <div>
      <h1>Why the fuck aren't you rendering anything?</h1>
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