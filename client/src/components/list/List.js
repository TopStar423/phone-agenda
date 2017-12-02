import React from 'react';
import "./List.css";

const List = ({children}) => {
  return (
  	<div>
		  <div className="list-box">
		  	{children}
		  </div>
	  </div>
	);  
};

export default List;