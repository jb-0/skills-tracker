import React, { useContext } from 'react';
import './SearchTerms.css'
import { v4 as uuidv4 } from 'uuid';
import { SearchContext } from '../../context/SearchContext';

function SearchTerms() {
  const [search, setSearch]  = useContext(SearchContext);

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

  return (
    <div>
      {search.searchTerms.map((searchTerm) => {
        return (
          <div className="search-term-container" key={uuidv4()} data-testid="search-term-container">
            <p onClick={removeSearchTerm} id={searchTerm}>
              x {searchTerm}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchTerms;