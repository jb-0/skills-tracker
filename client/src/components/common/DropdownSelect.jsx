import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DropdownSelectStyled } from './DropdownSelect.Styles';

function DropdownSelect(props) {
  return (
    <DropdownSelectStyled name={props.name} id={props.name} value={props.value} onChange={props.onChange}>
      {props.selectOptions.map((selection) => {
        return <option key={uuidv4()} value={selection}>{selection}</option>;
      })}
    </DropdownSelectStyled>
  );
}

export default DropdownSelect;
