import React from "react";
import "./PodcastList.css";

export const PodcastListItem = props =>
  <li className="list-group-item">
    <div>
    	<h3><a href={props.link} target='_blank'>{props.title}</a>
				<button onClick={() => props.handlePodcastSave(props.title)} className='btn btn-success'><strong>Save</strong></button>
        <p>{props.handleStripHTML(props.description)}</p>
    	</h3>
    </div>
  </li>;
