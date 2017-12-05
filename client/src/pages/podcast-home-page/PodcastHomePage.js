import React, {Component} from 'react';
import Input from "../../components/input/Input";
import EpisodeSearchbar from "../../components/episode-search-bar/EpisodeSearchbar";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import List from "../../components/list/List";
import Header from './../../components/partials/header/Header';
import Searchbar from './../../components/search-bar/Searchbar';
import {Link} from "react-router-dom";

import API from "./../../utils/API";
import he from "he";
import "./PodcastHomePage.css";


class PodcastHomePage extends Component {
  state = {
    podcast_title: "",
    podcast_description: "",
    podcast_url: "",
    image: "",
    episodes: [],
    episode_title: "",
    user_data: {}
  }

  componentDidMount() {
    API.getUserData().then(res =>
      this.setState({
        user_data: res.data.data
      })
    )
     .catch(err => console.log(err));

    const that = this;
    let replaced = this.props.match.params.id.split(' ').join('+');

    API.searchEpisodes(replaced).then(function(res){
      const episodesArr = res.data.rss.items.map(function(item) {
        let mp3 = "";
        try {
          mp3 = item.media.content[0].url;
        } catch(e) {
          mp3 = "";
        }

        try {
          mp3 = mp3.length > 1 ? mp3 : item.enclosures[0].url;
        } catch(e) {
          mp3 = mp3.length > 1 ? mp3 : [];
        }
        item.mp3 = mp3;
        return item;
      })

      that.setState({
        podcast_title: res.data.rss.title,
        podcast_description: res.data.rss.description,
        podcast_url: res.data.rss.url,
        image: res.data.artworkUrl,
        episodes: episodesArr
      })

    }).catch(err => console.log(err));
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.episodeSearch();
  }

  handleStripHTML = (description) => {
    var stripped = description.replace(/<[^>]+>/g, '');
    var decoded = he.decode(stripped)
    return decoded;
  }

  episodeSearch = (title) => {
    var tempArr = [];
    var resultsArr = [];

    // convert search term(s) into array of words
    var titleArr = this.state.episode_title.match(/\b\w+?\b/g).map(function(word) {
      return word.toLowerCase();
    });

    // now, go through the episodes array, all the titles
    for(var i = 0; i < this.state.episodes.length; i++){
      tempArr[i] = -1;
      resultsArr[i] = -1;
      
      // convert all the episode titles into another array of words
      var epTitleArr = this.state.episodes[i].title.match(/\b\w+?\b/g).map(function(word) {
        return word.toLowerCase();
      });

      // now, record all the matches
      for(var j = 0; j < titleArr.length; j++){
        for(var k = 0; k < epTitleArr.length; k++){
          if(titleArr[j] === epTitleArr[k]){
            tempArr[i]++; 
            // tempArr records all the scores in each index

            resultsArr[i] = this.state.episodes[i];
          }
        }
      }
    }

    //tempArr.sort(function(a, b){return b-a})

    for(var x = 0; x < resultsArr.length; x++){
      if(resultsArr[x] === -1){
        resultsArr.splice(x--, 1);
      }
    }

    // for(var x = 0; x < resultsArr.length; x++){
    //   console.log(resultsArr[x]);
    // }

    this.setState({
      episodes: resultsArr
    });    
  }

  subscribe = () => {
    API.savePodcast({
      imageUrl: this.state.image,
      podcastName: this.state.podcast_title,
      userId: this.state.user_data.id
    })
     .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="podcast-homepage-wrapper">
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
          <div className="podcast-homepage">
            <PodcastCard
              podcast_description={this.state.podcast_description}
              podcast_title={this.props.match.params.id}
              // podcast_url={this.state.podcast_url}
              image={this.state.image}
              handleStripHTML={this.handleStripHTML}
              subscribe={this.subscribe}
            />
          </div>

          {this.state.episodes.length === 0 ? (
            <h3><em>No episodes found.</em></h3>
          ) : (
            <div className="results-box">
              <div className="title-search">
                <h1><strong>{this.state.episodes.length} Episodes</strong></h1>
                <div className="episode-search">
                  <h2>Find an episode:</h2>
                  <EpisodeSearchbar
                    handleInputChange={this.handleInputChange}
                    podcast_title={this.state.podcast_title}
                    handleFormSubmit={this.handleFormSubmit}
                    query={this.state.episode_title}
                  />
                </div>

              </div>
              <List>
                {this.state.episodes.map((episode, index) => {
                  return (
                    <EpisodeCard
                      key={index}
                      podcast_title={this.state.podcast_title}
                      episode_title={episode.title}
                      episode_description={episode.description}
                      episode_release_date={episode.released}
                      episode_url={episode.url}
                      url={episode.mp3}
                      handleStripHTML={this.handleStripHTML}
                      encodeUrl={this.encodeUrl}
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

export default PodcastHomePage;