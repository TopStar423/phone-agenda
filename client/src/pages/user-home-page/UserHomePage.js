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
    user_podcasts: [],
    episode_comments: [],
    user_data: {}
  };

  componentWillMount() {
    API.getUserData().then(res =>
      this.setState({
        user_data: res.data.data
      }, () => this.getHomePageStuff())
      )
     .catch(err => console.log(err));
  }

  getHomePageStuff() {
    API.getUserPodcasts(this.state.user_data.id).then(res =>
      this.setState({
        user_podcasts: res.data
      }, () => this.getEpisodeComments())
    )
      .catch(err => console.log(err));
  }

  getEpisodeComments(){
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
            <h1>Your Podcasts: </h1>
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
            <h1>Latest Comments: </h1>
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