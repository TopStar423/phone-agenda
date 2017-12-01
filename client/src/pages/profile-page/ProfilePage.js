import React, {Component} from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import List from "../../components/list/List";
import './ProfilePage.css';

class ProfilePage extends Component {
  state = {
    podcasts: [],
    user_comments: []
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {

    return (
      <div className="profile-wrapper">
        <Header>
          {!this.state.userId ? (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          ) : (
            <Link to="/">Log Out</Link>
          )}
        </Header>
        <div>
          <div>
            {!this.state.podcasts ? (
              <li>
                <h3 style={{marginTop: "10px", marginBottom: "15px"}}><span><em>No podcasts to display.</em></span></h3>
              </li>
            ) : (
              <div>
                <List length={this.state.podcasts.length}>
                  {this.state.podcasts.map(podcast => {
                    return (
                      <PodcastCard
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
          <div>
            {!this.state.userComments ? (
              <li>
                <h3 style={{marginTop: "10px", marginBottom: "15px"}}><span><em>No userComments to display.</em></span>
                </h3>
              </li>
            ) : (
              <div>
                <List length={this.state.user_comments.length}>
                  {this.state.user_comments.map(comment => {
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

export default ProfilePage;