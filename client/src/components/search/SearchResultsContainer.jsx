import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';

function SearchResultsContainer(props) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const searchTermString = props.searchTerms.join(' ');
  
      let apiQuery = `/api/job/search?keywords=${searchTermString}`;
      apiQuery += `&locationName=${props.location}`;
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
  }, [props.searchTerms, props.location]);

  return (
    <SearchResults searchTerms={props.searchTerms} location={props.location} jobs={jobs}/>
  );
}

export default SearchResultsContainer;
