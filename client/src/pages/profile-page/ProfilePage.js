import React, {Component} from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import List from "../../components/list/List";
import './ProfilePage.css';
import API from "./../../utils/API";
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";


// user profile page == all the comments they made
class ProfilePage extends Component {
  state = {
    podcasts: [],
    user_comments: []
  };

  componentDidMount() {
    this.getUserPodcasts();
    this.getUserComments();
  }

  getUserComments = () => { // userID #1 in this example
    API.getUserComments(1).then(res =>
      this.setState({
        user_comments: res.data
      })
    )
      .catch(err => console.log(err));
  }

  getUserPodcasts = () => { // userID #1 in this example
    API.getUserPodcasts(1).then(res =>
      this.setState({
        user_podcasts: res.data
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
            <h1>Latest Comments:</h1>
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

export default ProfilePage;