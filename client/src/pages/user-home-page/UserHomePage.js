import React, {Component} from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import List from "../../components/list/List";
import Header from "../../components/partials/header/Header";
import {Link} from "react-router-dom";
import './UserHomePage.css'
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import API from "./../../utils/API";


// user-home-page == all the stuff a user follows
class UserHomePage extends Component {
  state = {
    podcasts: [],
    episode_comments: [],
    user_data: {}
  };

  componentDidMount() {
    API.getUserData().then(res =>
      this.setState({
        user_data: res.data.data
      })
    )
     .catch(err => console.log(err));

  }

  getUserPodcasts = () => { 
    API.getUserPodcasts(this.state.user_data.id).then(res =>
      this.setState({
        user_podcasts: res.data
      })
    )
      .catch(err => console.log(err));
  }

  getEpisodeComments = () => {
    API.getEpisodeComments(this.state.user_data.id).then(res =>
      this.setState({
        episode_comments: res.data
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
            {this.state.podcasts.length == 0 ? (
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
             {this.state.episode_comments.length == 0 ? (
                <div>
                  <h3><em>No comments to display.</em></h3>
                </div>
              ) : (
              <div>
                <List>
                  {this.state.episode_comments.map(comment => {
                    return (
                      <CommentCard
                        key={comment.id}
                        comment_timestamp={comment.createdAt}
                        message={comment.comment}
                        username={comment.username}
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