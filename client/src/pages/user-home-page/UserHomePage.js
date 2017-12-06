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
    podcast_comments: [],
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
      }, () => this.getSavedPodcastComments())
    )
      .catch(err => console.log(err));
  }

  getSavedPodcastComments(){
    for (let i = 0; i < this.state.user_podcasts.length; i++ ){
      let podcastName = this.state.user_podcasts[i].podcastName;
      API.getSavedPodcastComments(podcastName).then(commentArray => {
        for(let j = 0; j < commentArray.data.length; j++){
          if (commentArray.data[j]){
            console.log(commentArray);
            this.setState({
              podcast_comments: this.state.podcast_comments.concat(commentArray.data[j])

            })
          }

        }
      })
    }
}

  render() {
    console.log(this.state.podcast_comments);
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
             {this.state.podcast_comments.length == 0 ? (
                <div>
                  <h3><em>No comments to display.</em></h3>
                </div>
              ) : (
              <div>
                <List>
                  {this.state.podcast_comments.map((comment, index) => {
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

export default UserHomePage;