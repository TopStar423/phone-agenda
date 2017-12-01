import React from 'react';
import {Link} from "react-router-dom";
import './DevLinks.css';

const DevLinks = (props) => (
  <div className="devLinks">
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
  </div>
);

export default DevLinks;