import React from 'react';
import './SearchResults.css'

function SearchResults(props) {

  return (
    <div className="search-results-container">
      <h1>
        There are currently {props.jobs.noOfResults} "{props.searchTerms.join(' ')}" jobs in 
        {' '} {props.location}
      </h1>
    </div>
  );
};

export default SearchResults;