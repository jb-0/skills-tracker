import React from 'react';
import './Image.css'

function Image(props) {
  return (
    <div className='image'>
      <img
        src={props.src}
        alt={props.alt}
      ></img>
    </div>
  );
}

export default Image;
