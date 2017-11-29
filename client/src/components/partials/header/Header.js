import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../logo/Logo";
import './Header.css';

const Header = (props) => (
  <div className="header">
    {/*<div className="left">*/}
    {/*<img src="" alt=""/>*/}
    {/*</div>*/}
    {/*<div className="right">*/}
    {/*{props.children}*/}
    {/*</div>*/}
    <Link to="/">Landing Page</Link>
    <Link to="/podcast-home">Podcast Home</Link>
    <Link to="/search-results">Search Results</Link>
    <Link to="/profile">Profile Page</Link>
    <Link to="/episode">Episode Page</Link>
    <Link to="/home">User Home Page</Link>
    <Link to="/settings">Account Settings</Link>
    <Link to="/signup">Sign Up</Link>
    <Link to="/login">Log In</Link>
    <Logo src=""/>
  </div>
);

export default Header;