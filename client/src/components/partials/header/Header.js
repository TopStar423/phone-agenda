import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../logo/Logo";
import './Header.css';

const Header = (props) => (
  <div className="header">
    <div className="left">
      <Logo src="http://placebear.com/200/60"/>
    </div>
    <div className="right">
      {props.children}
    </div>
  </div>
);

export default Header;