import React from 'react';

function SearchResults(props) {

  return (
    <div>
      <h1>
        There are currently {props.jobs.noOfResults} "{props.searchTerms.join(' ')}" jobs in 
        {' '} {props.location}
      </h1>
    </div>
  );
};

export default SearchResults;