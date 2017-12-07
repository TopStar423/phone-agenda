import React, {Component} from 'react';
import FullSearchBar from "../search-bar/FullSearchBar";
import "./LandingPageIntro.css";


const LandingPageIntro = () => {
  return (
    <div className="landingIntro">
      <h1>podtalk</h1>
      <h2>Join the Conversation</h2>
      <h3><em>Find a Podcast</em></h3>
      <FullSearchBar label={<i class="fa fa-search fa-2x" aria-hidden="true"></i>}/>
    </div>
  );
};

export default LandingPageIntro;