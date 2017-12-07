import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../button/Button";
import "./EpisodeCard.css";
import ReactAudioPlayer from 'react-audio-player';


const EpisodeCard = (props) => (
	<div className="episode-card-wrapper">
	  <Link to={`/episode/${props.podcast_title}/${encodeURIComponent(props.episode_title)}`}>
	  	<h2>{props.episode_title}</h2>
	  </Link>
  	
  	<p>{props.handleStripHTML(props.episode_description)}</p>
  	<h2>{props.episode_release_date}</h2>
		<div className="audio-comments">
			<ReactAudioPlayer
				src={props.url}
				controls
			/>
			<Button className="episode-button" label="Comments" />
		</div>

  </div>
);

export default EpisodeCard;