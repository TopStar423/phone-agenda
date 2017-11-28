import React, { Component } from 'react';
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import CommentCard from "../../components/comment-card/CommentCard";
import AddComment from "../../components/add-comment/AddComment";
import List from "../../components/list/List";

class EpisodePage extends Component {
  state = {
    podcast: {},
    episode: {},
    episode_comments: []
  };

  render() {
    return (
      <div>
        {!this.state.episode ? (
          <li>
            <h3><em>No episode to display.</em></h3>
          </li>
        ) : (
        <div>
          <EpisodeCard
            key={this.state.episode.title}
            image={this.state.podcast.image}
            podcast_title={this.state.podcast.title}
            episode_title={this.state.episode.title}
            episode_description={this.state.episode.description}
            episode_release_date={this.state.episode.pub_date}
            url={this.state.episode.url}
          />
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