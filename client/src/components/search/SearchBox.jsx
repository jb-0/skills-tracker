import React, { useContext, useRef } from 'react';
import './SearchBox.css';
import './SearchSuggestion';
import { ViewContext } from '../../context/ViewContext';
import { SearchContext } from '../../context/SearchContext';

// TEMP TERMS DATA TILL MOVED INTO DB
const permittedTerms = [
  'Angular',
  'Babel',
  'CSS',
  'C++',
  'Django',
  'DOM',
  'Express',
  'Go',
  'HTML',
  'Java',
  'JavaScript',
  'Jest',
  'Kotlin',
  'MongoDB',
  'Node',
  'Objective-C',
  'Python',
  'React',
  'React testing library',
  'Ruby on Rails',
  'SQL'
];

function Search(props) {
  const size = useContext(ViewContext);
  const [search, setSearch]  = useContext(SearchContext);
  const searchBoxRef = useRef();

  // Handle changes to the text box and provide suggested terms
  function handleTextBoxUpdates(event) {
    const target = event.target.name;
    const value = event.target.value;

    let suggested;
    if (value.length > 0) {
      suggested = permittedTerms.filter(
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
    <div
      className={
        size.device === 'Desktop'
          ? 'search-container'
          : 'search-container-mobile search-container'
      }
    >
      <input
        ref={searchBoxRef}
        onChange={handleTextBoxUpdates}
        onFocus={handleOnFocus}
        type="text"
        id="searchInputText"
        name="searchInputText"
        value={search.searchInputText}
        placeholder="Start typing a skill.."
        autoComplete="off"
      ></input>
    </div>
  );
}

export default Search;
