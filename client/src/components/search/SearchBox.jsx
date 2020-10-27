import React from 'react';
import './SearchBox.css';
import './SearchSuggestion';

function Search(props) {
  return (
    <div className="search-container">
      <input
        onChange={props.handleTextBoxUpdates}
        type="text"
        id="searchInputText"
        name="searchInputText"
        value={props.searchInputText}
        autoComplete="off"
      ></input>
    </div>
  );
}

export default Search;
