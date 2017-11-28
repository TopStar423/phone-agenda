import React, { Component } from 'react';
import PodcastCard from "../../components/podcast-card/PodcastCard";
import CommentCard from "../../components/comment-card/CommentCard";
import List from "../../components/list/List";

class UserHomePage extends Component {
  state = {
    podcasts: [],
    podcast_comments: []
  };


  render() {
    return (
      <div>
        <div>
          {(this.state.podcasts.length === 0) ? (
            <li>
              <h3><em>No podcasts to display.</em></h3>
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
          {(this.state.podcast_comments.length === 0) ? (
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
    );
  };
}

export default UserHomePage;