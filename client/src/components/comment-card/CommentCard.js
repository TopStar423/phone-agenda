import React from 'react';
import Button from "../button/Button";
import "./CommentCard.css";

const CommentCard = (props) =>
  <div className="comment-box">
	  {props.podcast_title &&
			<h2>{props.podcast_title} - "{props.episode_title}"</h2>
    }

  	<h3>{props.username} - {props.convertCommentTimestamp(props.comment_timestamp)}</h3>
  	<p>{props.message}</p>
  </div>;

export default CommentCard;