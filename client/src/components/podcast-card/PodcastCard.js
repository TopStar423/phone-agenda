import React from 'react';
import PodcastThumbnail from "../../components/podcast-thumbnail/PodcastThumbnail";
import Button from "../button/Button";
import "./PodcastCard.css";

const PodcastCard = (props) =>
  <div className="podcast-box">
    <div className="title">
      <PodcastThumbnail image={props.image}/>
      {/*<h3>{props.podcast_title}</h3>*/}
      <h2>{props.handleStripHTML(props.podcast_description)}</h2>
    </div>
    <div className="link-subscribe">
      <h2><a href={props.podcast_url}>{props.podcast_url}</a></h2>
      <Button className="podcastButton" label="Subscribe"/>
    </div>
  </div>;

export default PodcastCard;