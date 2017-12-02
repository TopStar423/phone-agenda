import React from 'react';
import { Link } from 'react-router-dom'
import Button from "../button/Button";
import "./PodcastThumbnail.css";

const PodcastThumbnail = (props) =>
  <div className="podcast-thumbnail">
  	<Link to={`/podcast-home/${props.podcast_title}`}><img src={props.image} /></Link>
  </div>;

export default PodcastThumbnail;