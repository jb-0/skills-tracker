import React, { useContext } from 'react';
import SearchBox from './SearchBox';
import SearchSuggestion from './SearchSuggestion';
import SearchTerms from './SearchTerms';
import SearchResultsContainer from './SearchResultsContainer';
import DropdownSelect from '../common/DropdownSelect';
import Button from '../common/Button';
import { v4 as uuidv4 } from 'uuid';
import { SearchContext } from '../../context/SearchContext';

// TEMP TERMS DATA TILL MOVED INTO DB
const permittedLocations = ['london', 'south east england', 'kent', 'essex'];

function SearchContainer() {
  const [search]  = useContext(SearchContext);

  // Return the various elements that make up the search view and pass the necessary props
  return (
    <div>
      <DropdownSelect
        name="location"
        selectOptions={permittedLocations}
        value={search.location}
        onChange={search.handleDropDownSelectUpdates}
      />

      <SearchBox
        handleTextBoxUpdates={search.handleTextBoxUpdates}
        suggestedTerms={search.suggestedTerms}
        searchTerms={search.searchTerms}
        searchInputText={search.searchInputText}
      />

      <SearchSuggestion
        suggestedTerms={search.suggestedTerms}
        addSearchTerm={search.addSearchTerm}
        key={uuidv4()}
      />

      <Button buttonText="Search" buttonAction={search.handleSearchButtonClick} />

      <SearchTerms
        searchTerms={search.searchTerms}
        removeSearchTerm={search.removeSearchTerm}
        key={uuidv4()}
      />

      {search.submittedSearchTerms.length > 0 ? (
        <SearchResultsContainer
          searchTerms={search.submittedSearchTerms}
          location={search.submittedLocation}
        />
      ) : null}
    </div>
  );
}

export default SearchContainer;
