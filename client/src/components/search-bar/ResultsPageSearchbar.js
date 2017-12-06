import React from "react";
import {Link} from 'react-router-dom'
import Input from "../input/Input";


const ResultsPageSearchbar = props =>
  <form className="searchbar" onSubmit={props.submit}>
    <Input
      onChange={props.handleInputChange}
      value={props.value}
      name="podcast_title"
      type="text"
      className="form-control"
      id="title"
      required=""
      placeholder={props.placeholder}
    />
    {/*<Link to={`/search-results/${props.podcast_title}`} onClick={props.onClick}>*/}
      <button type="submit" disabled={props.disabled}>Submit</button>
    {/*</Link>*/}
  </form>;

export default ResultsPageSearchbar;