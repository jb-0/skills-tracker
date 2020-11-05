import React, { useContext } from 'react';
import SearchBox from './SearchBox';
import SearchSuggestion from './SearchSuggestion';
import SearchTerms from './SearchTerms';
import SearchResultsContainer from './SearchResultsContainer';
import DropdownSelect from '../common/DropdownSelect';
import Button from '../common/Button';
import { SearchContext } from '../../context/SearchContext';

// TEMP TERMS DATA TILL MOVED INTO DB
const permittedLocations = ['london', 'south east england', 'kent', 'essex'];

function SearchContainer() {
  const [search]  = useContext(SearchContext);

  // Return the various elements that make up the search view and pass the necessary props
  return (
    <div>
      {/* While props are used for common components, search functionality uses the SearchContext 
      and as a result no props are passed down */}
      <DropdownSelect
        name="location"
        selectOptions={permittedLocations}
        value={search.location}
        onChange={search.handleDropDownSelectUpdates}
      />
      <SearchBox />
      <SearchSuggestion />
      <Button
        buttonText="Search"
        buttonAction={search.handleSearchButtonClick}
      />
      <SearchTerms />
      {search.submittedSearchTerms.length > 0 ? (
        <SearchResultsContainer />
      ) : null}
    </div>
  );
}

export default SearchContainer;
