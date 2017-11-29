import React from 'react';
import "./List.css";

const List = ({podcast_title, children}) => {
  return (
  	<div>
		  <div className="list-box">
		  	{children}
		  </div>
	  </div>
	);  
};

export default List;