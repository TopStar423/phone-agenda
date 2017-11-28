import React from 'react';
import "./PodcastThumbnail.css";

const PodcastThumbnail = (props) =>
  <div> 
  	<img src={props.image} alt="" />
  </div>;

export default PodcastThumbnail;