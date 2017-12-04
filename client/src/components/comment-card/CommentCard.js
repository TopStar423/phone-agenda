import React from 'react';
import Button from "../button/Button";
import "./CommentCard.css";

const CommentCard = (props) =>
  <div> 
  	<h2>{props.username}{props.comment_timestamp}</h2>
  	<p>{props.message}</p>
  	<Button label="Reply"	/>
  </div>;

export default CommentCard;