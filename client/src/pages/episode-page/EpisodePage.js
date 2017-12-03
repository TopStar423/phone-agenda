import React, {Component} from 'react';
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import CommentCard from "../../components/comment-card/CommentCard";
import AddComment from "../../components/add-comment/AddComment";
import List from "../../components/list/List";
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import './EpisodePage.css';

import API from "./../../utils/API";
import he from "he";
import "./EpisodePage.css";

class EpisodePage extends Component {
  state = {
    episode: {},
    podcast_title: "",
    episode_comments: []
  }

  componentDidMount() {
    var replaced = this.props.match.params.pod_id.split(' ').join('+');
    API.searchEpisode(replaced, this.props.match.params.ep_url).then(res => this.setState({
      episode: res.data.rss,
      podcast_title: replaced
    }))
      .catch(err => console.log(err));

    this.getEpisodeComments();
  }

  getEpisodeComments = () => {
    API.getEpisodeComments(this.props.match.params.pod_id, this.props.match.params.ep_id).then(res =>
      this.setState({
        episode_comments: res.data
      })
    )
      .catch(err => console.log(err));
  }

  handleStripHTML = (description) => {
    description = description || "";
    var stripped = description.replace(/<[^>]+>/g, "");
    var decoded = he.decode(stripped)
    return decoded;
  }

  listEpisodes = () => {
    for (var i = 0; i < this.state.episodes.length; i++) {
      console.log(this.state.episodes[i]);
    }
  }

  getEpisode = () => {
    var ep_id = this.props.match.params.ep_id;
    ep_id = ep_id.trim().split('%20').join(' ');

    for (var i = 0; i < this.state.episodes.length; i++) {
      var ep_title = this.state.episodes[i].title;
      ep_title = ep_title.trim();

      if (ep_title === ep_id) {
        this.setState({
          episode: this.state.episodes[i]
        });
        break;
      }
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.saveComment({
      comment: this.state.comment,
      podcastName: this.props.match.params.pod_id,
      podcastEpisodeName: this.props.match.params.ep_id,
      userId: 1
    }).then(this.getEpisodeComments());
  }

  handleInputChange = event =>{
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.props.match.params);
    return (
      <div className="episode-wrapper">
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
          <EpisodeCard
            key={this.state.podcast_title}
            podcast_title={this.state.podcast_title}
            episode_title={this.state.episode.title}
            episode_description={this.state.episode.description}
            episode_release_date={this.state.episode.released}
            handleStripHTML={this.handleStripHTML}
          />
            <div>
              <AddComment
              handleFormSubmit = {this.handleFormSubmit}
              handleInputChange = {this.handleInputChange}
              comment = {this.state.comment}
              />
              <List>
                {this.state.episode_comments.map(comment => {
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
    )
  }
}


        export default EpisodePage;