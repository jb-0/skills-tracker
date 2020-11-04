/**
  * This context is used to pass state to the numerous components and events (such as save) that
  * make up a search. This also means a user can leave the search screen to view their profile
  * without losing search information.
  */
import React, { createContext, useState  } from 'react';

export const SearchContext = createContext();

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

export const SearchProvider = (props) => {
  // Store a number of variables in state, firstly the input from the search text box, second the
  // terms that have been added so far and finally the suggested search terms
  const [search, setSearch] = useState({
    searchInputText: '',
    searchTerms: [],
    suggestedTerms: [],
    submittedSearchTerms: [],
    location: 'london',
    submittedLocation: '',
    handleTextBoxUpdates,
    handleDropDownSelectUpdates,
    addSearchTerm,
    removeSearchTerm,
    handleSearchButtonClick
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

  function handleDropDownSelectUpdates(event) {
    const target = event.target.name;
    const value = event.target.value;

    setSearch((previousValues) => {
      return { ...previousValues, [target]: value };
    });
  }

  // Add items to the search terms array
  function addSearchTerm(event) {
    const term = event.target.id;

    setSearch((previousValues) => {
      // Only add the item if it is not already included
      if (!(previousValues.searchTerms.includes(term))) {
        return {
          ...previousValues,
          searchTerms: [...previousValues.searchTerms, term],
        };
      } else {
        return previousValues;
      }
    });
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

  // When a user hits search ensure the location and searchTerms are current
  function handleSearchButtonClick() {
    setSearch((previousValues) => {
      return {
        ...previousValues,
        submittedSearchTerms: [...previousValues.searchTerms],
        submittedLocation: previousValues.location,
      };
    });
  }
  
  return <SearchContext.Provider value={ [search, setSearch] }>{props.children}</SearchContext.Provider>;
};
