import React, { useContext, useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import SearchSuggestion from './SearchSuggestion';
import SearchTerms from './SearchTerms';
import SearchResults from './SearchResults';
import DropdownSelect from '../common/DropdownSelect';
import SearchSaveButton from './SearchSaveButton';
import Button from '../common/Button';
import { SearchContext } from '../../context/SearchContext';
import { SearchForm, SearchInputs } from './Search.Styles';
import Loader from '../common/Loader';

function SearchContainer() {
  const [search]  = useContext(SearchContext);
  const [fetchingData, setFetchingData] = useState(true);
  

  // useEffect(() => {

   
  // }, [(search.permittedTerms.locations !== undefined)]);

  
  // If we are currently fetching the user's data then display a loader
  //  if (fetchingData) {
  //   return <Loader />;
  // }
  // Return the various elements that make up the search view and pass the necessary props
  return (
    <SearchForm>
      {/* While props are used for common components, search functionality uses the SearchContext 
      and as a result no props are passed down */}
      {/* The dropdown selection allows the user to choose a city/location */}
      <SearchInputs>
        <DropdownSelect
          name="location"
          selectOptions={['London']}
          value={search.location}
          onChange={search.handleDropDownSelectUpdates}
        />

        {/* The search box allows users to start typing a skill */}
        <div>
        <SearchBox />

        {/* Search suggestions are rendered as the user starts typing in the search box */}
        <SearchSuggestion />
        </div>

        {/* The search button triggers a fetch to the backend to return the number of jobs */}
        <Button
          buttonText="Search"
          buttonAction={search.handleSearchButtonClick}
        />
      </SearchInputs>

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

      
    </SearchForm>
  );
}

export default SearchContainer;
