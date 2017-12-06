import React, {Component} from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import List from "../../components/list/List";
import Header from "../../components/partials/header/Header";
import {Link} from "react-router-dom";
import './UserHomePage.css'
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import FullSearchBar from "../../components/search-bar/FullSearchBar";


class UserHomePage extends Component {
  state = {
    podcasts: [],
    podcast_comments: []
  };


  render() {
    return (
      <div className="home-wrapper">
        <Header>
          <FullSearchBar placeholder="Find a podcast" label={<i class="fa fa-search" aria-hidden="true"></i>}/>
          <Link to="/">Log Out</Link>
        </Header>
        <div className="home-main">
          <div className="sidebar">
            <h1>Your Podcasts</h1>
            {!this.state.podcasts.length ? (
              <div>
                <h3><em>No podcasts to display.</em></h3>
              </div>
            ) : (
              <div>
                <List length={this.state.podcasts.length}>
                  {this.state.podcasts.map(podcast => {
                    return (
                      <PodcastThumbnail
                        image={this.state.podcast.image}
                        podcast_title={this.state.podcast.title}
                      />
                    );
                  })}
                </List>
              </div>
            )}
          </div>
          <div className="feed">
            <h1>Latest Comments</h1>
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