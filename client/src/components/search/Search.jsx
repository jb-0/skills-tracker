import React from 'react';
import './Search.css';
import './SearchSuggestion';
import SearchSuggestion from './SearchSuggestion';

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

      <SearchSuggestion
        suggestedTerms={props.suggestedTerms}
        addSearchTerm={props.addSearchTerm}
      />

      {props.searchTerms.map((searchTerm) => {
        return (
          <div className="search-term-container">
            <p onClick={props.removeSearchTerm} id={searchTerm}>
              x {searchTerm}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Search;
