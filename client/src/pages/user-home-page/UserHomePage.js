import React, {Component} from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import List from "../../components/list/List";
import Header from "../../components/partials/header/Header";
import {Link} from "react-router-dom";
import './UserHomePage.css'
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import API from "./../../utils/API";

class UserHomePage extends Component {
  state = {
    podcasts: [],
    user_comments: []
  };

  componentDidMount() {
    this.getUserComments();
  }

  getUserComments = () => {
    API.getUserComments(1).then(res =>
      this.setState({
        user_comments: res.data
      })
    )
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="home-wrapper">
        <Header>
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
              <div>
                <List>
                  {this.state.user_comments.map(comment => {
                    return (
                      <CommentCard
                        key={comment.id}
                        comment_timestamp={comment.createdAt}
                        message={comment.comment}
                      />
                    );
                  })}
                </List>
              </div>
          </div>
        </div>
      </div>
    );
  };
}

export default UserHomePage;