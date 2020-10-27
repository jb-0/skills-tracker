import React from 'react';
import './Search.css';
import './SearchSuggestion';
import SearchSuggestion from './SearchSuggestion';
import SearchTerms from './SearchTerms'
import { v4 as uuidv4 } from 'uuid';

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

      <SearchSuggestion
        suggestedTerms={props.suggestedTerms}
        addSearchTerm={props.addSearchTerm}
      />

      <SearchTerms
        searchTerms={props.searchTerms}
        removeSearchTerm={props.removeSearchTerm}
        key={uuidv4()}
      />
    </div>
  );
}

export default Search;
