import React from "react";
import { Link } from 'react-router-dom'
import Input from "../input/Input";


const Searchbar = props =>
	<div className="searchbar">
		<Input 
      onChange={props.handleInputChange} 
			value={props.value}
      name="podcast_title"
      type="text"
      className="form-control"
			id="title"
			required=""
		/>
		<Link to={`/search-results/${props.podcast_title}`}><button type="submit">Submit</button></Link>
	</div>;

export default Searchbar;