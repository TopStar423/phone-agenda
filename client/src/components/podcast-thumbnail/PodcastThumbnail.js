import React from 'react';
import "./PodcastThumbnail.css";

const PodcastThumbnail = (props) =>
  <div className="podcast-thumbnail"> 
  	<img src={props.image} alt="" />
  </div>;

export default PodcastThumbnail;