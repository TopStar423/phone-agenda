import React from 'react';
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import Button from "../button/Button";
import "./EpisodeCard.css";

const EpisodeCard = (props) =>
  <div> 
  	<PodcastThumbnail image={props.image} />
  	<h3>{props.podcast_title}</h3>
  	<h2>{props.episode_title}</h2>
  	<h2>{props.episode_description}</h2>
  	<h2>{props.episode_release_date}</h2>
  	<href src={props.url}><Button label="Play Episode" /></href>
  	<Button className="episodeButton" label="Comments" />
  </div>;

export default EpisodeCard;