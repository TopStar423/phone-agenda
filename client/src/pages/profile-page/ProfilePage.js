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
    user_podcasts: [],
    user_comments: [],
    user_data: {}
  };

  componentWillMount() {
    API.getUserData().then(res =>
      this.setState({
        user_data: res.data.data
      }, () => this.getUserStuff())
      )
     .catch(err => console.log(err));
  }

  getUserStuff = () => {
    API.getUserComments(this.state.user_data.id).then(res =>
      this.setState({
        user_comments: res.data
      })
    )
      .catch(err => console.log(err));

    API.getUserPodcasts(this.state.user_data.id).then(res =>
      this.setState({
        user_podcasts: res.data
      })
    )
      .catch(err => console.log(err));
    console.log("hello");
  }

  logout(){
    API.logout().then(
      this.setState({
        user_data: {}
      })
    );
  }

  render() {
    console.log(this.state.user_comments);
    return (
      <div className="home-wrapper">
        <Header>
          <Link to="/" onclick={this.logout}>Log Out</Link>
        </Header>
        <div className="home-main">
          <div className="sidebar">
            <h1>Your Podcasts</h1>
            {this.state.user_podcasts.length == 0 ? (
              <div>
                <h3><em>No podcasts to display.</em></h3>
              </div>
            ) : (
              <div>
                <List>
                  {this.state.user_podcasts.map((podcast, index) => {
                    return (
                      <PodcastThumbnail
                        key={index}
                        image={podcast.imageUrl}
                        podcast_title={podcast.podcastName}
                      />
                    );
                  })}
                </List>
              </div>
            )}
          </div>
          <div className="feed">
            <h1>Latest Comments:</h1>
              {this.state.user_comments.length == 0 ? (
                <div>
                  <h3><em>No comments to display.</em></h3>
                </div>
              ) : (
              <div>
                <List>
                  {this.state.user_comments.map((comment, index) => {
                    return (
                      <CommentCard
                        key={index}
                        comment_timestamp={comment.createdAt}
                        message={comment.comment}
                        username={comment.username}
                        podcast_title={comment.podcastName}
                        episode_title={comment.podcastEpisodeName}
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

export default ProfilePage;