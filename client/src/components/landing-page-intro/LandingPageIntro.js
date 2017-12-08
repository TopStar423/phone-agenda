import React from 'react';
import FullSearchBar from "../search-bar/FullSearchBar";
import Logo from "../logo/Logo";
import "./LandingPageIntro.css";


const LandingPageIntro = () => {
  return (
    <div className="landingIntro">
      <Logo />
      <h2>join the conversation</h2>
      <h3>find a podcast</h3>
      <FullSearchBar label="search"/>
    </div>
  );
};

export default LandingPageIntro;