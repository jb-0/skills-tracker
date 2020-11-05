import React, { useContext } from 'react';
import './SearchSuggestion.css';
import { v4 as uuidv4 } from 'uuid';
import { ViewContext } from '../../context/ViewContext';
import { SearchContext } from '../../context/SearchContext';

function SearchSuggestion() {
  const size = useContext(ViewContext);
  const [search, setSearch]  = useContext(SearchContext);

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

  return (
    <div>
      {search.suggestedTerms.map((suggestedTerm) => {
        return (
          <div
            onClick={addSearchTerm}
            id={suggestedTerm}
            className={
              size.device === 'Desktop'
                ? 'suggested-term-container'
                : 'suggested-term-container-mobile suggested-term-container'
            }
            key={uuidv4()}
            data-testid="suggested-term-container"
          >
            <p id={suggestedTerm}>{suggestedTerm}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchSuggestion;
