import React from 'react';
import "./Logo.css";

const Logo = (props) => (
  <div className={props.className}>
    <img src={props.src} alt="" />
  </div>
);

export default Logo;