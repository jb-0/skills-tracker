import React, { useContext } from 'react';
import SearchBox from './SearchBox';
import SearchSuggestion from './SearchSuggestion';
import SearchTerms from './SearchTerms';
import SearchResults from './SearchResults';
import DropdownSelect from '../common/DropdownSelect';
import SearchSaveButton from './SearchSaveButton';
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
      {/* The dropdown selection allows the user to choose a city/location */}
      <DropdownSelect
        name="location"
        selectOptions={permittedLocations}
        value={search.location}
        onChange={search.handleDropDownSelectUpdates}
      />

      {/* The search box allows users to start typing a skill */}
      <SearchBox />

      {/* Search suggestions are rendered as the user starts typing in the search box */}
      <SearchSuggestion />

      {/* The search button triggers a fetch to the backend to return the number of jobs */}
      <Button
        buttonText="Search"
        buttonAction={search.handleSearchButtonClick}
      />

      {/* When a suggestion is clicked it is rendered as a selected search term  */}
      <SearchTerms />

      {/* As long as the user has select at least one search term and pressed search, the search
      results will be returned and displayed */}
      {search.submittedSearchTerms.length > 0 ? (
        <SearchResults />
      ) : null}

      {/* When a search is submitted by an authenticated user they will have the option to save
      their search */}
      <SearchSaveButton />

      
    </div>
  );
}

export default SearchContainer;
