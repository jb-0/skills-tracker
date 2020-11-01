import React from 'react';
import './SearchResults.css'

function SearchResults(props) {

  return (
    <div className="search-results-container">
      <p>
        There are currently {props.jobs.noOfResults} "{props.searchTerms.join(' ')}" jobs in 
        {' '} {props.location}
      </p>
    </div>
  );
};

export default SearchResults;