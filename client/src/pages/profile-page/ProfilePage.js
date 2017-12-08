import React, {Component} from 'react';
import CommentCard from "../../components/comment-card/CommentCard";
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import List from "../../components/list/List";
import './ProfilePage.css';
import FullSearchBar from "../../components/search-bar/FullSearchBar";
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
    if (this.state.user_data){
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
    }
  }

  logout(){
    API.logout().then(
      this.setState({
        user_data: {}
      })
    );
  }

  convertCommentTimestamp = (string) => {
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    let time = (Number(date) + (offset * 60 * 1000));
    date.setTime(Number(time));
    var res = String(date);
    return res;
  }

  render() {
    return (
      <div className="home-wrapper">
        <Header>
          <FullSearchBar placeholder="Find a podcast" label={<i className="fa fa-search" aria-hidden="true"></i>}/>
          {this.state.user_data ? (
          <Link to="/" onClick={this.logout}>Log Out</Link>
          ) : (
            <div className="links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
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
                        convertCommentTimestamp={this.convertCommentTimestamp}
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