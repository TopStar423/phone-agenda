import React from "react";
import { Link } from 'react-router-dom'
import Input from "../input/Input";

const EpisodeSearchbar = props =>
	<form onSubmit={props.handleFormSubmit}>
		<Input 
      onChange={props.handleInputChange} 
			value={props.episode_title}
      name="episode_title"
      type="text"
      className="form-control"
			id="title"
			required=""
		/>
		<button type="submit" ><i class="fa fa-search fa-2x" aria-hidden="true"></i></button>
	</form>;

export default EpisodeSearchbar;