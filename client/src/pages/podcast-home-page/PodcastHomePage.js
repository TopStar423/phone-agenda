import React, {Component} from 'react';
import Input from "../../components/input/Input";
import EpisodeSearchbar from "../../components/episode-search-bar/EpisodeSearchbar";
import PodcastCard from "../../components/podcast-card/PodcastCard";
import EpisodeCard from "../../components/episode-card/EpisodeCard";
import List from "../../components/list/List";
import Header from './../../components/partials/header/Header';
import Searchbar from '../../components/search-bar/ResultsPageSearchbar';
import {Link} from "react-router-dom";
import FullSearchBar from "../../components/search-bar/FullSearchBar";
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
      }, () => {this.loadEpisodes()})
    )
     .catch(err => console.log(err));
  }

  loadEpisodes = () => {
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
    if(this.state.episode_title !== ""){
      this.episodeSearch();
    }
  }

  handleStripHTML = (description) => {
    var stripped = description.replace(/<[^>]+>/g, '');
    var decoded = he.decode(stripped)
    return decoded;
  }

  episodeSearch = (title) => {
    if(title !== null){
      var countArr = [];
      var resultsArr = [];

      var titleArr = this.state.episode_title.match(/\b\w+?\b/g).map(function(word) {
        return word.toLowerCase();
      });

      for(var i = 0; i < this.state.episodes.length; i++){
        countArr[i] = 0;
        resultsArr[i] = 0;

        var epTitleArr = this.state.episodes[i].title.match(/\b\w+?\b/g).map(function(word) {
          return word.toLowerCase();
        });

        for(var j = 0; j < titleArr.length; j++){
          for(var k = 0; k < epTitleArr.length; k++){
            if(titleArr[j] === epTitleArr[k]){
              countArr[i]++; // countArr records all the scores in each index
              resultsArr[i] = this.state.episodes[i]; // resultsArr records all the episodes that match
            }
          }
        }
      }
    }

    // selection sort, mofos
    for (let i = 0; i < (countArr.length - 1); i++){
      let max = i;
      
      for (let j = (i + 1); j < countArr.length; j++){
        if (countArr[j] >= countArr[max]){
          max = j;
        }
      }

      let temp = countArr[max];
      let tempObj = resultsArr[max];

      countArr[max] = countArr[i];
      resultsArr[max] = resultsArr[i];
      countArr[i] = temp;
      resultsArr[i] = tempObj;
    }

    // gets rid of all other indices that are empty
    for(var x = 0; x < resultsArr.length; x++){
      if(resultsArr[x] === 0){
        resultsArr.splice(x--, 1);
      }
    }

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

  logout(){
    API.logout().then(
      this.setState({
        user_data: {}
      })
    );
  }

  convertTimestamp = (string) => {
    var date = new Date(Number(string));
    return String(date);
  }

  reset = () => {
    this.loadEpisodes();
  }

  render() {
    return (
      <div className="podcast-homepage-wrapper">
        <Header>
          <FullSearchBar placeholder="Find a podcast" label={<i class="fa fa-search" aria-hidden="true"></i>}/>
          {this.state.user_data ? (
            <Link to="/" onClick={this.logout}>Log Out</Link>
          ) : (
            <div className="links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
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
          <div className="episode-searchbar">
            <h2>Find an episode:</h2>
            <EpisodeSearchbar
              handleInputChange={this.handleInputChange}
              podcast_title={this.state.podcast_title}
              handleFormSubmit={this.handleFormSubmit}
              query={this.state.episode_title}
              reset={this.reset}
            />
          </div>
          {this.state.episodes.length === 0 ? (
            <h3><em>No episodes found.</em></h3>
          ) : (
            <div className="results-box">
              <div className="title-search">
                <h1><strong>{this.state.episodes.length} Episodes</strong></h1>
              </div>
              <List>
                {this.state.episodes.map((episode, index) => {
                  return (
                    <EpisodeCard
                      key={index}
                      podcast_title={this.state.podcast_title}
                      episode_title={episode.title}
                      episode_description={episode.description}
                      episode_release_date={episode.created}
                      episode_url={episode.url}
                      url={episode.mp3}
                      handleStripHTML={this.handleStripHTML}
                      convertTimestamp={this.convertTimestamp}
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