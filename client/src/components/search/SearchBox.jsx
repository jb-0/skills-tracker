import React, { useContext } from 'react';
import './SearchBox.css';
import './SearchSuggestion';
import { ViewContext } from '../../context/ViewContext';
import { SearchContext } from '../../context/SearchContext';

// TEMP TERMS DATA TILL MOVED INTO DB
const permittedTerms = [
  'Angular',
  'Babel',
  'CSS',
  'DOM',
  'HTML',
  'Java',
  'JavaScript',
  'Python',
  'React',
  'Node',
  'SQL',
];

function Search(props) {
  const size = useContext(ViewContext);
  const [search, setSearch]  = useContext(SearchContext);

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

  return (
    <div
      className={
        size.device === 'Desktop'
          ? 'search-container'
          : 'search-container-mobile search-container'
      }
    >
      <input
        onChange={handleTextBoxUpdates}
        type="text"
        id="searchInputText"
        name="searchInputText"
        value={search.searchInputText}
        autoComplete="off"
      ></input>
    </div>
  );
}

export default Search;
