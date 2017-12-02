import React, {Component} from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import List from "../../components/list/List";
import Header from "../../components/partials/header/Header";
import {Link} from "react-router-dom";
import './UserHomePage.css'
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";

class UserHomePage extends Component {
  state = {
    podcasts: [],
    podcast_comments: []
  };


  render() {
    return (
      <div className="home-wrapper">
        <Header>
          <Link to="/">Log Out</Link>
        </Header>
        <div className="home-main">
          <div className="sidebar">
            {!this.state.podcasts.length ? (
              <li>
                <h3><em>No podcasts to display.</em></h3>
              </li>
            ) : (
              <div>
                <List length={this.state.podcasts.length}>
                  {this.state.podcasts.map(podcast => {
                    return (
                      <PodcastThumbnail
                        image={this.state.podcast.image}
                        podcast_title={this.state.podcast.title}
                        podcast_description={this.state.podcast.description}
                        subscribed={this.state.podcast.subscribed}
                      />
                    );
                  })}
                </List>
              </div>
            )}
          </div>
          <div className="feed">
            {!this.state.podcast_comments.length ? (
              <li>
                <h3><em>No comments to display.</em></h3>
              </li>
            ) : (
              <div>
                <List length={this.state.podcast_comments.length}>
                  {this.state.podcast_comments.map(comment => {
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
        </div>
      </div>
    );
  };
}

export default UserHomePage;