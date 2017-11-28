import React from 'react';

const ArtworkThumbnail = (props) => (
  <div className={props.className}>
    <img src={props.src} alt=""/>
  </div>
);

export default ArtworkThumbnail;