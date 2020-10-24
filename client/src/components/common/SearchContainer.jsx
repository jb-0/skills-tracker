import React, { useEffect, useState } from 'react';
import Search from './Search';

function SearchContainer() {
  // Store a number of variables in state, firstly the input from the search text box, second the
  // terms that have been added so far and finally the suggested search terms
  const [search, setSearch] = useState({
    searchInputText: '',
    searchTerms: [],
    suggestedTerms: [],
  });

  const permittedTerms = ['node', 'react', 'sql'];

  // Handle changes to the text box and provide suggested terms
  function handleTextBoxUpdates(event) {
    const target = event.target.name;
    const value = event.target.value;

    let suggested;
    if (value.length > 0) { 
      suggested = permittedTerms.filter(word => word.substring(0, value.length) === value);
    } else {
      suggested = [];
    }

    console.log(suggested);
    setSearch((previousValues) => {
      return { ...previousValues, [target]: value, suggestedTerms: suggested };
    });
  }

  // Add items to the search terms array
  function addSearchTerm(event) {
    const term = event.target.id;

    setSearch((previousValues) => {
      return {
        ...previousValues,
        searchTerms: [...previousValues.searchTerms, term],
      };
    });
  }

  // Return the search view and pass the necessary props
  return (
    <Search
      handleTextBoxUpdates={handleTextBoxUpdates}
      addSearchTerm={addSearchTerm}
      suggestedTerms={search.suggestedTerms}
    />
  );
}

export default SearchContainer;
