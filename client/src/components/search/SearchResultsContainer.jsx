import React, { useState, useEffect, useContext } from 'react';
import SearchResults from './SearchResults';
import { SearchContext } from '../../context/SearchContext';

function SearchResultsContainer() {
  const [jobs, setJobs] = useState([]);
  const [search]  = useContext(SearchContext);

  useEffect(() => {
    async function fetchData() {
      const searchTermString = search.searchTerms.join(' ');
  
      let apiQuery = `/api/job/search?keywords=${searchTermString}`;
      apiQuery += `&locationName=${search.location}`;
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
  }, [search.searchTerms, search.location]);

  return (
    <SearchResults searchTerms={search.searchTerms} location={search.location} jobs={jobs}/>
  );
}

export default SearchResultsContainer;
