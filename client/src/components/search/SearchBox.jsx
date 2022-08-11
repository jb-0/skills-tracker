import React, { useContext, useRef } from 'react';
import './SearchSuggestion';
import { SearchContext } from '../../context/SearchContext';
import { SearchInput } from './SearchBox.Styles'

function Search(props) {
  const [search, setSearch]  = useContext(SearchContext);
  const searchBoxRef = useRef();
  // Handle changes to the text box and provide suggested terms
  function handleTextBoxUpdates(event) {
    const target = event.target.name;
    const value = event.target.value;

    let suggested;
    if (value.length > 0) {
      suggested = search.permittedTerms.skills.filter(
        (word) =>
          word.substring(0, value.length).toLowerCase() === value.toLowerCase()
      );
    } else {
      suggested = [];
    }

    setSearch((previousValues) => {
      return { ...previousValues, [target]: value, suggestedTerms: suggested };
    });
  }

  // Scroll down on focus to ensure user see's suggestions and selected items (especially on mobile)
  function handleOnFocus(){
    searchBoxRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
      <SearchInput
        ref={searchBoxRef}
        onChange={handleTextBoxUpdates}
        onFocus={handleOnFocus}
        type="text"
        id="searchInputText"
        name="searchInputText"
        value={search.searchInputText}
        placeholder="Start typing a skill.."
        autoComplete="off"
      ></SearchInput>
  );
}

export default Search;
