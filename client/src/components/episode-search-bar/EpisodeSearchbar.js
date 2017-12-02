import React from "react";
import { Link } from 'react-router-dom'
import Input from "../input/Input";

const EpisodeSearchbar = props =>
	<form onSubmit={props.handleFormSubmit} className="episodesearchbar">
		<Input 
      onChange={props.handleInputChange} 
			value={props.episode_title}
      name="episode_title"
      type="text"
      className="form-control"
			id="title"
			required=""
		/>
		<button type="submit" >Submit</button>
	</form>;

export default EpisodeSearchbar;