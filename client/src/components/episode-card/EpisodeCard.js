import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../button/Button";
import "./EpisodeCard.css";
import ReactAudioPlayer from 'react-audio-player';


const EpisodeCard = (props) => (
	<div className="episode-card-box"> 
	  <Link to={`/episode/${props.podcast_title}/${encodeURIComponent(props.episode_url)}`}>
	  	<h2>{props.episode_title}</h2>
	  </Link>
  	
  	<h2>{props.handleStripHTML(props.episode_description)}</h2>
  	<h2>{props.episode_release_date}</h2>

		<ReactAudioPlayer
			src={props.url}
			controls
		/>
  	<Button className="episodeButton" label="Comments" />
  </div>
);

export default EpisodeCard;