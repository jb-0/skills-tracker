import React from 'react';
import { ButtonStyled } from './Button.Styles';

function Button(props) {
  return (
    <ButtonStyled onClick={props.buttonAction} type="button">
      {props.buttonText}
    </ButtonStyled>
  );
}

export default Button;
