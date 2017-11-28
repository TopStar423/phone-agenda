import React from 'react';
import "./Input.css";

const Input = (props) => (
  <input type="text" placeholder={props.placeholder} className={props.className}/>
);

export default Input;