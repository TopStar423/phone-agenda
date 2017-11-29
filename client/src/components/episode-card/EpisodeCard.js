import React from 'react';
import Button from "../button/Button";
import "./EpisodeCard.css";

const EpisodeCard = (props) =>
  <div className="episode-card-box"> 
  	<h3>{props.podcast_title}</h3>
  	<h2>{props.episode_title}</h2>
  	<h2>{props.handleStripHTML(props.episode_description)}</h2>
  	<h2>{props.episode_release_date}</h2>
  	<a href={props.url}><Button label="Play Episode" /></a>
  	<Button className="episodeButton" label="Comments" />
  </div>;

export default EpisodeCard;