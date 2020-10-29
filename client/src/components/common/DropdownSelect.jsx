import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './DropdownSelect.css'

function DropdownSelect(props) {
  return (
    <div className="dropdown-select">
      <select name={props.name} id={props.name} value={props.value} onChange={props.onChange}>
        {props.selectOptions.map((selection) => {
          return <option key={uuidv4()} value={selection}>{selection}</option>;
        })}
      </select>
    </div>
  );
}

export default DropdownSelect;
