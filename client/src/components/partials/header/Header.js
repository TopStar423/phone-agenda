import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../logo/Logo";
import './Header.css';

const Header = (props) => (
  <div className="header">
    <div className="left">
      <Link to="/"><Logo /></Link>
    </div>
    <div className="right">
      <Link to="/home"><i className="fa fa-home fa-3x" aria-hidden="true"></i></Link>
      {props.children}
    </div>
  </div>
);

export default Header;