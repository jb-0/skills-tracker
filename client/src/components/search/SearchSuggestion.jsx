import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SearchContext } from '../../context/SearchContext';
import { SuggestedTermBox } from './SearchSuggestion.Styles';

function SearchSuggestion() {
  const [search, setSearch] = useContext(SearchContext);

  // Add items to the search terms array
  function addSearchTerm(event) {
    event.preventDefault();
    const term = event.target.id;

    setSearch((previousValues) => {
      // Only add the item if it is not already included, also clear the input text and suggested
      // terms allowing user's to type their next skill
      if (!previousValues.searchTerms.includes(term)) {
        return {
          ...previousValues,
          searchTerms: [...previousValues.searchTerms, term],
          searchInputText: '',
          suggestedTerms: [],
        };
      } else {
        return previousValues;
      }
    });
  }

  return (
    <>
      {search.suggestedTerms.map((suggestedTerm) => {
        return (
          <SuggestedTermBox
            onClick={addSearchTerm}
            id={suggestedTerm}
            key={uuidv4()}
            data-testid="suggested-term-container"
          >
            {suggestedTerm}
          </SuggestedTermBox>
        );
      })}
    </>
  );
}

export default SearchSuggestion;
