import React, { useState } from 'react';
import Search from './Search';

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

function SearchContainer() {
  // Store a number of variables in state, firstly the input from the search text box, second the
  // terms that have been added so far and finally the suggested search terms
  const [search, setSearch] = useState({
    searchInputText: '',
    searchTerms: [],
    suggestedTerms: [],
  });

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

  // Add items to the search terms array
  function addSearchTerm(event) {
    const term = event.target.id;

    // Only add the item if it is not already included
    if (!search.searchTerms.includes(term)) {
      setSearch((previousValues) => {
        return {
          ...previousValues,
          searchTerms: [...previousValues.searchTerms, term],
        };
      });
    }
  }

  // Remove from search terms array
  function removeSearchTerm(event) {
    const term = event.target.id;

    setSearch((previousValues) => {
      const searchTerms = previousValues.searchTerms.filter(
        (word) => word.toLowerCase() !== term.toLowerCase()
      );

      return {
        ...previousValues,
        searchTerms: searchTerms,
      };
    });
  }

  // Return the search view and pass the necessary props
  return (
    <Search
      handleTextBoxUpdates={handleTextBoxUpdates}
      addSearchTerm={addSearchTerm}
      removeSearchTerm={removeSearchTerm}
      suggestedTerms={search.suggestedTerms}
      searchTerms={search.searchTerms}
      searchInputText={search.searchInputText}
    />
  );
}

export default SearchContainer;
