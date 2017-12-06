import React from 'react';
import "./Button.css";

const Button = (props) => (
  <button className={props.buttonClassName} type={props.type} onClick={props.onSubmit}>{props.label}</button>
);

export default Button;