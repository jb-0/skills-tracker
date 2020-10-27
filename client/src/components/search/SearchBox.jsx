import React, { useContext } from 'react';
import './SearchBox.css';
import './SearchSuggestion';
import { ViewContext } from '../../context/ViewContext';

function Search(props) {
  const size = useContext(ViewContext);

  return (
    <div
      className={
        size.device === 'Desktop'
          ? 'search-container'
          : 'search-container-mobile search-container'
      }
    >
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
