import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <button className={"base-button " + props.classNames} onClick={props.buttonAction} type="button">
      {props.buttonText}
    </button>
  );
}

export default Button;
