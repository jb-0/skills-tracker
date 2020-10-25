import React from 'react';
import './Search.css';
import './SearchSuggestion';
import SearchSuggestion from './SearchSuggestion';
import SearchTerms from './SearchTerms'

function Search(props) {
  return (
    <div className="search-container">
      <input
        onChange={props.handleTextBoxUpdates}
        type="text"
        id="searchInputText"
        name="searchInputText"
        autoComplete="off"
      ></input>

      <SearchSuggestion
        suggestedTerms={props.suggestedTerms}
        addSearchTerm={props.addSearchTerm}
      />

      <SearchTerms
        searchTerms={props.searchTerms}
        removeSearchTerm={props.removeSearchTerm}
      />
    </div>
  );
}

export default Search;
