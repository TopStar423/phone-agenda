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
  	<h3><i>Released: {props.convertTimestamp(props.episode_created)}</i></h3>
		<div className="audio-comments">
			<ReactAudioPlayer
				src={props.episode_url}
				controls
			/>
			<Link to={`/episode/${props.podcast_title}/${encodeURIComponent(props.episode_title)}`}>
				<Button className="episode-button" label="View Comments" />
			</Link>
		</div>
  </div>
);

export default EpisodeCard;