import React, {Component} from 'react';
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import CommentCard from "../../components/comment-card/CommentCard";
import AddComment from "../../components/add-comment/AddComment";
import List from "../../components/list/List";
import Header from './../../components/partials/header/Header';
import {Link} from "react-router-dom";
import './EpisodePage.css';
import FullSearchBar from "../../components/search-bar/FullSearchBar";


import API from "./../../utils/API";
import he from "he";
import "./EpisodePage.css";

class EpisodePage extends Component {
  state = {
    episode: {},
    mp3: "",
    podcast_title: "",
    episode_comments: [],
    user_data: {}
  }

  componentDidMount() {
    let mp3 = "";
    let episode = {};

    var replaced = this.props.match.params.pod_id.split(' ').join('+');
    API.searchEpisode(replaced, this.props.match.params.ep_id).then(res => 
      this.setState({
      mp3: res.data.rss.enclosures[0].url !== undefined ? res.data.rss.enclosures[0].url : res.data.rss.media.content[0].url,
      episode: res.data.rss,
      podcast_title: replaced
    }))
      .catch(err => console.log(err));

    API.getUserData().then(res =>
      this.setState({
        user_data: res.data.data
      }, () => {
        this.getEpisodeComments();
      }))
     .catch(err => console.log(err));

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
    var temp = decodeURIComponent(this.props.match.params.ep_id);

    API.saveComment({
      comment: this.state.comment,
      podcastName: this.props.match.params.pod_id,
      podcastEpisodeName: temp,
      userId: this.state.user_data.id,
      username: this.state.user_data.username
    });

    this.getEpisodeComments();
  }

  handleInputChange = event =>{
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  logout(){
    API.logout().then(
      this.setState({
        user_data: {}
      })
    );
  }

  convertTimestamp = (number) => {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var date = new Date(number);
    var temp = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return temp;
  }

  convertCommentTimestamp = (string) => {
    var now = Date.now();
    var then = Date.parse(string);
    var diff = Math.abs(now - then);
    var seconds = Math.floor(diff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    if(hours > 24){
      return ("posted on " + this.convertTimestamp(then));
    }

    else if(hours < 24){
      if(hours < 1){
        if(minutes < 1){
          return ("posted a few seconds ago...");
        } 

        else {
          return ("posted " + minutes + " minutes ago...");
        }
      }

      else {
        return ("posted " + hours + " hours ago...");
      }
    }
  }

  render() {
    return (
      <div className="episode-wrapper">
        <Header>
          <FullSearchBar placeholder="Find a podcast" label={<i className="fa fa-search" aria-hidden="true"></i>}/>
          {this.state.user_data ? (
            <Link to="/" onClick={this.logout} >Log Out</Link>
          ) : (
            <div className="links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
        </Header>
        <div className="episode-main">
          <EpisodeCard
            podcast_title={this.state.podcast_title}
            episode_title={this.state.episode.title}
            episode_description={this.state.episode.description}
            episode_created={this.state.episode.created}
            episode_url={this.state.mp3}
            handleStripHTML={this.handleStripHTML}
            convertTimestamp={this.convertTimestamp}
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
                      username={comment.username}
                      convertCommentTimestamp={this.convertCommentTimestamp}
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