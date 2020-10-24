import React from 'react';
import './ImageContainer.css'

function ImageContainer(props) {
  return (
    <div className='image-container'>
      <img
        src={props.src}
        alt={props.alt}
      ></img>
    </div>
  );
}

export default ImageContainer;
