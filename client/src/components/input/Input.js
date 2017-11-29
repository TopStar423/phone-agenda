import React from 'react';
import "./Input.css";

const Input = (props) => {
  return (
	  <div>
	    <input className="form-control" {...props} />
	  </div>
	);  
};

export default Input;