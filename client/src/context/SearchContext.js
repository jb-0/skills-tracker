/**
 * This context is used to pass state to the numerous components and events (such as save) that
 * make up a search. This also means a user can leave the search screen to view their profile
 * without losing search information.
 */
import React, { createContext, useEffect, useState } from 'react';
import getPermittedTerms from '../services/getPermittedTerms';

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  // Store a number of variables in state, firstly the input from the search text box, second the
  // terms that have been added so far and finally the suggested search terms
  const [search, setSearch] = useState({
    searchInputText: '',
    searchTerms: [],
    suggestedTerms: [],
    location: 'London',
    permittedTerms: { locations: [], skills: [] },
    handleDropDownSelectUpdates,
    updateSkills,
  });

  useEffect(() => {
    async function setPermittedTerms() {
      const permittedTerms = await getPermittedTerms();

      setSearch((previousValues) => {
        return { ...previousValues, permittedTerms };
      });
    }

    setPermittedTerms();
  }, []);

  function handleDropDownSelectUpdates(event) {
    const target = event.target.name;
    const value = event.target.value;

    setSearch((previousValues) => {
      return { ...previousValues, [target]: value };
    });
  }

  function updateSkills(searchTerms) {
    setSearch((previousValues) => {
      return { ...previousValues, searchTerms };
    });
  }

  return <SearchContext.Provider value={[search, setSearch]}>{props.children}</SearchContext.Provider>;
};
