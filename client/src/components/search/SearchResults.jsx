import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchResults.css'

function SearchResultsContainer() {
  const [jobs, setJobs] = useState([]);
  const [search]  = useContext(SearchContext);

  useEffect(() => {
    async function fetchData() {
      const searchTermString = search.submittedSearchTerms.join(' ');
  
      let apiQuery = `/api/job/search?keywords=${searchTermString}`;
      apiQuery += `&locationName=${search.submittedLocation}`;
      apiQuery += `&distanceFromLocation=10`;
  
      const res = await fetch(
        apiQuery,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            frontend: 'react-frontend',
          },
        }
      );
      
      if (res.status === 200) {
        setJobs(await res.json());
      } else {
        setJobs({ noOfResults: 0, msg: 'no results found' });
      }
    }
    
    fetchData();
  }, [search.submittedSearchTerms, search.submittedLocation]);

  return (
    <div className="search-results-container">
      <p>
        There are currently {jobs.noOfResults} "{search.submittedSearchTerms.join(' ')}" jobs in 
        {' '} {search.submittedLocation}
      </p>
    </div>
  );
}

export default SearchResultsContainer;
