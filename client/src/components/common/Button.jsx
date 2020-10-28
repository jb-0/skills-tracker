import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <button className="base-button" onClick={props.buttonAction} type="button">
      {props.buttonText}
    </button>
  );
}

export default Button;
