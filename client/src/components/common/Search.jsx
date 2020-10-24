import React from 'react';
import './Search.css';

function Search(props) {
  return (
    <div className="search-container">
      <input
        onChange={props.handleTextBoxUpdates}
        type="text"
        id="searchInputText"
        name="searchInputText"
        autocomplete="off"
      ></input>

      {props.suggestedTerms.map((suggestedTerm) => {
        return (
          <div className="suggested-term-container">
            <p onClick={props.addSearchTerm} id={suggestedTerm}>{suggestedTerm}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Search;
