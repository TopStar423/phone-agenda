import React from 'react';
import "./AddComment.css";
import Input from "../input/Input";

const AddComment = props =>
  <form onSubmit={props.handleFormSubmit} className="add-comment">
    <textarea
      onChange={props.handleInputChange}
      value={props.comment}
      name="comment"
      type="text"
      className="form-control"
      id="comment"
      required="true"
    />
    <button type="submit" style={{cursor: "pointer"}}>Add Comment</button>
  </form>;

export default AddComment;
